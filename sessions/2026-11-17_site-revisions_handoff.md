# Love in Motion website session - 2026-11-17

## What happened

- Applied Makenna's "Love in Motion Website Revisions" list to the real production copy
  (`.netlify-merge/`, which matched the live site byte for byte) and copied the result into
  the repo root so GitHub now matches what will be live.
- Answered the hosting question: the live domain is served by Netlify, not GitHub Pages
  (DNS points at Netlify, response header `Server: Netlify`; the GitHub repo is private
  with no Pages site). So running out of Netlify credits can take the site down.
- Likely cause of the credit burn: 16 original iPhone videos (about 730 MB, HEVC .MOV)
  were all set to autoplay, so one visit could download hundreds of MB.

## What changed

- Theme: "European Editorial Romance" - warm ivory background, espresso ink, rosewood
  accent, italic accent words in headlines. Fonts: Cormorant Garamond (headlines),
  Manrope (small text). Removed Bodoni Moda, Inter, Great Vibes.
- Phone menu: six tabs on a tidy 3 x 2 grid, two header buttons side by side.
- Mission: kicker "Our Mission", heading "The Art of Remembering", new description.
- About: "Behind the Lens - Meet Makenna", new bio.
- Gallery renamed Portfolio (nav, anchor `#portfolio`), new description.
- B&W photo and client words kept unchanged.
- Packages: new intro paragraph, The Essentials / The Signature / The Heirloom with price
  ranges, descriptions and lists as supplied.
- FAQ section built but `hidden` (no content supplied yet).
- Inquiry: heading "Tell Us More About Your Day"; new fields Multi-Locations, Budget Range,
  Key Moments, Wedding Planner or Coordinator; package names updated; helper notes added.
  Zapier payload gained `additional_locations`, `budget_range`, `key_moments`,
  `planner_or_coordinator`.
- Footer TikTok now @loveinmotionco.
- Video: compressed web copies in `assets/web-reels/` (H.264 720p MP4 + poster JPG,
  130 MB total). Portfolio reels load and play only when scrolled into view; carousel reels
  load only when shown.
- Fixed: customer name was inserted into the success message as raw HTML; now escaped.
- Typos fixed from the brief: "Precessional" -> processional, "Sneak Peak" -> sneak peek,
  "wedding to memories" -> wedding memories, "honored to being" -> honored to be.

Commit: see `git log` on branch `site-revisions-2026-11-17`.

## Decisions

- Did not publish to Netlify: needs Makenna's sign-off and the Netlify credit status.
- Package 2 and 3 have no description line and Package 3 has no delivery timeframe,
  because the brief left those blank.
- Original .MOV files kept locally, not committed (two exceed GitHub's 100 MB limit).

## Blocked / waiting

- Makenna: new up-to-date reels for the carousel (none were found on this machine).
- Makenna: 3 FAQ questions and answers.
- Makenna: descriptions for The Signature and The Heirloom, and Heirloom delivery time.
- Riley or Makenna: update the Zapier email step so the 4 new form fields appear in the
  inquiry email.
- Riley: check Netlify billing for project `love-in-motion-ca` before publishing.

## Suggested next prompt

"Makenna approved the preview. Here are the new reels and FAQ answers: ... Add them and
publish `.netlify-merge` to the Netlify project love-in-motion-ca."

## Update - move to GitHub Pages (same day)

- Why it was still on Netlify: the move was never finished. The domain's DNS lived in
  Netlify DNS (nameservers dns1-4.p08.nsone.net) and pointed at Netlify project
  `love-in-motion-ca`; the GitHub repo was private with no Pages site.
- Repo `rileycohen5/love-in-motion-website` made public (Riley's choice; history scanned,
  no secrets). Branch fast-forwarded into `main`; added `CNAME` (loveinmotionco.com) and
  `.nojekyll` in commit `129f92b`. GitHub Pages serves `main` at `/`, custom domain
  loveinmotionco.com (no github.io ending).
- Auth: used the `rileycohen5` token from `C:\Dev\muse\.env` (never printed). The local gh
  login for rileycohen5 is expired; `rileyinsell` cannot see this repo.
- GoDaddy (registrar): nameservers switched from Netlify DNS to GoDaddy defaults
  (ns23/ns24.domaincontrol.com). Records: A @ -> 185.199.108.153, .109, .110, .111;
  CNAME www -> rileycohen5.github.io. Netlify zone only had two NETLIFY records, nothing
  else to carry over. No email (MX) on the domain.
- HTTPS certificate is issued by GitHub after DNS settles; then "Enforce HTTPS" is turned on.

## Update - Zapier

- Zap "Wedding Inquiry Form API" (id 362617736) published as v2 "Add 4 new website form
  fields": email body now includes Additional Locations, Budget Range, Key Moments,
  Planner/Coordinator (typed field references `{{362617736__<field>}}`).
- One test inquiry was sent with Riley's approval (marked TEST). Zap history showed all
  fields arrived. Older blank runs at 2:10 PM came from empty requests, not the site.
- Not yet verified: one live submission after v2 to confirm the new lines fill in.

## Next

- Once the cert is issued, confirm https://loveinmotionco.com serves the new design, then
  Netlify project `love-in-motion-ca` (and `relaxed-tiramisu-94a586`) can be deleted.
- Still waiting on Makenna: new reels, FAQ answers, Signature/Heirloom descriptions.

## Update - HTTPS live (16:27)

- GitHub certificate approved for loveinmotionco.com and www (expires 2027-02-15, GitHub
  renews it automatically). It only started after removing and re-adding the custom
  domain via the API. "Enforce HTTPS" is on; www redirects to the bare domain.
- Google, Cloudflare and Quad9 public DNS already return GitHub's addresses. Some home
  networks (including Riley's) still have the old Netlify answer cached; this clears
  within about an hour, up to 48 hours worst case.
- Keep the Netlify project and Netlify DNS zone until 2026-11-20, so anyone still
  looking up the old answer keeps getting a working site; delete them after that.

## Update - Netlify DNS repointed (Riley approved)

- Riley's home router kept asking Netlify DNS and got the old Netlify answer.
- With Riley's OK, deleted the two NETLIFY records in the Netlify DNS zone and added the
  same GitHub records (4 A records + www CNAME to rileycohen5.github.io, TTL 300).
  Now both GoDaddy and Netlify DNS answer with GitHub, so every visitor reaches GitHub.
- Riley's machine verified on GitHub (Server: GitHub.com) with the new design.
- Netlify plan can be cancelled now. Keep the Netlify DNS zone until 2026-11-20, then
  delete it with the two Netlify projects.

## Update - Kenna's second batch (commit ebc309b, live)

- FAQ section turned on with Kenna's 3 questions; FAQ tab added to the menu.
- Descriptions added for The Signature and The Heirloom.
- New Add-ons section: Polaroid Photography (from $125, 20 instant photos) and
  Disposable Film Photography (from $100, up to 27 photos).
- Fixed the Inquiry label style. Verified live on loveinmotionco.com.
- Still waiting: Kenna's Google Drive folder with 3 new reels for the carousel.
