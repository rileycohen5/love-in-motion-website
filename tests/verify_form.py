"""Guard the Love in Motion lead form's Zapier integration against regressions."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text()
SCRIPT = (ROOT / "script.js").read_text()
ENDPOINT = "https://hooks.zapier.com/hooks/catch/17349487/uv7uan9/"

CHECKS = {
    "Zapier action": f'action="{ENDPOINT}"' in HTML,
    "POST fallback": 'method="post"' in HTML,
    "accessible status": 'class="form-status full-span"' in HTML and 'aria-live="polite"' in HTML,
    "real fetch": "fetch(endpoint" in SCRIPT,
    "form payload": "new FormData(inquiryForm)" in SCRIPT,
    "HTTP failure handling": "if (!response.ok)" in SCRIPT,
    "duplicate protection": "button.disabled = true" in SCRIPT,
    "timeout protection": "AbortController" in SCRIPT,
    "success follows response": SCRIPT.index("if (!response.ok)") < SCRIPT.index('button.textContent = "Inquiry Received"'),
}

for name, passed in CHECKS.items():
    print(f"{'PASS' if passed else 'FAIL'} {name}")

if not all(CHECKS.values()):
    raise SystemExit("Lead form contract failed. Do not ship this change.")
