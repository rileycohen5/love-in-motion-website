const cards = Array.from(document.querySelectorAll(".reel-card"));
const dotsContainer = document.querySelector(".reel-dots");
const nextButton = document.querySelector(".reel-control-next");
const prevButton = document.querySelector(".reel-control-prev");

let activeIndex = 0;
let reelTimer;

const dots = cards.map((_, index) => {
  const dot = document.createElement("button");
  dot.className = "reel-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Show reel ${index + 1}`);
  dotsContainer.appendChild(dot);
  dot.addEventListener("click", () => {
    showReel(index);
    restartTimer();
  });
  return dot;
});

function showReel(index) {
  activeIndex = (index + cards.length) % cards.length;

  cards.forEach((card, cardIndex) => {
    const isActive = cardIndex === activeIndex;
    const video = card.querySelector("video");

    card.classList.toggle("is-active", isActive);

    if (!video) {
      return;
    }

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeIndex);
    dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
  });
}

function advanceReel(direction = 1) {
  showReel(activeIndex + direction);
}

function restartTimer() {
  window.clearInterval(reelTimer);
  reelTimer = window.setInterval(() => advanceReel(1), 4200);
}

nextButton.addEventListener("click", () => {
  advanceReel(1);
  restartTimer();
});

prevButton.addEventListener("click", () => {
  advanceReel(-1);
  restartTimer();
});

showReel(0);
restartTimer();

const ZAPIER_INQUIRY_WEBHOOK =
  "https://hooks.zapier.com/hooks/catch/17349487/uv7uan9/";

const inquiryForm = document.querySelector(".inquiry-form");
const inquirySection = document.querySelector(".inquiry-section");

inquiryForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector("button[type='submit']");
  const originalLabel = button.textContent;

  clearInquiryError();
  button.disabled = true;
  button.textContent = "Sending…";

  const data = new FormData(form);
  const payload = {
    name: (data.get("name") || "").toString().trim(),
    email: (data.get("email") || "").toString().trim(),
    wedding_date: (data.get("wedding-date") || "").toString(),
    venue_or_location: (data.get("venue") || "").toString().trim(),
    instagram: (data.get("instagram") || "").toString().trim(),
    package: (data.get("package") || "").toString(),
    message: (data.get("message") || "").toString().trim(),
  };

  const body = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => body.append(key, value));

  try {
    const response = await fetch(ZAPIER_INQUIRY_WEBHOOK, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    showInquirySuccess(payload.name);
  } catch (error) {
    button.disabled = false;
    button.textContent = originalLabel;
    showInquiryError();
  }
});

function showInquirySuccess(name) {
  const greeting = name ? `Thank you, ${name}.` : "Thank you.";
  const success = document.createElement("div");
  success.className = "inquiry-success";
  success.setAttribute("role", "status");
  success.setAttribute("aria-live", "polite");
  success.innerHTML = `
    <div class="inquiry-success-mark" aria-hidden="true">&#10003;</div>
    <p class="section-kicker">Inquiry Received</p>
    <h3>${greeting}</h3>
    <p>
      Your details are on their way to Makenna. You will hear back soon with
      availability, package guidance, and next steps.
    </p>
  `;

  inquiryForm.replaceWith(success);
  success.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showInquiryError() {
  let banner = inquirySection.querySelector(".inquiry-error");
  if (!banner) {
    banner = document.createElement("p");
    banner.className = "inquiry-error";
    banner.setAttribute("role", "alert");
    banner.textContent =
      "Something went wrong sending your inquiry. Please try again or email loveinmotion.ca@gmail.com.";
    inquiryForm.prepend(banner);
  }
}

function clearInquiryError() {
  const banner = inquirySection.querySelector(".inquiry-error");
  if (banner) {
    banner.remove();
  }
}
