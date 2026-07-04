"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Headphones, ShieldCheck, Heart, BookOpen, Clock, Users } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "1-on-1 Certified Virtual Training",
      description: "Our training coordinators provide personalized Zoom session plans tailored to your specific device, software profile, and accessibility configuration.",
      perks: ["3 Hours Free with Device Purchase", "Audio & Video Captions Enabled", "Tactile Perkins Training Vouchers", "Flexible Scheduling Options"],
      icon: <Users className="w-6 h-6 text-primary" />
    },
    {
      title: "Clinical Orientation & Support",
      description: "Working directly with ophthalmologists and optometry clinics, we provide medical evaluation integrations and spatial audit guidelines.",
      perks: ["Ophthalmologist Referral Network", "Adaptive Device Mapping Reviews", "Custom Contrast & Field Calibration", "Caregiver Education Packs"],
      icon: <Heart className="w-6 h-6 text-indigo-600" />
    },
    {
      title: "Funding & Insurance Liaison",
      description: "We coordinate with vocational rehabilitation providers, state education departments, and private insurance companies to assist in filing your claims.",
      perks: ["Medicare/Medicaid Claim Help", "Vocational Rehab Document Templates", "Accessibility Grant Applications", "Direct Billing Integration"],
      icon: <ShieldCheck className="w-6 h-6 text-accent" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[150px] pointer-events-none -z-10" />

      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest inline-block mb-4">
            Adaptive Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
            Supporting Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Accessibility</span> Journey
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            From funding support to personalized visual setups, we provide clinical-grade assistive services every step of the way.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12 mb-20">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/80 shadow-lg flex flex-col lg:flex-row gap-8 items-start hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-5 bg-white rounded-2xl shadow-md flex-shrink-0">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-4">{service.title}</h3>
                <p className="text-base text-slate-500 leading-relaxed mb-6 max-w-3xl">{service.description}</p>
                
                <div className="border-t border-slate-100/80 pt-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">What's Included</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 font-semibold">
                        <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 text-xs font-bold">✓</div>
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
