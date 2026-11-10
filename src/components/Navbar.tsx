"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import {
  ChevronDownIcon,
  ClockIcon,
  CloseIcon,
  FacebookIcon,
  GridIcon,
  InstagramIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  TikTokIcon,
} from "@/components/Icons";
import { PRIMARY_NAV, SERVICE_MENU } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

const CALL_NUMBERS = "03210044497 - 03030500012";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname]
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 991px)");
    const syncMobile = () => {
      if (!media.matches) setOpen(false);
    };
    syncMobile();
    media.addEventListener("change", syncMobile);
    return () => media.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 70);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <header className="nc-header">
        <div className="nc-header-top">
          <div className="nc-header-top-inner">
            <div className="nc-header-info-wrap">
              <div className="nc-header-info">
                <span className="nc-info-icon">
                  <PhoneIcon size={20} />
                </span>
                <div>
                  <span className="nc-info-label">Call us any time:</span>
                  <p className="nc-info-link">
                    <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>
                      {CALL_NUMBERS}
                    </a>
                  </p>
                </div>
              </div>

              <div className="nc-header-info">
                <span className="nc-info-icon">
                  <MailIcon size={20} />
                </span>
                <div>
                  <span className="nc-info-label">Email us:</span>
                  <p className="nc-info-link">
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </p>
                </div>
              </div>

              <div className="nc-header-info">
                <span className="nc-info-icon">
                  <ClockIcon size={20} />
                </span>
                <div>
                  <span className="nc-info-label">Opening hours:</span>
                  <p className="nc-info-link">11:00AM - 8:00PM</p>
                </div>
              </div>
            </div>

            <div className="nc-header-social">
              {SITE.socials.map((social) => {
                const Icon =
                  social.label === "Facebook"
                    ? FacebookIcon
                    : social.label === "Instagram"
                      ? InstagramIcon
                      : TikTokIcon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${SITE.shortName} on ${social.label}`}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className={cn("nc-menu-bar", scrolled && "is-sticky")}>
          <div className="nc-menu-inner">
            <div className="nc-logo-curve" aria-hidden="true" />
            <div className="nc-header-logo">
              <BrandLogo />
            </div>

            <nav className="nc-main-nav" aria-label="Main navigation">
              <ul>
                {PRIMARY_NAV.map((item) => {
                  const hasMenu = item.href === "/services";
                  return (
                    <li
                      key={item.href}
                      className={cn(hasMenu && "nc-has-dropdown")}
                    >
                      <Link
                        href={item.href}
                        className={cn(isActive(item.href) && "is-active")}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        {item.label}
                        {hasMenu ? (
                          <ChevronDownIcon
                            className="nc-nav-chevron"
                            size={13}
                          />
                        ) : null}
                      </Link>

                      {hasMenu ? (
                        <ul
                          className="nc-dropdown"
                          aria-label="Service categories"
                        >
                          {SERVICE_MENU.map((subItem) => (
                            <li key={subItem.href}>
                              <Link href={subItem.href}>{subItem.label}</Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="nc-header-actions">
              <Link
                href="/services"
                className="nc-grid-btn"
                aria-label="Explore all services"
              >
                <GridIcon size={18} />
              </Link>
              <Link href="/contact" className="nc-btn nc-appointment-btn">
                Appointment Now
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <button
                type="button"
                className="nc-mobile-toggle"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="nc-mobile-menu"
                onClick={() => setOpen((value) => !value)}
              >
                <MenuIcon size={24} />
              </button>
            </div>
          </div>
        </div>

        {scrolled ? <div className="nc-menu-spacer" aria-hidden="true" /> : null}
      </header>

      <div
        className={cn("nc-mobile-overlay", open && "is-open")}
        id="nc-mobile-menu"
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div
          className="nc-mobile-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="nc-mobile-head">
            <BrandLogo onClick={() => setOpen(false)} compact />
            <button
              type="button"
              className="nc-mobile-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon size={16} />
            </button>
          </div>

          <nav className="nc-mobile-nav" aria-label="Mobile navigation links">
            <ul>
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(isActive(item.href) && "is-active")}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>

                  {item.href === "/services" ? (
                    <ul className="nc-mobile-subnav">
                      {SERVICE_MENU.map((subItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            onClick={() => setOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="nc-mobile-contact">
            <p>Book your visit</p>
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>
              {SITE.phone}
            </a>
            <p className="mt-4">We are open 11:00 AM — 8:00 PM, seven days a week.</p>

            <Link
              href="/contact"
              className="nc-btn nc-mobile-cta"
              onClick={() => setOpen(false)}
            >
              Appointment Now
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <div className="nc-mobile-social">
              {SITE.socials.map((social) => {
                const Icon =
                  social.label === "Facebook"
                    ? FacebookIcon
                    : social.label === "Instagram"
                      ? InstagramIcon
                      : TikTokIcon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${SITE.shortName} on ${social.label}`}
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
