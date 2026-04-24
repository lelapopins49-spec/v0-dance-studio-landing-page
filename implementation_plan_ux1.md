# UX Implementation Plan — Round 2
L'Ateneo Danza Musical e Fitness
Generated: 2026-04-24

---

## Priority Order

Items are ordered: quickest wins first, then highest real-world impact,
then medium, then low. Send one prompt at a time and review before the next.

---

## PROMPT 1 — Footer heading consistency (quick fix)

**Problem:** Column 3 (Contatti) heading uses `text-xs text-[#C9980A] mb-4`
while Columns 1, 2 and 4 use `text-sm text-[#F5EDD8] mb-6`.
The gold color and smaller size make it look like a different design system.

**Fix:** Update Column 3 heading to match the other three columns.

Change from:
```
font-sans text-xs font-semibold uppercase tracking-wider text-[#C9980A] mb-4
```
Change to:
```
font-semibold text-[#F5EDD8] mb-6 text-sm uppercase tracking-wider
```

Do not change anything else in the footer.

---

## PROMPT 2 — Gallery modal: Escape key to close (quick fix)

**Problem:** Pressing Escape does not close the gallery modal or the
enlarged photo modal. Users universally expect Escape to dismiss modals.

**Fix:** Add a `useEffect` that listens for `keydown` events.
When `key === "Escape"`:
- If `enlargedPhoto` is set, call `setEnlargedPhoto(null)`
- Else if `galleryOpen` is true, call `setGalleryOpen(false)`

The listener should only be active when either modal is open.
Clean up the event listener on unmount or when modals close.

Do not change any styling or layout.

---

## PROMPT 3 — Contact form: handle network errors (high impact)

**Problem:** The form always calls `setFormSubmitted(true)` after the fetch,
even if the request failed (network down, Formspree outage, offline user).
Users see a success message but their data was never sent.

**Fix:** Wrap the fetch in a try/catch and check the response status.

Logic:
- If fetch succeeds and response is ok → `setFormSubmitted(true)` (current success state)
- If fetch fails or response is not ok → show an error message instead

Add a new state: `const [formNetworkError, setFormNetworkError] = useState(false)`

On error: set `formNetworkError` to true and display a short error message
below the submit button in red (or amber to match the palette):
"Si è verificato un errore. Riprova o scrivici direttamente."

On retry (form resubmit): reset `formNetworkError` to false before the fetch.

Do not change any other form behavior or styling.

---

## PROMPT 4 — Active nav indicator on desktop (high impact)

**Problem:** As users scroll, all 8 desktop nav links look identical.
There is no visual feedback showing which section is currently in view.

**Fix:** Use the existing `visibleSections` Set (already populated by the
IntersectionObserver) to highlight the matching nav link.

For each link in `navLinks`, check if `visibleSections.has(link.href.replace('#', ''))`.
If true, apply gold color (`text-[#C9980A]`) instead of the default cream.

Use a CSS transition so the color change is smooth (already handled by
the existing `transition-colors` class on nav links).

Do not add underlines, borders, or any other decoration.
Do not change mobile drawer links.
Do not change any other nav styles.

---

## PROMPT 5 — Stats strip: fix "3+ / ETÀ MINIMA" (content + UX)

**Problem:** The large bold "3+" reads like a quantity stat alongside
"30+" and "200+". Only the small label clarifies it means minimum age.
Users scanning fast will misread it as a count.

**Fix:** Change the number and label to make the meaning immediately clear
at a glance without reading the label.

Replace:
- number: `"3+"` → `"3 anni"`
- label: `"ETÀ MINIMA"` → `"ETÀ MINIMA"`  ← label stays the same

This way "3 anni" reads as an age unit, not a quantity.

Do not change any other stat or styling.

---

## PROMPT 6 — Video section: remove duplicate controls (medium)

**Problem:** Each video element has both the browser's native `controls`
bar AND a custom gold play button overlay. In the stopped state both are
visible simultaneously — redundant and visually noisy.

**Fix:** Remove the `controls` attribute from all 3 video elements.
Rely entirely on the existing custom play button overlay.

The custom overlay already:
- Shows when the video is paused (`!playingVideos.has(index)`)
- Hides when playing
- Calls `ref.current?.play()` on click

For pause: users can click the video itself to pause (add an `onClick`
on the video element that calls `ref.current?.pause()`).

Do not change any styling, sizing, or the play button appearance.

---

## PROMPT 7 — Cookie banner: reduce mobile footprint (medium)

**Problem:** On mobile, the cookie banner stacks vertically (text + two
full-width buttons) and can cover most of the lower half of the screen,
conflicting with the sticky bottom bar and WhatsApp button.

