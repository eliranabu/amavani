"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IconPlus } from "./Icons";

/* ---------- Accordion ---------- */
export function Accordion({ items, defaultOpen = 0 }: { items: { title: string; content: React.ReactNode }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className="accordion__item" key={it.title}>
            <h3 style={{ margin: 0 }}>
              <button
                className="accordion__trigger" aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`} id={`${id}-t${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {it.title} <IconPlus />
              </button>
            </h3>
            <div className={`accordion__panel${isOpen ? " is-open" : ""}`} id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-t${i}`}>
              <div><div className="accordion__content">{it.content}</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Breadcrumbs ---------- */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="פירורי לחם">
      <ol>
        {items.map((it, i) => (
          <li key={i}>{it.href ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------- Reveal (כניסה עדינה לאזורים) ---------- */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: { children: React.ReactNode; as?: "div" | "section"; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true); return;
    }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={`reveal${visible ? " is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ---------- Focus trap + Escape לחלוניות ---------- */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const el = ref.current;
    const sel = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    window.setTimeout(() => (el?.querySelector<HTMLElement>("[data-autofocus]") ?? el?.querySelector<HTMLElement>(sel))?.focus(), 50);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && el) {
        const f = Array.from(el.querySelectorAll<HTMLElement>(sel));
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocus?.focus?.();
    };
  }, [open, onClose]);
  return ref;
}

/* ---------- Quantity ---------- */
export function Quantity({ value, onChange, small, label = "כמות" }: { value: number; onChange: (n: number) => void; small?: boolean; label?: string }) {
  return (
    <div className={`qty${small ? " qty--sm" : ""}`} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= 10} aria-label="הגדלת כמות">+</button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="הקטנת כמות">−</button>
    </div>
  );
}
