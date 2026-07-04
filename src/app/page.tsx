"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Hero Slides Data
const heroSlides = [
  {
    id: 1,
    title: "AI Smart Glasses",
    description: "Hands-free spatial audio navigation and reading assistant",
    src: "/hero-slide-1.png",
  },
  {
    id: 2,
    title: "HD Video Magnifier",
    description: "HD tabletop visual enhancement system with contrast filters",
    src: "/hero-slide-2.png",
  },
  {
    id: 3,
    title: "Braille Touch Reader",
    description: "Portable refreshable braille display and productivity suite",
    src: "/hero-slide-3.png",
  },
  {
    id: 4,
    title: "Sonic White Cane",
    description: "Haptic feedback obstacle detection and orientation tools",
    src: "/hero-slide-4.png",
  }
];
import {
  Menu,
  X,
  Award,
  Headphones,
  Truck,
  Sparkles,
  Eye,
  Glasses,
  BookOpen,
  Search,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Star,
  Volume2,
  Compass,
  Mail,
  Phone,
  Printer,
  CheckCircle2,
  ArrowUpRight,
  Send,
  Calendar,
  ShieldCheck,
  User,
  Quote
} from "lucide-react";

// Types
interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  badge?: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

interface BlogPost {
  id: number;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  imagePlaceholderColor: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Mock Data (Static)
const features = [
  {
    title: "Certified Quality",
    description: "FDA-approved and medically certified devices vetted by vision specialists worldwide.",
    icon: <Award className="w-6 h-6 text-primary" />,
    color: "from-purple-500/10 to-indigo-500/10"
  },
  {
    title: "Trusted Support",
    description: "Lifetime expert assistance and step-by-step personalized training for every device.",
    icon: <Headphones className="w-6 h-6 text-indigo-600" />,
    color: "from-blue-500/10 to-indigo-500/10"
  },
  {
    title: "Accessible Innovation",
    description: "Constantly pioneering AI and multi-sensory features tailored to low vision needs.",
    icon: <Sparkles className="w-6 h-6 text-accent" />,
    color: "from-indigo-500/10 to-purple-500/10"
  }
];

const categories = [
  {
    title: "Blindness Products",
    description: "Multi-line tactile braille displays, voice recorders, text OCR readers, haptic tools, and physical coding suites.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    tag: "Tactile & Audio",
    items: ["Braille Note Touch Evolve", "Victor Reader Stream 3", "Mantis Q40 braille display", "Code Jumper"]
  },
  {
    title: "Low Vision Products",
    description: "High-definition portable and desktop video magnifiers with customizable contrast, distance cameras, and text-to-speech.",
    icon: <Eye className="w-8 h-8 text-indigo-600" />,
    tag: "HD Optics",
    items: ["Connect 12 Magnifier", "Explore 12 Foldable stand", "Explore 8 Handheld screen", "Reveal 16 Desktop reader"]
  },
  {
    title: "Index Braille Embosser",
    description: "Double-sided braille printers, tractor and sheet-fed embossers, sound-dampening acoustic cabinets, and translation software.",
    icon: <Printer className="w-8 h-8 text-accent" />,
    tag: "Tactile Print",
    items: ["Index Everest-D V5", "Index Basic-D V5", "Braille Label Printer", "Duxbury Translation Software"]
  }
];

const products: Product[] = [
  {
    id: 1,
    name: "Braille Note Touch Evolve",
    category: "Blindness Products",
    description: "Revolutionary braille tablet featuring a touchscreen combined with a physical braille keyboard.",
    price: "$5,495",
    rating: 4.9,
    reviews: 142,
    badge: "Flagship",
    icon: <BookOpen className="w-12 h-12 text-primary" />
  },
  {
    id: 2,
    name: "Brilliant BI 40 cell",
    category: "Blindness Products",
    description: "Ergonomic 40-cell braille display with text-to-speech translation and seamless screen reader pairing.",
    price: "$2,395",
    rating: 4.9,
    reviews: 64,
    badge: "Popular",
    icon: <BookOpen className="w-12 h-12 text-primary" />
  },
  {
    id: 3,
    name: "Victor Reader Stream 3",
    category: "Blindness Products",
    description: "The gold standard portable media player for blind users, supporting DAISY, audiobooks, and podcasts.",
    price: "$429",
    rating: 4.8,
    reviews: 118,
    icon: <Volume2 className="w-12 h-12 text-primary" />
  },
  {
    id: 4,
    name: "Connect 12",
    category: "Low Vision Products",
    description: "12-inch smart digital magnifier and tablet with distance viewing camera capabilities.",
    price: "$2,995",
    rating: 4.8,
    reviews: 96,
    badge: "Clinical Pick",
    icon: <Eye className="w-12 h-12 text-indigo-600" />
  },
  {
    id: 5,
    name: "Explore 8",
    category: "Low Vision Products",
    description: "Lightweight 8-inch HD handheld video magnifier with touchscreen control and twin cameras.",
    price: "$895",
    rating: 4.7,
    reviews: 83,
    icon: <Eye className="w-12 h-12 text-indigo-600" />
  },
  {
    id: 6,
    name: "Explore 5",
    category: "Low Vision Products",
    description: "Ultra-portable 5-inch handheld electronic magnifier featuring simple buttons and comfort handle.",
    price: "$399",
    rating: 4.8,
    reviews: 154,
    badge: "Bestseller",
    icon: <Glasses className="w-12 h-12 text-indigo-600" />
  },
  {
    id: 7,
    name: "Index Everest-D V5",
    category: "Index Braille Embosser",
    description: "The most versatile double-sided sheet-fed braille printer, using standard paper sheets.",
    price: "$4,495",
    rating: 4.9,
    reviews: 72,
    badge: "Premium Choice",
    icon: <Printer className="w-12 h-12 text-accent" />
  },
  {
    id: 8,
    name: "Braille Label Printer",
    category: "Index Braille Embosser",
    description: "Handheld tactile labeler for writing custom braille stickers to label home and office items.",
    price: "$149",
    rating: 4.6,
    reviews: 49,
    icon: <Printer className="w-12 h-12 text-accent" />
  }
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The VisionEye Smart Glasses completely changed how I navigate my neighborhood. I can read street signs, identify items in the grocery store, and feel confident leaving my house independently.",
    author: "Sarah Jenkins",
    role: "Independent Advocate",
    location: "San Francisco, CA",
    rating: 5
  },
  {
    id: 2,
    quote: "As an educator, the BrailleLink Note Touch has made lesson planning and reading accessible for my blind and visually impaired students. The integration with standard classroom tech is seamless.",
    author: "Marcus Vance",
    role: "Special Education Instructor",
    location: "Chicago, IL",
    rating: 5
  },
  {
    id: 3,
    quote: "I bought the ClearView HD Magnifier for my grandfather who has macular degeneration. He is reading his favorite morning newspapers and viewing family photo albums independently again.",
    author: "Elena Rostova",
    role: "Family Caregiver",
    location: "Boston, MA",
    rating: 5
  }
];

