import type { Offer } from "@/lib/offers";

const inputClass =
  "w-full border border-linen bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 focus:border-gold";

const labelClass =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-taupe";

type OfferFieldsProps = {
  offer?: Offer;
  idPrefix: string;
};

export default function OfferFields({ offer, idPrefix }: OfferFieldsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor={`${idPrefix}-title`}>
          Offer title
        </label>
        <input
          className={inputClass}
          id={`${idPrefix}-title`}
          name="title"
          type="text"
          required
          maxLength={90}
          defaultValue={offer?.title ?? ""}
          placeholder="Bridal Glow Package"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-badge`}>
          Badge
        </label>
        <input
          className={inputClass}
          id={`${idPrefix}-badge`}
          name="badge"
          type="text"
          maxLength={32}
          defaultValue={offer?.badge ?? ""}
          placeholder="Special Offer"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-expiry`}>
          Expiry date
        </label>
        <input
          className={inputClass}
          id={`${idPrefix}-expiry`}
          name="expiryDate"
          type="date"
          required
          defaultValue={offer?.expiryDate ?? ""}
        />
      </div>

      <div className="md:col-span-2">
        <label className={labelClass} htmlFor={`${idPrefix}-description`}>
          Short description
        </label>
        <textarea
          className={`${inputClass} min-h-28 resize-y`}
          id={`${idPrefix}-description`}
          name="description"
          required
          maxLength={320}
          defaultValue={offer?.description ?? ""}
          placeholder="Describe the treatment, what is included, and why it feels special."
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-image`}>
          Image path or URL
        </label>
        <input
          className={inputClass}
          id={`${idPrefix}-image`}
          name="image"
          type="text"
          required
          defaultValue={offer?.image ?? ""}
          placeholder="/images/makeupclose.jpg"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-image-alt`}>
          Image alt text
        </label>
        <input
          className={inputClass}
          id={`${idPrefix}-image-alt`}
          name="imageAlt"
          type="text"
          maxLength={140}
          defaultValue={offer?.imageAlt ?? ""}
          placeholder="Bridal makeup at Nunchi Salon"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-original`}>
          Original price
        </label>
        <input
          className={inputClass}
          id={`${idPrefix}-original`}
          name="originalPrice"
          type="number"
          min="1"
          step="1"
          required
          defaultValue={offer?.originalPrice ?? ""}
          placeholder="45000"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-discounted`}>
          Discounted price
        </label>
        <input
          className={inputClass}
          id={`${idPrefix}-discounted`}
          name="discountedPrice"
          type="number"
          min="1"
          step="1"
          required
          defaultValue={offer?.discountedPrice ?? ""}
          placeholder="32500"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-currency`}>
          Currency
        </label>
        <input
          className={inputClass}
          id={`${idPrefix}-currency`}
          name="currency"
          type="text"
          maxLength={3}
          defaultValue={offer?.currency ?? "PKR"}
          placeholder="PKR"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`${idPrefix}-booking`}>
          Booking link
        </label>
        <input
          className={inputClass}
          id={`${idPrefix}-booking`}
          name="bookingHref"
          type="text"
          defaultValue={offer?.bookingHref ?? "/contact"}
          placeholder="/contact"
        />
      </div>

      <label className="flex items-center gap-3 md:col-span-2">
        <input
          type="checkbox"
          name="published"
          defaultChecked={offer?.published ?? true}
          className="h-4 w-4 accent-[#ab6a49]"
        />
        <span className="text-sm text-cocoa">
          Published — show this offer on the website
        </span>
      </label>
    </div>
  );
}
