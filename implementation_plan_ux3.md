# UX Implementation Plan — Round 4
L'Ateneo Danza Musical e Fitness
Generated: 2026-04-24

---

## Priority Order

1. Phone/email as tappable links in Contact section
2. Text testimonials rendered alongside screenshots
3. Gallery modal hover feedback
4. Two identical CTA banners — differentiate second
5. Team bio height on tablet
6. Orari mobile accordion
7. Course cards: progressive disclosure on mobile
8. Chi Siamo page order vs nav order

---

## PROMPT 1 — Contact section: make phone and email tappable

**Problem:** In the right-hand info panel of the Contatti section, the phone
number and email address are plain `<div>` elements. On mobile, tapping them
does nothing. The footer already uses `tel:` and `mailto:` links correctly —
the contact section should match.

**Fix:**
- Find the phone number div in the contact info panel (line ~1556):
  ```
  <div className="text-[#F5EDD8]">+39 339 356 5655</div>
  ```
  Replace with:
  ```
  <a href="tel:+393393565655" className="text-[#F5EDD8] hover:text-[#C9980A] transition-colors">+39 339 356 5655</a>
  ```

- Find the email div (line ~1563):
  ```
  <div className="text-[#F5EDD8]">ritapolidoro4@gmail.com</div>
  ```
  Replace with:
  ```
  <a href="mailto:ritapolidoro4@gmail.com" className="text-[#F5EDD8] hover:text-[#C9980A] transition-colors">ritapolidoro4@gmail.com</a>
  ```

Do not change any icons, labels, layout, or surrounding elements.

---

## PROMPT 2 — Testimonials: display text reviews alongside screenshots

**Problem:** A `testimonials` array with three written reviews (Sofia M.,
Marco R., Giulia T.) is defined in the component but never rendered.
The Testimonials section only shows two screenshot images, making it
feel sparse. The written quotes are valuable social proof that is
currently invisible.

**Fix:**
- Below the screenshot images row, add a second row of text quote cards.
- Map over the `testimonials` array and render each as a card:
  - Background: `bg-[#0A0905]`, border: `border border-[#2A2010]`, padding: `p-6`, `rounded-sm`
  - Quote text: `font-serif text-lg italic text-[#F5EDD8] mb-4` with `"` … `"` wrapping
  - Name: `font-sans text-sm font-semibold text-[#C9980A]`
  - Course label: `font-sans text-xs text-[#B8A080] uppercase tracking-wider`
- Layout: `grid grid-cols-1 md:grid-cols-3 gap-6 mt-10`
- Place this grid directly below the `flex flex-wrap justify-center gap-6`
  screenshot row, inside the same section container.

Do not change the screenshot images, the section heading, subtitle,
gold bar, or background glow.

---

## PROMPT 3 — Gallery modal: add hover feedback to grid images

**Problem:** In the full gallery modal, images are `<button>` elements
but show no hover state — no cursor change, no overlay, no scale effect.
Users cannot tell the images are clickable before tapping.

**Fix:**
- On each image `<button>` inside the gallery modal grid, add:
  - `cursor-zoom-in` to the button className
  - A hover overlay inside the button: `<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />`
  - Add `group` to the button className so the overlay responds to hover
  - Add `relative` to the button if not already present (it is)

Do not change image sizes, pagination logic, or any other modal behavior.

---

## PROMPT 4 — Differentiate the second CTA banner

**Problem:** "La prima lezione è gratuita — vieni a trovarci / Prenota Ora"
appears twice with identical headline and button. The second occurrence
(after Testimonials) adds no new information and feels like copy-paste.

**Fix:** Change only the second CTA banner (the one before the Contatti
section, after Testimonials):

- Change the headline from:
  `La prima lezione è gratuita — vieni a trovarci`
  to:
  `Oltre 200 allievi ogni anno ci scelgono — unisciti a loro`

- Change the button text from `Prenota Ora` to `Iscriviti Ora`

Keep all styling, padding, colors, and href="#contatti" unchanged.
Do not touch the first CTA banner (after Mamma & Figlia).

---

## PROMPT 5 — Team bios: cap height on tablet with scroll

**Problem:** Between 768px and 1280px (md to xl breakpoints), the team
grid shows 2 columns and bios render in full. Bios range from 80 to 150+
words, causing very uneven card heights and broken grid alignment.

**Fix:**
- On the bio paragraph, change the className from:
  `font-sans text-sm text-[#B8A080] leading-relaxed ${expandedBios[idx] ? "" : "line-clamp-2 md:line-clamp-none"}`
  to:
  `font-sans text-sm text-[#B8A080] leading-relaxed ${expandedBios[idx] ? "" : "line-clamp-2 xl:line-clamp-none"}`

- Change the toggle button from `md:hidden` to `xl:hidden` so it remains
  visible on tablets (md/lg) and only disappears at the 4-column xl layout.

This means bios are truncated and toggleable up to 1280px, and always
fully visible at xl+ (where all 4 cards are in one row and height
differences matter less).

Do not change any other card styling, photo, name, or role.

---

## PROMPT 6 — Orari: day accordion on mobile

**Problem:** Both schedule cards stack on mobile and render all 5 days
fully expanded — up to 5 classes per day × 2 schools = a very long
uninterrupted scroll. Users typically want to check a specific day.

**Fix:**

1. Add a new state variable:
   `const [openDay, setOpenDay] = useState<string | null>(null)`

