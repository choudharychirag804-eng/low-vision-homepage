"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface AccessibilityContextType {
  theme: string;
  setTheme: (theme: string) => void;
  fontScale: string;
  setFontScale: (scale: string) => void;
  ttsEnabled: boolean;
  setTtsEnabled: (enabled: boolean) => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const fontScaleMap: Record<string, string> = {
  normal: "1",
  large: "1.25",
  "extra-large": "1.5",
  double: "2"
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("s4s-theme") || "default";
    }
    return "default";
  });

  const [fontScale, setFontScale] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("s4s-fontScale") || "normal";
    }
    return "normal";
  });

  const [ttsEnabled, setTtsEnabled] = useState<boolean>(false);
  const lastSpokenRef = useRef<HTMLElement | null>(null);
  const isFirstMount = useRef<boolean>(true);

  // Keyboard shortcut listener to mute/toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.speechSynthesis?.cancel();
      }

      if (
        (e.key === "m" || e.key === "M") &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setTtsEnabled((prev) => {
          const nextVal = !prev;
          if (nextVal) {
            setTimeout(() => {
              const utterance = new SpeechSynthesisUtterance("Speech assistance enabled.");
              window.speechSynthesis?.speak(utterance);
            }, 50);
          } else {
            window.speechSynthesis?.cancel();
          }
          return nextVal;
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync settings with local storage and document body
  useEffect(() => {
    localStorage.setItem("s4s-theme", theme);
    const body = document.body;

    body.classList.remove("theme-dark", "theme-light-blue");

    if (theme === "dark") {
      body.classList.add("theme-dark");
    } else if (theme === "light-blue") {
      body.classList.add("theme-light-blue");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("s4s-fontScale", fontScale);
    const scaleValue = fontScaleMap[fontScale] || "1";
    document.documentElement.style.setProperty("--font-scale", scaleValue);
  }, [fontScale]);

  useEffect(() => {
    localStorage.setItem("s4s-tts", String(ttsEnabled));
    if (!ttsEnabled) {
      window.speechSynthesis?.cancel();
    } else {
      if (!isFirstMount.current) {
        speak("Text to speech enabled. Hover or focus on elements to read them.");
      }
    }
    isFirstMount.current = false;
  }, [ttsEnabled]);

  // Utility to speak text using Web Speech API
  const speak = (text: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const defaultVoice = voices.find((voice) => voice.lang.includes("en")) || voices[0];
    if (defaultVoice) {
      utterance.voice = defaultVoice;
    }

    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Global event listeners to speak on hover and focus
  useEffect(() => {
    if (!ttsEnabled) return;

    const getElementSpeechText = (el: HTMLElement): string => {
      if (!el) return "";

      if (el.getAttribute("data-speech")) {
        return el.getAttribute("data-speech") || "";
      }

      if (el.getAttribute("aria-label")) {
        return el.getAttribute("aria-label") || "";
      }

      if (el.tagName === "IMG" && el.getAttribute("alt")) {
        return `Image: ${el.getAttribute("alt")}`;
      }

      if (el.tagName === "A") {
        const text = el.innerText || el.textContent || "";
        return `Link: ${text}`;
      }

      if (el.tagName === "BUTTON") {
        const text = el.innerText || el.textContent || "";
        return `Button: ${text}`;
      }

      if (/^H[1-6]$/.test(el.tagName)) {
        const level = el.tagName.charAt(1);
        return `Heading level ${level}: ${el.innerText || el.textContent}`;
      }

      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
        const inputEl = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const label = document.querySelector(`label[for="${inputEl.id}"]`)?.innerHTML || 
                      ("placeholder" in inputEl ? (inputEl as HTMLInputElement | HTMLTextAreaElement).placeholder : "") || 
                      inputEl.name || 
                      "";
        const role = el.tagName.toLowerCase();
        const value = inputEl.value ? `, current value is ${inputEl.value}` : "";
        return `${label} ${role} field ${value}`;
      }

      const hasDirectText = Array.from(el.childNodes).some(
        (node) => node.nodeType === 3 && (node.textContent || "").trim().length > 0
      );
      if (hasDirectText || el.tagName === "P" || el.tagName === "LI" || el.tagName === "SPAN") {
        return el.innerText || el.textContent || "";
      }

      return "";
    };

    const handleFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      const text = getElementSpeechText(el);
      if (text && lastSpokenRef.current !== el) {
        speak(text);
        lastSpokenRef.current = el;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("a, button, h1, h2, h3, h4, p, li, img, label, input, textarea, select") as HTMLElement;
      if (el && lastSpokenRef.current !== el) {
        const text = getElementSpeechText(el);
        if (text) {
          speak(text);
          lastSpokenRef.current = el;
        }
      }
    };

    const handleMouseLeave = () => {
      lastSpokenRef.current = null;
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ttsEnabled]);

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        setTheme,
        fontScale,
        setFontScale,
        ttsEnabled,
        setTtsEnabled,
        speak,
        stopSpeaking
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
