import Link from "next/link";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { SITE } from "@/lib/site";

export default function MobileActionBar() {
  return (
    <div className="nc-mobile-actions" aria-label="Quick contact actions">
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        className="nc-mobile-action nc-mobile-action--whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${SITE.shortName} on WhatsApp`}
      >
        <WhatsAppIcon size={18} />
        <span>WhatsApp</span>
      </a>
      <a
        href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
        className="nc-mobile-action nc-mobile-action--call"
        aria-label={`Call ${SITE.shortName}`}
      >
        <PhoneIcon size={17} />
        <span>Call Now</span>
      </a>
      <Link
        href="/contact"
        className="nc-mobile-action nc-mobile-action--primary"
      >
        <span>Book Now</span>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
