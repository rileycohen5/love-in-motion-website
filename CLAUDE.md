# Love in Motion website

Static site (index.html, styles.css, script.js) for loveinmotionco.com, hosted on GitHub Pages
from `main` of `rileycohen5/love-in-motion-website`. Pushing to `main` publishes the site.

## Pushing to GitHub - always use the token (REQUIRED)

The local `gh` login for rileycohen5 is expired, and the other signed-in accounts
(rileyinsell, rileyMTW) are refused with a 403. Do not try them. Always push with the
rileycohen5 `GITHUB_TOKEN` stored in `C:\Dev\muse\.env`, and never print it:

```bash
T=$(grep "^GITHUB_TOKEN=" /c/Dev/muse/.env | cut -d= -f2- | tr -d '\r"')
git -c credential.helper= \
  -c "http.extraheader=Authorization: Basic $(printf 'x-access-token:%s' "$T" | base64 -w0)" \
  push origin main
```

## After a push

- GitHub Pages publishes in about 1 minute.
- Browsers may keep the old files for up to 10 minutes (`Cache-Control: max-age=600`), so tell
  Riley to hard refresh (Ctrl+Shift+R, or Cmd+Shift+R on a Mac) if a change does not show.
- Verify live with `curl -s "https://loveinmotionco.com/styles.css?v=$RANDOM" | grep <new rule>`.

## Session logs

Session handoffs go in `sessions/` as `YYYY-MM-DD_<topic>_handoff.md`.
