"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Phone, Mail, MapPin, Instagram, Facebook, Music, Star, Menu, X, ChevronRight, Clock, Calendar, Users, Zap, Wind, Radio, Mic, Mic2, Flame, Activity, Ticket, CalendarRange, Crown, Tag, Map, GraduationCap, BookOpen, Sparkles, Heart, Drama } from "lucide-react"

export default function LAteneoDanzaLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [enlargedPhoto, setEnlargedPhoto] = useState<string | null>(null)
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)
  const videoRef3 = useRef<HTMLVideoElement>(null)
  const videoRefs = [videoRef1, videoRef2, videoRef3]
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())
  const [bioOpen, setBioOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({})
  const [formNetworkError, setFormNetworkError] = useState(false)
  const [cookieVisible, setCookieVisible] = useState(false)
  const [cookieFading, setCookieFading] = useState(false)
  const [whatsappHover, setWhatsappHover] = useState(false)
  const [expandedBios, setExpandedBios] = useState<boolean[]>([false, false, false, false])
  const [visibleCount, setVisibleCount] = useState(20)
  const [reelsExpanded, setReelsExpanded] = useState(false)
  const [coursesExpanded, setCoursesExpanded] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) {
      setCookieVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    setCookieFading(true)
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "accepted")
      setCookieVisible(false)
      setCookieFading(false)
    }, 300)
  }

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

  useEffect(() => {
    if (galleryOpen || enlargedPhoto) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [galleryOpen, enlargedPhoto])

  useEffect(() => {
    if (!galleryOpen && !enlargedPhoto) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (enlargedPhoto) setEnlargedPhoto(null)
        else if (galleryOpen) setGalleryOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [galleryOpen, enlargedPhoto])

  const navLinks = [
    { href: "#chi-siamo", label: "Chi Siamo" },
    { href: "#corsi", label: "Corsi" },
    { href: "#mamma-e-figlia", label: "Mamma & Figlia" },
    { href: "#formazione", label: "Formazione" },
    { href: "#orari", label: "Orari" },
    { href: "#prezzi", label: "Prezzi" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contatti", label: "Contatti" },
  ]

  const courseCategories = [
    {
      label: "DANZA",
      courses: [
        {
          title: "Danza Classica",
          age: "3-6 anni",
          description: "Le basi della tecnica classica per i pi\u00f9 piccoli, in un ambiente giocoso e stimolante.",
          image: "/488642768_2081867468995252_8593027666977621862_n.jpg",
          icon: <Music className="w-8 h-8 text-[#C9980A]" />,
        },
        {
          title: "Danza Moderna",
          age: "7-14 anni",
          description: "Energia, ritmo e creativit\u00e0 per giovani ballerini che vogliono esprimersi liberamente.",
          image: "/female_pair_modern_dance.jpg",
          icon: <Zap className="w-8 h-8 text-[#C9980A]" />,
        },
        {
          title: "Danza Contemporanea",
          age: "15-30 anni",
          description: "Esplorazione del movimento, improvvisazione e tecnica avanzata per ballerini esperti.",
          image: "/danza_comp.jpg",
          icon: <Wind className="w-8 h-8 text-[#C9980A]" />,
        },
        {
          title: "Hip Hop",
          age: "Tutti i livelli",
          description: "Stile urbano, groove e freestyle per chi ama il ritmo e l\u2019energia della street dance.",
          image: "/student_male.jpg",
          icon: <Radio className="w-8 h-8 text-[#C9980A]" />,
        },
        {
          title: "Jazz",
          age: "Tutti i livelli",
          description: "Tecnica, musicalit\u00e0 e interpretazione per un approccio versatile alla danza.",
          image: "/student_blue_dress.jpg",
          icon: <Mic className="w-8 h-8 text-[#C9980A]" />,
        },
        {
          title: "Discipline Aeree",
          age: "Dagli 8 anni",
          description: "Cerchio, tessuto, amaca e attrezzi misti \u2014 sperimenta la libert\u00e0 del movimento in volo.",
          image: "/air_dance.jpg",
          icon: <Star className="w-8 h-8 text-[#C9980A]" />,
        },
      ],
    },
    {
      label: "MUSICAL & RECITAZIONE",
      courses: [
        {
          title: "Corsi di Canto",
          age: "Tutti i livelli",
          description: "Tecnica vocale e interpretazione per aspiranti cantanti e performer.",
          image: "/theatre_dance_pair.jpg",
          icon: <Mic2 className="w-8 h-8 text-[#C9980A]" />,
        },
        {
          title: "Corsi di Recitazione",
          age: "Tutti i livelli",
          description: "Espressivit\u00e0, dizione e presenza scenica per il palcoscenico e oltre.",
          image: "/kids_dance_stage.jpg",
          icon: <Drama className="w-8 h-8 text-[#C9980A]" />,
        },
        {
          title: "Danza per Musical",
          age: "Tutti i livelli",
          description: "Canto, recitazione e danza combinati per creare performer completi.",
          image: "/dance_theatre.jpg",
          icon: <Sparkles className="w-8 h-8 text-[#C9980A]" />,
        },
      ],
    },
    {
      label: "FITNESS",
      courses: [
        {
          title: "Aerobica & Step",
          age: "Adulti",
          description: "Allenamento cardiovascolare dinamico a ritmo di musica.",
          image: "/49515778_549482118900469_8702854088280244224_n.jpg",
          icon: <Activity className="w-8 h-8 text-[#C9980A]" />,
        },
        {
          title: "Zumba",
          age: "Adulti",
          description: "Fitness e divertimento con coreografie ispirate ai ritmi latini.",
          image: "/Zmba_training.jpg",
          icon: <Flame className="w-8 h-8 text-[#C9980A]" />,
        },
        {
          title: "Pilates",
          age: "Adulti",
          description: "Benessere fisico e mentale attraverso esercizi mirati e controllati.",
          image: "/fitness.jpg",
          icon: <Heart className="w-8 h-8 text-[#C9980A]" />,
        },
      ],
    },
  ]

  const allGalleryPhotos = [
    "/group_outside_.jpg", "/inside_school_children_lesson.jpg", "/male_female_duo.jpg",
    "/outside_event_students.jpg", "/solo_female_air_dance.jpg", "/student_green_dress.jpg",
    "/IMG_8356.JPG.webp", "/IMG_8357.JPG.webp", "/IMG_8359.JPG.webp", "/IMG_8360.JPG.webp",
    "/IMG_8363.JPG.webp", "/IMG_8364.JPG.webp", "/IMG_8367.JPG.webp", "/IMG_8368.JPG.webp",
    "/IMG_8369.JPG.webp", "/IMG_8370.JPG.webp", "/IMG_8371.JPG.webp", "/IMG_8373.JPG.webp",
    "/IMG_8377.JPG.webp", "/IMG_8378.JPG.webp", "/IMG_8379.JPG.webp", "/IMG_8380.JPG.webp",
    "/IMG_8382.JPG.webp", "/IMG_8383.JPG.webp", "/IMG_8385.JPG.webp", "/IMG_8387.JPG.webp",
    "/IMG_8390.JPG.webp", "/IMG_8396.JPG.webp", "/IMG_8402.JPG.webp", "/IMG_8413.webp",
    "/additional/saggio-ateneo-agropoli-1.webp",
    "/additional/saggio-ateneo-agropoli-2.webp",
    "/additional/performance-ateneo-agropoli.webp",
    "/additional/spettacolo-fine-anno-ateneo-1.webp",
    "/additional/spettacolo-fine-anno-ateneo-3.webp",
    "/additional/spettacolo-fine-anno-ateneo.webp",
    "/additional/danza-femminile-sedia-agropoli.webp",
    "/additional/female-perform-sitting-chair.webp",
    "/additional/female-solo.webp",
    "/additional/females-group-perform.webp",
    "/additional/females-perform-stage.webp",
    "/additional/females-performs3.webp",
    "/additional/group-performance-4.webp",
    "/additional/group-performance-all-black.webp",
    "/additional/groupd-perform-1.webp",
    "/additional/kid-perform-solo.webp",
    "/additional/kid-solo-performance.webp",
    "/additional/kids-group-performance.webp",
    "/additional/kids-performance.webp",
    "/additional/kids-performance1.webp",
    "/additional/m-f-performa1.webp",
    "/additional/male-dancer.webp",
    "/additional/male-fdemale-performance4.webp",
    "/additional/male-female-ballet-1.webp",
    "/additional/coppia-balletto-ateneo-agropoli.webp",
    "/additional/coppia-balletto-ateneo-agropoli-3.webp",
    "/additional/duo-danza-ateneo-agropoli.webp",
    "/additional/gruppo-misto-performance-ateneo.webp",
    "/additional/coppia-performance-ateneo-cilento.webp",
    "/additional/coppia-danza-moderna-agropoli.webp",
    "/additional/coppia-danza-moderna-agropoli-1.webp",
    "/additional/coppia-danza-moderna-agropoli-2.webp",
    "/additional/coppia-danza-moderna-agropoli-4.webp",
    "/additional/coppia-performance-palcoscenico-1.webp",
    "/additional/coppia-performance-palcoscenico-2.webp",
    "/additional/coppia-performance-palcoscenico-3.webp",
    "/additional/coppia-danza-ateneo.webp",
    "/additional/gruppo-misto-danza-ateneo-3.webp",
    "/additional/danzatore-performance-agropoli-2.webp",
    "/additional/danzatore-solo-ateneo-agropoli.webp",
    "/additional/danzatore-solo-palcoscenico-agropoli.webp",
    "/additional/danzatore-solo-palcoscenico-agropoli-1.webp",
    "/additional/duo-misto-performance-ateneo.webp",
    "/additional/uomo-danza-performance-agropoli.webp",
    "/additional/performance-danza-ateneo-agropoli.webp",
    "/additional/due-ragazze-palcoscenico-ateneo.webp",
    "/additional/donna-danza-performance-agropoli-3.webp",
    "/additional/donna-danza-rosso-ateneo-agropoli.webp",
    "/additional/donne-performance-ateneo-agropoli-2.webp",
  ]

  const salaArmoniaSchedule = [
    {
      day: "LUNED\u00cc",
      classes: [
        { time: "10:00", name: "Benessere Mamme | Pilates | Aerobica" },
        { time: "17:00", name: "Predanza" },
        { time: "18:15", name: "Aerobica" },
        { time: "19:15", name: "Moderno Avanzato" },
      ],
    },
    {
      day: "MARTED\u00cc",
      classes: [
        { time: "10:00", name: "Danza Per Adulti" },
        { time: "16:00", name: "Moderno Principianti II" },
        { time: "17:00", name: "Classico Principianti II" },
        { time: "18:00", name: "Moderno Intermedio" },
        { time: "19:00", name: "Danza Aerea" },
      ],
    },
    {
      day: "MERCOLED\u00cc",
      classes: [
        { time: "10:00", name: "Benessere Mamme | Pilates | Aerobica" },
        { time: "16:00", name: "Danza Aerea Kids" },
        { time: "17:00", name: "Predanza" },
        { time: "18:15", name: "Aerobica" },
        { time: "19:15", name: "Danza Aerea Avanzato" },
      ],
    },
    {
      day: "GIOVED\u00cc",
      classes: [
        { time: "10:00", name: "Danza Per Adulti" },
        { time: "16:00", name: "Moderno Principianti II" },
        { time: "17:00", name: "Classico Principianti II" },
        { time: "18:00", name: "Moderno Intermedio" },
        { time: "19:00", name: "Bungee Dance | Danza Aerea | Discipline a Richiesta" },
      ],
    },
    {
      day: "VENERD\u00cc",
      classes: [
        { time: "16:00", name: "Danza Aerea Principianti" },
        { time: "17:00-18:30", name: "Recitazione" },
        { time: "19:00", name: "Workshop con Professionisti" },
      ],
    },
  ]

  const salaRitmoSchedule = [
    {
      day: "LUNEDÌ",
      classes: [
        { time: "17:00", name: "Predanza" },
        { time: "18:15", name: "Aerobica | GAG" },
        { time: "19:15", name: "Modern Avanzato" },
      ],
    },
    {
      day: "MARTEDÌ",
      classes: [
        { time: "16:00", name: "Danza Classica Principianti" },
        { time: "17:00", name: "Danza Moderna Principianti" },
        { time: "18:00", name: "Modern Intermedio" },
        { time: "19:15", name: "Danza Classica Intermedio" },
      ],
    },
    {
      day: "MERCOLEDÌ",
      classes: [
        { time: "15:00", name: "Aerobica | Step | GAG" },
        { time: "17:00", name: "Predanza" },
        { time: "18:15", name: "Aerobica | Step | GAG" },
        { time: "19:15", name: "Musical" },
      ],
    },
    {
      day: "GIOVEDÌ",
      classes: [
        { time: "16:00", name: "Danza Classica Principianti" },
        { time: "17:00", name: "Danza Moderna Principianti" },
        { time: "18:00", name: "Modern Intermedio" },
        { time: "19:15", name: "Danza Classica Intermedio" },
        { time: "20:15", name: "Danza Contemporanea" },
      ],
    },
    {
      day: "VENERDÌ",
      classes: [
        { time: "15:00", name: "Aerobica e GAG" },
        { time: "16:30", name: "Fiabe in Movimento" },
        { time: "18:15", name: "Aerobica | Step | GAG" },
        { time: "19:15", name: "Modern Avanzato" },
      ],
    },
  ]

  const testimonials = [
    { name: "Sofia M.", course: "Danza Classica", quote: "Mia figlia aspetta con ansia ogni lezione. Ha trovato non solo una passione, ma anche una seconda famiglia." },
    { name: "Marco R.", course: "Hip Hop", quote: "I maestri sono incredibili. Ho imparato pi\u00f9 in sei mesi qui che in anni altrove. Consigliatissimo!" },
    { name: "Giulia T.", course: "Pilates", quote: "Un\u2019oasi di benessere. L\u2019atmosfera \u00e8 accogliente e professionale allo stesso tempo." },
  ]

  const ScheduleCard = ({ title, subtitle, schedule }: { title: string; subtitle: string; schedule: typeof salaArmoniaSchedule }) => {
    const [activeDayIndex, setActiveDayIndex] = useState(0)

    return (
      <div className="bg-[#0A0905] border border-[#2A2010] rounded-sm p-6 sm:p-8">
        <h3 className="font-serif text-2xl font-bold text-[#C9980A] mb-1 text-center">{title}</h3>
        <p className="text-[#B8A080] text-sm mb-6 text-center">{subtitle}</p>

        {/* Mobile Tabs System */}
        <div className="md:hidden">
          <div className="grid grid-cols-5 gap-1 pb-4">
            {schedule.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDayIndex(i)}
                className={`py-2.5 text-[10px] font-bold uppercase tracking-tighter border transition-all duration-300 ${activeDayIndex === i
                    ? "bg-[#C9980A] text-[#0A0905] border-[#C9980A]"
                    : "bg-transparent text-[#B8A080] border-[#2A2010] hover:border-[#C9980A]/40"
                  }`}
              >
                {day.day.substring(0, 3)}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {schedule[activeDayIndex].classes.map((cls, j) => (
              <div key={j} className="grid grid-cols-[70px_1fr] gap-4 items-baseline border-b border-[#2A2010]/20 pb-3 last:border-0 last:pb-0">
                <span className="text-[#C9980A] font-sans font-bold text-xs text-right">{cls.time}</span>
                <span className="text-[#F5EDD8] text-sm font-medium uppercase tracking-wide text-left">{cls.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout (Hidden on Mobile) */}
        <div className="hidden md:block space-y-5">
          {schedule.map((day, i) => (
            <div key={i} className="mb-5">
              <div className="uppercase font-sans font-semibold text-[#F5EDD8] border-b border-[#2A2010] pb-1 mb-2 text-sm text-center">
                {day.day}
              </div>
              <div className="space-y-3">
                {day.classes.map((cls, j) => (
                  <div key={j} className="grid grid-cols-[80px_1fr] gap-4 items-baseline border-b border-[#2A2010]/20 pb-2 last:border-0 last:pb-0">
                    <span className="text-[#C9980A] font-sans font-bold text-sm text-right">{cls.time}</span>
                    <span className="text-[#F5EDD8] text-sm font-medium uppercase tracking-wide text-left">{cls.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

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
              <div className="flex items-center gap-3">
                <img
                  src="/logo2.png"
                  alt="L'Ateneo logo"
                  className="h-20 w-auto object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${visibleSections.has(link.href.slice(1)) ? "text-[#C9980A]" : "text-[#F5EDD8] hover:text-[#C9980A]"}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="#contatti"
                className="bg-[#C9980A] hover:bg-[#C9980A]/90 text-[#0F0E0A] px-5 py-3 rounded-sm text-sm font-bold transition-all hover:scale-105 active:scale-95"
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
            <div className="flex flex-col">
              {/* Group 1: Chi Siamo · Corsi · Mamma & Figlia · Formazione */}
              {[{ href: "#chi-siamo", label: "Chi Siamo" }, { href: "#corsi", label: "Corsi" }, { href: "#mamma-e-figlia", label: "Mamma & Figlia" }, { href: "#formazione", label: "Formazione" }].map((link) => (
                <a key={link.href} href={link.href} className="text-xl font-medium text-[#F5EDD8] hover:text-[#C9980A] transition-colors py-4" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div style={{ borderTop: "1px solid #2A2010" }} className="my-2" />
              {/* Group 2: Orari · Prezzi · Gallery */}
              {[{ href: "#orari", label: "Orari" }, { href: "#prezzi", label: "Prezzi" }, { href: "#gallery", label: "Gallery" }].map((link) => (
                <a key={link.href} href={link.href} className="text-xl font-medium text-[#F5EDD8] hover:text-[#C9980A] transition-colors py-4" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <div style={{ borderTop: "1px solid #2A2010" }} className="my-2" />
              {/* Group 3: Contatti */}
              {[{ href: "#contatti", label: "Contatti" }].map((link) => (
                <a key={link.href} href={link.href} className="text-xl font-medium text-[#F5EDD8] hover:text-[#C9980A] transition-colors py-4" onClick={() => setMobileMenuOpen(false)}>
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
              { number: "30+", label: "ANNI DI ESPERIENZA" },
              { number: "200+", label: "ALLIEVI OGNI ANNO" },
              { number: "3 anni", label: "ETÀ MINIMA" },
              { number: "2", label: "SPETTACOLI ANNUALI" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="font-serif text-4xl sm:text-5xl font-bold mb-1 text-[#C9980A]">{stat.number}</div>
                <div className="text-sm sm:text-base text-[#B8A080] uppercase tracking-wider">{stat.label}</div>
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
                Rita Polidoro è la fondatrice e direttrice artistica de L&apos;Ateneo Danza Musical e Fitness.
                Dal 1999 guida la scuola con una visione chiara: unire tecnica, creatività e passione per formare
                non solo danzatori, ma persone complete. Con oltre 30 anni di esperienza, ha formato centinaia di
                giovani talenti ad Agropoli e nel Cilento.
              </p>
              <ul className="font-sans text-sm text-[#B8A080] mb-6 space-y-1.5">
                <li><span className="text-[#C9980A] mr-2">·</span>Laureata in Lettere Moderne — Università di Salerno</li>
                <li><span className="text-[#C9980A] mr-2">·</span>Formazione internazionale — New York, Miami, Chicago</li>
                <li><span className="text-[#C9980A] mr-2">·</span>Regia e coreografie — The Greatest Showman, Mamma Mia, Hairspray, Notre Dame de Paris</li>
                <li><span className="text-[#C9980A] mr-2">·</span>Ospite Rai — Raccomandati con Carlo Conti</li>
                <li><span className="text-[#C9980A] mr-2">·</span>Maratoneta — New York City Marathon 2024</li>
              </ul>
              <blockquote className="border-l-4 border-accent pl-6 py-2 mb-6">
                <p className="font-serif text-xl sm:text-2xl text-foreground italic text-balance">
                  &ldquo;La mia filosofia mira a creare un ambiente inclusivo dove la trasmissione dei saperi
                  si unisce alla gioia del movimento — preparando ogni allievo non solo al palcoscenico,
                  ma alle sfide della vita.&rdquo;
                </p>
                <footer className="mt-3 font-sans text-sm text-[#B8A080]">— Rita Polidoro</footer>
              </blockquote>
              <button
                onClick={() => setBioOpen(!bioOpen)}
                className="font-sans text-sm text-[#C9980A] cursor-pointer bg-transparent border-none p-0 mb-4 hover:opacity-80 transition-opacity"
              >
                {bioOpen ? "Chiudi ↑" : "Leggi la sua storia completa ↓"}
              </button>
              <div
                style={{
                  maxHeight: bioOpen ? "2000px" : "0",
                  opacity: bioOpen ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.5s ease, opacity 0.5s ease",
                }}
              >
                <p className="font-sans text-sm text-[#B8A080] leading-relaxed mb-4">
                  Rita Polidoro è una professionista con una formation accademica e artistica d&apos;eccellenza.
                  Laureata in Lettere Moderne con indirizzo Arte e Spettacolo presso l&apos;Università degli Studi
                  di Salerno, è diplomata in dizione e recitazione e ha perfezionato il suo linguaggio artistico
                  partecipando a masterclass di alto livello — tra cui quella di recitazione cinematografica con
                  il regista Ferzan Ozpetek.
                </p>
                <p className="font-sans text-sm text-[#B8A080] leading-relaxed mb-4">
                  La sua tecnica è stata plasmata da esperienze internazionali di primo piano. Ha studiato presso
                  i centri CRUNCH di New York, Miami e Chicago con maestri di fama mondiale come Madonna Grimes e
                  Leslie Feliciano. È diplomata C.S.E.N - C.O.N.I. in danza classica, moderna, contemporary fusion,
                  musical, funk, hip hop, discipline aeree e fitness.
                </p>
                <p className="font-sans text-sm text-[#B8A080] leading-relaxed mb-4">
                  Specialista nel genere Musical, Rita ha curato la regia e le coreografie di produzioni iconiche
                  come The Greatest Showman, Mamma Mia, Hairspray e Notre Dame de Paris. Il suo talento l&apos;ha
                  portata anche in televisione, con partecipazioni a programmi Rai come Raccomandati condotto da
                  Carlo Conti e alla serie TV L&apos;Avvocato Malinconico.
                </p>
                <p className="font-sans text-sm text-[#B8A080] leading-relaxed mb-4">
                  Nel novembre 2024 ha portato a termine la Maratona di New York — un&apos;impresa che racconta
                  meglio di qualsiasi parola la sua filosofia di vita e di insegnamento.
                </p>
                <div style={{ borderTop: "1px solid #2A2010" }} className="my-6" />
                <h3 className="font-serif text-xl text-[#C9980A] mb-4">La Nostra Storia</h3>
                <p className="font-sans text-sm text-[#B8A080] leading-relaxed mb-4">
                  L&apos;Ateneo nasce nel settembre 1999 da un sogno semplice e potente: creare ad Agropoli un luogo
                  dove chiunque — bambino o adulto, principiante o esperto — potesse scoprire la propria creatività
                  e trovare la propria espressione artistica.
                </p>
                <p className="font-sans text-sm text-[#B8A080] leading-relaxed mb-4">
                  In oltre venticinque anni, la scuola è cresciuta fino a diventare un punto di riferimento per la
                  danza e la formazione nel Cilento. Oggi L&apos;Ateneo conta due sedi in Via Moio, un team di
                  insegnanti esperti e centinaia di allievi che ogni anno salgono sul palcoscenico per gli spettacoli annuali.
                </p>
                <p className="font-sans text-sm text-[#B8A080] leading-relaxed mb-4">
                  La nostra missione non è cambiata dal primo giorno: offrire una formazione di alta qualità in un
                  ambiente accogliente e professionale, dove ogni allievo si senta a casa e possa dare il meglio di sé.
                </p>
              </div>
            </div>
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
              Dalla danza classica al fitness, offriamo un percorso completo per ogni et&agrave; e livello
            </p>
          </div>

          {courseCategories.map((category, catIndex) => {
            let previousCoursesCount = 0
            for (let i = 0; i < catIndex; i++) {
              previousCoursesCount += courseCategories[i].courses.length
            }

            const isCategoryHiddenOnMobile = !coursesExpanded && previousCoursesCount >= 6

            return (
              <div key={catIndex} className={`${catIndex > 0 ? "mt-12" : ""} ${isCategoryHiddenOnMobile ? "hidden md:block" : "block"}`}>
                <div className="uppercase text-xs tracking-widest text-[#C9980A] mb-3">
                  {category.label}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.courses.map((course, index) => {
                    const globalIdx = previousCoursesCount + index
                    const isHiddenOnMobile = !coursesExpanded && globalIdx >= 6
                    return (
                      <div
                        key={index}
                        className={`group bg-[#0A0905] border border-[#2A2010] border-l-[3px] border-l-transparent rounded-sm p-6 transition-all duration-300 hover:bg-[#120F06] hover:border-l-[#C9980A] ${isHiddenOnMobile ? "hidden md:block" : "block"}`}
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
                              {course.icon}
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
                          Richiedi Info
                          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {!coursesExpanded && (
            <div className="mt-12 text-center md:hidden">
              <button
                onClick={() => setCoursesExpanded(true)}
                className="bg-[#C9980A] hover:bg-[#C9980A]/90 text-[#0A0905] px-8 py-3 rounded-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                Vedi tutti i corsi
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Mamma e Figlia Section */}
      <section
        id="mamma-e-figlia"
        ref={(el) => { sectionRefs.current["mamma-e-figlia"] = el }}
        className={`pt-24 pb-12 bg-[#0A0905] border-t border-b border-[#2A2010] transition-all duration-700 ${visibleSections.has("mamma-e-figlia") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold italic text-[#F5EDD8] mb-4">
              Mentre Lei Danza, Tu Ti Prendi Cura di Te
            </h2>
            <p className="font-sans font-light text-lg text-[#B8A080] max-w-2xl mx-auto">
              Due percorsi paralleli, un'unica esperienza da condividere. Porta tua figlia all'Ateneo e approfitta del tempo per te stessa.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start relative">
            {/* Left Column — Per le Bambine */}
            <div className="flex flex-col">
              <Star className="w-8 h-8 text-[#C9980A] mb-3" />
              <span className="font-sans text-xs tracking-widest text-[#C9980A] uppercase mb-3">
                PER LE BAMBINE
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F5EDD8] mb-4">
                Danza, Musical e Creatività
              </h3>
              <p className="font-sans text-sm text-[#B8A080] leading-relaxed mb-6">
                Mentre tu ti alleni, le tue bambine vivono la magia della danza. Predanza e Baby Dance per le più piccole, Danza Classica, Moderna e Hip Hop, Laboratori Musicali e Teatrali — tutto in un ambiente sicuro, professionale e pieno di gioia.
              </p>
              <a href="#contatti" className="text-sm font-semibold text-[#C9980A] hover:text-[#C9980A]/80 transition-colors mt-2 inline-block">
                Iscriviti →
              </a>
            </div>

            {/* Desktop Divider */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 border-l border-[#2A2010] -translate-x-1/2" />

            {/* Right Column — Per le Mamme */}
            <div className="flex flex-col lg:pl-12">
              <Heart className="w-8 h-8 text-[#C9980A] mb-3" />
              <span className="font-sans text-xs tracking-widest text-[#C9980A] uppercase mb-3">
                PER LE MAMME
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F5EDD8] mb-4">
                Benessere e Fitness
              </h3>
              <p className="font-sans text-sm text-[#B8A080] leading-relaxed mb-6">
                Gli orari dei corsi sono pensati in parallelo — così mentre tua figlia balla, tu puoi dedicare del tempo al tuo benessere. Pilates, Aerobica, Step e Movimento Dolce: scegli il percorso più adatto a te e torna a casa rigenerata.
              </p>
              <a href="#contatti" className="text-sm font-semibold text-[#C9980A] hover:text-[#C9980A]/80 transition-colors mt-2 inline-block">
                Iscriviti →
              </a>
            </div>
          </div>


        </div>
      </section>

      {/* Prima Lezione Gratuita CTA Banner 1 */}
      <section className="bg-[#C9980A]/10 border-t border-b border-[#C9980A]/20 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-foreground text-lg sm:text-xl mb-4">
            La prima lezione &egrave; gratuita &mdash; vieni a trovarci
          </p>
          <a
            href="#contatti"
            className="inline-block bg-[#C9980A] hover:bg-[#C9980A]/90 text-[#0A0905] px-8 py-3 rounded-sm font-semibold transition-colors"
          >
            Prenota Ora
          </a>
        </div>
      </section>

      {/* Formazione Professionale Section */}
      <section
        id="formazione"
        ref={(el) => { sectionRefs.current["formazione"] = el }}
        className={`py-20 sm:py-28 bg-card transition-all duration-700 ${visibleSections.has("formazione") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left lg:text-center mb-16 px-4 lg:px-0">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5EDD8] mb-4 text-left lg:text-center">Formazione Professionale</h2>
            <p className="text-[#F5EDD8] text-lg max-w-none lg:max-w-2xl lg:mx-auto text-pretty">
              Corsi riconosciuti dalla federazione Opes Danza per futuri danzatori e insegnanti
            </p>
          </div>

          <div className="bg-[#0A0905] border border-[#2A2010] rounded-sm p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Column 1 */}
              <div>
                <GraduationCap className="w-8 h-8 text-[#C9980A] mb-3" />
                <h3 className="font-serif text-2xl font-bold text-[#C9980A] mb-6">Per Futuri Danzatori</h3>
                <ul className="space-y-3">
                  {["Corso di Danza Professionale", "Corso di Coreografia", "Corso di Tecnica di Danza"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C9980A]">&#10003;</span>
                      <span className="text-[#B8A080] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Column 2 */}
              <div>
                <BookOpen className="w-8 h-8 text-[#C9980A] mb-3" />
                <h3 className="font-serif text-2xl font-bold text-[#C9980A] mb-6">Per Futuri Docenti</h3>
                <ul className="space-y-3">
                  {[
                    "Corso di Metodologia dell\u2019Insegnamento della Danza",
                    "Corso di Didattica della Danza",
                    "Corso di Preparazione all\u2019Esame di Stato per l\u2019Insegnamento della Danza",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C9980A]">&#10003;</span>
                      <span className="text-[#B8A080] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Divider */}
            <div className="border-t border-[#2A2010] mt-8 mb-6" />
            {/* Footer text */}
            <p className="text-[#B8A080] text-sm italic text-center mb-6">
              Per informazioni sui corsi e sui docenti contattaci direttamente
            </p>
            {/* CTA button */}
            <div className="flex justify-center">
              <a
                href="#contatti"
                className="px-8 py-3 rounded-sm text-[#C9980A] border border-[#C9980A] bg-transparent hover:bg-[#C9980A] hover:text-[#0A0905] transition-colors"
              >
                Contattaci per Info
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-3 mt-8">
              <p className="text-xs font-sans uppercase tracking-wider text-[#B8A080]">
                Scuola Certificata
              </p>
              <Image
                src="/opeslogo.png"
                alt="Opes Danza - Scuola Certificata"
                width={120}
                height={120}
                className="object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        ref={(el) => { sectionRefs.current["team"] = el }}
        className={`py-24 transition-all duration-700 ${visibleSections.has("team") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        style={{ background: "#0F0E0A", borderTop: "1px solid #2A2010" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left lg:text-center mb-16 px-4 lg:px-0">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 text-left lg:text-center">Il Nostro Team</h2>
            <p className="text-[#F5EDD8] text-lg max-w-none lg:max-w-2xl lg:mx-auto text-pretty text-left lg:text-center">
              Professionisti appassionati al tuo servizio
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                photo: "/amedeomonzo.jpeg",
                name: "Amedeo Monzo",
                role: "Insegnante di Danza",
                bio: "Amedeo Monzo è un danzatore professionista con un curriculum di altissimo livello. Ha calcato i palcoscenici più prestigiosi d'Italia ed Europa, collaborando con artisti come Gigi D'Alessio e Claudio Baglioni, e partecipando all'XFactor Italy Final. Ha danzato per brand iconici come Dolce & Gabbana, Fendi e Moncler, e nel 2025 ha recitato nel film \"The Saints\", prodotto da Martin Scorsese. Porta all'Ateneo un'energia unica e un'esperienza internazionale rara.",
              },
              {
                photo: "/carolinaMonzo.jpg",
                name: "Carolina Monzo",
                role: "Insegnante di Danza e Recitazione",
                bio: "Carolina Monzo è originaria di Agropoli — ha mosso i suoi primi passi di danza proprio qui all'Ateneo all'età di tre anni. La sua formazione l'ha portata alle più prestigiose istituzioni italiane: la Scuola di Danza del Teatro dell'Opera di Roma e l'Accademia Nazionale di Danza. Ha calcato palcoscenici internazionali con lo spettacolo \"Marenostrum\" tra Barcellona, Tunisi e Salerno, e ha partecipato a produzioni RAI e videoclip di artisti come Tropico e Rossella Brescia. Insegna anche Heels — una delle discipline più richieste del momento.",
              },
              {
                photo: "/federicabarretta.jpeg",
                name: "Federica Barretta",
                role: "Insegnante di Danza Classica e Contemporanea",
                bio: "Federica Barretta è diplomata al Liceo Coreutico di Salerno con indirizzo Contemporaneo e diplomata Accademia Abracadanza con Stefania Ciancio. Tecnico certificato in Danza Moderna, ha affinato la sua formazione con maestri di rilievo come Francesco Ventriglia, Luca Calzolaro e Fabrizio Esposito. Dal 2021 insegna danza classica e contemporanea all'Ateneo di Rita Polidoro, portando in sala un approccio empatico e attento alle esigenze di ogni allievo.",
              },
              {
                photo: "/GiorgioSannino.jpg",
                name: "Giorgio Sannino",
                role: "Insegnante di Danza Classica e Contemporanea",
                bio: "Giorgio Sannino è un danzatore classico e contemporaneo formatosi presso istituzioni di primo piano a Napoli, tra cui il Teatro San Carlo e la Crown Ballet School diretta da Luigi Ferrone. Specializzato in danza classica, contemporanea e modern, ha approfondito la sua tecnica con maestri internazionali come Vladimir Derevianko e Mauro Astolfi. Ha fatto parte della compagnia Kataklo' di danza contemporanea e ha partecipato alla produzione di Giselle con il Nuovo Balletto Italiano. Porta all'Ateneo una solida preparazione accademica e una profonda conoscenza delle tecniche classiche e contemporanee.",
              },
            ].map((member, idx) => (
              <div
                key={member.name}
                className="rounded-sm overflow-hidden transition-all duration-300 flex flex-col"
                style={{
                  background: "#0A0905",
                  border: "1px solid #2A2010",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9980A")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2A2010")}
              >
                <div style={{ maxHeight: "280px", overflow: "hidden" }}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    style={{ aspectRatio: "1 / 1", display: "block" }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="font-serif font-bold text-lg text-[#F5EDD8] mb-1">{member.name}</p>
                  <p className="font-sans text-xs text-[#C9980A] uppercase tracking-wider mb-3">{member.role}</p>
                  <div style={{ borderTop: "1px solid #2A2010" }} className="mb-3" />
                  <p className={`font-sans text-sm text-[#B8A080] leading-relaxed flex-grow ${expandedBios[idx] ? "" : "line-clamp-2 md:line-clamp-none"}`}>
                    {member.bio}
                  </p>
                  <button
                    className="font-sans text-xs text-[#C9980A] cursor-pointer bg-transparent border-none p-0 mt-2 block md:hidden"
                    onClick={() => setExpandedBios(prev => prev.map((v, i) => i === idx ? !v : v))}
                  >
                    {expandedBios[idx] ? "Chiudi ↑" : "Leggi di più ↓"}
                  </button>
                </div>
              </div>
            ))}
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

          <div className="grid md:grid-cols-2 gap-6">
            <ScheduleCard title="Sala Armonia" subtitle="Via Moio, 16" schedule={salaArmoniaSchedule} />
            <ScheduleCard title="Sala Ritmo" subtitle="Via Moio, 16" schedule={salaRitmoSchedule} />
          </div>

          <p className="text-center text-[#B8A080] mt-6 text-sm italic">
            * Gli orari possono variare &mdash; contattaci per confermare. Durante l&apos;anno accademico sono previsti lo Spettacolo Natalizio, lo Spettacolo di Fine Anno e vari eventi socio-culturali.
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
              Scegli la formula più adatta a te. Per informazioni sui costi contattaci direttamente.
            </p>
          </div>

          {/* ROW 1 — Subscription cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                icon: <Ticket size={32} className="text-[#C9980A]" />,
                title: "Lezione Singola",
                description: "Ideale per provare un corso prima di iscriverti. Nessun impegno, massima flessibilità.",
              },
              {
                icon: <Calendar size={32} className="text-[#C9980A]" />,
                title: "Abbonamento Mensile",
                description: "La soluzione più flessibile per chi vuole ballare con regolarità ogni mese.",
              },
              {
                icon: <CalendarRange size={32} className="text-[#C9980A]" />,
                title: "Abbonamento Semestrale",
                description: "Sei mesi di lezioni con un risparmio rispetto all'abbonamento mensile.",
              },
              {
                icon: <Crown size={32} className="text-[#C9980A]" />,
                title: "Abbonamento Annuale",
                description: "La scelta di chi vuole dare continuità al proprio percorso artistico. Massimo risparmio.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-[#0A0905] border border-[#2A2010] p-6 rounded-sm"
                style={{ transition: "border-color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9980A")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2A2010")}
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="font-serif text-lg font-bold text-[#F5EDD8] mb-3">{card.title}</h3>
                <p className="text-[#B8A080] text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          {/* ROW 2 — Discounts info strip */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0A0905] border border-[#2A2010] p-6 mt-6 rounded-sm"
          >
            <div className="flex gap-4">
              <Tag size={28} className="text-[#C9980A] shrink-0 mt-1" />
              <div>
                <h4 className="font-serif font-bold text-[#F5EDD8] mb-2">Tariffe Differenziate</h4>
                <p className="text-[#B8A080] text-sm leading-relaxed">I costi variano in base al corso scelto e all&apos;età dell&apos;allievo. Contattaci per ricevere il preventivo personalizzato.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users size={28} className="text-[#C9980A] shrink-0 mt-1" />
              <div>
                <h4 className="font-serif font-bold text-[#F5EDD8] mb-2">Sconti Famiglia</h4>
                <p className="text-[#B8A080] text-sm leading-relaxed">Sono previste riduzioni speciali per fratelli e/o sorelle e per mamme e figlie che si iscrivono insieme.</p>
              </div>
            </div>
          </div>

          {/* ROW 3 — CTA strip */}
          <div className="text-center mt-8">
            <p className="text-[#B8A080] text-sm italic mb-4">
              Vuoi sapere di più? Contattaci per un preventivo personalizzato — la prima lezione è gratuita.
            </p>
            <a
              href="#contatti"
              className="inline-block rounded-sm"
              style={{ background: "#C9980A", color: "#0A0905", fontWeight: 700, padding: "12px 32px" }}
            >
              Richiedi Informazioni
            </a>
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

          <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
            {[
              { src: "/air_dance_student.jpg", alt: "Studente di danza aerea" },
              { src: "/collage_children_group.jpg", alt: "Gruppo di bambini" },
              { src: "/group_male_female_stuends_stage.jpg", alt: "Studenti sul palco" },
            ].map((image, index) => (
              <button
                key={index}
                onClick={() => setEnlargedPhoto(image.src)}
                className="relative overflow-hidden rounded-sm group aspect-square cursor-zoom-in"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </button>
            ))}
          </div>

          {/* Vedi tutte le foto button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => { setGalleryOpen(true); setVisibleCount(20) }}
              className="px-8 py-3 rounded-sm text-sm font-semibold transition-colors"
              style={{ border: "1px solid #C9980A", color: "#C9980A", background: "transparent" }}
            >
              Vedi tutte le foto
            </button>
          </div>

          <div className="border-t border-[#2A2010] mt-20" />

          {/* Instagram Reels Subsection */}
          <div className="mt-0 pb-20">
            <div className="text-left lg:text-center mb-12 px-4 lg:px-0">
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5EDD8] mb-4 text-left lg:text-center">I Nostri Video</h2>
              <p className="text-[#F5EDD8] text-lg max-w-none lg:max-w-2xl lg:mx-auto text-pretty">
                L&apos;Ateneo in scena — momenti di passione e talento
              </p>
            </div>
            <div className={reelsExpanded ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "flex justify-center"}>
              {([
                { ref: videoRef1, src: "/reel1.mp4", index: 0 },
                { ref: videoRef2, src: "/reel2.mp4", index: 1 },
                { ref: videoRef3, src: "/reel3.mp4", index: 2 },
              ] as { ref: React.RefObject<HTMLVideoElement>; src: string; index: number }[])
                .filter(({ index }) => reelsExpanded || index === 0)
                .map(({ ref, src, index }) => (
                <div key={index} className={`aspect-[9/16] overflow-hidden rounded-sm bg-black relative ${reelsExpanded ? "" : "w-full max-w-sm"}`}>
                  <video
                    ref={ref}
                    src={src}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                    preload="none"
                    onClick={() => {
                      if (ref.current?.paused) ref.current.play()
                      else ref.current?.pause()
                    }}
                    onPlay={() => {
                      setPlayingVideos(prev => new Set(prev).add(index))
                      videoRefs.forEach((r, i) => {
                        if (r.current && i !== index) {
                          r.current.pause()
                          setPlayingVideos(prev => { const s = new Set(prev); s.delete(i); return s })
                        }
                      })
                    }}
                    onPause={() => setPlayingVideos(prev => { const s = new Set(prev); s.delete(index); return s })}
                  />
                  {!playingVideos.has(index) && (
                    <button
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.5)" }}
                      onClick={() => ref.current?.play()}
                      aria-label="Play video"
                    >
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <polygon points="18,12 38,24 18,36" fill="#C9980A" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            {!reelsExpanded && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setReelsExpanded(true)}
                  className="px-8 py-3 rounded-sm text-sm font-semibold transition-colors"
                  style={{ border: "1px solid #C9980A", color: "#C9980A", background: "transparent" }}
                >
                  Vedi altri video
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setGalleryOpen(false) }}
        >
          <button
            onClick={() => setGalleryOpen(false)}
            className="fixed top-6 right-6 z-[110] text-[#F5EDD8] text-3xl font-light hover:opacity-70 transition-opacity"
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>
          <div className="w-full max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allGalleryPhotos.slice(0, visibleCount).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setEnlargedPhoto(src)}
                  className="relative aspect-square overflow-hidden rounded-sm cursor-zoom-in group"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={src}
                      alt={`Gallery photo ${i + 1}`}
                      width={400}
                      height={400}
                      quality={75}
                      loading="lazy"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-400"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </button>
              ))}
            </div>
            {visibleCount < allGalleryPhotos.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount(prev => prev + 20)}
                  className="font-sans font-semibold px-8 py-3"
                  style={{ background: "transparent", border: "1px solid #C9980A", color: "#C9980A" }}
                >
                  Carica altre foto
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enlarged Photo Modal */}
      {enlargedPhoto && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setEnlargedPhoto(null)}
        >
          <button
            onClick={() => setEnlargedPhoto(null)}
            className="fixed top-6 right-6 z-[130] text-[#F5EDD8] text-3xl font-light hover:opacity-70 transition-opacity"
            aria-label="Close photo"
          >
            <X size={32} />
          </button>
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              src={enlargedPhoto}
              alt="Enlarged photo"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}

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
              La nostra pi&ugrave; grande soddisfazione &egrave; il successo e il benessere dei nostri allievi.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {["/testimonial1.jpeg", "/testimonial2.jpeg"].map((src) => (
              <button
                key={src}
                onClick={() => setEnlargedPhoto(src)}
                className="cursor-zoom-in focus:outline-none group max-w-[200px]"
                aria-label="Ingrandisci testimonianza"
              >
                <Image
                  src={src}
                  alt="Testimonianza cliente"
                  width={200}
                  height={280}
                  className="rounded-sm object-contain shadow-lg opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner 2 — Team & Opes certification */}
      <section className="bg-[#C9980A]/10 border-t border-b border-[#C9980A]/20 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-foreground text-lg sm:text-xl mb-1">
            Scuola certificata <span className="text-[#C9980A] font-semibold">Opes Danza</span> &mdash; un team di professionisti al tuo fianco
          </p>
          <p className="text-[#B8A080] text-sm mb-4">Insegnanti con formazione internazionale e anni di palcoscenico</p>
          <a
            href="#team"
            className="inline-block bg-[#C9980A] hover:bg-[#C9980A]/90 text-[#0A0905] px-8 py-3 rounded-sm font-semibold transition-colors"
          >
            Conosci il Team
          </a>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section
        id="contatti"
        ref={(el) => { sectionRefs.current["contatti"] = el }}
        className={`relative z-10 py-24 border-t border-[#2A2010] transition-all duration-700 ${visibleSections.has("contatti") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left lg:text-center mb-16 px-4 lg:px-0">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 text-left lg:text-center">
              Pronti a <span className="text-primary">Ballare</span>?
            </h2>
            <p className="text-[#F5EDD8] text-lg max-w-none lg:max-w-2xl lg:mx-auto text-pretty">
              Iscriviti oggi o vieni a trovarci per una lezione gratuita di prova
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            {formSubmitted ? (
              <div className="text-center py-8">
                <p className="font-sans text-lg" style={{ color: "#C9980A" }}>
                  Grazie! Il tuo messaggio è stato inviato. Ti risponderemo al più presto.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 font-sans text-sm underline cursor-pointer"
                  style={{ color: "#B8A080" }}
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form
                className="space-y-6"
                action="https://formspree.io/f/xpqkjkdn"
                method="POST"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget
                  const nome = (form.elements.namedItem("nome") as HTMLInputElement).value.trim()
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim()
                  const telefono = (form.elements.namedItem("telefono") as HTMLInputElement).value.trim()
                  const corso = (form.elements.namedItem("corso") as HTMLSelectElement).value
                  const errors: { [key: string]: boolean } = {}
                  if (!nome) errors.nome = true
                  if (!email) errors.email = true
                  if (!telefono) errors.telefono = true
                  if (!corso) errors.corso = true
                  if (Object.keys(errors).length > 0) {
                    setFormErrors(errors)
                    return
                  }
                  setFormErrors({})
                  setFormNetworkError(false)
                  const data = new FormData(form)
                  try {
                    const res = await fetch("https://formspree.io/f/xpqkjkdn", {
                      method: "POST",
                      body: data,
                      headers: { Accept: "application/json" },
                    })
                    if (!res.ok) throw new Error("network")
                    setFormSubmitted(true)
                    form.reset()
                  } catch {
                    setFormNetworkError(true)
                  }
                }}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[12px] font-medium text-[#B8A080] tracking-wider uppercase mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="nome"
                      className="w-full bg-card rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                      style={{ border: `1px solid ${formErrors.nome ? "#C8003A" : "#2A2010"}` }}
                      onFocus={() => setFormErrors((prev) => ({ ...prev, nome: false }))}
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
                      name="email"
                      className="w-full bg-card rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                      style={{ border: `1px solid ${formErrors.email ? "#C8003A" : "#2A2010"}` }}
                      onFocus={() => setFormErrors((prev) => ({ ...prev, email: false }))}
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
                      name="telefono"
                      className="w-full bg-card rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                      style={{ border: `1px solid ${formErrors.telefono ? "#C8003A" : "#2A2010"}` }}
                      onFocus={() => setFormErrors((prev) => ({ ...prev, telefono: false }))}
                      placeholder="Il tuo numero"
                    />
                  </div>
                  <div>
                    <label htmlFor="course" className="block text-[12px] font-medium text-[#B8A080] tracking-wider uppercase mb-2">
                      Corso di Interesse
                    </label>
                    <select
                      id="course"
                      name="corso"
                      className="w-full bg-card rounded-sm px-4 py-3 text-foreground focus:outline-none transition-colors"
                      style={{ border: `1px solid ${formErrors.corso ? "#C8003A" : "#2A2010"}` }}
                      onFocus={() => setFormErrors((prev) => ({ ...prev, corso: false }))}
                      defaultValue=""
                    >
                      <option value="" disabled>Seleziona un corso</option>
                      <option value="classica">Danza Classica</option>
                      <option value="moderna">Danza Moderna</option>
                      <option value="contemporanea">Danza Contemporanea</option>
                      <option value="hiphop">Hip Hop</option>
                      <option value="jazz">Jazz</option>
                      <option value="aeree">Discipline Aeree</option>
                      <option value="canto">Corsi di Canto</option>
                      <option value="recitazione">Corsi di Recitazione</option>
                      <option value="musical">Danza per Musical</option>
                      <option value="aerobica">Aerobica & Step</option>
                      <option value="zumba">Zumba</option>
                      <option value="pilates">Pilates</option>
                      <option value="formazione">Formazione Professionale</option>
                      <option value="altro">Altro</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-[12px] font-medium text-[#B8A080] tracking-wider uppercase mb-2">
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    name="messaggio"
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
                {formNetworkError && (
                  <p className="font-sans text-sm mt-3" style={{ color: "#C8003A" }}>
                    Si è verificato un errore. Riprova o scrivici direttamente.
                  </p>
                )}
              </form>
            )}

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Contatti</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4" id="sedi">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-foreground mb-2">Indirizzo</div>
                      <div className="mb-2">
                        <span className="text-xs uppercase tracking-wider text-[#C9980A] mr-2">Sede Storica</span>
                        <span className="text-[#F5EDD8]">Via Moio, 8 &mdash; 84043 Agropoli (SA)</span>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#C9980A] mr-2">Nuova Sala</span>
                        <span className="text-[#F5EDD8]">Via Moio, 16 &mdash; 84043 Agropoli (SA)</span>
                      </div>
                    </div>
                  </div>
                  <a href="tel:+393393565655" className="flex items-start gap-4 group cursor-pointer">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-[#F5EDD8] group-hover:text-[#C9980A] transition-colors">Telefono</div>
                      <div className="text-[#F5EDD8] group-hover:text-[#C9980A] transition-colors">+39 339 356 5655</div>
                    </div>
                  </a>
                  <a href="mailto:ritapolidoro4@gmail.com" className="flex items-start gap-4 group cursor-pointer">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-[#F5EDD8] group-hover:text-[#C9980A] transition-colors">Email</div>
                      <div className="text-[#F5EDD8] group-hover:text-[#C9980A] transition-colors">ritapolidoro4@gmail.com</div>
                    </div>
                  </a>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1 — Logo & Tagline */}
            <div>
              <a href="#" className="flex items-center gap-3 mb-6">
                <img
                  src="/logo2.png"
                  alt="L'Ateneo logo"
                  className="h-20 w-auto object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </a>
              <p className="text-[#B8A080] text-sm max-w-[280px] mt-4 leading-relaxed">
                Da oltre 30 anni, la casa della danza ad Agropoli.
              </p>
              <div className="flex gap-5 mt-6">
                <a href="https://www.instagram.com/ateneodanza/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex flex-col items-center gap-1 text-[#B8A080] hover:text-[#C9980A] transition-colors duration-200">
                  <Instagram size={24} />
                  <span className="font-sans text-xs text-[#B8A080]">Instagram</span>
                </a>
                <a href="https://www.facebook.com/ateneo6" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex flex-col items-center gap-1 text-[#B8A080] hover:text-[#C9980A] transition-colors duration-200">
                  <Facebook size={24} />
                  <span className="font-sans text-xs text-[#B8A080]">Facebook</span>
                </a>
              </div>
            </div>

            {/* Column 2 — Link Rapidi */}
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

            {/* Column 3 — Contatti */}
            <div>
              <h4 className="font-semibold text-[#F5EDD8] mb-6 text-sm uppercase tracking-wider">Contatti</h4>
              <ul>
                <li className="flex items-center gap-2 mb-3">
                  <Phone size={14} className="text-[#C9980A] shrink-0" />
                  <a href="tel:+393393565655" className="text-[#B8A080] text-sm transition-colors duration-200 hover:text-[#C9980A]">
                    +39 339 356 5655
                  </a>
                </li>
                <li className="flex items-center gap-2 mb-3">
                  <Mail size={14} className="text-[#C9980A] shrink-0" />
                  <a href="mailto:ritapolidoro4@gmail.com" className="text-[#B8A080] text-sm transition-colors duration-200 hover:text-[#C9980A]">
                    ritapolidoro4@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-[#C9980A] shrink-0" />
                  <span className="text-[#B8A080] text-sm">Lun — Sab | 10:00 — 21:00</span>
                </li>
              </ul>
            </div>

            {/* Column 4 — Dove Siamo */}
            <div>
              <h4 className="font-semibold text-[#F5EDD8] mb-6 text-sm uppercase tracking-wider">Dove Siamo</h4>
              <p className="text-[#B8A080] text-sm leading-relaxed mb-3">
                Sede Storica: Via Moio, 8<br />
                Nuova Sala: Via Moio, 16<br />
                84043 Agropoli (SA)
              </p>
              <a
                href="https://maps.google.com/?q=Via+Moio+8+Agropoli+SA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#C9980A] hover:text-[#C9980A]/80 transition-colors text-sm font-medium"
              >
                <Map size={14} />
                Vedi su Google Maps
              </a>
            </div>
          </div>

          <div className="border-t border-[#2A2010] pt-8 text-center text-xs text-[#B8A080]">
            &copy; 2026 L&apos;Ateneo Danza Musical e Fitness &middot; Agropoli, Cilento
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
            href="#contatti"
            className="flex-1 flex items-center justify-center bg-[#C9980A] text-[#0A0905] font-semibold transition-colors"
          >
            Iscriviti Ora
          </a>
        </div>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-14 md:hidden" />

      {/* WhatsApp Floating Button */}
      <div
        style={{ position: "fixed", zIndex: 10000 }}
        className="bottom-20 right-4 md:bottom-6 md:right-6 flex items-center gap-2"
        onMouseEnter={() => setWhatsappHover(true)}
        onMouseLeave={() => setWhatsappHover(false)}
      >
        {/* Mobile: static label always visible */}
        <span
          className="md:hidden text-xs px-3 py-1 rounded-sm whitespace-nowrap"
          style={{ background: "#0F0E0A", border: "1px solid #2A2010", color: "#F5EDD8" }}
        >
          WhatsApp
        </span>
        {/* Desktop: label appears on hover */}
        {whatsappHover && (
          <span
            className="hidden md:inline text-xs px-3 py-1 rounded-sm whitespace-nowrap"
            style={{ background: "#0F0E0A", border: "1px solid #2A2010", color: "#F5EDD8" }}
          >
            Scrivici su WhatsApp
          </span>
        )}
        <a
          href="https://wa.me/393393565655"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "#25D366",
            boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
            transform: whatsappHover ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.2s ease",
            cursor: "pointer",
          }}
        >
          <svg viewBox="0 0 24 24" fill="white" width={28} height={28}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* Cookie Consent Banner */}
      {cookieVisible && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "#0F0E0A",
            borderTop: "1px solid #2A2010",
            opacity: cookieFading ? 0 : 1,
            transition: cookieFading ? "opacity 0.3s ease" : "opacity 0.5s ease",
          }}
          className="py-3 px-6 mb-14 md:mb-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
        >
          <p className="font-sans text-sm max-w-2xl line-clamp-2 md:line-clamp-none" style={{ color: "#B8A080" }}>
            🍪 Questo sito utilizza cookie tecnici necessari al funzionamento. Continuando la navigazione accetti il loro utilizzo.
          </p>
          <div className="flex flex-row md:flex-row gap-2 md:gap-3 w-full md:w-auto">
            <button
              onClick={acceptCookies}
              className="flex-1 md:flex-none md:w-auto rounded-sm font-bold px-6 py-2"
              style={{ background: "#C9980A", color: "#0A0905", fontWeight: 700 }}
            >
              Accetta
            </button>
            <a
              href="/privacy-policy"
              className="flex-1 md:flex-none md:w-auto rounded-sm text-center px-6 py-2"
              style={{ background: "transparent", color: "#B8A080", border: "1px solid #2A2010" }}
            >
              Scopri di più
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
