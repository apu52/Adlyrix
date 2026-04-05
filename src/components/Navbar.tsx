import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPinned(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-4 z-[90] px-4">
      <motion.div initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="mx-auto max-w-6xl">
        <div
          className={`mx-auto flex items-center justify-between rounded-full border border-white/15 bg-[linear-gradient(180deg,rgba(58,58,58,0.92)_0%,rgba(34,34,34,0.92)_100%)] px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 ${
            isPinned ? "w-full max-w-6xl border-[#f7b26d]/35 shadow-[0_18px_50px_rgba(0,0,0,0.45)]" : "w-full max-w-3xl"
          }`}
        >
          <a href="/#hero" className="flex items-center gap-3 pr-4">
            <img src="/adlyrix-favicon.svg" alt="Adlyrix" className="h-10 w-10 rounded-full" />
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Adlyrix
              </p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">Fashion Ad Studio</p>
            </div>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-white/70 transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login" className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-all hover:border-white/20 hover:text-white">
              Login
            </Link>
            <Link to="/dashboard" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02]">
              Join the Beta
            </Link>
          </div>

          <button type="button" onClick={() => setOpen((current) => !current)} className="text-white md:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open ? (
          <div className="mx-auto mt-3 max-w-3xl rounded-[1.6rem] border border-white/10 bg-[rgba(15,15,15,0.96)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm text-white/75 transition-all hover:bg-white/5 hover:text-white">
                  {item.label}
                </a>
              ))}
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm text-white/75 transition-all hover:bg-white/5 hover:text-white">
                Login
              </Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-white px-3 py-3 text-center text-sm font-semibold text-black">
                Start Creating
              </Link>
            </div>
          </div>
        ) : null}
      </motion.div>
    </nav>
  );
};

export default Navbar;
