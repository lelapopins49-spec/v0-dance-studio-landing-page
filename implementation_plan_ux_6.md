# Implementation Plan — UX/UI Polish Round 6

Based on the UX/UI review of `app/page.tsx`. Items are ordered by priority: functional bugs first, then visual consistency, then mobile polish, then minor refinements.

---

## Phase 1 — Functional Bugs (Fix First)

### 1.1 Fix navigation active state (never resets)

**Problem:** `visibleSections` is a `Set` that only grows. Once a section enters the viewport, it stays highlighted permanently. By the time the user reaches the bottom, all 8 nav links are gold.

**Fix:** Replace `visibleSections` with a single `activeSection` string that tracks the topmost visible section. Use two IntersectionObserver callbacks — one to add, one to remove — or track all currently intersecting sections and derive the "most visible" one.

**Approach:**
- Change state from `Set<string>` to `string | null` (`activeSection`).
- In the observer callback, maintain a `Map<string, number>` of currently-intersecting sections with their `intersectionRatio`.
- Set `activeSection` to the key with the highest ratio on each observer fire.
- Update the nav link className: `activeSection === link.href.slice(1)` instead of `visibleSections.has(...)`.
- Keep `visibleSections` only for the section entrance fade-in animations (those should still be one-way triggers).

**Files:** `app/page.tsx` — `useState`, `useEffect` (IntersectionObserver), nav link className.

---

### 1.2 Fix cookie banner / mobile sticky bar overlap

**Problem:** Both elements are `position: fixed; bottom: 0`. The cookie banner has `z-index: 8999` (renders on top), covering the "Chiamaci / Iscriviti Ora" sticky bar. The `mb-14` class has no effect on a fixed element.

**Fix:** On mobile, position the cookie banner above the sticky bar by setting `bottom: 56px` (h-14 = 3.5rem = 56px) on mobile, `bottom: 0` on md+.

**Approach:**
- Replace inline `bottom: 0` with responsive Tailwind classes: `bottom-14 md:bottom-0` on the cookie banner wrapper.
- Remove the non-functional `mb-14 md:mb-0` from the className.
- Verify the banner still stacks cleanly above the sticky bar on small viewports.

**Files:** `app/page.tsx` — cookie consent banner `<div>` (line ~1816).

---

### 1.3 Fix Sala Armonia subtitle address

**Problem:** Both `ScheduleCard` components show `subtitle="Via Moio, 16"`. The historic location (Sede Storica) is Via Moio, 8.

**Fix:** Update Sala Armonia's subtitle to `"Via Moio, 8"`.

**Files:** `app/page.tsx` — line ~1066.

```tsx
// Before
<ScheduleCard title="Sala Armonia" subtitle="Via Moio, 16" schedule={salaArmoniaSchedule} />

// After
<ScheduleCard title="Sala Armonia" subtitle="Via Moio, 8" schedule={salaArmoniaSchedule} />
```

---

## Phase 2 — Visual Consistency

### 2.1 Normalize Mamma & Figlia section heading size

**Problem:** All section headings use `text-4xl sm:text-5xl font-bold`. The Mamma & Figlia heading uses `text-3xl lg:text-4xl font-bold italic` — one size step smaller with a different responsive breakpoint.

**Fix:** Update to `text-4xl sm:text-5xl font-bold italic` to match the global heading scale, keeping the `italic` style as its distinguishing characteristic.

**Files:** `app/page.tsx` — line ~825.

---

### 2.2 Fix gallery preview orphaned image

**Problem:** 4 images in a `grid-cols-2 sm:grid-cols-3` grid. On sm+ screens: 3 in row 1, 1 alone in row 2 — looks unfinished.

**Fix (Option A — Preferred):** Change the preview to show 6 images (add 2 more from `allGalleryPhotos`). Six fills a `sm:grid-cols-3` grid cleanly (2 full rows).

**Fix (Option B):** Change the grid to `grid-cols-2` only, showing all 4 images in 2 symmetric rows without the 3-column option.

