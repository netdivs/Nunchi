import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import OfferFields from "@/app/admin/offers/OfferFields";
import ConfirmButton from "@/app/admin/offers/ConfirmButton";
import {
  createOfferAction,
  deleteOfferAction,
  loginAction,
  logoutAction,
  togglePublishAction,
  updateOfferAction,
} from "@/app/admin/offers/actions";
import {
  isAdminAuthenticated,
  isAdminConfigured,
} from "@/lib/admin-auth";
import {
  formatOfferDate,
  formatOfferPrice,
  getDiscountPercent,
  getAllOffers,
  isOfferActive,
  todayInPakistan,
} from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offers Manager",
  robots: {
    index: false,
    follow: false,
  },
};

type AdminPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

const savedMessages: Record<string, string> = {
  created: "Offer created.",
  updated: "Offer updated successfully.",
  deleted: "Offer deleted.",
  published: "Offer is now live on the website.",
  unpublished: "Offer moved to drafts and hidden from the website.",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300";

export default async function AdminOffersPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const configured = isAdminConfigured();
  const authenticated = await isAdminAuthenticated();

  if (!configured) {
    return (
      <main className="pt-40 pb-28 md:pt-48">
        <Container className="max-w-3xl">
          <div className="border border-linen bg-white/50 p-8 md:p-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
              Offers Manager
            </p>
            <h1 className="mt-4 font-serif text-4xl text-ink">
              Connect the offers manager
            </h1>
            <p className="mt-4 text-sm leading-7 text-cocoa">
              The offers manager is ready, but it needs an administrator password
              before it can be used. Add the following variables to{" "}
              <code className="bg-cream px-1.5 py-0.5 text-ink">
                .env.local
              </code>{" "}
              and restart the development server.
            </p>

            <pre className="mt-6 overflow-x-auto border border-linen bg-cream/70 p-5 text-xs leading-6 text-ink">
              <code>{`ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=choose-a-long-random-string`}</code>
            </pre>

            <p className="mt-6 text-sm leading-7 text-cocoa">
              Offers are stored in{" "}
              <code className="bg-cream px-1.5 py-0.5 text-ink">
                data/offers.json
              </code>{" "}
              by default. Set{" "}
              <code className="bg-cream px-1.5 py-0.5 text-ink">
                OFFERS_FILE
              </code>{" "}
              to use a different writable path on your server.
            </p>

            <Link
              href="/"
              className={`${buttonBase} mt-8 border-ink/20 text-ink hover:border-gold hover:text-gold`}
            >
              Back to website
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="pt-40 pb-28 md:pt-48">
        <Container className="max-w-md">
          <div className="border border-linen bg-white/60 p-8 md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
              Private access
            </p>
            <h1 className="mt-4 font-serif text-4xl text-ink">Offers manager</h1>
            <p className="mt-3 text-sm leading-7 text-cocoa">
              Sign in to add, edit, publish or remove salon offers.
            </p>

            {params.error ? (
              <p
                role="alert"
                className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {params.error}
              </p>
            ) : null}

            <form action={loginAction} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-taupe"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full border border-linen bg-white/80 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                />
              </div>
              <button
                type="submit"
                className={`${buttonBase} w-full border-ink bg-ink text-ivory hover:border-gold hover:bg-gold`}
              >
                Sign in
              </button>
            </form>
          </div>
        </Container>
      </main>
    );
  }

  const offers = await getAllOffers();
  const today = todayInPakistan();
  const liveCount = offers.filter((offer) => isOfferActive(offer, today)).length;
  const draftCount = offers.filter((offer) => !offer.published).length;
  const expiredCount = offers.filter(
    (offer) => offer.published && offer.expiryDate < today
  ).length;

  return (
    <main className="pt-36 pb-28 md:pt-44">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-linen pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
              Offers Manager
            </p>
            <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
              Salon offers
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-cocoa">
              Publish seasonal packages, update pricing, and let expired offers
              disappear automatically from the homepage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/offers"
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonBase} border-ink/20 text-ink hover:border-gold hover:text-gold`}
            >
              View live offers
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className={`${buttonBase} border-ink/20 text-ink hover:border-gold hover:text-gold`}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Live offers", value: liveCount },
            { label: "Drafts", value: draftCount },
            { label: "Expired", value: expiredCount },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-linen bg-white/40 px-5 py-4"
            >
              <p className="font-serif text-3xl text-ink">{stat.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-taupe">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {params.error ? (
          <p
            role="alert"
            className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            {params.error}
          </p>
        ) : null}

        {params.saved && savedMessages[params.saved] ? (
          <p
            role="status"
            className="mt-6 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800"
          >
            {savedMessages[params.saved]}
          </p>
        ) : null}

        <section className="mt-10 border border-linen bg-white/50 p-6 md:p-8">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                New offer
              </p>
              <h2 className="mt-2 font-serif text-3xl text-ink">
                Create an offer
              </h2>
            </div>
            <p className="max-w-md text-xs leading-6 text-taupe">
              Use a local image path such as{" "}
              <code className="bg-cream px-1 py-0.5 text-ink">
                /images/makeupclose.jpg
              </code>{" "}
              or a full https image URL.
            </p>
          </div>

          <form action={createOfferAction}>
            <OfferFields idPrefix="new-offer" />
            <button
              type="submit"
              className={`${buttonBase} mt-7 border-ink bg-ink text-ivory hover:border-gold hover:bg-gold`}
            >
              Save offer
            </button>
          </form>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-serif text-3xl text-ink">All offers</h2>
            <p className="text-xs text-taupe">
              Expired offers are hidden from the website automatically.
            </p>
          </div>

          {offers.length === 0 ? (
            <div className="border border-linen bg-white/40 p-8 text-sm text-cocoa">
              No offers yet. Create the first offer above.
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => {
                const live = isOfferActive(offer, today);
                const status = !offer.published
                  ? "Draft"
                  : offer.expiryDate < today
                    ? "Expired"
                    : "Live";
                const statusClass =
                  status === "Live"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : status === "Expired"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-amber-200 bg-amber-50 text-amber-800";

                return (
                  <article
                    key={offer.id}
                    className="border border-linen bg-white/50"
                  >
                    <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center">
                      {/* Admin thumbnails can be local or remote. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={offer.image}
                        alt={offer.imageAlt}
                        className="h-24 w-24 shrink-0 object-cover"
                        loading="lazy"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-serif text-2xl text-ink">
                            {offer.title}
                          </h3>
                          <span
                            className={`border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] ${statusClass}`}
                          >
                            {status}
                          </span>
                          {offer.badge ? (
                            <span className="border border-linen px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-taupe">
                              {offer.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-cocoa">
                          {offer.description}
                        </p>
                        <p className="mt-2 text-xs text-taupe">
                          {formatOfferPrice(
                            offer.discountedPrice,
                            offer.currency
                          )}{" "}
                          <span className="line-through">
                            {formatOfferPrice(
                              offer.originalPrice,
                              offer.currency
                            )}
                          </span>{" "}
                          · {getDiscountPercent(offer)}% off · valid until{" "}
                          {formatOfferDate(offer.expiryDate)}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2">
                        <form action={togglePublishAction}>
                          <input type="hidden" name="id" value={offer.id} />
                          <button
                            type="submit"
                            className={`${buttonBase} border-ink/20 text-ink hover:border-gold hover:text-gold`}
                          >
                            {offer.published ? "Unpublish" : "Publish"}
                          </button>
                        </form>

                        <form action={deleteOfferAction}>
                          <input type="hidden" name="id" value={offer.id} />
                          <ConfirmButton
                            message={`Delete "${offer.title}"? This cannot be undone.`}
                            className={`${buttonBase} border-red-200 text-red-700 hover:border-red-400 hover:bg-red-50`}
                          >
                            Delete
                          </ConfirmButton>
                        </form>
                      </div>
                    </div>

                    <details className="border-t border-linen">
                      <summary className="cursor-pointer px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-taupe transition-colors hover:text-gold">
                        Edit offer
                      </summary>
                      <form action={updateOfferAction} className="px-5 pb-6">
                        <input type="hidden" name="id" value={offer.id} />
                        <OfferFields
                          offer={offer}
                          idPrefix={`edit-${offer.id}`}
                        />
                        <button
                          type="submit"
                          className={`${buttonBase} mt-6 border-ink bg-ink text-ivory hover:border-gold hover:bg-gold`}
                        >
                          Save changes
                        </button>
                      </form>
                    </details>

                    {!live ? (
                      <p className="border-t border-linen bg-cream/40 px-5 py-3 text-xs text-taupe">
                        This offer is not visible on the website right now.
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
