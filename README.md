# The Library Kitchen & Taphouse — Website

A static site (plain HTML, CSS and JavaScript), so there's nothing to install or build.

## Editing content
Everything you'll update day to day is in **`assets/js/data.js`**:

- `heroSlides`: the photos that rotate behind the headline, their order, and how each is cropped. The photo files are in `assets/img/hero/`.
- `hours`: opening hours. The "Open now" badge and the hours table both read from this.
- `specials`: one entry per night. The gold "Tonight" bar at the top shows today's special automatically.
- `events.recurring`: weekly events, listed automatically for the next 3 weeks.
- `events.oneOff`: dated one-time events (there's an example in the comments).
- `menu`: categories, items, prices and notes.
- `info`: address, phone, Toast order link, gift card link, socials and the jobs form endpoint.

## Before launch
1. Confirm the **hours** (currently placeholders: noon to 2 AM daily).
2. Confirm the **gift card link** in your Toast dashboard.
3. Create a free form at [formspree.io](https://formspree.io), then paste its ID into `jobsFormEndpoint`. Until you do, the hiring form tells applicants to call.
4. Go through the checklist below and correct or remove anything that isn't true.

## Unconfirmed details
These are on the site now but weren't taken from your current website. Search the project for `TODO: confirm` to find them in the files.

**Written as placeholder copy (`assets/js/data.js`)**
- [ ] Night names: Taphouse Tuesday, Hump Day, Thirsty Thursday, Friday Night, Sunday Funday
- [ ] "Games on every screen" (Sunday special)
- [ ] "Prizes for the top teams" (trivia event)
- [ ] "Kitchen open late. Carry-out available all day."
- [ ] Drinks tab: rotating Michigan craft and domestic drafts, domestic bottle buckets, full bar, "house shots"

**Written as placeholder copy (`index.html`)**
- [ ] About section: "The kitchen keeps up all night"
- [ ] Events section: the invitation to call about groups, birthdays and team nights
- [ ] Merch: "Crest tees, hats and koozies", and that merch is sold at the bar
- [ ] Jobs: flexible shifts, "great tips", "Schedules built around your classes", "Busy nights mean real money", "We'll train the right people"
- [ ] Jobs: the positions listed in the text and the form menu
- [ ] Visit: that parking is free
- [ ] Photo descriptions for screen readers: "Halloween" and "Reuben pizza" are guesses from the photos

**Taken from older listings or a review, so they may be out of date (`assets/js/data.js`)**
- [ ] Monday: trivia at 8 PM (a 2024 listing), $4 craft pints, $6 Buster Burger baskets
- [ ] Tuesday to Friday: Happy Hour 4–8 PM, late-night specials 8 PM–12 AM
- [ ] Half Off Saturday: what's actually half off
- [ ] Sunday: $5 Bloody Marys and Mimosas
- [ ] Half-off appetizers for WMU students, and that a Bronco ID is how they qualify
- [ ] Phone number: the site uses 269.743.7103 from your current website, but an older listing shows 269.353.7049 for carry-out

## Photos
The web-sized images are in `assets/img/`. Your originals in `Media/` were left untouched. To swap a photo, resize it to about 1600px wide, keep the same filename and replace the file.

## Hosting
Drag this whole folder onto [Netlify Drop](https://app.netlify.com/drop), or upload it to any web host. Then point your domain at it. `Media/` doesn't need to be uploaded.
