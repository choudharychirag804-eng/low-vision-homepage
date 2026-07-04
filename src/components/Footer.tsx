"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 group w-fit" aria-label="Shop 4 Special Home">
            <img
              src="/logo-new-1.png"
              alt="Shop 4 Special Logo Icon"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-black tracking-tight text-white transition-colors duration-300">
              Shop 4 Special
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400 max-w-sm mt-2">
            Shop 4 Special is a global assistive technology innovator dedicated to making everyday life accessible. We design and deliver medical-grade smart systems, readers, and canes.
          </p>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white">Products</h5>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/products" className="hover:text-white transition-colors">Blindness Products</Link>
            <Link href="/products" className="hover:text-white transition-colors">Low Vision Products</Link>
            <Link href="/products" className="hover:text-white transition-colors">Index Braille Embossers</Link>
            <Link href="/products" className="hover:text-white transition-colors">Braille Label Printers</Link>
            <Link href="/products" className="hover:text-white transition-colors">Braille Software</Link>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white">Resources</h5>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/discover" className="hover:text-white transition-colors">Discover Hub</Link>
            <Link href="/news" className="hover:text-white transition-colors">News & Articles</Link>
            <Link href="/services" className="hover:text-white transition-colors">User Manuals</Link>
            <Link href="/services" className="hover:text-white transition-colors">Help Center</Link>
            <Link href="/services" className="hover:text-white transition-colors">Special Education</Link>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white">Company</h5>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/about" className="hover:text-white transition-colors">Team & Careers</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Affiliate Program</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Press & Media</Link>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white">Compliance</h5>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">ADA Compliance</Link>
            <Link href="/about" className="hover:text-white transition-colors">WCAG 2.2 AAA</Link>
            <Link href="/about" className="hover:text-white transition-colors">FDA Certifications</Link>
            <Link href="/about" className="hover:text-white transition-colors">Quality Standards</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>&copy; {new Date().getFullYear()} Shop 4 Special Technologies Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
