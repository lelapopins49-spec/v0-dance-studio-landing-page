# UX Implementation Plan 5
## L'Ateneo Danza Musical e Fitness
---

## PROMPT 1 — Fix Z-index collision (Critical Bug)
**Issue:** WhatsApp button (z:10000) and cookie banner (z:9999) 
render ABOVE the gallery modal (z:100) and photo modal (z:120).

```
Fix the z-index hierarchy for the following elements.
Do not change any styling, positioning, or functionality.

1. GALLERY MODAL — increase z-index:
   Find the gallery modal overlay div.
   Change its z-index to z-[10500] or style={{ zIndex: 10500 }}

2. PHOTO ENLARGE MODAL — increase z-index:
   Find the individual photo modal/lightbox overlay.
   Change its z-index to z-[10500] or style={{ zIndex: 10500 }}

3. WHATSAPP BUTTON — lower z-index:
   Find the WhatsApp floating button.
   Change zIndex from 10000 to 9000.

4. COOKIE BANNER — lower z-index:
   Find the cookie banner fixed div.
   Change zIndex from 9999 to 8999.

Final z-index hierarchy should be:
- Cookie banner: 8999
- WhatsApp button: 9000
- Sticky mobile bar: 9500
- Gallery modal: 10500
- Photo modal: 10500

Do not change anything else.
```

---

## PROMPT 2 — Display written testimonials
**Issue:** 3 written testimonials (Sofia M., Marco R., Giulia T.) 
exist in code but are never rendered on the page.

```
In the testimonials section, update the layout 
to show both the WhatsApp screenshot images 
AND the written testimonial quotes.

1. CURRENT LAYOUT:
   Two WhatsApp screenshot images side by side.
   Keep these exactly as they are.

2. ADD BELOW THE SCREENSHOTS:
   A second row showing the 3 written testimonials
   as styled quote cards.
   
   3-column grid on desktop (grid-cols-3),
   1 column on mobile (grid-cols-1), gap-6, mt-8.

   Each card style:
   - Background: #0A0905
   - Border: 1px solid #2A2010
   - Padding: p-6
   - Border-radius: rounded-sm

   Card content:
   - Large opening quote mark: "
     font-serif, text-4xl, color #C9980A,
     line-height 1, mb-2
   - Quote text: font-sans, text-sm, 
     color #B8A080, line-height relaxed, 
     italic, mb-4
   - Divider: border-top 1px solid #2A2010, 
     pt-4
   - Name: font-sans, text-sm, 
     color #F5EDD8, font-weight 600
   - Course: font-sans, text-xs, 
     color #C9980A, mt-1

   Use the existing testimonials array 
   from the code (Sofia M., Marco R., 
   Giulia T.) — render all 3 cards.

3. ADD A SMALL LABEL above the written cards:
   "Cosa dicono i nostri allievi"
   font-sans, text-xs, uppercase, 
   tracking-wider, color #B8A080, 
   text-center, mt-10, mb-4.

Do not change anything else.
```

---

## PROMPT 3 — Fix privacy policy link
**Issue:** Cookie banner "Scopri di più" links to /privacy-policy 
which may return a 404.

