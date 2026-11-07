"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";

const inputClass =
  "w-full border-b border-linen bg-transparent py-3.5 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-taupe/50 focus:border-gold";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Booking request for ${SITE.name}`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      form.service && `Service: ${form.service}`,
      form.date && `Preferred date: ${form.date}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean);

    window.open(
      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
        lines.join("\n")
      )}`,
      "_blank"
    );
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Full name *" htmlFor="cf-name">
          <input
            id="cf-name"
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            className={inputClass}
          />
        </Field>
        <Field label="Phone *" htmlFor="cf-phone">
          <input
            id="cf-phone"
            type="tel"
            required
            value={form.phone}
            onChange={update("phone")}
            placeholder="+92 3XX XXXXXXX"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Email" htmlFor="cf-email">
          <input
            id="cf-email"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>
        <Field label="Service" htmlFor="cf-service">
          <select
            id="cf-service"
            value={form.service}
            onChange={update("service")}
            className={inputClass}
          >
            <option value="">Select a service</option>
            {SERVICES.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Preferred date" htmlFor="cf-date">
        <input
          id="cf-date"
          type="date"
          value={form.date}
          onChange={update("date")}
          className={`${inputClass} [color-scheme:light]`}
        />
      </Field>

      <Field label="Message" htmlFor="cf-message">
        <textarea
          id="cf-message"
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us what you have in mind…"
          className={`${inputClass} resize-none`}
        />
      </Field>

      {sent ? (
        <div className="border border-gold/30 bg-cream px-6 py-5">
          <p className="font-serif text-xl text-ink">Thank you, {form.name.split(" ")[0]}.</p>
          <p className="mt-1.5 text-sm leading-relaxed text-cocoa">
            Your request has been prepared — we will confirm your appointment on
            WhatsApp shortly. If the message did not open, please reach us at{" "}
            <a
              href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
              className="underline decoration-gold/60 underline-offset-4 hover:text-gold"
            >
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      ) : (
        <Button type="submit">Send Request</Button>
      )}
    </form>
  );
}
