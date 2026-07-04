"use client";

import React, { useEffect, useRef } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { X, Volume2, VolumeX, Eye, Type } from "lucide-react";

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityMenu({ isOpen, onClose }: AccessibilityMenuProps) {
  const {
    theme,
    setTheme,
    fontScale,
    setFontScale,
    ttsEnabled,
    setTtsEnabled
  } = useAccessibility();

  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap for accessibility dialog
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = menuRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex="0"]'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstEl = focusableElements[0] as HTMLElement;
        const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement && typeof (previousActiveElement as HTMLElement).focus === "function") {
        (previousActiveElement as HTMLElement).focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-[9999]"
      onClick={onClose}
    >
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="acc-menu-title"
        className="w-full max-w-[400px] h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-8 flex flex-col overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 id="acc-menu-title" className="text-xl font-bold text-slate-900 dark:text-white">
            Accessibility Settings
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close accessibility menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Option 1: Contrast / Theme */}
        <section className="mb-8" aria-labelledby="acc-contrast-title">
          <h3
            id="acc-contrast-title"
            className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2"
          >
            <Eye size={18} aria-hidden="true" /> Contrast Theme
          </h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setTheme("default")}
              className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                theme === "default"
                  ? "bg-primary/5 text-primary border-primary font-bold"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
              aria-pressed={theme === "default"}
            >
              Default Light Mode
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500 font-bold"
                  : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900"
              }`}
              aria-pressed={theme === "dark"}
            >
              Dark Mode
            </button>
            <button
              onClick={() => setTheme("light-blue")}
              className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                theme === "light-blue"
                  ? "bg-blue-100 text-blue-900 border-blue-600 font-bold border-2"
                  : "bg-blue-50/50 text-blue-800 border-slate-200 dark:border-slate-700 hover:bg-blue-100"
              }`}
              aria-pressed={theme === "light-blue"}
            >
              Light Blue Theme
            </button>
          </div>
        </section>

        {/* Option 2: Text Resizing */}
        <section className="mb-8" aria-labelledby="acc-text-title">
          <h3
            id="acc-text-title"
            className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2"
          >
            <Type size={18} aria-hidden="true" /> Text Size Resizer
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { scale: "normal", label: "100% (Normal)" },
              { scale: "large", label: "125% (Large)" },
              { scale: "extra-large", label: "150% (XL)" },
              { scale: "double", label: "200% (Double)" }
            ].map((item) => (
              <button
                key={item.scale}
                onClick={() => setFontScale(item.scale)}
                className={`px-4 py-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  fontScale === item.scale
                    ? "bg-primary/5 text-primary border-primary font-bold"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                aria-pressed={fontScale === item.scale}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* Option 3: Text-to-Speech (TTS) */}
        <section className="mb-8" aria-labelledby="acc-tts-title">
          <h3
            id="acc-tts-title"
            className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2"
          >
            {ttsEnabled ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
            Speech Assistance
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Turn on speech assistance to read items aloud when hovering over them with your cursor or focusing on them with your keyboard.
          </p>
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`w-full py-4 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-md ${
              ttsEnabled
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-slate-900 dark:bg-slate-800 text-white hover:bg-primary"
            }`}
          >
            {ttsEnabled ? "Speech Assistance: ACTIVE" : "Turn On Speech Assistance"}
          </button>
        </section>

        {/* Info panel */}
        <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-6 text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">
          <p className="mb-2 font-medium">
            Our accessibility controls comply with WCAG 2.2 Level AAA requirements. You can also use standard browser keyboard shortcuts:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li><kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Tab</kbd> to navigate interactive links/buttons</li>
            <li><kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Space</kbd> or <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Enter</kbd> to activate controls</li>
            <li><kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Esc</kbd> to close menus/popups or stop speech</li>
            <li><kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">M</kbd> to toggle Speech Assistance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