const partners = [
  "World Blind Union",
  "National Federation of the Blind",
  "RNIB Supporting People",
  "American Foundation for the Blind",
  "Vision Health Institute"
];

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Are these assistive products covered by health insurance or Medicare?",
    answer: "Many of our products qualify for funding through vocational rehabilitation, private insurance plans, and regional accessibility grants. Under certain medical conditions, Medicare or Medicaid may provide partial coverage for assistive magnifiers. We provide full documentation and assistance in preparing your insurance claims."
  },
  {
    id: 2,
    question: "Do you provide training on how to use complex electronic braille and AI devices?",
    answer: "Absolutely. Every premium device purchase includes 3 free hours of 1-on-1 virtual training with a certified Assistive Technology specialist. We also host an extensive library of step-by-step video tutorials, audio manuals, and high-contrast Braille quick-start guides to make learning simple and self-paced."
  },
  {
    id: 3,
    question: "What is your warranty, return, and trial policy?",
    answer: "We offer a 30-day risk-free satisfaction guarantee. If a device doesn't fit your needs, you can return it within 30 days for a full refund. Furthermore, all devices come standard with a 2-year comprehensive manufacturer warranty covering parts, labor, and firmware upgrades."
  },
  {
    id: 4,
    question: "Are these products suitable for both macular degeneration and complete blindness?",
    answer: "Yes, our catalog is designed to span the entire spectrum of visual impairments. For individuals with low vision, cataracts, or macular degeneration, our Electronic Magnifiers offer contrast and text enhancement. For individuals with profound vision loss or complete blindness, our AI Smart Glasses and Braille/Tactile Devices provide audio narration, obstacle detection, and text-to-braille conversion."
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterSubscribing, setNewsletterSubscribing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Hero Image Slider State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Swipe support for Lightbox
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Form states for Consultation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: "",
    notes: ""
  });
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [formErrors, setFormErrors] = useState<string | null>(null);

  // Handle header background on scroll (retained for backward compatibility or scroll effects in page)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero Slider Autoplay
  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isLightboxOpen]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      setLightboxIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    } else if (diff < -50) {
      setLightboxIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // FAQ Toggle
  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // Newsletter Submit with loading effect
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribing(true);
      setTimeout(() => {
        setNewsletterSubscribing(false);
        setNewsletterSubscribed(true);
        setNewsletterEmail("");
        setTimeout(() => setNewsletterSubscribed(false), 5000);
      }, 1200);
    }
  };

  // Consultation Form change handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Consultation Form Submit with thinking/loading state
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) {
      setFormErrors("Please enter at least First Name, Email, and Phone Number.");
      return;
    }
    setFormErrors(null);
    setIsScheduling(true);

    setTimeout(() => {
      setIsScheduling(false);
      setIsScheduled(true);
    }, 1800);
  };



  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Background gradients/blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Empowering Accessibility
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-[1.15] text-slate-900 tracking-tight mb-6">
              Making Everyday Life Easier with{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Shop 4 Special
              </span>{" "}
              Solutions
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Discover innovative assistive products designed to improve independence, accessibility, and quality of life for people with low vision and blindness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#products"
                className="px-8 py-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-center tracking-wide shadow-xl shadow-purple-500/25 hover:shadow-purple-500/35 transition-all hover:-translate-y-0.5"
              >
                Explore Products
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/50 text-slate-700 hover:text-primary font-bold text-center transition-all hover:bg-slate-50/50 shadow-sm"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* Hero Right Content (Floating 3D Illustration) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex justify-center relative"
          >
            {/* Ambient Background Glow for Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-purple-300/30 to-indigo-300/30 rounded-[2.5rem] blur-2xl -z-10 animate-pulse-slow" />
            
            <div className="relative w-full max-w-[500px] aspect-square rounded-[2rem] overflow-hidden glass-panel shadow-2xl p-4 flex flex-col items-center justify-center animate-float border border-white/60 group/slider">
              
              {/* Slides Wrapper */}
              <div className="relative w-full h-[85%] cursor-zoom-in overflow-hidden rounded-2xl" onClick={() => {
                setLightboxIndex(currentHeroSlide);
                setIsLightboxOpen(true);
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroSlide}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={heroSlides[currentHeroSlide].src}
                      alt={heroSlides[currentHeroSlide].title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-contain p-2 hover:scale-102 transition-transform duration-500"
                    />
                    
                    {/* Slide Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/60 to-transparent p-4 text-white text-left">
                      <h4 className="text-sm font-bold font-display">{heroSlides[currentHeroSlide].title}</h4>
                      <p className="text-[10px] text-slate-200 line-clamp-1">{heroSlides[currentHeroSlide].description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/75 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 cursor-pointer z-10"
                aria-label="Previous Slide"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentHeroSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/75 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 cursor-pointer z-10"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2 mt-4 z-10">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentHeroSlide(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      currentHeroSlide === i ? "bg-primary w-5" : "bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Orbiting Glass Cards/Tags */}
            <div className="absolute -top-4 -right-2 glass-panel p-3.5 rounded-2xl shadow-lg border border-white/80 animate-float-delayed">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">System State</p>
                  <p className="text-xs font-bold text-slate-800">100% Calibrated</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 glass-panel p-3.5 rounded-2xl shadow-lg border border-white/80 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Interface</p>
                  <p className="text-xs font-bold text-slate-800">Spatial Audio Enabled</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE CARDS (4) */}
      <section className="py-12 bg-white/40 border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.a
                key={idx}
                href={idx === 0 ? "#about" : idx === 1 ? "#contact" : "#products"}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl p-6 glass-panel hover:bg-white/85 shadow-md hover:shadow-xl transition-all duration-300 border border-white/60 flex flex-col gap-4 hover:-translate-y-1 text-left cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300 flex items-center justify-center shadow-inner">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-primary transition-colors mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-2">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-dark transition-colors">
                    {idx === 0 ? "Learn Verification Details" : idx === 1 ? "Schedule Consultation" : "View Devices Catalog"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section id="services" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Specialized Care & Tech
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            Engineered for Sensory Independence
          </h3>
          <p className="text-slate-500 mt-4 text-base leading-relaxed">
            Our products span specialized assistive categories to help you read, write, learn, navigate, and communicate with maximum autonomy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => {
                const categoryNames = ["Blindness Products", "Low Vision Products", "Index Braille Embosser"];
                setSelectedCategory(categoryNames[idx]);
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-[2rem] p-8 glass-panel shadow-lg border border-white/80 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start group cursor-pointer hover:-translate-y-1 text-left"
            >
              <div className="p-4 rounded-2xl bg-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                {category.icon}
              </div>
              <div className="flex-1 w-full flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h4 className="text-xl font-bold font-display text-slate-900 group-hover:text-primary transition-colors">
                      {category.title}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/10">
                      {category.tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {category.description}
                  </p>
                </div>
                <div className="border-t border-slate-100/80 pt-4 mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Offerings</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary group-hover:underline transition-colors">
                      Filter Catalog
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BEST SELLING PRODUCTS */}
      <section id="products" className="py-20 md:py-28 bg-gradient-to-b from-transparent via-white/70 to-transparent relative z-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Best Sellers
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900">
                Empower Your Sight
              </h3>
              <p className="text-slate-500 mt-2 text-base max-w-xl">
                Browse our most trusted and popular assistive solutions chosen by thousands of families and vision centers globally.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 group text-sm font-bold text-primary hover:text-primary-dark transition-colors"
            >
              Request Custom Catalog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-slate-100/80">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                selectedCategory === null
                  ? "bg-primary text-white border-primary shadow-md shadow-purple-500/10 scale-102"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              All Solutions
            </button>
            {["Blindness Products", "Low Vision Products", "Index Braille Embosser"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-white border-primary shadow-md shadow-purple-500/10 scale-102"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {products
                .filter((product) => selectedCategory === null || product.category === selectedCategory)
                .map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group rounded-3xl p-6 bg-white border border-slate-100 hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full aspect-square rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-brand-light/30 transition-colors duration-300">
                        {product.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-primary text-white tracking-wide shadow-sm">
                            {product.badge}
                          </span>
                        )}
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100/50 group-hover:scale-105 transition-transform duration-300">
                          {product.icon}
                        </div>
                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                        {product.category}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mt-1 mb-2">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Investment</p>
                        <p className="text-lg font-bold text-slate-900">{product.price}</p>
                      </div>
                      <button
                        onClick={() => {
                          const categoryMap: { [key: string]: string } = {
                            "Blindness Products": "blindness",
                            "Low Vision Products": "lowvision",
                            "Index Braille Embosser": "embosser"
                          };
                          const catValue = categoryMap[product.category] || "";
                          setFormData({
                            ...formData,
                            category: catValue,
                            notes: `I would like to request a free virtual demo for the ${product.name}.`
                          });
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center text-slate-500 hover:scale-105 cursor-pointer"
                        aria-label={`Book demo for ${product.name}`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Why Choose Us Left */}
          <div className="lg:col-span-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Why Choose Us
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
              Empowering Lives Beyond the Visible Spectrum
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              At Shop 4 Special, we do not just sell technology; we build custom paths to everyday freedom. Our devices utilize advanced sensors, artificial intelligence, and tactile feedback to substitute or enhance visual pathways.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Accessibility-First Design Principles",
                  desc: "Every button, tone, texture, and pixel is custom-engineered for low visual acuity and blind ergonomics."
                },
                {
                  title: "1-on-1 Specialist Training Program",
                  desc: "We ensure you feel fully confident using your device with personalized guided setup and audio tutorials."
                },
                {
                  title: "Insurance & Grant Guidance Support",
                  desc: "Our accessibility specialists guide you through applying for insurance reimbursement or grant programs."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Right */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Outer decorative borders */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-[2.5rem] border-2 border-indigo-100 -z-10" />
              
              <div className="rounded-[2.5rem] bg-gradient-to-tr from-primary to-accent p-8 text-white shadow-2xl relative overflow-hidden">
                {/* Visual glass circles */}
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-indigo-900/20 rounded-full blur-xl" />

                <div className="relative z-10 flex flex-col gap-6">
                  <span className="px-3.5 py-1 rounded-full bg-white/15 text-xs font-bold tracking-wide w-fit">
                    Verified Outcomes
                  </span>
                  
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed font-display">
                    &ldquo;Independence is not about doing everything alone. It&rsquo;s about choosing how you want to connect with the world around you.&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3 border-t border-white/20 pt-6">
                    <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center text-white font-bold text-lg">
                      S4S
                    </div>
                    <div>
                      <p className="font-bold text-base">Shop 4 Special Specialist Council</p>
                      <p className="text-xs text-purple-100 font-medium">Assisting Worldwide Since 2018</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center mt-4">
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                      <p className="text-2xl md:text-3xl font-extrabold font-display">15k+</p>
                      <p className="text-[10px] uppercase font-semibold text-purple-100 tracking-wider mt-1">Lives Changed</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                      <p className="text-2xl md:text-3xl font-extrabold font-display">99%</p>
                      <p className="text-[10px] uppercase font-semibold text-purple-100 tracking-wider mt-1">Satisfaction</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                      <p className="text-2xl md:text-3xl font-extrabold font-display">25+</p>
                      <p className="text-[10px] uppercase font-semibold text-purple-100 tracking-wider mt-1">Awards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-white/30 border-y border-slate-100 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Testimonials
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900">
              Stories of Real Freedom
            </h3>
          </div>

          <div className="relative glass-panel rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/80 overflow-hidden">
            {/* Top quote icon */}
            <Quote className="absolute right-8 top-8 w-24 h-24 text-slate-200/50 -z-10" />

            <div className="min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex gap-1 mb-6 text-amber-400">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-8">
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-lg">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-950 text-base">{testimonials[activeTestimonial].author}</p>
                      <p className="text-xs text-slate-500 font-medium">
                        {testimonials[activeTestimonial].role} &bull; {testimonials[activeTestimonial].location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Indicators */}
              <div className="flex items-center justify-between border-t border-slate-100 mt-8 pt-6">
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeTestimonial === i ? "bg-primary w-8" : "bg-slate-200 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setActiveTestimonial(
                        activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1
                      )
                    }
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-xl bg-white border border-slate-100 hover:border-primary/20 text-slate-600 hover:text-primary transition-all flex items-center justify-center shadow-sm"
                  >
                    <ChevronDown className="w-5 h-5 rotate-90" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveTestimonial(
                        activeTestimonial === testimonials.length - 1 ? 0 : activeTestimonial + 1
                      )
                    }
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-xl bg-white border border-slate-100 hover:border-primary/20 text-slate-600 hover:text-primary transition-all flex items-center justify-center shadow-sm"
                  >
                    <ChevronDown className="w-5 h-5 -rotate-90" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS LOGO STRIP */}
      <section className="py-12 bg-white/10 relative z-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Working Hand-in-Hand with Leading Organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {partners.map((partner, idx) => (
              <span
                key={idx}
                className="text-base md:text-lg font-bold font-display tracking-tight text-slate-500 hover:text-primary transition-colors cursor-default select-none"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ SECTION */}
      <section className="py-20 md:py-28 bg-white/40 border-y border-slate-100 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              FAQ
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 hover:text-primary transition-colors"
                  >
                    <span className="text-base md:text-lg">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "transform rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-sm md:text-base text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 md:py-24 max-w-5xl mx-auto px-6">
        <div className="relative rounded-[2.5rem] bg-gradient-to-tr from-primary to-accent p-8 md:p-16 text-white shadow-2xl overflow-hidden text-center">
          <div className="absolute -left-16 -bottom-16 w-52 h-52 bg-white/10 rounded-full blur-2xl -z-10" />
          <div className="absolute -right-16 -top-16 w-52 h-52 bg-indigo-900/30 rounded-full blur-2xl -z-10" />

          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6 border border-white/20">
              <Mail className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold font-display mb-3">
              Join Our Accessibility Newsletter
            </h3>
            <p className="text-purple-100 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Get bi-weekly updates on modern low vision clinical breakthroughs, product discounts, and tips for tactile and digital integration.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-purple-200 text-white focus:outline-none focus:ring-2 focus:ring-white/40 font-medium text-sm text-left"
              />
              <button
                type="submit"
                disabled={newsletterSubscribing}
                className="px-6 py-4 rounded-xl bg-white text-primary font-bold text-sm hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap group disabled:opacity-85"
              >
                {newsletterSubscribing ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {newsletterSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-xs font-semibold text-green-200 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20"
                >
                  Thank you! You have successfully subscribed to our updates.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Get in Touch
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
              Let&rsquo;s Discuss Your Vision Support Plan
            </h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              Have questions about device specifications, regional grant applications, or need to schedule a product trial? Reach out to our dedicated support coordinators.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-primary flex items-center justify-center shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Call Support</p>
                  <a href="tel:9891745757" className="text-base font-bold text-slate-800 hover:text-primary transition-colors">
                    +91 98917 45757
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Support Email</p>
                  <a href="mailto:support@shop4special.org" className="text-base font-bold text-slate-800 hover:text-primary transition-colors">
                    support@shop4special.org
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Secure Trial Policy</p>
                  <p className="text-sm font-bold text-slate-800">
                    30-Day Money-Back Guarantee on All Orders
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-panel p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/80">
              <h4 className="text-xl font-bold font-display text-slate-900 mb-6">
                Request Free Virtual Demo
              </h4>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {formErrors && (
                  <div className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                    {formErrors}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      required
                      placeholder="Jane"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      placeholder="jane.doe@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Interested Device Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm text-slate-600 appearance-none"
                  >
                    <option value="">Select options...</option>
                    <option value="blindness">Blindness Products</option>
                    <option value="lowvision">Low Vision Products</option>
                    <option value="embosser">Index Braille Embosser</option>
                    <option value="other">General consultation</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Describe Your Accessibility Needs</label>
                  <textarea
                    rows={4}
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    placeholder="Tell us about your or your family member's vision profile..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isScheduling}
                  className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all flex items-center justify-center gap-2 mt-2 group disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {isScheduling ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Scheduling Consultation...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      Schedule Free Virtual Consultation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* Success Scheduling Modal */}
      <AnimatePresence>
        {isScheduled && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
              
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 border border-green-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h4 className="text-2xl font-bold font-display text-slate-950">
                  Consultation Confirmed!
                </h4>
                
                <p className="text-sm text-slate-500 leading-relaxed">
                  Hi <span className="font-bold text-slate-800">{formData.firstName}</span>, your virtual consultation has been scheduled successfully. We've sent a link and details to <span className="font-bold text-slate-800">{formData.email}</span>.
                </p>

                <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100/50 flex flex-col gap-2 text-left text-xs text-slate-600 font-medium">
                  <p><span className="text-slate-400">Date/Time:</span> Will confirm via email shortly</p>
                  <p><span className="text-slate-400">Contact Phone:</span> {formData.phone}</p>
                  {formData.category && <p><span className="text-slate-400">Device Category:</span> {formData.category}</p>}
                </div>
                
                <button
                  onClick={() => {
                    setIsScheduled(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      category: "",
                      notes: ""
                    });
                  }}
                  className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg animate-pulse"
                >
                  Great, Thank You!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
            
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:rotate-90 z-20"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20"
              aria-label="Previous Image"
            >
              <ChevronRight className="w-8 h-8 rotate-180" />
            </button>
            <button
              onClick={() => setLightboxIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20"
              aria-label="Next Image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main Image View */}
            <div
              className="relative w-[85%] h-[80%] flex items-center justify-center touch-none z-10"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  <div className="relative w-full h-[90%]">
                    <Image
                      src={heroSlides[lightboxIndex].src}
                      alt={heroSlides[lightboxIndex].title}
                      fill
                      sizes="90vw"
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Lightbox Caption */}
                  <div className="text-center mt-4 text-white">
                    <h4 className="text-lg font-bold font-display">{heroSlides[lightboxIndex].title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{heroSlides[lightboxIndex].description}</p>
                    <p className="text-[10px] text-slate-500 mt-2">
                      Slide {lightboxIndex + 1} of {heroSlides.length} • Use Arrow Keys or Swipe
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