**Files:** `app/page.tsx` — gallery preview section (~line 1178). If Option A: add 2 more image objects to the preview array.

---

### 2.3 Fix stats strip format inconsistency

**Problem:** `30+`, `200+`, `2` are bare numbers; `3 anni` includes a word. Breaks the visual rhythm of the number/label pattern.

**Fix:** Move "anni" to the label row.

```tsx
// Before
{ number: "3 anni", label: "ETÀ MINIMA" }

// After
{ number: "3", label: "ETÀ MINIMA (ANNI)" }
```

**Files:** `app/page.tsx` — stats array (~line 602).

---

### 2.4 Reduce testimonials section visual overhead

**Problem:** Large decorative glow, h2, gold underline, intro paragraph — all for 2 small screenshot images at `max-w-md` width.

**Fix:** Simplify the section header. Remove the decorative glow blobs or make them subtler. Increase the image display size (use `width={280} height={380}` or make them fill their grid column). Remove the `h-1 w-24 bg-[#C9980A]` underline div — no other section uses this element.

**Files:** `app/page.tsx` — testimonials section (~line 1374).

---

### 2.5 Fix CTA Banner 2 — scrolls users backward

**Problem:** The "Conosci il Team" button links to `#team`, which is above this banner in the page. Clicking it scrolls users back up.

**Fix:** Change the CTA to point forward — either to `#contatti` with label "Iscriviti Ora", or remove this redundant banner entirely (there are already two other CTA banners on the page).

**Files:** `app/page.tsx` — CTA Banner 2 (~line 1417).

---

## Phase 3 — Mobile Polish

### 3.1 Reduce mobile nav height

**Problem:** Nav is `h-24` (96px) on mobile with an `h-20` (80px) logo. Consumes significant viewport real estate.

**Fix:** Reduce to `h-16 sm:h-20 lg:h-24` and logo to `h-12 sm:h-16 lg:h-20`. Adjust `pt-32` in the mobile drawer to `pt-20` to compensate.

**Files:** `app/page.tsx` — nav `div` (~line 433), logo `img` (~line 440), drawer `div` (~line 488).

---

### 3.2 Limit stacked videos on mobile when expanded

**Problem:** When `reelsExpanded = true`, 3 `aspect-[9/16]` portrait videos stack vertically on mobile — an extremely long scroll.

**Fix:** On mobile, show a maximum of 2 videos when expanded. Use a horizontal scroll container on mobile instead of a vertical stack.

**Approach:**
- Wrap the video grid in a responsive layout: on mobile, use `flex overflow-x-auto snap-x snap-mandatory gap-4` with each video as `snap-start flex-shrink-0 w-[80vw]`; on md+ use the existing `grid md:grid-cols-3`.
- Or: keep the grid layout but cap mobile at 2 videos (`filter(({index}) => reelsExpanded ? index < 2 : index === 0)` for mobile, all 3 for md+). This requires a `isMobile` state or a CSS-only approach.

**Files:** `app/page.tsx` — video section (~line 1223).

---

### 3.3 Remove always-visible WhatsApp label on mobile

**Problem:** The "WhatsApp" label is a static `<span>` always visible on mobile, adding visual clutter near the bottom-right.

**Fix:** Remove the mobile static label. The button is recognizable by the WhatsApp icon alone. If a label is desired, apply the same hover/focus pattern used on desktop.

**Files:** `app/page.tsx` — WhatsApp button (~line 1782).

```tsx
// Remove this block entirely:
<span className="md:hidden text-xs px-3 py-1 rounded-sm whitespace-nowrap" ...>
  WhatsApp
</span>
```

---

### 3.4 Add swipe-to-close affordance to mobile drawer

**Problem:** The drawer can only be closed via the X button or backdrop tap. No swipe gesture support.

**Fix (Simple):** Add a visible drag handle at the top of the drawer — a short horizontal pill `<div className="w-10 h-1 bg-[#2A2010] rounded-full mx-auto mb-6" />` — and a `touchstart`/`touchend` handler that closes the drawer on a rightward swipe (delta > 60px).