2. Inside the `ScheduleCard` component, make each day heading a toggle button:
   - Default state: show only the day name heading
   - When clicked: expand to show the class list for that day
   - Only one day open at a time per card (clicking a new day closes the previous)
   - Use a `▼` / `▲` chevron indicator on the right side of each day heading

3. Apply the accordion only on mobile (below `md`):
   - On `md+`: keep all days always expanded (current behavior)
   - On mobile: default to all days collapsed; user taps to expand

4. Day heading style when collapsed:
   - Keep existing `uppercase font-sans font-semibold text-[#F5EDD8] text-sm`
   - Add `cursor-pointer` and a right-aligned chevron

5. The `openDay` state should be local to each `ScheduleCard` instance
   so expanding a day in Sala Armonia does not affect Sala Ritmo.
   Convert `openDay` to a prop-free internal state using `useState`
   inside the `ScheduleCard` component itself.

Do not change any class times, class names, card background, border, or
desktop layout.

---

## PROMPT 7 — Course cards: progressive disclosure on mobile

**Problem:** On mobile, all 12 course cards render as a single column
with no pagination — resulting in a very long scroll before the user
reaches Mamma & Figlia or the CTA banner.

**Fix:**

1. Add a new state variable:
   `const [coursesExpanded, setCoursesExpanded] = useState(false)`

2. On mobile only (below `md`), show only the first category (DANZA, 6 cards)
   by default. Hide the MUSICAL & RECITAZIONE and FITNESS categories.
   When `coursesExpanded` is true, show all 3 categories.

3. On `md+`: always show all categories (current behavior).

4. Add an expand button below the first category, visible only on mobile
   when `!coursesExpanded`:
   - Text: "Vedi tutti i corsi"
   - Style: same as "Vedi tutte le foto" —
     border: 1px solid #C9980A, color: #C9980A,
     background: transparent, px-8 py-3, rounded-sm,
     text-sm font-semibold
   - Centered with `flex justify-center mt-8`
   - On click: `setCoursesExpanded(true)`

5. No collapse button needed once expanded.

Do not change any card content, images, icons, or desktop layout.

---

## PROMPT 8 — Move Chi Siamo section earlier in page order

**Problem:** In the nav (both desktop and mobile drawer), "Chi Siamo" is
the first link. On the page, the Chi Siamo section appears after Corsi,
Mamma & Figlia, and Formazione — much further down than expected.
When a user taps "Chi Siamo" in the nav they scroll past three major
sections before arriving. Establishing the founder's credibility early
also supports conversion on the course section below.

**Fix:** Move the entire Chi Siamo `<section>` block (id="chi-siamo")
so it appears immediately after the Stats Strip and before the Corsi
section. The Team section should follow directly after Chi Siamo,
as it does now relative to Chi Siamo.

New page order:
1. Hero
2. Stats Strip
3. **Chi Siamo** ← moved up
4. **Team** ← follows Chi Siamo
5. Corsi
6. Mamma & Figlia
7. CTA Banner 1
8. Formazione
9. Orari
10. Prezzi
11. Gallery
12. Testimonials
13. CTA Banner 2
14. Contatti
15. Footer

Do not change any section content, styling, or IDs.

---

## CHECKLIST

### Critical
- [ ] Prompt 1 — Phone/email as tappable links
    - [ ] Phone number wrapped in `<a href="tel:...">`
    - [ ] Email wrapped in `<a href="mailto:...">`
    - [ ] Hover color #C9980A on both

### High Impact
- [ ] Prompt 2 — Text testimonials rendered
    - [ ] Grid of 3 quote cards added below screenshot row
    - [ ] Quote, name, course label styled correctly
    - [ ] Screenshot row and section heading unchanged

- [ ] Prompt 3 — Gallery modal hover feedback
    - [ ] `cursor-zoom-in` added to modal image buttons
    - [ ] Hover overlay added with `group-hover` transition
    - [ ] Pagination and modal behavior unchanged

### Medium
- [ ] Prompt 4 — Second CTA banner differentiated
    - [ ] Headline changed to reference 200+ allievi
    - [ ] Button text changed to "Iscriviti Ora"
    - [ ] First CTA banner unchanged

- [ ] Prompt 5 — Team bio height on tablet
    - [ ] `line-clamp` breakpoint changed from `md` to `xl`
    - [ ] Toggle button breakpoint changed from `md:hidden` to `xl:hidden`

- [ ] Prompt 6 — Orari day accordion on mobile
    - [ ] `openDay` state added inside ScheduleCard
    - [ ] Day headings are toggle buttons on mobile
    - [ ] All days collapsed by default on mobile
    - [ ] Desktop layout (all days expanded) unchanged

- [ ] Prompt 7 — Course cards progressive disclosure on mobile
    - [ ] `coursesExpanded` state added
    - [ ] Only DANZA category shown by default on mobile
    - [ ] "Vedi tutti i corsi" expand button added
    - [ ] Desktop layout (all categories visible) unchanged

### Low
- [ ] Prompt 8 — Chi Siamo moved earlier in page order
    - [ ] Chi Siamo section moved after Stats Strip
    - [ ] Team section follows Chi Siamo
    - [ ] All section IDs, content, and styling unchanged

---

## NOTES
- Send prompts one at a time
- Review in browser after each prompt before sending the next
- Use Sonnet 4.6 + Medium effort for all prompts
- Prompt 8 (page reorder) is low risk but high scroll — verify anchor
  links all still work after moving sections
- Schedule subtitle (Sala Armonia vs Sala Ritmo address) —
  still pending confirmation from Rita before changing
