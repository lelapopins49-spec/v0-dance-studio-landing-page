# UX Implementation Plan — Round 3
L'Ateneo Danza Musical e Fitness
Generated: 2026-04-24

---

## Priority Order

1. Gallery preview: 9 → 3 images
2. Testimonials: smaller images
3. Reels: 3 → 1 visible + expand
4. Gallery preview: click opens at specific image
5. Section separator between gallery sub-sections

---

## PROMPT 1 — Gallery preview: reduce from 9 to 3 images

**Problem:** The preview grid shows 9 images in a 3×3 layout, which is
visually heavy and takes up significant vertical space before the
"Vedi tutte le foto" button. The other 6 images already exist in the
full modal, so nothing is lost by removing them from the preview.

**Fix:**
- Keep only the first 3 images in the preview array:
  1. "/air_dance_student.jpg"
  2. "/collage_children_group.jpg"
  3. "/group_male_female_stuends_stage.jpg"
- Remove the other 6 from the preview array (they stay in allGalleryPhotos).
- Change the grid from `grid-cols-2 md:grid-cols-3` to `grid-cols-3`
  so all 3 images sit in one row on all screen sizes.
- Keep `aspect-square` and all existing hover effects unchanged.
- Keep the "Vedi tutte le foto" button unchanged.
- Add the 6 removed preview images to the top of allGalleryPhotos
  so they are accessible in the modal:
  "/group_outside_.jpg", "/inside_school_children_lesson.jpg",
  "/male_female_duo.jpg", "/outside_event_students.jpg",
  "/solo_female_air_dance.jpg", "/student_green_dress.jpg"

Do not change any other styling, layout, or content.

---

## PROMPT 2 — Testimonials: shrink image size

**Problem:** On mobile the testimonial screenshots render at full column
width (~375px), which is very large for a screenshot of a text review.
On desktop the `max-w-xl` container constrains them but they still feel
oversized relative to the surrounding content.

**Fix:**
- Change the container from:
  `grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto`
  to:
  `flex flex-wrap justify-center gap-6`
- Change each image from `width={280} height={390}` to `width={200} height={280}`
- Add `max-w-[200px]` to each button wrapper so images never exceed 200px wide
- Remove `w-full` from the Image className (width is now controlled by the wrapper)
- Keep `cursor-zoom-in`, `onClick={() => setEnlargedPhoto(src)}`,
  and all hover/opacity effects unchanged
- The enlarged modal already works correctly — no changes needed there

Do not change the section heading, subtitle, gold bar, or background glow.
Do not change anything else.

---

## PROMPT 3 — Reels: show 1, hide 2 behind expand button

**Problem:** 3 full-height 9:16 videos render side by side on desktop and
stack vertically on mobile. On mobile this means roughly 3 screen-heights
of video content before the user reaches Testimonials. Most users will
not watch all 3 unprompted — showing 1 with an option to expand is
more scroll-friendly.

**Fix:**

1. Add a new state variable:
   `const [reelsExpanded, setReelsExpanded] = useState(false)`

2. Change the video grid from `grid-cols-1 md:grid-cols-3` to:
   - When collapsed: `grid-cols-1 max-w-sm mx-auto` (single centered reel)
   - When expanded: `grid-cols-1 md:grid-cols-3` (full three-column layout)
   Use a conditional className based on `reelsExpanded`.

3. Filter the videos array:
   - When `reelsExpanded` is false: render only the first video (index 0)
   - When `reelsExpanded` is true: render all three videos

4. Add an expand button below the video grid:
   - Only visible when `!reelsExpanded`
   - Text: "Vedi altri video"
   - Style: same as the "Vedi tutte le foto" button —
     border: 1px solid #C9980A, color: #C9980A,
     background: transparent, px-8 py-3, rounded-sm,
     text-sm font-semibold
   - Centered with `flex justify-center mt-6`
   - On click: `setReelsExpanded(true)`

5. When expanded, no collapse button is needed —
   once open, the videos stay visible.

Do not change any video element attributes, play/pause logic,
overlay button, or other styling.

