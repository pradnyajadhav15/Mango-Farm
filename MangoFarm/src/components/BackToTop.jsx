import React from "react";

export default function BackToTop() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;

  return React.createElement(
    "button",
    {
      onClick: toTop,
      "aria-label": "Back to top",
      className: "fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-forest text-cream shadow-lg transition hover:bg-mango",
    },
    "↑"
  );
}