"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Eye } from "lucide-react";
import AccessibilityMenu from "./AccessibilityMenu";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accMenuOpen, setAccMenuOpen] = useState(false);

  // Handle header background on scroll
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

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Discover", href: "/discover" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Shop 4 Special Home">
            <div className="relative w-36 h-10 group-hover:scale-105 transition-transform flex items-center justify-start">
              <Image
                src="/logo-nav-small.png"
                alt="Shop 4 Special Logo"
                fill
                sizes="144px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group py-2 ${
                  isActive(item.href) ? "text-primary font-bold" : "text-slate-600 hover:text-primary"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setAccMenuOpen(true)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-primary hover:border-primary transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              aria-label="Accessibility Settings"
            >
              <Eye className="w-4 h-4" />
              <span>Accessibility</span>
            </button>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5 inline-block cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setAccMenuOpen(true)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Accessibility Settings"
            >
              <Eye className="w-6 h-6" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-100 bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-6 pt-2 pb-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-semibold py-2 transition-colors ${
                      isActive(item.href) ? "text-primary" : "text-slate-800 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-purple-500/20 cursor-pointer"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Accessibility Drawer Modal */}
      <AccessibilityMenu isOpen={accMenuOpen} onClose={() => setAccMenuOpen(false)} />
    </>
  );
}
