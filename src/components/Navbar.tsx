import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 glow-primary">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold text-foreground">Adlyrix</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {["Features", "Pricing", "Demo"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </a>
          ))}
          <Link
            to="/login"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>
          <Link to="/login" className="btn-gradient text-sm text-primary-foreground">
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass-strong md:hidden px-6 pb-4 flex flex-col gap-3"
        >
          {["Features", "Pricing", "Demo"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground py-2">
              {item}
            </a>
          ))}
          <Link to="/login" className="text-sm text-muted-foreground py-2">Login</Link>
          <Link to="/login" className="btn-gradient text-sm text-primary-foreground text-center">Get Started</Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
