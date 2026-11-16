// Quietly download below-the-fold photos after the page has loaded,
// so hosts and past-conference photos are already cached when visitors scroll.
const urls = Object.values(
  import.meta.glob(
    [
      "@/assets/apostle-td-philips.webp",
      "@/assets/pst-theo-pistis-danjuma.webp",
      "@/assets/conference_speaker.webp",
      "@/assets/apostolic_impartation.webp",
      "@/assets/total_resurrender.webp",
      "@/assets/worship_conference.webp",
      "@/assets/spirit_inspired_prayers.webp",
    ],
    { eager: true, import: "default", query: "?url" },
  ),
) as string[];

export function prewarmImages() {
  const run = () =>
    urls.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  const start = () => setTimeout(run, 800);
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}
