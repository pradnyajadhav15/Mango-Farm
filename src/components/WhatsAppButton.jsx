import React from "react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918766977048"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-forest opacity-0 shadow-warmlg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat with us
      </span>

      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 animate-wiggle group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <svg viewBox="0 0 32 32" className="relative h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.47 1.71 6.42L3.2 28.8l6.55-1.71a12.74 12.74 0 0 0 6.25 1.62h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.7-12.8-12.71zm0 23.04h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.62 10.62 0 0 1-1.63-5.66c0-5.86 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.12 7.53c0 5.87-4.78 10.65-10.65 10.65zm5.84-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.62 0 1.55 1.13 3.04 1.293.25.16.21 2.22 3.39 5.38 4.76.75.32 1.34.52 1.8.66.76.24 1.44.21 1.98.13.6-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </span>
    </a>
  );
}
