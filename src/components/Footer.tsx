import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
} from "@/components/Icons";
import { PRIMARY_NAV, SERVICE_LINKS, OPENING_HOURS } from "@/lib/nav";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="nc-footer">
      <div className="nc-footer-inner">
        <div className="nc-footer-grid">
          <div className="nc-footer-brand">
            <BrandLogo />
            <p className="nc-footer-about">
              A premium beauty salon in Wapda Town, Lahore for hair, bridal
              makeup, skin and nails — crafted with quiet precision in a space
              made for you.
            </p>

            <ul className="nc-footer-contact">
              <li>
                <MapPinIcon size={26} />
                <a
                  href={SITE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SITE.address}
                </a>
              </li>
              <li>
                <PhoneIcon size={26} />
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>
                  {SITE.phone}
                </a>
              </li>
              {SITE.phoneAlt ? (
                <li>
                  <PhoneIcon size={26} />
                  <a href={`tel:${SITE.phoneAlt.replace(/[^+\d]/g, "")}`}>
                    {SITE.phoneAlt}
                  </a>
                </li>
              ) : null}
              <li>
                <MailIcon size={26} />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>

            <div className="nc-footer-social">
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

          <div>
            <h3 className="nc-footer-title">Quick link</h3>
            <ul className="nc-footer-links">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/beauty-salon-wapda-town-lahore">
                  Wapda Town, Lahore
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="nc-footer-title">Our services</h3>
            <ul className="nc-footer-links">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <Link href="/services">{service}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nc-footer-hours-col">
            <h3 className="nc-footer-title">Opening Hours</h3>
            <ul className="nc-footer-hours">
              {OPENING_HOURS.map((entry) => (
                <li key={entry.day}>
                  <span>{entry.day}:</span>
                  <span>{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="nc-copyright">
        <div className="nc-copyright-inner">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
