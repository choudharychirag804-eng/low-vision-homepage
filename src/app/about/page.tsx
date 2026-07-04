"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, ShieldCheck, Heart, Users, Star } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Arthur Pendelton",
      role: "Chief Optometrist & Accessibility Researcher",
      bio: "Former Director of Low Vision Studies with 20+ years clinical engineering experience.",
      initials: "AP"
    },
    {
      name: "Sarah Jenkins",
      role: "VP of Product Integration",
      bio: "Pioneering sensory haptic translation systems and blind navigation interfaces.",
      initials: "SJ"
    },
    {
      name: "Marcus Vance",
      role: "Lead Support Coordinator",
      bio: "Dedicated to training curriculum design and vocational grant program alignments.",
      initials: "MV"
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Background gradients/blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[150px] pointer-events-none -z-10" />

      <Header />

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest inline-block mb-4">
            Our Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
            Pioneering Tools for Sensory <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Autonomy</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            At Shop 4 Special, we believe visual impairment shouldn't limit independence. We curate, engineer, and validate state-of-the-art assistive devices to deliver absolute accessibility.
          </p>
        </motion.div>
      </section>

      {/* CORE VALUES */}
      <section className="py-16 max-w-7xl mx-auto px-6 border-t border-slate-100/80">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Core Foundations</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900">Why Global Specialists Trust Us</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/80 shadow-md flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-primary flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Medical-Grade Standards</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every electronic magnifier and smart cane is vetted by our clinical optometry council and carries regulatory certifications.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/80 shadow-md flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Lifetime Custom Training</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Purchase is just the first step. We provide interactive virtual setups and unlimited access to accessible user manuals.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/80 shadow-md flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Human-Centered Design</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Our designs prioritize high-contrast tactile elements, sensory audio feedback, and durable build quality.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 bg-slate-900/5 border-y border-slate-100 max-w-7xl mx-auto px-6 rounded-[2.5rem] my-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Expert Team</h2>
          <h3 className="text-3xl font-extrabold font-display text-slate-950">Specialists Behind the Innovations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent text-white font-extrabold font-display text-xl flex items-center justify-center shadow-md">
                {member.initials}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs text-primary font-semibold uppercase mt-0.5">{member.role}</p>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
