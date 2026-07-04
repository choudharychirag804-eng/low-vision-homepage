"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { X, Send, CheckCircle, Mail, Phone, User, MessageSquare, Info, Sparkles } from "lucide-react";

interface EnquiryModalProps {
  productName: string;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  productName: string;
  message: string;
}

export default function EnquiryModal({ productName, onClose }: EnquiryModalProps) {
  const { speak } = useAccessibility();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    productName: productName || "",
    message: `Hello, I would like to enquire about ${productName || "this product"}. Please provide more details on features and availability.`
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Sync preset product name if it changes
  useEffect(() => {
    if (productName) {
      setFormData((prev) => ({
        ...prev,
        productName: productName,
        message: `Hello, I would like to enquire about ${productName}. Please provide more details on features and availability.`
      }));
    }
  }, [productName]);

  // Focus Lock and Escape Key
  useEffect(() => {
    const previousActiveElement = document.activeElement;
    firstInputRef.current?.focus();
    speak(`Enquiry form modal opened for ${productName}. Please fill in your name, phone number, email, and message.`);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, input, textarea, [tabindex="0"]'
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
  }, [onClose, productName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const tempErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName.trim()) {
      tempErrors.fullName = "Full Name is required";
    }

    const phonePattern = /^\+?[0-9\s\-()]{7,15}$/;
    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone Number is required";
    } else if (!phonePattern.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Invalid phone number format";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Enquiry message is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setLiveAnnouncement("Form submission failed. Please review the highlighted fields with errors.");
      speak("Form validation failed. Please check the required fields.");
      return;
    }

    setIsSubmitting(true);
    setLiveAnnouncement("Submitting enquiry, please wait...");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const successMessage = `Thank you, ${formData.fullName}. Your enquiry for ${formData.productName} has been successfully sent to admin@shop4specials.com. We will contact you soon.`;
      setLiveAnnouncement(successMessage);
      speak(successMessage);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-[99999]"
      onClick={onClose}
    >
      <div className="sr-only" aria-live="assertive">
        {liveAnnouncement}
      </div>

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        className="w-full max-w-[550px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2.5rem] p-8 relative flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 id="enquiry-title" className="text-2xl font-black text-slate-900 dark:text-white">
            Send Enquiry
          </h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Close enquiry modal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="text-center py-8 flex flex-col items-center gap-4">
            <CheckCircle size={64} className="text-emerald-500" aria-hidden="true" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enquiry Sent Successfully!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your inquiry has been successfully sent to <strong>admin@shop4specials.com</strong>. We will contact you soon.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl text-left w-full border border-slate-100 dark:border-slate-700 text-sm mt-4">
              <strong className="text-slate-700 dark:text-slate-300">Summary of Submitted Details:</strong>
              <div className="mt-3 flex flex-col gap-2 text-slate-600 dark:text-slate-400">
                <div><strong>Product:</strong> {formData.productName}</div>
                <div><strong>Name:</strong> {formData.fullName}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Phone:</strong> {formData.phoneNumber}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all cursor-pointer shadow-md"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {/* Info Note */}
            <div className="flex gap-3 bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-2xl items-start">
              <Info size={20} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                This is a secure enquiry form. Submitting will send an automated enquiry alert to our administration mailbox.
              </p>
            </div>

            {/* Product Name (Pre-filled, Accessible Readonly representation) */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-productName" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Selected Product
              </label>
              <div className="relative flex items-center">
                <input
                  id="modal-productName"
                  name="productName"
                  type="text"
                  className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                  value={formData.productName}
                  onChange={handleChange}
                  readOnly
                />
                <Sparkles size={18} className="absolute left-4 text-amber-500" aria-hidden="true" />
              </div>
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-fullName" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  ref={firstInputRef}
                  id="modal-fullName"
                  name="fullName"
                  type="text"
                  className={`w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.fullName ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700"
                  }`}
                  placeholder="Enter your first and last name"
                  value={formData.fullName}
                  onChange={handleChange}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "error-fullName" : undefined}
                  required
                />
                <User size={18} className="absolute left-4 text-slate-400" aria-hidden="true" />
              </div>
              {errors.fullName && (
                <span id="error-fullName" className="text-xs text-red-500 font-semibold" role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-phoneNumber" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="modal-phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className={`w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.phoneNumber ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700"
                  }`}
                  placeholder="e.g. +91 98917 45757"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  aria-invalid={!!errors.phoneNumber}
                  aria-describedby={errors.phoneNumber ? "error-phoneNumber" : undefined}
                  required
                />
                <Phone size={18} className="absolute left-4 text-slate-400" aria-hidden="true" />
              </div>
              {errors.phoneNumber && (
                <span id="error-phoneNumber" className="text-xs text-red-500 font-semibold" role="alert">
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-email" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Email ID <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  className={`w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.email ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700"
                  }`}
                  placeholder="e.g. name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "error-email" : undefined}
                  required
                />
                <Mail size={18} className="absolute left-4 text-slate-400" aria-hidden="true" />
              </div>
              {errors.email && (
                <span id="error-email" className="text-xs text-red-500 font-semibold" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Message Box */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-message" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-start">
                <textarea
                  id="modal-message"
                  name="message"
                  rows={4}
                  className={`w-full px-4 py-3 pl-11 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.message ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700"
                  }`}
                  placeholder="Type details of your request here..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "error-message" : undefined}
                  required
                />
                <MessageSquare size={18} className="absolute left-4 top-3 text-slate-400" aria-hidden="true" />
              </div>
              {errors.message && (
                <span id="error-message" className="text-xs text-red-500 font-semibold" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-4 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
                disabled={isSubmitting}
              >
                <Send size={16} aria-hidden="true" />
                {isSubmitting ? "Sending..." : "Submit Enquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