---

## PROMPT 4 — Gallery preview: click opens at specific image

**Problem:** Clicking a preview image opens the gallery modal, but always
starts from image 1 regardless of which preview was clicked. Users expect
to land on the image they tapped.

**Fix:**

1. Add a new state variable:
   `const [initialPhoto, setInitialPhoto] = useState<string | null>(null)`

2. Make each preview image clickable and track which image was clicked:
   - Wrap each preview `<div>` in a `<button>` (or add onClick to the div)
   - On click: set `initialPhoto` to that image's src, then open the gallery

3. Inside the gallery modal, when `initialPhoto` is set:
   - Scroll or jump to show that image first
   - The simplest approach: show `initialPhoto` as an enlarged photo
     immediately (using the existing `enlargedPhoto` modal) rather than
     opening the full grid modal
   - So: onClick on a preview image → `setEnlargedPhoto(src)` directly,
     bypassing the grid modal entirely

   This is simpler than building scroll-to logic inside the modal grid.
   The user sees the full image immediately and can close to return
   to the page.

4. Keep the "Vedi tutte le foto" button behavior unchanged —
   it still opens the full grid modal.

5. Add a `cursor-zoom-in` cursor and a subtle hover overlay with a
   zoom icon (or just the existing scale effect) to signal the images
   are clickable.

Do not change the gallery modal grid, pagination, or any other behavior.

---

## PROMPT 5 — Section separator between gallery sub-sections

**Problem:** "I Nostri Momenti" (photo gallery) and "I Nostri Video"
(reels) live in the same `#gallery` section with only `mt-20` between
them. On desktop this reads as one continuous block with no visual
break, making it unclear that the two are distinct content types.

**Fix:**
- Add a `<div>` separator between the photo grid block and the
  `{/* Instagram Reels Subsection */}` div.
- Style: `border-t border-[#2A2010] mt-20 mb-0`
- Remove the existing `mt-20` from the reels subsection div
  since the separator now provides that spacing.

This gives a clear visual boundary between photos and videos
without changing any colors, fonts, or layout.

Do not change anything else.

---

## CHECKLIST

### Priority 1 — Gallery preview
- [x] Prompt 1 — Gallery: 9 → 3 preview images
    - [x] Preview array reduced to first 3 images
    - [x] Grid changed to grid-cols-3 (all breakpoints)
    - [x] 6 removed images added to top of allGalleryPhotos
    - [x] "Vedi tutte le foto" button unchanged

### Priority 2 — Testimonials
- [x] Prompt 2 — Testimonials: smaller images
    - [x] Container changed to flex flex-wrap justify-center
    - [x] Image size reduced to 200×280
    - [x] max-w-[200px] added to button wrappers
    - [x] Click-to-enlarge behavior unchanged

### Priority 3 — Reels
- [x] Prompt 3 — Reels: 1 visible + expand
    - [x] reelsExpanded state added
    - [x] Only first reel shown when collapsed
    - [x] Grid collapses to single centered column
    - [x] "Vedi altri video" button added
    - [x] All 3 reels visible when expanded

### Priority 4 — Gallery click-to-image
- [x] Prompt 4 — Gallery preview: click opens specific image
    - [x] Preview images are clickable
    - [x] Click opens enlargedPhoto modal directly
    - [x] cursor-zoom-in added to preview images
    - [x] "Vedi tutte le foto" button behavior unchanged

### Priority 5 — Section separator
- [x] Prompt 5 — Gallery/Reels visual separator
    - [x] border-t separator added between sections
    - [x] mt-20 adjusted to avoid double spacing

---

## NOTES
- Send prompts one at a time
- Review in browser after each prompt before sending the next
- Use Sonnet 4.6 + Medium effort for all prompts
- Prompt 4 uses the existing enlargedPhoto modal (simplest approach)
  rather than building scroll-to-index logic inside the gallery grid
- Prompt 5 is a single-line change — can be bundled with Prompt 4
  if desired
- Schedule subtitle (Sala Armonia vs Sala Ritmo address) —
  still pending confirmation from Rita before changing
