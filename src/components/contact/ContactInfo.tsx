import { SITE } from "@/lib/site";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-gold/40 text-gold">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        {children}
      </svg>
    </span>
  );
}

const phone = (
  <>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

const chat = (
  <>
    <path d="M12 3a9 9 0 0 1 9 9c0 4.5-3.6 8-8.4 8h-1.2A8.4 8.4 0 0 1 3 12c0-5 4-9 9-9z" />
    <path d="M8.5 10.5h7M8.5 13.5h4.5" strokeLinecap="round" />
  </>
);

const mail = (
  <>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

const pin = (
  <>
    <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
);

const clock = (
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" strokeLinecap="round" />
  </>
);

export default function ContactInfo() {
  const tel = SITE.phone.replace(/[^+\d]/g, "");

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-5">
        <Icon>{phone}</Icon>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">Phone</p>
          <a
            href={`tel:${tel}`}
            className="mt-1.5 block text-[15px] text-ink transition-colors duration-300 hover:text-gold"
          >
            {SITE.phone}
          </a>
          {SITE.phoneAlt ? (
            <a
              href={`tel:${SITE.phoneAlt.replace(/[^+\d]/g, "")}`}
              className="mt-1 block text-[15px] text-ink transition-colors duration-300 hover:text-gold"
            >
              {SITE.phoneAlt}
            </a>
          ) : null}
        </div>
      </div>

      <div className="flex items-start gap-5">
        <Icon>{chat}</Icon>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">WhatsApp</p>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-block text-[15px] text-ink transition-colors duration-300 hover:text-gold"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </div>

      <div className="flex items-start gap-5">
        <Icon>{mail}</Icon>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">Email</p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-1.5 inline-block break-all text-[15px] text-ink transition-colors duration-300 hover:text-gold"
          >
            {SITE.email}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-5">
        <Icon>{pin}</Icon>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">Address</p>
          <p className="mt-1.5 max-w-[260px] text-[15px] leading-relaxed text-ink">
            {SITE.address}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-5">
        <Icon>{clock}</Icon>
        <div className="w-full max-w-[300px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">Opening Hours</p>
          <dl className="mt-1.5 divide-y divide-linen text-[14px] text-ink">
            {SITE.hours.map((h) => (
              <div key={h.day} className="flex items-center justify-between gap-6 py-2.5">
                <dt>{h.day}</dt>
                <dd className="text-cocoa">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
