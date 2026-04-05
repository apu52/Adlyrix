import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Play, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const authVideoSrc = new URL("../../Video_Generation_Request_And_Completion.mp4", import.meta.url).href;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="gradient-mesh relative min-h-screen overflow-hidden px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.32),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(234,88,12,0.16),transparent_20%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col justify-center">
        <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition-all hover:border-[#f7b26d]/40 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        <div className="overflow-hidden rounded-[2.2rem] border border-[#f7b26d]/40 bg-[linear-gradient(180deg,rgba(19,14,11,0.94)_0%,rgba(10,8,7,0.98)_100%)] shadow-[0_35px_120px_rgba(0,0,0,0.45)]">
          <div className="grid min-h-[680px] lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 190, damping: 22 }}
              className={`relative border-t border-white/10 p-4 sm:p-5 lg:border-t-0 lg:p-6 ${isLogin ? "order-2 lg:order-1" : "order-1 lg:order-2"}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_100%)]" />
              <div className="relative flex h-full flex-col">
                <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-black/30">
                  <video
                    src={authVideoSrc}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,8,7,0.14)_0%,rgba(10,8,7,0.06)_36%,rgba(10,8,7,0.58)_100%)]" />

                  <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                    <div className="pointer-events-none flex justify-start">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/35 text-[#f7b26d] backdrop-blur-md">
                        <Play size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 190, damping: 22 }}
              className={`flex items-center justify-center p-4 sm:p-5 lg:p-6 ${isLogin ? "order-1 lg:order-2" : "order-2 lg:order-1"}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <img src="/adlyrix-favicon.svg" alt="Adlyrix" className="h-12 w-12 rounded-2xl" />
                  <div>
                    <p className="text-lg font-extrabold uppercase tracking-[0.18em] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Adlyrix
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">Fashion Ad Studio</p>
                  </div>
                </div>

                <div className="mt-7 flex rounded-full border border-white/10 bg-white/[0.03] p-1">
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${isLogin ? "bg-white text-black" : "text-white/65 hover:text-white"}`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${!isLogin ? "bg-white text-black" : "text-white/65 hover:text-white"}`}
                  >
                    Sign Up
                  </button>
                </div>

                <h1 className="mt-7 text-3xl font-bold leading-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {isLogin ? "Enter your fashion ad workspace." : "Create your premium studio account."}
                </h1>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  {isLogin
                    ? "Sign in to manage garment campaigns, model creatives, and launch-ready ad formats."
                    : "Set up your account and start generating campaign visuals in the same premium Adlyrix theme."}
                </p>

                <button className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.01]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/38">or continue with email</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {!isLogin && (
                    <div>
                      <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/48">Full Name</label>
                      <div className="relative">
                        <User2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/38" />
                        <input
                          type="text"
                          placeholder="Ariana Styles"
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/28 outline-none transition-all focus:border-[#f7b26d]/45 focus:bg-white/[0.06]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/48">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/38" />
                      <input
                        type="email"
                        placeholder="you@threadly.ai"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/28 outline-none transition-all focus:border-[#f7b26d]/45 focus:bg-white/[0.06]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/48">Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/38" />
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter secure password"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-12 text-sm text-white placeholder:text-white/28 outline-none transition-all focus:border-[#f7b26d]/45 focus:bg-white/[0.06]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((current) => !current)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/44 transition-colors hover:text-white"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#fff0de_0%,#f7b26d_38%,#f97316_100%)] px-4 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.01]"
                  >
                    {isLogin ? "Sign In to Adlyrix" : "Create Adlyrix Account"}
                  </Link>
                </form>

                <p className="mt-6 text-center text-sm text-white/52">
                  {isLogin ? "New to Adlyrix?" : "Already have an account?"}{" "}
                  <button type="button" onClick={() => setIsLogin((current) => !current)} className="font-medium text-[#f7b26d] transition-colors hover:text-[#ffd8af]">
                    {isLogin ? "Create account" : "Sign in"}
                  </button>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
