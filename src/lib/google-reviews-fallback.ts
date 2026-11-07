import type { GoogleReview } from "./google-reviews";

// Real 5-star Google reviews for Nunchi Salon by Naheed, kept as a graceful
// fallback so the section always shows genuine client feedback when the
// Google Places API credentials are not configured on this deployment.
export const GOOGLE_REVIEWS_FALLBACK: {
  rating: number;
  placeName: string;
  reviews: GoogleReview[];
} = {
  placeName: "Nunchi Salon By Naheed",
  rating: 4.8,
  reviews: [
    {
      id: "fallback-ash-bhatti",
      authorName: "Ash Bhatti",
      rating: 5,
      relativeTime: "",
      time: 0,
      text: "Saba did an exceptional job with my hair cut! She listened attentively to what I wanted and delivered outstanding results. Her quick service and expertise truly transformed my look, making me feel like a new person. Highly recommend! ❤️❤️",
    },
    {
      id: "fallback-sundas-tariq",
      authorName: "Sundas Tariq",
      rating: 5,
      relativeTime: "",
      time: 0,
      text: "I had a wonderful experience at the salon! I'm absolutely satisfied with my hair colour — it turned out exactly the way I wanted, rich and vibrant. The mani-pedi service was also so relaxing and professionally done. The staff was kind, attentive, and really made me feel pampered. Highly recommend this place for anyone looking to treat themselves! 💇‍♀️💅",
    },
    {
      id: "fallback-iqra-shahid",
      authorName: "Iqra Shahid",
      rating: 5,
      relativeTime: "",
      time: 0,
      text: "I had a wonderful experience with their professional makeup and hair cutting services. Miss Tahmeem you did a great job. The staff was skilled, attentive, and made sure everything was done to perfection. I truly appreciated their dedication and attention to detail. Great job! In shaa Allah, I will definitely visit again soon.",
    },
  ],
};
