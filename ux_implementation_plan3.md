# UX Implementation Plan 3

This plan addresses the UX Review Round 4 issues, focusing on conversion gaps, mobile optimization, and content visibility.

## User Review Required

> [!IMPORTANT]
> **Issue 3 (Orari Mobile):** I propose using a tabbed interface for days (Lunedì, Martedì, etc.) on mobile to reduce the vertical scroll length significantly.
> **Issue 4 (Corsi Mobile):** I will implement a "Show More" pattern for courses on mobile, initially showing the first 6 courses across all categories.
> **Issue 8 (Chi Siamo Position):** Moving the "Chi Siamo" section will change the page flow. It will now appear immediately after the Stats Strip.

## Proposed Changes

### [Critical] Contact & Social

#### [MODIFY] [page.tsx](file:///c:/Users/wave/OneDrive/Документы/website lessons/repos/dance_school/v0-dance-studio-landing-page/app/page.tsx)
- Wrap phone number and email in the `Contatti` info panel with `<a>` tags (`tel:` and `mailto:`).



### [High Impact] Mobile Optimization

#### [MODIFY] [page.tsx](file:///c:/Users/wave/OneDrive/Документы/website lessons/repos/dance_school/v0-dance-studio-landing-page/app/page.tsx)
- **Orari Section:** Update `ScheduleCard` or its container to use a horizontal tab system for days on mobile devices (hidden on desktop).
- **Corsi Section:** Add a state variable `coursesExpanded` and logic to limit the number of visible course cards to 6 on mobile, with a "Vedi tutti i corsi" button.

### [Medium] UI/UX Refinement

#### [MODIFY] [page.tsx](file:///c:/Users/wave/OneDrive/Документы/website lessons/repos/dance_school/v0-dance-studio-landing-page/app/page.tsx)
- **CTA Banners:** Update the text of the second CTA banner (after Testimonials) to focus on the team, Opes certification, or the free trial experience to avoid repetition.
- **Gallery Modal:** Add hover effects (`scale-105`, `overlay`, `cursor-zoom-in`) to images within the full gallery modal.
- **Team Bios:** Apply a `min-height` or use a flex-grow strategy to ensure uniform card heights in the 2-column tablet layout (768px–1280px).

### [Low] Layout Consistency

#### [MODIFY] [page.tsx](file:///c:/Users/wave/OneDrive/Документы/website lessons/repos/dance_school/v0-dance-studio-landing-page/app/page.tsx)
- **Section Reordering:** Move the `Chi Siamo` section block (and its ref) to follow the `Stats Strip` and precede the `Corsi` section.
- **Gallery Preview:** Ensure the 3-column grid on narrow phones maintains legibility, or slightly adjust padding/gap if needed.

## Verification Plan

### Automated Tests
- N/A (Manual visual verification required)

### Manual Verification
- **Mobile View (Chrome DevTools):**
    - Verify phone/email links work.
    - Check "Orari" tab functionality.
    - Check "Corsi" show more/less functionality.
    - Check section order (Chi Siamo).
- **Desktop View:**
    - Verify Testimonials display.
    - Check Gallery Modal hover states.
    - Verify Team card alignment on tablet breakpoints.
