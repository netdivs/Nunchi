import Image from "next/image";
import Link from "next/link";
import { HOME_SERVICES } from "@/lib/home-content";

export default function ServicesSection() {
  return (
    <div className="nc-services-wrap" id="service-sec">
      <Image
        src="/images/ref/leaves_11.png"
        alt=""
        width={277}
        height={328}
        className="nc-services-leaf nc-services-leaf--left"
        aria-hidden="true"
      />
      <Image
        src="/images/ref/leaves_7.png"
        alt=""
        width={205}
        height={348}
        className="nc-services-leaf nc-services-leaf--right"
        aria-hidden="true"
      />

      <section className="nc-services">
        <div className="nc-container">
          <div className="nc-services-head">
            <span className="nc-subtitle">Our Services</span>
            <Image
              src="/images/ref/title_shape_3.svg"
              alt=""
              width={270}
              height={21}
              className="nc-services-shape"
              aria-hidden="true"
            />
            <h2 className="nc-title">Premium Services In Nunchi Salon</h2>
          </div>

          <div className="nc-service-grid">
            {HOME_SERVICES.map((service) => (
              <article key={service.number} className="nc-service-card">
                <div
                  className="nc-service-card-overlay"
                  aria-hidden="true"
                />
                <p className="nc-service-num" aria-hidden="true">
                  {service.number}
                </p>
                <div className="nc-service-icon" aria-hidden="true">
                  <Image
                    src={service.icon}
                    alt=""
                    width={60}
                    height={58}
                  />
                </div>
                <h3>
                  <Link href="/services">{service.title}</Link>
                </h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
