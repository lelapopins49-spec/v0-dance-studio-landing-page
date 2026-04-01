"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Phone, Mail, MapPin, Instagram, Facebook, Music, Star, Menu, X, ChevronRight } from "lucide-react"

export default function LAteneoDanzaLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { href: "#chi-siamo", label: "Chi Siamo" },
    { href: "#corsi", label: "Corsi" },
    { href: "#orari", label: "Orari" },
    { href: "#prezzi", label: "Prezzi" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contatti", label: "Contatti" },
  ]

  const courses = [
    {
      title: "Danza Classica",
      age: "3–6 anni",
      description: "Le basi della tecnica classica per i più piccoli, in un ambiente giocoso e stimolante.",
      image: "/younger_female_student_solo.jpg",
    },
    {
      title: "Danza Moderna / Hip Hop",
      age: "7–14 anni",
      description: "Energia, ritmo e creatività per giovani ballerini che vogliono esprimersi liberamente.",
      image: "/student_male.jpg",
    },
    {
      title: "Danza Contemporanea",
      age: "15–30 anni",
      description: "Esplorazione del movimento, improvvisazione e tecnica avanzata per ballerini esperti.",
      image: "/danza_comp.jpg",
    },
    {
      title: "Musical Theatre",
      age: "Tutti i livelli",
      description: "Canto, recitazione e danza combinati per creare performer completi.",
      image: "/dance_theatre.jpg",
    },
    {
      title: "Pilates & Fitness",
      age: "Adulti",
      description: "Benessere fisico e mentale attraverso esercizi mirati e controllati.",
      image: "/fitness.jpg",
    },
    {
      title: "Aria Danza",
      age: "Dagli 8 anni",
      description: "Sperimenta la libertà del movimento in volo. Un mix di acrobatica e danza su tessuti e cerchio.",
      image: "/air_dance.jpg",
    },
  ]

  const schedule = [
    { day: "Lunedì", classes: [{ name: "Danza Classica", time: "16:00–17:00", level: "Principianti" }, { name: "Hip Hop", time: "17:30–18:30", level: "Intermedio" }] },
    { day: "Martedì", classes: [{ name: "Contemporanea", time: "18:00–19:30", level: "Avanzato" }, { name: "Pilates", time: "20:00–21:00", level: "Tutti" }] },
    { day: "Mercoledì", classes: [{ name: "Musical Theatre", time: "16:30–18:00", level: "Tutti" }, { name: "Moderna", time: "18:30–19:30", level: "Intermedio" }] },
    { day: "Giovedì", classes: [{ name: "Danza Classica", time: "16:00–17:00", level: "Intermedio" }, { name: "Fitness", time: "19:00–20:00", level: "Tutti" }] },
    { day: "Venerdì", classes: [{ name: "Hip Hop", time: "17:00–18:00", level: "Principianti" }, { name: "Contemporanea", time: "18:30–20:00", level: "Tutti" }] },
    { day: "Sabato", classes: [{ name: "Musical Theatre", time: "10:00–12:00", level: "Avanzato" }, { name: "Danza Classica", time: "14:00–15:30", level: "Tutti" }] },
  ]

  const testimonials = [
    { name: "Sofia M.", course: "Danza Classica", quote: "Mia figlia aspetta con ansia ogni lezione. Ha trovato non solo una passione, ma anche una seconda famiglia." },
    { name: "Marco R.", course: "Hip Hop", quote: "I maestri sono incredibili. Ho imparato più in sei mesi qui che in anni altrove. Consigliatissimo!" },
    { name: "Giulia T.", course: "Pilates", quote: "Un'oasi di benessere. L'atmosfera è accogliente e professionale allo stesso tempo." },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#0F0E0A] border-b border-[#C9980A44]" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 h-24 sm:h-28 lg:h-24">
            {/* Logo - Stacked Layout */}
            <a href="#" className="flex flex-col space-y-0 z-[60]">
              <span className="font-serif text-2xl font-bold text-[#F5EDD8] leading-tight">L&apos;Ateneo</span>
              <span className="font-dancing text-lg font-semibold text-[#C9980A] leading-tight">di Rita Polidoro</span>
              <span className="font-sans text-[9px] font-normal text-[#B8A080] tracking-[0.2em] uppercase leading-tight mt-0.5">DANZA MUSICAL E FITNESS</span>
            </a>

            {/* Desktop Navigation */}
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
                href="#contatti"
                className="bg-[#C9980A] hover:bg-[#C9980A]/90 text-[#0F0E0A] px-7 py-3 rounded-sm text-sm font-bold transition-all hover:scale-105 active:scale-95"
              >
                Iscriviti Ora
              </a>
            </div>

            {/* Mobile Menu Button */}
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
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 bottom-0 w-[300px] bg-[#0F0E0A] z-[55] transition-transform duration-300 ease-out lg:hidden border-l border-[#C9980A]/20 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full pt-32 px-8 pb-10">
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xl font-medium text-[#F5EDD8] hover:text-[#C9980A] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contatti"
                className="mt-6 bg-[#C9980A] text-[#0F0E0A] px-6 py-4 rounded-sm text-center font-bold text-lg transition-transform active:scale-95"
                onClick={() => setMobileMenuOpen(false)}
              >
                Iscriviti Ora
              </a>
            </div>
            <div className="mt-auto pt-10 border-t border-[#B8A080]/10">
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-[#F5EDD8]">L&apos;Ateneo</span>
                <span className="font-dancing text-base text-[#C9980A]">di Rita Polidoro</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background with warm golden glow (Base layer) */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 50%, #2A1F0A 0%, #0F0E0A 65%)" }}
        />

        {/* Hero image — now visible on all screen sizes */}
        <div className="absolute inset-0 w-full h-full block lg:w-1/2 lg:left-auto lg:right-0 z-0">
          <Image
            src="/collective_school_w_founder.jpg"
            alt="L&apos;Ateneo Danza"
            fill
            className="object-cover object-top"
            priority
          />

          {/* MOBILE ONLY: Strengthened overlay gradient for text legibility */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background: 'linear-gradient(to bottom, rgba(15,14,10,0.75) 0%, rgba(15,14,10,0.85) 60%, #0F0E0A 100%)'
            }}
          />

          {/* DESKTOP ONLY: Left and Bottom edge fades */}
          <div
            className="hidden lg:block absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #0F0E0A 0%, transparent 35%)'
            }}
          />
          <div
            className="hidden lg:block absolute inset-0"
            style={{
              background: 'linear-gradient(to top, #0F0E0A 0%, transparent 30%)'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl ml-0 lg:mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 text-left lg:w-1/2">
          <div>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold italic text-foreground mb-6 animate-fade-in-up text-balance text-left">
              Nasce Tutto<br />
              <span className="text-primary">da un Passo</span>
            </h1>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl font-light leading-relaxed text-[#F5EDD8] max-w-none lg:max-w-xl mb-10 animate-fade-in-up animate-delay-200 text-pretty">
            La passione per la danza si coltiva. La tua storia sul palcoscenico inizia qui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start animate-fade-in-up animate-delay-300">
            <a
              href="#corsi"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-sm text-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Scopri i Corsi
              <ChevronRight size={20} />
            </a>
            <a
              href="#contatti"
              className="border border-foreground/30 hover:border-foreground text-foreground px-8 py-4 rounded-sm text-lg font-semibold transition-colors"
            >
              Contattaci
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-[#0A0905] py-8 sm:py-12 border-t border-b border-[#2A2010]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: "20+", label: "ANNI DI ESPERIENZA" },
              { number: "200+", label: "ALLIEVI OGNI ANNO" },
              { number: "Dai 3", label: "ANNI IN SU" },
              { number: "2", label: "SAGGIO ANNUALE" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="font-serif text-4xl sm:text-5xl font-bold mb-1 text-[#C9980A]">{stat.number}</div>
                <div className="text-sm sm:text-base text-[#B8A080] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corsi Section */}
      <section
        id="corsi"
        ref={(el) => { sectionRefs.current["corsi"] = el }}
        className={`py-20 sm:py-28 transition-all duration-700 ${visibleSections.has("corsi") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left lg:text-center mb-16 px-4 lg:px-0">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5EDD8] mb-4 text-left lg:text-center">I Nostri Corsi</h2>
            <p className="text-[#F5EDD8] text-lg max-w-none lg:max-w-2xl lg:mx-auto text-pretty">
              Dalla danza classica al fitness, offriamo un percorso completo per ogni età e livello
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="group bg-[#0A0905] border border-[#2A2010] rounded-sm p-6 transition-all duration-300 hover:bg-[#120F06] hover:border-l-[3px] hover:border-l-[#C9980A]"
              >
                <div className="w-full h-48 bg-secondary rounded-sm mb-6 overflow-hidden relative">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                      <Music className="w-12 h-12 text-primary/50" />
                    </div>
                  )}
                </div>
                <div className="inline-block bg-[#C9980A]/10 text-[#C9980A] border border-[#C9980A]/25 px-3 py-1 rounded-sm text-xs font-semibold mb-3">
                  {course.age}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#F5EDD8] mb-3">{course.title}</h3>
                <p className="text-[#F5EDD8] mb-4 text-pretty">{course.description}</p>
                <a
                  href="#contatti"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Scopri di più
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prima Lezione Gratuita CTA Banner 1 */}
      <section className="bg-[#C9980A]/10 border-t border-b border-[#C9980A]/20 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-foreground text-lg sm:text-xl mb-4">
            La prima lezione è gratuita — vieni a trovarci
          </p>
          <a
            href="#contatti"
            className="inline-block bg-[#C9980A] hover:bg-[#C9980A]/90 text-[#0A0905] px-8 py-3 rounded-sm font-semibold transition-colors"
          >
            Prenota Ora
          </a>
        </div>
      </section>

      {/* Chi Siamo Section */}
      <section
        id="chi-siamo"
        ref={(el) => { sectionRefs.current["chi-siamo"] = el }}
        className={`py-20 sm:py-28 bg-card transition-all duration-700 ${visibleSections.has("chi-siamo") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait Placeholder */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/founder.jpg"
                alt="Founder"
                fill
                className="object-cover bg-[#1A1408] border border-[#2A2010] rounded-sm"
              />
              {/* Right edge fade — blends image into background toward the text */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to left, #0F0E0A 0%, transparent 40%)'
                }}
              />
              {/* Bottom edge fade */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, #0F0E0A 0%, transparent 35%)'
                }}
              />
            </div>

            <div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Conosci la Tua Insegnante
              </h2>
              <p className="text-[#F5EDD8] text-lg mb-6 leading-relaxed text-pretty">
                Rita Polidoro, fondatrice de L&apos;Ateneo, vanta oltre 20 anni di esperienza nella danza classica e contemporanea.
                Formatasi presso le più prestigiose accademie italiane, ha dedicato la sua vita a trasmettere la passione
                per la danza alle nuove generazioni di Agropoli e del Cilento.
              </p>
              <blockquote className="border-l-4 border-accent pl-6 py-2 mb-8">
                <p className="font-serif text-xl sm:text-2xl text-foreground italic text-balance">
                  &ldquo;La danza non è solo movimento — è espressione dell&apos;anima.&rdquo;
                </p>
              </blockquote>
              <a
                href="#contatti"
                className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                La Nostra Storia
                <ChevronRight size={20} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Orari Section */}
      <section
        id="orari"
        ref={(el) => { sectionRefs.current["orari"] = el }}
        className={`py-20 sm:py-28 transition-all duration-700 ${visibleSections.has("orari") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left lg:text-center mb-16 px-4 lg:px-0">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 text-left lg:text-center">Orari dei Corsi</h2>
            <p className="text-muted-foreground text-lg max-w-none lg:max-w-2xl lg:mx-auto text-pretty">
              Organizziamo i nostri corsi per adattarsi ai tuoi impegni
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((day, index) => (
              <div
                key={index}
                className="group bg-[#0A0905] border border-[#2A2010] rounded-sm p-6 transition-all duration-300 hover:bg-[#120F06] hover:border-l-[3px] hover:border-l-[#C9980A]"
              >
                <h3 className="font-serif text-xl font-bold text-[#F5EDD8] mb-4 pb-3 border-b border-[#2A2010] group-hover:text-[#C9980A] transition-colors">
                  {day.day}
                </h3>
                <div className="space-y-4">
                  {day.classes.map((cls, idx) => (
                    <div key={idx}>
                      <div className="font-semibold text-[#F5EDD8]">{cls.name}</div>
                      <div className="text-sm text-[#B8A080]">{cls.time}</div>
                      <div className="inline-block bg-[#C9980A]/10 text-[#C9980A] border border-[#C9980A]/25 px-2 py-0.5 rounded-sm text-xs mt-1">
                        {cls.level}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[#F5EDD8] mt-8 text-sm">
            * Gli orari possono variare — contattaci per confermare
          </p>
        </div>
      </section>

      {/* Prezzi Section */}
      <section
        id="prezzi"
        ref={(el) => { sectionRefs.current["prezzi"] = el }}
        className={`py-24 bg-card transition-all duration-700 ${visibleSections.has("prezzi") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left lg:text-center mb-16 px-4 lg:px-0">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 text-left lg:text-center">Iscrizioni & Prezzi</h2>
            <p className="text-[#F5EDD8] text-lg max-w-none lg:max-w-2xl lg:mx-auto text-pretty">
              Scegli il piano più adatto alle tue esigenze
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Corso Singolo",
                price: "€ —",
                features: ["Accesso a un corso a scelta", "1 lezione a settimana", "Materiale didattico incluso"],
                popular: false,
              },
              {
                name: "Abbonamento Mensile",
                price: "€ —",
                features: ["Accesso illimitato ai corsi", "Sconti su eventi speciali", "Prenotazione prioritaria", "Accesso area relax"],
                popular: true,
              },
              {
                name: "Abbonamento Annuale",
                price: "€ —",
                features: ["Tutti i vantaggi mensili", "2 mesi gratuiti", "Workshop esclusivi", "T-shirt ufficiale"],
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative group rounded-sm p-8 transition-all duration-300 bg-[#0A0905] h-full flex flex-col hover:bg-[#120F06] hover:border-l-[3px] hover:border-l-[#C9980A] ${plan.popular
                  ? "border-2 border-[#C9980A] scale-[1.02] z-10"
                  : "border border-[#2A2010] hover:border-[#C9980A]/30"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9980A] text-[#0A0905] px-4 py-1 rounded-full text-xs font-bold tracking-wider whitespace-nowrap">
                    Più Popolare
                  </div>
                )}
                <h3 className="font-serif text-2xl font-bold mb-2 text-foreground group-hover:text-[#C9980A] transition-colors">{plan.name}</h3>
                <div className="font-serif text-4xl font-bold mb-6 text-[#F5EDD8] border-b border-[#2A2010] pb-6">
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8 mt-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C9980A]">✓</span>
                      <span className="text-[#B8A080] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <a
                    href="#contatti"
                    className="block text-center py-3 rounded-sm font-semibold transition-colors bg-[#C9980A] text-[#0A0905] hover:bg-[#C9980A]/90"
                  >
                    Scegli questo piano
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        ref={(el) => { sectionRefs.current["gallery"] = el }}
        className={`pt-20 sm:pt-28 pb-0 transition-all duration-700 ${visibleSections.has("gallery") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left lg:text-center mb-16 px-4 lg:px-0">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 text-left lg:text-center">I Nostri Momenti</h2>
            <p className="text-[#F5EDD8] text-lg max-w-none lg:max-w-2xl lg:mx-auto text-pretty">
              Istantanee di passione, dedizione e gioia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/air_dance_student.jpg", alt: "Studente di danza aerea" },
              { src: "/collage_children_group.jpg", alt: "Gruppo di bambini" },
              { src: "/group_male_female_stuends_stage.jpg", alt: "Studenti sul palco" },
              { src: "/group_outside_.jpg", alt: "Gruppo all'aperto" },
              { src: "/inside_school_children_lesson.jpg", alt: "Lezione all'interno" },
              { src: "/male_female_duo.jpg", alt: "Duo maschile e femminile" },
              { src: "/outside_event_students.jpg", alt: "Evento all'aperto" },
              { src: "/solo_female_air_dance.jpg", alt: "Solo danza aerea" },
              { src: "/student_green_dress.jpg", alt: "Studentessa in abito verde" },
            ].map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-sm group aspect-square"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        ref={(el) => { sectionRefs.current["testimonials"] = el }}
        className={`py-24 sm:py-32 relative overflow-hidden transition-all duration-1000 ${visibleSections.has("testimonials") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Background Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9980A]/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C9980A]/5 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left lg:text-center mb-20 px-4 lg:px-0">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5EDD8] mb-6">Voci dall&apos;Accademia</h2>
            <div className="h-1 w-24 bg-[#C9980A] lg:mx-auto mb-8" />
            <p className="text-[#F5EDD8] text-lg max-w-2xl lg:mx-auto leading-relaxed">
              La nostra più grande soddisfazione è il successo e il benessere dei nostri allievi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-[#0F0E0A] border border-[#2A2010] p-10 rounded-sm relative group hover:border-[#C9980A]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-full"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0F0E0A] border border-[#2A2010] flex items-center justify-center text-[#C9980A] text-2xl font-serif">
                  &ldquo;
                </div>

                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="text-[#C9980A]" fill="currentColor" />
                  ))}
                </div>

                <p className="text-[#F5EDD8] text-lg leading-relaxed mb-10 italic font-light flex-grow">
                  {t.quote}
                </p>

                <div className="flex items-center gap-5 border-t border-[#2A2010] pt-8 mt-auto">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1A1408] to-[#0A0905] border border-[#2A2010] flex items-center justify-center text-[#C9980A] font-serif text-xl font-bold group-hover:border-[#C9980A]/30 transition-colors">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-serif text-[#F5EDD8] text-lg font-bold">{t.name}</div>
                    <div className="text-[10px] text-[#F5EDD8] uppercase tracking-[0.2em] font-medium">{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prima Lezione Gratuita CTA Banner 2 */}
      <section className="bg-[#C9980A]/10 border-t border-b border-[#C9980A]/20 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-foreground text-lg sm:text-xl mb-4">
            La prima lezione è gratuita — vieni a trovarci
          </p>
          <a
            href="#contatti"
            className="inline-block bg-[#C9980A] hover:bg-[#C9980A]/90 text-[#0A0905] px-8 py-3 rounded-sm font-semibold transition-colors"
          >
            Prenota Ora
          </a>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section
        id="contatti"
        ref={(el) => { sectionRefs.current["contatti"] = el }}
        className={`py-24 border-t border-[#2A2010] transition-all duration-700 ${visibleSections.has("contatti") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left lg:text-center mb-16 px-4 lg:px-0">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 text-left lg:text-center">
              Pronta a <span className="text-primary">Ballare</span>?
            </h2>
            <p className="text-[#F5EDD8] text-lg max-w-none lg:max-w-2xl lg:mx-auto text-pretty">
              Iscriviti oggi o vieni a trovarci per una lezione gratuita di prova
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[12px] font-medium text-[#B8A080] tracking-wider uppercase mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-card border border-[#2A2010] rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C9980A] transition-colors"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[12px] font-medium text-[#B8A080] tracking-wider uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-card border border-[#2A2010] rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C9980A] transition-colors"
                    placeholder="La tua email"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-[12px] font-medium text-[#B8A080] tracking-wider uppercase mb-2">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full bg-card border border-[#2A2010] rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C9980A] transition-colors"
                    placeholder="Il tuo numero"
                  />
                </div>
                <div>
                  <label htmlFor="course" className="block text-[12px] font-medium text-[#B8A080] tracking-wider uppercase mb-2">
                    Corso di Interesse
                  </label>
                  <select
                    id="course"
                    className="w-full bg-card border border-[#2A2010] rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-[#C9980A] transition-colors"
                  >
                    <option value="">Seleziona un corso</option>
                    <option value="classica">Danza Classica</option>
                    <option value="moderna">Danza Moderna / Hip Hop</option>
                    <option value="contemporanea">Danza Contemporanea</option>
                    <option value="musical">Musical Theatre</option>
                    <option value="pilates">Pilates & Fitness</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-[12px] font-medium text-[#B8A080] tracking-wider uppercase mb-2">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-card border border-[#2A2010] rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#C9980A] transition-colors resize-none"
                  placeholder="Raccontaci di te..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-sm font-semibold text-lg transition-colors"
              >
                Invia Messaggio
              </button>
            </form>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Contatti</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Indirizzo</div>
                      <div className="text-[#F5EDD8]">Via Moio, 8 — 84043 Agropoli (SA), Italia</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[#F5EDD8]">Telefono</div>
                      <div className="text-[#F5EDD8]">+39 339 356 5655</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[#F5EDD8]">Email</div>
                      <div className="text-[#F5EDD8]">ritapolidoro4@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Dove Siamo</h3>
            <div className="w-full aspect-video md:aspect-[21/9] rounded-sm overflow-hidden border border-[#2A2010]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190.0541894250962!2d14.993754947979332!3d40.345295625828975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133bfe5172eef7a9%3A0x39892003b04f0f75!2sVia%20Moio%2C%208%2C%2084043%20Agropoli%20SA!5e0!3m2!1sen!2sit!4v1775039640492!5m2!1sen!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-[#C9980A33] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Tagline */}
            <div className="md:col-span-2">
              <a href="#" className="flex flex-col space-y-0 mb-6">
                <span className="font-serif text-2xl font-bold text-[#F5EDD8] leading-tight">L&apos;Ateneo</span>
                <span className="font-dancing text-lg font-semibold text-[#C9980A] leading-tight">di Rita Polidoro</span>
                <span className="font-sans text-[9px] font-normal text-[#B8A080] tracking-[0.2em] uppercase leading-tight mt-0.5">DANZA MUSICAL E FITNESS</span>
              </a>
              <p className="text-[#B8A080] text-sm max-w-[280px] mt-4 leading-relaxed">
                Da oltre 20 anni, la casa della danza ad Agropoli.
              </p>
            </div>

            {/* Quick Links */}
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

            {/* Social */}
            <div>
              <h4 className="font-semibold text-[#F5EDD8] mb-6 text-sm uppercase tracking-wider">Seguici</h4>
              <div className="flex gap-5">
                <a href="#" className="text-[#B8A080] hover:text-[#C9980A] transition-colors" aria-label="Instagram">
                  <Instagram size={26} />
                </a>
                <a href="#" className="text-[#B8A080] hover:text-[#C9980A] transition-colors" aria-label="Facebook">
                  <Facebook size={26} />
                </a>
                <a href="#" className="text-[#B8A080] hover:text-[#C9980A] transition-colors" aria-label="TikTok">
                  <Music size={26} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2A2010] pt-8 text-center text-xs text-[#B8A080]">
            © 2025 L&apos;Ateneo Danza Musical e Fitness · Agropoli, Cilento · P.IVA
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0E0A] border-t border-[#2A2010] h-14 md:hidden z-50 flex items-center">
        <div className="flex w-full">
          <a
            href="tel:+390000000000"
            className="flex-1 flex items-center justify-center gap-2 bg-transparent text-[#F5EDD8] font-semibold transition-colors"
          >
            <Phone size={18} />
            Chiamaci
          </a>
          <a
            href="#contatti"
            className="flex-1 flex items-center justify-center bg-[#C9980A] text-[#0A0905] font-semibold transition-colors"
          >
            Iscriviti Ora
          </a>
        </div>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-14 md:hidden" />
    </div>
  )
}
