import React from "react";

const floatingImages = [
  {
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&q=80",
    style: "top-[-40px] left-[-40px] rotate-[-12deg]",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
    style: "top-[30px] right-[-50px] rotate-[10deg]",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80",
    style: "bottom-[-40px] left-[20px] rotate-[8deg]",
  },
  {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&q=80",
    style: "bottom-[-30px] right-[40px] rotate-[-8deg]",
  },
  {
    src: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
    style: "top-[50%] left-[-60px] -translate-y-1/2 rotate-[6deg]",
  },
];

export default function HeroSection() {
  return (
    <section className="relative mx-auto mt-8 mb-12 max-w-4xl rounded-3xl bg-neutral-900 shadow-2xl border border-neutral-800 overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
      {/* Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-neutral-800 bg-neutral-900/80 z-30 relative">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20 shrink-0">
            <span className="font-bold text-orange-400 text-lg">J</span>
          </div>
          <span className="font-bold text-white tracking-wide text-lg">JOYJAM</span>
        </div>
        <ul className="hidden md:flex gap-8 text-white/80 text-sm font-medium">
          <li><a href="#" className="hover:text-white transition">For creators</a></li>
          <li><a href="#" className="hover:text-white transition">For fans</a></li>
          <li><a href="#" className="hover:text-white transition">Partners</a></li>
          <li><a href="#" className="hover:text-white transition">About</a></li>
          <li><a href="#" className="hover:text-white transition">Contact us</a></li>
        </ul>
        <button className="rounded-full border-2 border-white px-5 py-1.5 text-white font-semibold bg-neutral-900 hover:bg-white hover:text-neutral-900 transition-all text-sm shadow-md">
          Join the Beta
        </button>
      </nav>
      {/* Floating Images */}
      {floatingImages.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt="music visual"
          className={`w-28 h-28 object-cover rounded-2xl shadow-lg absolute z-10 ${img.style}`}
          draggable={false}
        />
      ))}
      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-8 py-16 w-full">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
          Music's <br /> Social Media
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-xl">
          Creators deserve better. Fans deserve more. JoyJam is built for both.
        </p>
        <button className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold bg-transparent hover:bg-white hover:text-neutral-900 transition-all text-lg shadow-md">
          Join the waitlist
        </button>
      </div>
    </section>
  );
}
