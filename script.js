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

/*
 * CRITICAL LEAD INTEGRATION
 * The form action in index.html is the source of truth and a no-JavaScript fallback.
 * Never replace this handler with a simulated success message. A success message may
 * only appear after Zapier returns a successful response.
 */
const inquiryForm = document.querySelector(".inquiry-form");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = inquiryForm.querySelector('button[type="submit"]');
    const status = inquiryForm.querySelector(".form-status");
    const endpoint = inquiryForm.action;
    const originalButtonText = button.textContent;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    if (!endpoint || !endpoint.startsWith("https://hooks.zapier.com/hooks/catch/")) {
      status.textContent = "The inquiry form is temporarily unavailable. Please email loveinmotion.ca@gmail.com.";
      return;
    }

    button.disabled = true;
    button.textContent = "Sending Inquiry…";
    status.textContent = "";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(inquiryForm),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Zapier returned ${response.status}`);
      }

      inquiryForm.reset();
      button.textContent = "Inquiry Received";
      status.textContent = "Thank you! Your details were sent successfully. Makenna will be in touch soon.";
    } catch (error) {
      button.textContent = originalButtonText;
      status.textContent = "Your inquiry could not be sent. Please try again or email loveinmotion.ca@gmail.com.";
      console.error("Inquiry submission failed:", error);
    } finally {
      window.clearTimeout(timeout);
      button.disabled = false;
    }
  });
}