**Fix (Minimal):** At minimum, add the visual drag handle and a note at the top of the drawer ("Tocca fuori per chiudere") if the swipe gesture is too complex to implement cleanly.

**Files:** `app/page.tsx` — mobile drawer content div (~line 488).

---

## Phase 4 — Minor Refinements

### 4.1 Remove emoji from cookie banner

**Problem:** `🍪` emoji is the only emoji on the page; inconsistent with the premium brand tone.

**Fix:** Remove the emoji. The sentence reads clearly without it.

**Files:** `app/page.tsx` — line ~1831.

---

### 4.2 Increase hero scroll indicator contrast

**Problem:** `border-foreground/30` and `bg-foreground/50` are very low contrast against the dark hero background.

**Fix:** Bump to `border-foreground/50` and `bg-foreground/70`.

**Files:** `app/page.tsx` — scroll indicator (~line 592).

---

### 4.3 Replace text arrows with Lucide icons in bio toggles

**Problem:** `"Chiudi ↑"` / `"Leggi di più ↓"` use plain text arrow characters. Inconsistent with the Lucide icon system used everywhere else.

**Fix:** Use `<ChevronUp>` and `<ChevronDown>` from Lucide (already imported). Update both the founder bio toggle and the team card bio toggles.

**Files:** `app/page.tsx` — founder bio button (~line 677), team bio buttons (~line 1038).

---

### 4.4 Add `appearance-none` to course select + custom chevron

**Problem:** The `<select>` for "Corso di Interesse" partially ignores custom borders/backgrounds on iOS Safari and some Android browsers, breaking visual consistency with the text inputs.

**Fix:**
- Add `appearance-none` to the select className.
- Wrap the select in a `relative` div and add a `<ChevronDown>` icon absolutely positioned at the right edge.

```tsx
<div className="relative">
  <select
    ...
    className="w-full bg-card rounded-sm px-4 py-3 text-foreground focus:outline-none appearance-none transition-colors pr-10"
    ...
  />
  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8A080] pointer-events-none" />
</div>
```

**Files:** `app/page.tsx` — course select (~line 1550).

---

### 4.5 Add focus rings to text inputs and phone input

**Problem:** Text inputs and phone input have `focus:outline-none` with no replacement focus indicator. The textarea correctly has `focus:border-[#C9980A]` but the other inputs do not.

**Fix:** Add `focus:border-[#C9980A]` to the `nome`, `email`, and `telefono` inputs. This brings them in line with the textarea and removes the accessibility gap.

**Files:** `app/page.tsx` — form inputs (~lines 1510, 1520, 1537).

---

## Summary Table

| # | Issue | Priority | Effort |
|---|-------|----------|--------|
| 1.1 | Nav active state never resets | Critical | Medium |
| 1.2 | Cookie banner overlaps sticky bar | Critical | Low |
| 1.3 | Sala Armonia wrong address | Critical | Trivial |
| 2.1 | Mamma & Figlia heading size | Consistency | Trivial |
| 2.2 | Gallery preview orphaned image | Consistency | Low |
| 2.3 | Stats "3 anni" format | Consistency | Trivial |
| 2.4 | Testimonials section overhead | Consistency | Low |
| 2.5 | CTA Banner 2 scrolls backward | Consistency | Trivial |
| 3.1 | Mobile nav too tall | Mobile | Low |
| 3.2 | 3 videos stacked on mobile | Mobile | Medium |
| 3.3 | WhatsApp label always visible | Mobile | Trivial |
| 3.4 | Drawer swipe affordance | Mobile | Medium |
| 4.1 | Cookie emoji | Polish | Trivial |
| 4.2 | Hero scroll indicator contrast | Polish | Trivial |
| 4.3 | Text arrows → Lucide icons | Polish | Low |
| 4.4 | Select `appearance-none` | Polish | Low |
| 4.5 | Input focus rings | Polish | Trivial |
