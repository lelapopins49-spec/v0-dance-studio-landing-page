"use client"

import { useState, useEffect, useRef } from "react"
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
    },
    {
      title: "Danza Moderna / Hip Hop",
      age: "7–14 anni",
      description: "Energia, ritmo e creatività per giovani ballerini che vogliono esprimersi liberamente.",
    },
    {
      title: "Danza Contemporanea",
      age: "15–30 anni",
      description: "Esplorazione del movimento, improvvisazione e tecnica avanzata per ballerini esperti.",
    },
    {
      title: "Musical Theatre",
      age: "Tutti i livelli",
      description: "Canto, recitazione e danza combinati per creare performer completi.",
    },
    {
      title: "Pilates & Fitness",
      age: "Adulti",
      description: "Benessere fisico e mentale attraverso esercizi mirati e controllati.",
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
    { name: "Sofia M.", course: "Danza Classica, 8 anni", quote: "Mia figlia aspetta con ansia ogni lezione. Ha trovato non solo una passione, ma anche una seconda famiglia." },
    { name: "Marco R.", course: "Hip Hop, 16 anni", quote: "I maestri sono incredibili. Ho imparato più in sei mesi qui che in anni altrove. Consigliatissimo!" },
    { name: "Giulia T.", course: "Pilates, Adulti", quote: "Un'oasi di benessere. L'atmosfera è accogliente e professionale allo stesso tempo." },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-foreground tracking-tight">L&apos;Ateneo</span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">Danza · Musical · Fitness</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contatti"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold transition-colors"
              >
                Iscriviti Ora
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contatti"
                className="block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-sm text-center font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Iscriviti Ora
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-secondary">
          {/* IMAGE: hero dancer - dramatic full-bleed photo of a dancer in motion */}
          <div className="w-full h-full bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-fade-in-up text-balance">
            Il Tuo Palcoscenico<br />
            <span className="text-primary">Inizia Qui</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200 text-pretty">
            Corsi di danza per bambini e adulti ad Agropoli — dai 3 anni in su
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
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
      <section className="bg-primary py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { number: "20+", label: "Anni di Esperienza" },
              { number: "3–30", label: "Anni di Età" },
              { number: "5+", label: "Discipline" },
              { number: "∞", label: "Passione" },
            ].map((stat, index) => (
              <div key={index} className="text-primary-foreground">
                <div className="font-serif text-4xl sm:text-5xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm sm:text-base opacity-90">{stat.label}</div>
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
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">I Nostri Corsi</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Dalla danza classica al fitness, offriamo un percorso completo per ogni età e livello
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="group bg-card border border-border hover:border-primary/50 rounded-sm p-6 transition-all duration-300"
              >
                {/* IMAGE: course icon or photo placeholder */}
                <div className="w-full h-48 bg-secondary rounded-sm mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                    <Music className="w-12 h-12 text-primary/50" />
                  </div>
                </div>
                <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-sm text-xs font-semibold mb-3">
                  {course.age}
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{course.title}</h3>
                <p className="text-muted-foreground mb-4 text-pretty">{course.description}</p>
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

      {/* Chi Siamo Section */}
      <section
        id="chi-siamo"
        ref={(el) => { sectionRefs.current["chi-siamo"] = el }}
        className={`py-20 sm:py-28 bg-card transition-all duration-700 ${visibleSections.has("chi-siamo") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait Placeholder */}
            <div className="relative">
              {/* IMAGE: portrait photo of the founder/instructor */}
              <div className="aspect-[4/5] bg-secondary rounded-sm overflow-hidden">
                <div className="w-full h-full bg-gradient-to-t from-background/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-sm -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-accent rounded-sm -z-10" />
            </div>

            <div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Conosci la Tua Insegnante
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed text-pretty">
                [Nome insegnante], fondatrice de L&apos;Ateneo, vanta oltre 20 anni di esperienza nella danza classica e contemporanea. 
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
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">Orari dei Corsi</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Organizziamo i nostri corsi per adattarsi ai tuoi impegni
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.map((day, index) => (
              <div key={index} className="bg-card border border-border rounded-sm p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4 pb-3 border-b border-border">
                  {day.day}
                </h3>
                <div className="space-y-4">
                  {day.classes.map((cls, idx) => (
                    <div key={idx}>
                      <div className="font-semibold text-foreground">{cls.name}</div>
                      <div className="text-sm text-muted-foreground">{cls.time}</div>
                      <div className="inline-block bg-secondary text-muted-foreground px-2 py-0.5 rounded-sm text-xs mt-1">
                        {cls.level}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            * Gli orari possono variare — contattaci per confermare
          </p>
        </div>
      </section>

      {/* Prezzi Section */}
      <section
        id="prezzi"
        ref={(el) => { sectionRefs.current["prezzi"] = el }}
        className={`py-20 sm:py-28 bg-card transition-all duration-700 ${visibleSections.has("prezzi") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">Iscrizioni & Prezzi</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Scegli il piano più adatto alle tue esigenze
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
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
                className={`relative rounded-sm p-8 transition-all duration-300 ${
                  plan.popular
                    ? "bg-primary text-primary-foreground scale-105 shadow-2xl"
                    : "bg-background border border-border hover:border-primary/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-sm text-sm font-bold">
                    Più Popolare
                  </div>
                )}
                <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="font-serif text-4xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={plan.popular ? "text-primary-foreground" : "text-accent"}>✓</span>
                      <span className={plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contatti"
                  className={`block text-center py-3 rounded-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-foreground text-primary hover:bg-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Scegli questo piano
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-accent font-semibold mt-12 text-lg">
            ✨ Prima lezione gratuita — vieni a trovarci!
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        ref={(el) => { sectionRefs.current["gallery"] = el }}
        className={`py-20 sm:py-28 transition-all duration-700 ${visibleSections.has("gallery") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">I Nostri Momenti</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Istantanee di passione, dedizione e gioia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-sm group ${
                  index === 0 || index === 4 ? "row-span-2" : ""
                }`}
              >
                {/* IMAGE: gallery photo placeholder */}
                <div
                  className={`bg-secondary ${
                    index === 0 || index === 4 ? "aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={(el) => { sectionRefs.current["testimonials"] = el }}
        className={`py-20 sm:py-28 bg-card transition-all duration-700 ${visibleSections.has("testimonials") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Cosa Dicono i Nostri Allievi
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-background border border-border rounded-sm p-8">
                <div className="text-primary text-5xl font-serif mb-4">&ldquo;</div>
                <p className="text-foreground mb-6 leading-relaxed text-pretty">{testimonial.quote}</p>
                <div className="flex text-accent mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.course}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section
        id="contatti"
        ref={(el) => { sectionRefs.current["contatti"] = el }}
        className={`py-20 sm:py-28 transition-all duration-700 ${visibleSections.has("contatti") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
              Pronta a <span className="text-primary">Ballare</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Iscriviti oggi o vieni a trovarci per una lezione gratuita di prova
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="La tua email"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Il tuo numero"
                  />
                </div>
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-foreground mb-2">
                    Corso di Interesse
                  </label>
                  <select
                    id="course"
                    className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
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
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
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
                      <div className="text-muted-foreground">Via [Nome Via], 00<br />84043 Agropoli (SA), Italia</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Telefono</div>
                      <div className="text-muted-foreground">+39 0000 000 000</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <div className="text-muted-foreground">info@atenodanza.it</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Dove Siamo</h3>
                {/* Google Maps embed placeholder */}
                <div className="aspect-video bg-secondary rounded-sm overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <MapPin className="w-12 h-12 opacity-30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Tagline */}
            <div className="md:col-span-2">
              <div className="flex flex-col mb-4">
                <span className="font-serif text-2xl font-bold text-foreground tracking-tight">L&apos;Ateneo</span>
                <span className="text-xs text-muted-foreground tracking-widest uppercase">Danza · Musical · Fitness</span>
              </div>
              <p className="text-muted-foreground max-w-sm text-pretty">
                Da oltre 20 anni, la casa della danza ad Agropoli. Dove passione e professionalità si incontrano.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Link Rapidi</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Seguici</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="TikTok">
                  <Music size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2025 L&apos;Ateneo Danza Musical e Fitness — Agropoli, Cilento
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 lg:hidden z-50">
        <div className="flex gap-4">
          <a
            href="tel:+390000000000"
            className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground py-3 rounded-sm font-semibold transition-colors"
          >
            <Phone size={18} />
            Chiamaci
          </a>
          <a
            href="#contatti"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-sm font-semibold text-center transition-colors"
          >
            Iscriviti Ora
          </a>
        </div>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  )
}
