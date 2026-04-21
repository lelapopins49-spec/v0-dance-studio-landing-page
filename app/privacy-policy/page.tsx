"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Instagram, Facebook, Music, Menu, X, Phone } from "lucide-react"

const navLinks = [
  { href: "/#chi-siamo", label: "Chi Siamo" },
  { href: "/#team", label: "Team" },
  { href: "/#corsi", label: "Corsi" },
  { href: "/#formazione", label: "Formazione" },
  { href: "/#orari", label: "Orari" },
  { href: "/#prezzi", label: "Prezzi" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contatti", label: "Contatti" },
]

const sections = [
  {
    title: "Titolare del Trattamento",
    content: `L'Ateneo Danza Musical e Fitness\nDirezione Artistica: Rita Polidoro\nVia Moio, 8 e Via Moio, 16\n84043 Agropoli (SA), Italia\nEmail: ritapolidoro4@gmail.com\nTelefono: +39 339 356 5655`,
  },
  {
    title: "Dati Raccolti",
    content: `Il presente sito web raccoglie i seguenti dati personali forniti volontariamente dall'utente tramite il modulo di contatto:\n\n- Nome e cognome\n- Indirizzo email\n- Numero di telefono\n- Corso di interesse\n- Messaggio\n\nQuesti dati vengono utilizzati esclusivamente per rispondere alle richieste di informazioni e non vengono ceduti a terzi.`,
  },
  {
    title: "Cookie",
    content: `Questo sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento delle pagine. Non vengono utilizzati cookie di profilazione, cookie di tracciamento o cookie pubblicitari.\n\nI cookie tecnici non richiedono il consenso dell'utente ai sensi della normativa vigente.`,
  },
  {
    title: "Base Giuridica del Trattamento",
    content: `Il trattamento dei dati personali è basato sul consenso dell'utente (Art. 6, lett. a, GDPR) espresso al momento dell'invio del modulo di contatto.`,
  },
  {
    title: "Conservazione dei Dati",
    content: `I dati personali forniti tramite il modulo di contatto vengono conservati per il tempo strettamente necessario a gestire la richiesta e comunque non oltre 12 mesi.`,
  },
  {
    title: "Diritti dell'Utente",
    content: `In conformità al GDPR, l'utente ha diritto a:\n\n- Accedere ai propri dati personali\n- Richiedere la rettifica o la cancellazione dei dati\n- Opporsi al trattamento\n- Richiedere la portabilità dei dati\n\nPer esercitare questi diritti è possibile contattarci all'indirizzo email: ritapolidoro4@gmail.com`,
  },
  {
    title: "Servizi di Terze Parti",
    content: `Il sito utilizza Formspree (formspree.io) per la gestione del modulo di contatto. I dati inviati tramite il modulo sono soggetti anche alla Privacy Policy di Formspree, disponibile su formspree.io/legal/privacy-policy`,
  },
  {
    title: "Modifiche alla Privacy Policy",
    content: `Il Titolare si riserva il diritto di modificare la presente Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con l'aggiornamento della data in cima al documento.`,
  },
]

export default function PrivacyPolicyPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0F0E0A] border-b border-[#C9980A44]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 h-24 sm:h-28 lg:h-24">
            <a href="/" className="flex flex-col space-y-0 z-[60]">
              <div className="flex items-center gap-3">
                <img
                  src="/logo2.png"
                  alt="L'Ateneo logo"
                  className="h-20 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-[#F5EDD8] hover:text-[#C9980A] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="/#contatti"
                className="bg-[#C9980A] hover:bg-[#C9980A]/90 text-[#0F0E0A] px-7 py-3 rounded-sm text-sm font-bold transition-all hover:scale-105 active:scale-95"
              >
                Iscriviti Ora
              </a>
            </div>

            <button
              className="lg:hidden p-2 text-[#F5EDD8] z-[60]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300 lg:hidden ${
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 bottom-0 w-[300px] bg-[#0F0E0A] z-[55] transition-transform duration-300 ease-out lg:hidden border-l border-[#C9980A]/20 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-32 px-8 pb-10">
            <div className="flex flex-col">
              {[{ href: "/#chi-siamo", label: "Chi Siamo" }, { href: "/#team", label: "Team" }].map((link) => (
                <a key={link.href} href={link.href} className="text-xl font-medium text-[#F5EDD8] hover:text-[#C9980A] transition-colors py-4" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div style={{ borderTop: "1px solid #2A2010" }} className="my-2" />
              {[{ href: "/#corsi", label: "Corsi" }, { href: "/#formazione", label: "Formazione" }, { href: "/#orari", label: "Orari" }].map((link) => (
                <a key={link.href} href={link.href} className="text-xl font-medium text-[#F5EDD8] hover:text-[#C9980A] transition-colors py-4" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div style={{ borderTop: "1px solid #2A2010" }} className="my-2" />
              {[{ href: "/#prezzi", label: "Prezzi" }, { href: "/#gallery", label: "Gallery" }, { href: "/#contatti", label: "Contatti" }].map((link) => (
                <a key={link.href} href={link.href} className="text-xl font-medium text-[#F5EDD8] hover:text-[#C9980A] transition-colors py-4" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a
                href="/#contatti"
                className="mt-6 bg-[#C9980A] text-[#0F0E0A] px-6 py-4 rounded-sm text-center font-bold text-lg transition-transform active:scale-95"
                onClick={() => setMobileMenuOpen(false)}
              >
                Iscriviti Ora
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-24">
        <a href="/" className="block font-sans text-sm mb-8" style={{ color: "#C9980A" }}>
          ← Torna al sito
        </a>

        <h1 className="font-serif text-4xl mb-4" style={{ color: "#F5EDD8" }}>
          Privacy Policy
        </h1>
        <p className="font-sans text-sm mb-12" style={{ color: "#B8A080" }}>
          Ultimo aggiornamento: Aprile 2025
        </p>

        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="font-serif text-xl mb-3" style={{ color: "#C9980A" }}>
              {section.title}
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-8 whitespace-pre-line" style={{ color: "#B8A080" }}>
              {section.content}
            </p>
            {index < sections.length - 1 && (
              <div style={{ borderBottom: "1px solid #2A2010" }} className="mb-8" />
            )}
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-[#C9980A33] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <a href="/" className="flex items-center gap-3 mb-6">
                <img
                  src="/logo2.png"
                  alt="L'Ateneo logo"
                  className="h-20 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
              <p className="text-[#B8A080] text-sm max-w-[280px] mt-4 leading-relaxed">
                Da oltre 30 anni, la casa della danza ad Agropoli.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[#F5EDD8] mb-6 text-sm uppercase tracking-wider">Link Rapidi</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[#B8A080] hover:text-[#C9980A] hover:translate-x-0.5 transition-all duration-200 text-sm inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#F5EDD8] mb-6 text-sm uppercase tracking-wider">Seguici</h4>
              <div className="flex gap-5">
                <a href="https://www.instagram.com/ateneodanza/" target="_blank" rel="noopener noreferrer" className="text-[#B8A080] hover:text-[#C9980A] transition-colors" aria-label="Instagram">
                  <Instagram size={26} />
                </a>
                <a href="https://www.facebook.com/ateneo6" target="_blank" rel="noopener noreferrer" className="text-[#B8A080] hover:text-[#C9980A] transition-colors" aria-label="Facebook">
                  <Facebook size={26} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#B8A080] hover:text-[#C9980A] transition-colors" aria-label="TikTok">
                  <Music size={26} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2A2010] pt-8 text-center text-xs text-[#B8A080]">
            &copy; 2025 L&apos;Ateneo Danza Musical e Fitness &middot; Agropoli, Cilento
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0E0A] border-t border-[#2A2010] h-14 md:hidden z-50 flex items-center">
        <div className="flex w-full">
          <a
            href="tel:+393393565655"
            className="flex-1 flex items-center justify-center gap-2 bg-transparent text-[#F5EDD8] font-semibold transition-colors"
          >
            <Phone size={18} />
            Chiamaci
          </a>
          <a
            href="/#contatti"
            className="flex-1 flex items-center justify-center bg-[#C9980A] text-[#0A0905] font-semibold transition-colors"
          >
            Iscriviti Ora
          </a>
        </div>
      </div>

    </div>
  )
}
