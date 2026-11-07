import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import Counter from "@/components/home/Counter";

export default function AboutSection() {
  return (
    <section className="nc-about nc-space" id="about-sec">
      <div className="nc-container">
        <div className="nc-about-grid">
          <div className="nc-about-media">
            <div className="nc-about-img4">
              <Image
                src="/images/bridal/bride1.jpg"
                alt="Bridal makeup by Nunchi Salon by Naheed in Wapda Town, Lahore"
                width={343}
                height={515}
                sizes="(max-width: 767px) 90vw, 343px"
              />
            </div>

            <div className="nc-about-img5">
              <Image
                src="/images/bridal/kaya.jpg"
                alt="Kaya bridal look styled by Nunchi Salon by Naheed in Lahore"
                width={275}
                height={413}
                sizes="275px"
              />
            </div>

            <Image
              src="/images/ref/about_3_3.jpg"
              alt=""
              width={220}
              height={220}
              className="nc-about-shape"
              aria-hidden="true"
            />

            <div className="nc-since-badge">
              <svg
                className="nc-since-text"
                viewBox="0 0 142 142"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="nc-since-circle"
                    d="M71,71 m-55,0 a55,55 0 1,1 110,0 a55,55 0 1,1 -110,0"
                    fill="none"
                  />
                </defs>
                <text>
                  <textPath href="#nc-since-circle" startOffset="0">
                    COMPANY SINCE 2023 &bull; COMPANY SINCE 2023 &bull;
                  </textPath>
                </text>
              </svg>
              <span className="nc-since-center" aria-hidden="true">
                <Image
                  src="/images/ref/logo-icon.png"
                  alt=""
                  width={44}
                  height={33}
                />
              </span>
            </div>
          </div>

          <div className="nc-about-content">
            <span className="nc-subtitle">
              About Us
              <Image
                src="/images/ref/title_right.svg"
                alt=""
                width={119}
                height={10}
                aria-hidden="true"
              />
            </span>

            <h2 className="nc-title">
              Welcome to Nunchi Salon — Wapda Town&rsquo;s Beauty Destination
            </h2>

            <p className="nc-about-desc">
              Based at 13-E2 Wapda Town, Lahore, Nunchi Salon by Naheed is a
              full-service beauty salon for hair, bridal and party makeup, skin
              care, nails and beauty treatments. We use premium products and an
              unhurried, considered approach so every client leaves feeling like
              the best version of themselves.
            </p>

            <div className="nc-about-counter">
              <Counter
                end={26}
                label="Years of Experience"
                icon="/images/ref/counter_2_1.svg"
              />
              <Counter
                end={42}
                label="Our Awesome Expert"
                icon="/images/ref/man.svg"
              />
            </div>

            <Link href="/about" className="nc-btn">
              Learn More
              <ArrowRightIcon size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
