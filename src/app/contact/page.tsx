"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, ShieldCheck, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
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

  // Sync category and product from query search parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category") || "";
      const prod = params.get("product") || "";
      if (cat || prod) {
        setFormData((prev) => ({
          ...prev,
          category: cat,
          notes: prod ? `I would like to request a free virtual demo for the ${decodeURIComponent(prod)}.` : prev.notes
        }));
      }
    }
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[150px] pointer-events-none -z-10" />

      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-16">
          <div className="lg:col-span-5">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest inline-block mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
              Let&rsquo;s Discuss Your Vision <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Support</span> Plan
            </h1>
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
                Virtual Demo & Enquiry
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
                      Sending Enquiry...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      Send Virtual Demo & Enquiry
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Success Modal */}
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
                  Enquiry Confirmed!
                </h4>
                
                <p className="text-sm text-slate-500 leading-relaxed">
                  Hi <span className="font-bold text-slate-800">{formData.firstName}</span>, your virtual demo request and enquiry has been sent successfully. We've sent a confirmation to <span className="font-bold text-slate-800">{formData.email}</span>.
                </p>

                <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100/50 flex flex-col gap-2 text-left text-xs text-slate-600 font-medium">
                  <p><span className="text-slate-400">Status:</span> Sent to admin@shop4specials.com</p>
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
    </div>
  );
}