**Fix:** On mobile, make the banner more compact:
- Reduce vertical padding from `py-4` to `py-3`
- Keep the text as-is but limit it to 2 lines with `line-clamp-2` on mobile
  (full text on md+)
- Stack the two buttons side by side on mobile using `flex-row` with `gap-2`
  instead of `flex-col`
- Add `mb-14` bottom margin so the banner sits above the sticky bottom bar
  rather than overlapping it

Do not change the desktop layout (md+).

---

## PROMPT 8 — Mamma e Figlia: add CTA links (medium)

**Problem:** Both columns describe the program compellingly but have no
direct action. Users who are convinced must scroll past the section to
find a way to act.

**Fix:** Add a small anchor link at the bottom of each column:

Per le Bambine column → add below the `<p>` description:
```
href="#contatti"
text: "Iscriviti →"
style: text-sm font-semibold text-[#C9980A] hover:text-[#C9980A]/80
       transition-colors mt-2 inline-block
```

Per le Mamme column → same link and style.

Do not change any headings, descriptions, icons, or layout.

---

## PROMPT 9 — WhatsApp button: mobile label (low)

**Problem:** The "Scrivici su WhatsApp" tooltip only shows on hover
(desktop). Mobile users never see the label — they only see the green
circle with the WhatsApp logo.

**Fix:** On mobile, show the label as a small static badge next to the
button rather than a hover tooltip.

Add a `<span>` with `md:hidden` that renders
"WhatsApp" in `text-xs text-[#F5EDD8]` with a small dark pill background,
positioned to the left of the button and always visible on mobile.

On desktop (md+), keep the existing hover tooltip behavior unchanged.

Do not change the button size, color, or position.

---

## PROMPT 10 — Desktop nav: verify 1024px overflow (low)

**Problem:** With 8 links at `gap-8` plus logo and CTA button, the navbar
may be cramped or overflow at exactly 1024px (the `lg` breakpoint).

**Fix:** Add `gap-6` instead of `gap-8` between nav links at the lg
breakpoint specifically, and reduce the CTA `px-7` to `px-5` if needed.

Test at exactly 1024px before and after.
Only make changes if overflow or wrapping is confirmed.

Do not change anything at xl+ breakpoints.

---

## CHECKLIST

### Quick Fixes
- [x] Prompt 1 — Footer heading consistency
    - [x] Column 3 heading color changed to #F5EDD8
    - [x] Column 3 heading size changed to text-sm
    - [x] Column 3 margin-bottom changed to mb-6

- [x] Prompt 2 — Gallery Escape key
    - [x] useEffect listener added
    - [x] Escape closes enlarged photo first, then gallery
    - [x] Listener cleaned up on unmount

### High Impact
- [x] Prompt 3 — Contact form network error handling
    - [x] formNetworkError state added
    - [x] fetch wrapped in try/catch
    - [x] Error message shown in UI on failure
    - [x] Error resets on retry

- [x] Prompt 4 — Active nav indicator
    - [x] visibleSections used to highlight matching link
    - [x] Gold color applied to active link
    - [x] Smooth transition on color change
    - [x] Desktop only — mobile drawer unchanged

### Medium
- [x] Prompt 5 — Stats strip "3 anni" fix
    - [x] Number changed from "3+" to "3 anni"

- [x] Prompt 6 — Video: remove native controls
    - [x] controls attribute removed from all 3 videos
    - [x] onClick pause handler added to video elements

- [x] Prompt 7 — Cookie banner mobile footprint
    - [x] Padding reduced on mobile
    - [x] Buttons side by side on mobile
    - [x] mb-14 clears sticky bottom bar

- [x] Prompt 8 — Mamma e Figlia CTA links
    - [x] "Iscriviti →" link added to Per le Bambine column
    - [x] "Iscriviti →" link added to Per le Mamme column

### Low
- [x] Prompt 9 — WhatsApp mobile label
    - [x] Static badge shown on mobile (md:hidden)
    - [x] Desktop hover tooltip unchanged

- [x] Prompt 10 — Desktop nav 1024px check
    - [x] Tested at 1024px (calculated overflow confirmed ~1,034px)
    - [x] Gap reduced gap-8 → gap-6 on links and gap-10 → gap-6 to CTA
    - [x] CTA padding reduced px-7 → px-5

---

## NOTES
- Send prompts one at a time
- Review in browser after each prompt before sending next
- Use Sonnet 4.6 + Medium effort for all prompts
- Prompt 10 may require no code change at all — verify first
