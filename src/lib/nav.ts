export const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
] as const;

// Dropdown entries for the Services menu item. Ids match the sections on
// /services so each link scrolls straight to that treatment.
export const SERVICE_MENU = [
  { label: "Hair", href: "/services#hair" },
  { label: "Makeup", href: "/services#makeup" },
  { label: "Facial & Skin", href: "/services#skin" },
  { label: "Nails", href: "/services#nails" },
  { label: "Bridal", href: "/services#bridal" },
  { label: "Beauty & Body", href: "/services#beauty" },
] as const;

export const SERVICE_LINKS = [
  "Microblading",
  "Scalp micropigmentation",
  "Brow tint",
  "Lash Lifting",
  "Lip blushing",
  "Hair Extensions",
  "3D hair",
  "Colour bar",
  "Makeup hub",
  "Micro needling",
  "Skin care treatments",
] as const;

export const OPENING_HOURS = [
  { day: "Monday", time: "11am - 9pm" },
  { day: "Tuesday", time: "11am - 9pm" },
  { day: "Wednesday", time: "11am - 9pm" },
  { day: "Thursday", time: "11am - 9pm" },
  { day: "Fri - Sat", time: "11am - 9pm" },
  { day: "Sunday", time: "11am - 9pm" },
] as const;
