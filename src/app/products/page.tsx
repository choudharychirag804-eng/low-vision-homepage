"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Eye, BookOpen, Printer, Star, ArrowUpRight, CheckCircle2, Volume2, Glasses, Cpu, Radio, Tablet } from "lucide-react";

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
  specs: string[];
}

const products: Product[] = [
  // ── BLINDNESS PRODUCTS ──────────────────────────────────────────────
  {
    id: 1,
    name: "Braille One 20 Cell",
    category: "Blindness Products",
    description: "Compact 20-cell refreshable braille display designed for on-the-go reading and screen-reader connectivity via USB & Bluetooth.",
    price: "Contact Us",
    rating: 4.8,
    reviews: 87,
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    specs: ["20-Cell Refreshable Braille", "USB & Bluetooth", "Screen Reader Compatible", "Compact Portable Form"]
  },
  {
    id: 2,
    name: "Braille Note Touch Evolve",
    category: "Blindness Products",
    description: "Revolutionary Android braille tablet with a physical braille keyboard and multi-touch screen for productivity.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 142,
    badge: "Flagship",
    icon: <Tablet className="w-12 h-12 text-primary" />,
    specs: ["Android OS Integration", "Multi-touch Braille Display", "Wi-Fi & Bluetooth", "Built-in Accessibility Apps"]
  },
  {
    id: 3,
    name: "Braille Note Touch Plus 32",
    category: "Blindness Products",
    description: "Enhanced 32-cell version of the BrailleNote Touch, offering a larger braille input area for advanced users.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 96,
    badge: "Premium",
    icon: <Tablet className="w-12 h-12 text-primary" />,
    specs: ["32-Cell Braille Display", "Perkins-Style Keyboard", "Android Integration", "Tactile Graphic Reader"]
  },
  {
    id: 4,
    name: "Brilliant BI 40 Cell",
    category: "Blindness Products",
    description: "40-cell desktop braille display with text-to-speech translation and seamless screen reader pairing.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 64,
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    specs: ["40-Cell Refresh Display", "Text-to-Speech Output", "Multi-device Pairing", "Long Battery Life"]
  },
  {
    id: 5,
    name: "Mantis Q40 Braille Display",
    category: "Blindness Products",
    description: "QWERTY keyboard braille display combining traditional typing with 40-cell braille output in one slim device.",
    price: "Contact Us",
    rating: 4.8,
    reviews: 74,
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    specs: ["QWERTY & Braille Keyboard", "40-Cell Braille Output", "Bluetooth Multi-connect", "Slim Portable Design"]
  },
  {
    id: 6,
    name: "Monarch Multi-Line",
    category: "Blindness Products",
    description: "Multi-line dynamic tactile braille display capable of showing full page layouts including spatial graphics.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 38,
    badge: "Innovation",
    icon: <Cpu className="w-12 h-12 text-primary" />,
    specs: ["Multi-line Braille", "Tactile Graphics Support", "Full-page Layout View", "APH Technology"]
  },
  {
    id: 7,
    name: "Hark AI",
    category: "Blindness Products",
    description: "AI-powered audio label reader and accessible smart home assistant designed for blind and deafblind users.",
    price: "Contact Us",
    rating: 4.7,
    reviews: 52,
    icon: <Radio className="w-12 h-12 text-primary" />,
    specs: ["AI Label Recognition", "Smart Home Integration", "Voice Control", "Deafblind Compatible"]
  },
  {
    id: 8,
    name: "Victor Reader Stream 3",
    category: "Blindness Products",
    description: "The gold standard portable media player for blind users, supporting DAISY, audiobooks, podcasts, and radio.",
    price: "Contact Us",
    rating: 4.8,
    reviews: 118,
    badge: "Best Seller",
    icon: <Volume2 className="w-12 h-12 text-primary" />,
    specs: ["DAISY & MP3 Playback", "FM Radio Tuner", "Wi-Fi Streaming", "Voice Announcement"]
  },
  {
    id: 9,
    name: "Stratus",
    category: "Blindness Products",
    description: "Cloud-connected braille notetaker and accessible portable computer with voice navigation and file management.",
    price: "Contact Us",
    rating: 4.7,
    reviews: 43,
    icon: <Cpu className="w-12 h-12 text-primary" />,
    specs: ["Cloud File Sync", "Braille & Voice Input", "Wi-Fi Connected", "Long Battery Life"]
  },
  {
    id: 10,
    name: "Code Jumper",
    category: "Blindness Products",
    description: "Physical coding kit for blind and low-vision students using tactile pods to teach programming concepts.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 61,
    badge: "Education",
    icon: <Cpu className="w-12 h-12 text-primary" />,
    specs: ["Physical Tactile Pods", "Coding Concepts Learning", "Screen-reader Free", "Ages 7+ Designed"]
  },

  // ── LOW VISION PRODUCTS ─────────────────────────────────────────────
  {
    id: 11,
    name: "Connect 12",
    category: "Low Vision Products",
    description: "12-inch smart digital magnifier and tablet with distance viewing camera, ideal for desk and classroom use.",
    price: "Contact Us",
    rating: 4.8,
    reviews: 96,
    badge: "Clinical Pick",
    icon: <Eye className="w-12 h-12 text-indigo-600" />,
    specs: ["12-inch HD Screen", "Distance Camera", "20+ Color Modes", "Text-to-Speech"]
  },
  {
    id: 12,
    name: "Explore 12",
    category: "Low Vision Products",
    description: "Foldable 12-inch stand magnifier with dual cameras for near and distance viewing in one portable device.",
    price: "Contact Us",
    rating: 4.8,
    reviews: 83,
    icon: <Eye className="w-12 h-12 text-indigo-600" />,
    specs: ["12-inch Foldable Stand", "Near & Distance Cameras", "Contrast Color Modes", "Carry Handle"]
  },
  {
    id: 13,
    name: "Explore 5",
    category: "Low Vision Products",
    description: "Ultra-portable 5-inch handheld electronic magnifier with ergonomic handle and simple one-button controls.",
    price: "Contact Us",
    rating: 4.8,
    reviews: 154,
    badge: "Bestseller",
    icon: <Glasses className="w-12 h-12 text-indigo-600" />,
    specs: ["5-inch Compact Screen", "Simple Button Controls", "Rechargeable Battery", "Ergonomic Grip"]
  },
  {
    id: 14,
    name: "Explore 8",
    category: "Low Vision Products",
    description: "Lightweight 8-inch HD handheld video magnifier with touchscreen control and twin near/distance cameras.",
    price: "Contact Us",
    rating: 4.7,
    reviews: 79,
    icon: <Eye className="w-12 h-12 text-indigo-600" />,
    specs: ["8-inch HD Touchscreen", "Twin Camera System", "Multiple Magnification", "USB-C Charging"]
  },
  {
    id: 15,
    name: "Reveal 16",
    category: "Low Vision Products",
    description: "16-inch full HD desktop video magnifier with 2x–16x zoom range and 28 high-contrast reading modes.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 68,
    badge: "Premium",
    icon: <Eye className="w-12 h-12 text-indigo-600" />,
    specs: ["16-inch Full HD Screen", "2x–16x Zoom", "28 Color Contrast Modes", "Built-in Reading Line"]
  },
  {
    id: 16,
    name: "Reveal 16i",
    category: "Low Vision Products",
    description: "Advanced version of Reveal 16 with integrated HD distance camera for reading boards, signs, and TV screens.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 54,
    badge: "Advanced",
    icon: <Eye className="w-12 h-12 text-indigo-600" />,
    specs: ["16-inch + Distance Camera", "Integrated Camera System", "High-contrast Modes", "Remote Control Included"]
  },

  // ── INDEX BRAILLE EMBOSSER ──────────────────────────────────────────
  {
    id: 17,
    name: "Braille Label Printer",
    category: "Index Braille Embosser",
    description: "Compact handheld labeler for producing tactile braille stickers to organize home and office items.",
    price: "Contact Us",
    rating: 4.6,
    reviews: 49,
    icon: <Printer className="w-12 h-12 text-accent" />,
    specs: ["Handheld Compact Design", "Custom Braille Stickers", "Long Label Rolls", "Battery Powered"]
  },
  {
    id: 18,
    name: "Index Basic-D V5",
    category: "Index Braille Embosser",
    description: "Single-sided A4/Letter desktop braille embosser ideal for personal, educational, and small-office braille production.",
    price: "Contact Us",
    rating: 4.7,
    reviews: 63,
    icon: <Printer className="w-12 h-12 text-accent" />,
    specs: ["Single-sided Embossing", "A4/Letter Paper", "USB & Network Ready", "High-speed Output"]
  },
  {
    id: 19,
    name: "Everest-D V5",
    category: "Index Braille Embosser",
    description: "Heavy-duty double-sided desktop braille printer with high-speed output for schools and production centers.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 72,
    badge: "Production Grade",
    icon: <Printer className="w-12 h-12 text-accent" />,
    specs: ["Double-sided Embossing", "High-speed Production", "USB & Ethernet", "Durable Metal Build"]
  },
  {
    id: 20,
    name: "Index Fanfold-D",
    category: "Index Braille Embosser",
    description: "Tractor-fed fanfold braille embosser for continuous-form paper, optimized for high-volume braille publishing.",
    price: "Contact Us",
    rating: 4.8,
    reviews: 41,
    icon: <Printer className="w-12 h-12 text-accent" />,
    specs: ["Continuous Fanfold Paper", "Tractor-feed System", "High-volume Output", "USB & Network Ready"]
  },
  {
    id: 21,
    name: "Index Braille Box V5",
    category: "Index Braille Embosser",
    description: "Fully automated booklet-making braille embosser that produces bound tactile books from a single document file.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 35,
    badge: "Industrial",
    icon: <Printer className="w-12 h-12 text-accent" />,
    specs: ["Automated Booklet Making", "Bound Braille Output", "Large Volume Capacity", "USB & Network"]
  },
  {
    id: 22,
    name: "Index Acoustic Cabinet",
    category: "Index Braille Embosser",
    description: "Sound-dampening acoustic enclosure for any Index embosser — ideal for quiet office and library environments.",
    price: "Contact Us",
    rating: 4.7,
    reviews: 28,
    icon: <Printer className="w-12 h-12 text-accent" />,
    specs: ["Noise Reduction Enclosure", "Universal Compatibility", "Ventilated Design", "Easy Access Door"]
  },
  {
    id: 23,
    name: "Romeo 60",
    category: "Index Braille Embosser",
    description: "Entry-level desktop braille embosser from Enabling Technologies, offering reliable braille output for home and education.",
    price: "Contact Us",
    rating: 4.6,
    reviews: 57,
    icon: <Printer className="w-12 h-12 text-accent" />,
    specs: ["Single-sided Embossing", "Compact Desktop Size", "USB Connection", "Quiet Operation"]
  },
  {
    id: 24,
    name: "Juliet 120",
    category: "Index Braille Embosser",
    description: "High-speed interpoint braille embosser from Enabling Technologies, producing double-sided braille at up to 120 cps.",
    price: "Contact Us",
    rating: 4.8,
    reviews: 44,
    badge: "High Speed",
    icon: <Printer className="w-12 h-12 text-accent" />,
    specs: ["Up to 120 CPS Speed", "Interpoint Double-sided", "Network & USB Ready", "Heavy-duty Build"]
  },
  {
    id: 25,
    name: "TactileView Software",
    category: "Index Braille Embosser",
    description: "Specialist software for designing and printing tactile graphics and diagrams for use with braille embossers.",
    price: "Contact Us",
    rating: 4.8,
    reviews: 66,
    icon: <Cpu className="w-12 h-12 text-accent" />,
    specs: ["Tactile Graphics Editor", "Embosser Compatible", "STEM & Map Support", "Windows & Mac"]
  },
  {
    id: 26,
    name: "Duxbury Software",
    category: "Index Braille Embosser",
    description: "The world's leading braille translation software supporting 130+ languages and specialized technical braille codes.",
    price: "Contact Us",
    rating: 4.9,
    reviews: 112,
    badge: "Industry Standard",
    icon: <Cpu className="w-12 h-12 text-accent" />,
    specs: ["130+ Language Support", "Math & Music Braille", "Word & PDF Import", "Network License Available"]
  },
  {
    id: 27,
    name: "Braille Paper (Roll Format)",
    category: "Index Braille Embosser",
    description: "Heavy-weight 100gsm braille paper supplied in continuous rolls for use with fanfold and tractor-fed embossers.",
    price: "Contact Us",
    rating: 4.7,
    reviews: 39,
    icon: <Printer className="w-12 h-12 text-accent" />,
    specs: ["100gsm Heavy Weight", "Continuous Roll Format", "Tractor-feed Compatible", "Bulk Supply Available"]
  }
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[150px] pointer-events-none -z-10" />

      <Header />

      <section className="pt-32 pb-12 md:pt-40 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest inline-block mb-4">
            Full Catalog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
            Assistive <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Device Catalog</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Browse our complete range of clinically approved blindness aids, low vision magnifiers, and braille embossing solutions.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-slate-200">
          {[null, "Blindness Products", "Low Vision Products", "Index Braille Embosser"].map((cat) => (
            <button
              key={cat ?? "all"}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-md shadow-purple-500/10"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat ?? "All Solutions"}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[500px] mb-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-[2rem] p-8 bg-white border border-slate-100 hover:border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-5 bg-slate-50 rounded-2xl group-hover:bg-purple-50 group-hover:scale-105 transition-all duration-300 shadow-inner">
                      {product.icon}
                    </div>
                    {product.badge && (
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-primary text-white tracking-wide shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-primary transition-colors mt-1 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Key Specs</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold">Price</p>
                    <p className="text-xl font-black text-slate-900">{product.price}</p>
                  </div>
                  <Link
                    href={`/contact?category=${
                      product.category === "Blindness Products"
                        ? "blindness"
                        : product.category === "Low Vision Products"
                        ? "lowvision"
                        : "embosser"
                    }&product=${encodeURIComponent(product.name)}`}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-primary text-white text-sm font-bold flex items-center gap-2 transition-colors shadow-md cursor-pointer"
                  >
                    Book Demo
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
