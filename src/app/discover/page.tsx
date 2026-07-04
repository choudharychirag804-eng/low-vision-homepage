"use client";

import React, { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Calendar, Play, Pause, Download, Volume2, Video, FileText, ChevronRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  desc: string;
}

interface GuideItem {
  id: string;
  title: string;
  type: "video" | "audio" | "document";
  duration?: string;
  size?: string;
  desc: string;
}

const events: EventItem[] = [
  {
    id: 1,
    title: "Global Accessibility Awareness Workshop",
    date: "July 15, 2026",
    time: "10:00 AM - 12:00 PM EST",
    type: "Virtual / Online",
    desc: "Learn about screen readers, web styling for low vision, and how to create accessible document formats."
  },
  {
    id: 2,
    title: "Shop 4 Special Assistive Technology Expo",
    date: "August 03, 2026",
    time: "09:00 AM - 05:00 PM EST",
    type: "In-person Exhibition (San Francisco, CA)",
    desc: "Get hands-on experience with our portable Braille embossers, smart canes, and video magnifiers."
  },
  {
    id: 3,
    title: "Vision Support Community Awareness Program",
    date: "September 12, 2026",
    time: "02:00 PM - 04:30 PM EST",
    type: "Community Center (Vision Valley)",
    desc: "A seminar hosting low-vision support leaders discussing educational resource aids for children."
  }
];

const guides: GuideItem[] = [
  {
    id: "g1",
    title: "Orion Smart Cane Setup Tutorial",
    type: "video",
    duration: "4 mins 20 secs",
    desc: "Learn how to configure the ultrasonic sensor ranges and pair the haptic cane with your mobile phone via Bluetooth."
  },
  {
    id: "g2",
    title: "Audio Guide: Navigating NVDA Screen Reader",
    type: "audio",
    duration: "12 mins 15 secs",
    desc: "An audio-only walkthrough describing keyboard layouts, shortcuts, and document reading modes in NVDA."
  },
  {
    id: "g3",
    title: "Desktop Braille Embosser User Manual",
    type: "document",
    size: "2.4 MB (PDF)",
    desc: "Comprehensive instruction booklet containing safety specs, paper loading procedures, and translation setups."
  }
];

export default function DiscoverPage() {
  const { speak } = useAccessibility();
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const handlePlayAudio = (id: string, title: string) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
      speak("Audio playback paused");
    } else {
      setPlayingAudioId(id);
      speak(`Playing audio guide: ${title}`);
    }
  };

  const handleDownload = (title: string) => {
    speak(`Starting download for ${title}`);
    alert(`Mock Download Triggered:\n\nYou have started downloading: "${title}".`);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[150px] pointer-events-none -z-10" />

      <Header />

      <main id="main-content" tabIndex={-1} className="pt-32 pb-24 md:pt-40 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/10 uppercase tracking-widest inline-block mb-4">
            Discover Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
            Resource Center & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Empowering resource materials, upcoming educational seminars, and detailed user manuals.
          </p>
        </div>

        {/* Section 1: Upcoming Events */}
        <section className="mb-20" aria-labelledby="events-heading">
          <h2 id="events-heading" className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" aria-hidden="true" />
            Upcoming Events & Workshops
          </h2>

          <div className="flex flex-col gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex-1">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    {evt.type}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-2">
                    {evt.title}
                  </h3>
                  <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                    {evt.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-2 min-w-[220px] border-l border-slate-100 pl-6">
                  <span className="text-sm font-bold text-slate-900">{evt.date}</span>
                  <span className="text-xs text-slate-400 font-semibold">{evt.time}</span>
                  <button
                    onClick={() => {
                      speak(`Registering for ${evt.title}`);
                      alert(`Event RSVP:\n\nYou have successfully registered for:\n"${evt.title}" on ${evt.date}. We will send details to your email!`);
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-md"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Demo Guides & Manuals */}
        <section aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
            <Volume2 className="w-8 h-8 text-primary" aria-hidden="true" />
            Guides, Video & Audio Tutorials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3.5 bg-slate-50 rounded-xl text-primary">
                      {g.type === "video" ? (
                        <Video className="w-6 h-6" />
                      ) : g.type === "audio" ? (
                        <Volume2 className="w-6 h-6" />
                      ) : (
                        <FileText className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-xs font-bold uppercase text-slate-400">
                      {g.type} {g.duration ? `(${g.duration})` : g.size ? `(${g.size})` : ""}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {g.desc}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6 mt-4">
                  {g.type === "audio" ? (
                    <button
                      onClick={() => handlePlayAudio(g.id, g.title)}
                      className={`w-full py-3 rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                        playingAudioId === g.id
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : "bg-slate-900 text-white hover:bg-primary"
                      }`}
                    >
                      {playingAudioId === g.id ? (
                        <>
                          <Pause className="w-4 h-4" /> Pause Guide
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> Play Audio Guide
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDownload(g.title)}
                      className="w-full py-3 rounded-xl bg-slate-900 text-white hover:bg-primary text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Download Manual
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
