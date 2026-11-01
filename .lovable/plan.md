# RVC 2026 Redesign — "Manifestation"

A full visual redesign of the conference site around the "Manifestation" flyer: deep teal/emerald darkness, glowing gold, heavy condensed white display type. Structure inspired by the churx demo; creative energy inspired by Reboot Camp.

## 1. Design system (index.css + tailwind.config.ts)
- New palette from the flyer: near-black teal background (`#03130f`–`#0b2a24`), emerald mid-tones, luminous gold accent (`#e9b44c` / `#f5d78e`), soft off-white text. Light sections get a warm ivory variant.
- Replace the old red/purple tokens with new semantic tokens (background, foreground, primary=gold, secondary=emerald, muted, accent) in both light and dark values.
- Typography: add **Anton** (Google Fonts) for the giant condensed "MANIFESTATION" wordmark, keep Playfair Display for elegant section headings, Inter for body, Montserrat for small caps labels/kickers.
- Add reusable effects as utilities: gold glow text-shadow, ember particle drift animation, marquee scroll, shimmer reveal, soft grain overlay.

## 2. Assets
- Upload the user's flyer via lovable-assets → hero backdrop image.
- Download the real service photos and event flyers found on The Godhouse Centre's Facebook page (preaching, worship team, stage shots, service flyers — ~12 usable images verified downloadable) → lovable-assets → gallery carousel, about section accents, and the gallery page.
- Keep the existing RVC/Godhouse logos in the header.

## 3. Landing page (new creative direction)
- **Hero**: cinematic full-bleed flyer backdrop with dark gradient scrims, floating ember particles, huge glowing "MANIFESTATION" wordmark in Anton with gold glow, "Running with the Vision Conference '26" kicker, date/venue/streaming pill badges, Register CTA + "Watch Live" link. Intro reveal animation on load.
- **Gold marquee ticker** strip between hero and content (date • venue • theme • "streamed live").
- **About / purpose**: editorial two-column (churx style), interdenominational note, Godhouse Missions International organizer, photos collage from services.
- **Countdown**: "Countdown to RVC 2026" restyled to teal/gold glass cards, counting to Wed 9 Dec 2026, 5pm WAT.
- **Schedule**: new 2026 timetable — Wed 9 opening 5pm; Thu 10–Sat 12 morning 9am + evening 4pm; Sun 13 grand finale 9am. Day-by-day cards with gold accents, calendar icon animation, register button after.
- **Ministers**: keep placeholder speaker cards, restyled (portrait cards, gold hover glow).
- **Gallery carousel**: "Last year's moments" — real Facebook service photos with captions, autoplay slider.
- **Streaming section**: "Join from anywhere" — cards for Wholeword TV, YouTube, Facebook live streams.
- **Venue**: The Godhouse Centre, Warri with full address and map-style card.
- **FAQs**: updated for 2026 (dates, physical + virtual attendance, venue, streaming, registration).
- **Footer**: restyled; new social/contact info.
- Scroll animations throughout (fade/slide reveals, section transitions kept from current hooks).

## 4. Whole site restyle
- **Header**: transparent-over-hero header that turns solid on scroll; nav updated (RVC '26 branding), Godhouse logo kept creatively in the center, Register button pill-style.
- **Registration page**: restyled to the new theme; conference details updated to 2026 (dates, 9am/4pm sessions, venue, physical + virtual note with streaming channels); keep the existing form fields and Godhouse/Others church logic.
- **Gallery page**: restyled masonry/grid with the real event photos, captions, download affordance kept.
- **index.html**: new title/description/OG tags for RVC 2026 — Manifestation.

## 5. Content facts used everywhere
- Theme: Manifestation. Dates: 9th–13th December 2026. Wed 9: opening 5pm WAT; Thu 10–Sat 12: 9am + 4pm WAT; Sun 13: grand finale 9am WAT.
- Venue: The Godhouse Centre, Warri — 2, Indian Street, off Jakpa Road, by Mansal Hotel, Effurun-Warri, Delta State, Nigeria.
- Physical and virtual — streamed live on Wholeword TV, YouTube and Facebook. Interdenominational gathering organized by The Godhouse Missions International.

## 6. Verification
- Build check + Playwright walkthrough of home, registration, gallery at desktop and mobile widths; screenshots to confirm the new theme renders and no leftover 2025 red/purple styling remains.
