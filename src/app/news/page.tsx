"use client";

import React, { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { BookOpen, Calendar, Clock, ArrowRight, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Article {
  id: number;
  category: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

const articles: Article[] = [
  {
    id: 1,
    category: "Accessibility News",
    title: "WCAG 2.2 Accessibility Standards: What Low-Vision Users Need to Know",
    date: "June 28, 2026",
    readTime: "5 min read",
    excerpt: "The World Wide Web Consortium recently published WCAG 2.2. Learn how new targets for pointer inputs, drag controls, and focus visibility improve web browsing for low-vision users.",
    content: `The World Wide Web Consortium (W3C) has officially released the Web Content Accessibility Guidelines (WCAG) 2.2. This update brings several new success criteria that significantly improve browsing for individuals with low vision or cognitive differences.

Key updates include:
1. Focus Appearance: Ensuring that keyboard focus indicators are highly visible with a defined minimum area and color contrast ratio.
2. Target Size: Requiring buttons and interactive elements to be at least 24x24 CSS pixels in size, preventing accidental clicks on tiny links.
3. Redundant Entry: Preventing users from re-typing form data they already entered in the same session.

These updates represent a significant milestone in making the digital world more welcoming. Shop 4 Special is proud to announce that all our web platforms are designed to align with these new criteria.`
  },
  {
    id: 2,
    category: "Assistive Tech",
    title: "AI Models Accelerate Tactile and Braille Translation Speeds",
    date: "May 14, 2026",
    readTime: "4 min read",
    excerpt: "Generative AI is shifting how textbooks are translated into braille documents, reducing transcription turnarounds from weeks to minutes.",
    content: `Tactile printing has traditionally been a bottleneck in special education. Transcribing a textbook into Braille requires manual formatting, page layout conversions, and graphics tactile-rendering by skilled transcribers.

With new AI translation software, documents can be automatically parsed, layout structural trees identified, and tactile graphics optimized in seconds. 
- Machine learning models can analyze standard 2D textbook drawings and transform them into simplified vector lines suitable for micro-capsule puff paper or desktop embossers.
- Real-time text-to-braille converters achieve 99.8% grammatical accuracy across math equations, complex musical notations, and multiple foreign languages.

Shop 4 Special is currently testing these smart translation APIs to expand our Braille Paper notebooks and education sheets library.`
  },
  {
    id: 3,
    category: "Educational Resources",
    title: "Guide to Selecting Tactile Papers for Visual Learners",
    date: "April 02, 2026",
    readTime: "6 min read",
    excerpt: "Tactile learning builds sensory cognitive development. Discover differences between puff papers, heavyweight cardstock sheets, and embossed sheets.",
    content: `In the classroom, children who are blind or have low vision rely heavily on tactile sensation to grasp spatial concepts. Selecting the correct paper medium is crucial for reading stamina and feedback.

Types of Tactile Papers:
1. Braille Sheets: High-weight, acid-free cardstock (typically 90lb or 100lb) designed to hold sharp, crisp braille dots that do not collapse under finger pressure.
2. Microcapsule Heat (Puff) Paper: A special paper coated with heat-sensitive microcapsules. When run through a thermal printer, black ink lines swell upwards, creating instant tactile maps, charts, and illustrations.
3. Heavy Binder Notebooks: Bound educational journals with grid dividers for graphing math problems.

Explore our product store to purchase special educational papers designed specifically for tactile classroom success.`
  },
  {
    id: 4,
    category: "Vision Support Awareness",
    title: "The Critical Value of High-Contrast Layouts in Public Spaces",
    date: "March 15, 2026",
    readTime: "3 min read",
    excerpt: "Low-vision advocates speak out on why deep contrast borders, bright signage, and tactile paving are vital infrastructure.",
    content: `Contrast is the cornerstone of safety for low-vision navigators. Many individuals with partial vision can navigate safely and read signage if public infrastructure employs strong visual contrasts.

Critical adjustments include:
- Signage Contrast: White lettering on dark blue/black backgrounds, or yellow lettering on black.
- Physical Margins: Yellow safety strips at the edges of stairwells, train platform platform steps, and curbs.
- Lighting: Non-glare, diffused lighting that avoids harsh shadows or blinding backlights.

By demanding high-contrast standards in both physical structures and software systems, we create an environment where low-vision individuals can lead confident, independent lives.`
  }
];

export default function NewsPage() {
  const { speak } = useAccessibility();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleReadArticle = (art: Article) => {
    setSelectedArticle(art);
    speak(`Reading article: ${art.title}. ${art.excerpt}`);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    speak("Closed article view");
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
            Accessibility & Tech Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
            News & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Articles</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stay updated on accessibility guidelines, new tactile products, educational seminars, and support communities.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group rounded-[2rem] p-8 bg-white border border-slate-100 hover:border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-4">
                  <span className="text-primary font-bold uppercase tracking-wider">
                    {art.category}
                  </span>
                  <div className="flex gap-4 items-center">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-primary transition-colors mb-4">
                  {art.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <button
                  onClick={() => handleReadArticle(art)}
                  className="text-sm font-bold text-slate-900 hover:text-primary flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Article Overlay Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999] p-4">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative">
              <button
                onClick={handleCloseArticle}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                aria-label="Close article"
              >
                <X size={20} />
              </button>

              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
                {selectedArticle.category} • {selectedArticle.date}
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="text-slate-600 text-sm leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-100 pt-6">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