```
Check if the file app/privacy-policy/page.tsx exists.

If it EXISTS: no changes needed, skip this prompt.

If it does NOT exist: 
Create app/privacy-policy/page.tsx with this content:

import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <main style={{ 
      background: '#0F0E0A', 
      minHeight: '100vh',
      padding: '96px 24px'
    }}>
      <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        <Link 
          href="/"
          style={{ 
            color: '#C9980A', 
            fontSize: '14px',
            display: 'block',
            marginBottom: '32px'
          }}
        >
          ← Torna al sito
        </Link>
        <h1 style={{ 
          fontFamily: 'var(--font-serif)',
          fontSize: '36px',
          color: '#F5EDD8',
          marginBottom: '8px'
        }}>
          Privacy Policy
        </h1>
        <p style={{ 
          color: '#B8A080', 
          fontSize: '14px',
          marginBottom: '48px'
        }}>
          Ultimo aggiornamento: Aprile 2026
        </p>

        {[
          {
            title: 'Titolare del Trattamento',
            content: "L'Ateneo Danza Musical e Fitness\nDirezione Artistica: Rita Polidoro\nVia Moio, 8 e Via Moio, 16\n84043 Agropoli (SA), Italia\nEmail: ritapolidoro4@gmail.com\nTelefono: +39 339 356 5655"
          },
          {
            title: 'Dati Raccolti',
            content: "Il presente sito web raccoglie i seguenti dati personali forniti volontariamente dall'utente tramite il modulo di contatto: nome e cognome, indirizzo email, numero di telefono, corso di interesse e messaggio. Questi dati vengono utilizzati esclusivamente per rispondere alle richieste di informazioni e non vengono ceduti a terzi."
          },
          {
            title: 'Cookie',
            content: "Questo sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento delle pagine. Non vengono utilizzati cookie di profilazione, cookie di tracciamento o cookie pubblicitari. I cookie tecnici non richiedono il consenso dell'utente ai sensi della normativa vigente."
          },
          {
            title: 'Base Giuridica del Trattamento',
            content: "Il trattamento dei dati personali è basato sul consenso dell'utente (Art. 6, lett. a, GDPR) espresso al momento dell'invio del modulo di contatto."
          },
          {
            title: 'Conservazione dei Dati',
            content: "I dati personali forniti tramite il modulo di contatto vengono conservati per il tempo strettamente necessario a gestire la richiesta e comunque non oltre 12 mesi."
          },
          {
            title: "Diritti dell'Utente",
            content: "In conformità al GDPR, l'utente ha diritto a: accedere ai propri dati personali, richiedere la rettifica o la cancellazione dei dati, opporsi al trattamento, richiedere la portabilità dei dati. Per esercitare questi diritti contattare: ritapolidoro4@gmail.com"
          },
          {
            title: 'Servizi di Terze Parti',
            content: "Il sito utilizza Formspree (formspree.io) per la gestione del modulo di contatto. I dati inviati tramite il modulo sono soggetti anche alla Privacy Policy di Formspree."
          },
          {
            title: 'Modifiche alla Privacy Policy',
            content: "Il Titolare si riserva il diritto di modificare la presente Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con aggiornamento della data."
          }
        ].map((section, i) => (
          <div key={i} style={{ 
            borderTop: '1px solid #2A2010',
            paddingTop: '24px',
            marginBottom: '32px'
          }}>
            <h2 style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: '20px',
              color: '#C9980A',
              marginBottom: '12px'
            }}>
              {section.title}
            </h2>
            <p style={{ 
              color: '#B8A080',
              fontSize: '14px',
              lineHeight: '1.7',
              whiteSpace: 'pre-line'
            }}>
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

Do not change anything else.
```

---

## PROMPT 4 — Gallery preview 2-col on mobile
**Issue:** 3-column gallery grid on mobile (375px) 
makes thumbnails too small (~109px each).

```
In the main gallery section (not the modal),
find the preview photo grid that shows 
the 9 main gallery photos.

Change the grid from:
grid-cols-3

To:
grid-cols-2 sm:grid-cols-3

This gives larger thumbnails on mobile 
while keeping 3 columns on tablet and desktop.

Do not change the modal grid or anything else.
```

---

## PROMPT 5 — Reels collapse button
**Issue:** After expanding reels section, 
there is no way to collapse it back.

```
In the reels/video section, find the 
"Vedi altri video" expand button.

After the expanded video content div,
add a collapse button that appears 
only when the videos are expanded:

Button text: "Chiudi video ↑"
Style: same as the expand button 
but with an up arrow.
On click: collapses the video section 
back to hidden state.
Position: centered, below the 3 videos,
mt-6.

Do not change anything else.
```

---

## CHECKLIST
- [ ] Prompt 1 — Z-index collision fixed
  - [ ] Gallery modal z-index raised to 10500
  - [ ] Photo modal z-index raised to 10500
  - [ ] WhatsApp button z-index lowered to 9000
  - [ ] Cookie banner z-index lowered to 8999

- [ ] Prompt 2 — Written testimonials displayed
  - [ ] 3 quote cards shown below screenshots
  - [ ] Label "Cosa dicono i nostri allievi" added
  - [ ] Cards styled correctly

- [ ] Prompt 3 — Privacy policy page
  - [ ] Page exists at /privacy-policy
  - [ ] Cookie banner link works correctly

- [ ] Prompt 4 — Gallery 2-col on mobile
  - [ ] grid-cols-2 on mobile
  - [ ] grid-cols-3 on sm+ screens

- [ ] Prompt 5 — Reels collapse button
  - [ ] "Chiudi video ↑" button appears when expanded
  - [ ] Clicking collapses the videos

---

## NOTES
- Send prompts one at a time
- Prompt 1 is critical — do this first
- Use Sonnet 4.6 + Medium effort
- Review after each prompt before proceeding
- Written testimonials in Prompt 2 are 
  placeholder names (Sofia M. etc) — 
  replace with real ones when Rita provides them
