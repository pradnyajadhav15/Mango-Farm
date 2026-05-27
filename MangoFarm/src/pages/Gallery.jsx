import React from "react";

const photos = [
  "/gallery/photo1.jpg",
  "/gallery/photo2.jpg",
  "/gallery/photo3.jpg",
  "/gallery/photo4.jpg",
  "/gallery/photo5.jpg",
  "/gallery/photo6.jpg",
  "/gallery/photo7.jpg",
  "/gallery/photo8.jpg",
  "/gallery/photo9.jpg",
  "/gallery/photo10.jpg",
  "/gallery/photo11.jpg",
  "/gallery/photo12.jpg",
];

export default function Gallery() {
  const [active, setActive] = React.useState(null);

  return (
    <div className="bg-creamlight">
      <div className="bg-cream py-12 text-center">
        <h1 className="font-display text-4xl font-bold text-forest">Photo Gallery</h1>
        <p className="mt-2 text-gray-600">Glimpses of life at Mango Farm</p>
      </div>

      <section className="container-x py-16">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>img]:mb-4">
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={"Farm " + (i + 1)}
              onClick={() => setActive(src)}
              className="w-full cursor-pointer rounded-xl shadow-sm transition hover:scale-[1.02]"
            />
          ))}
        </div>
      </section>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-6 top-6 text-4xl text-white"
          >
            ×
          </button>
          <img src={active} alt="Full size" className="max-h-[90vh] max-w-[90vw] rounded-lg" />
        </div>
      )}
    </div>
  );
}