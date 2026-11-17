
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserRound, Sparkles, ArrowLeft, Settings, ShieldCheck, SlidersHorizontal } from "lucide-react";

const features = [
  { icon: UserRound, title: "Personal Profile", description: "Manage your personal information in one place." },
  { icon: Settings, title: "Account Settings", description: "Customize your account and preferences." },
  { icon: ShieldCheck, title: "Account Security", description: "Keep your account and information secure." },
];

export default function ProfilePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FDFBFF] px-6 py-16 text-[#292333]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-[#D82C9E]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-[#5F19C5]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Icon */}
        <motion.div initial={{ opacity: 0, y: 15, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }} className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#EAE2F1] bg-white shadow-[0_12px_40px_rgba(95,25,197,0.10)]">
          <div className="absolute inset-0 rounded-[28px] bg-linear-to-br from-[#5F19C5]/5 to-[#FA418B]/10" />
          <UserRound className="relative size-11 text-[#7138D5]" />
          <motion.div animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#9326D5] to-[#FA418B] text-white shadow-lg shadow-[#9326D5]/25">
            <Sparkles size={19} />
          </motion.div>
        </motion.div>

        {/* Coming soon badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D82C9E]/20 bg-linear-to-r from-[#5F19C5]/5 to-[#FA418B]/10 px-4 py-2 text-xs font-bold tracking-widest text-[#9326D5]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FA418B] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FA418B]" />
          </span>
          COMING SOON
        </motion.div>

        {/* Heading */}
        <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Your space.
          <br />
          <span className="bg-linear-to-r from-[#5F19C5] via-[#9326D5] to-[#FA418B] bg-clip-text text-transparent">Your preferences.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#756B80] sm:text-base">
          We're working on a dedicated space where you can manage your profile, customize your experience, and keep your ProblemPulse account organized.
        </motion.p>

        {/* Feature previews */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-[#EAE2F1] bg-white/80 p-5 shadow-[0_8px_30px_rgba(95,25,197,0.035)]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7138D5]/10 text-[#7138D5]">
                <Icon size={20} />
              </div>
              <h2 className="text-sm font-bold text-[#292333]">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-[#756B80]">{description}</p>
            </div>
          ))}
        </motion.div>

        {/* Back button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#5F19C5] to-[#FA418B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#9326D5]/20 transition hover:-translate-y-0.5 hover:shadow-xl">
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </motion.div>

        <p className="mt-12 text-xs font-medium tracking-wide text-[#B8AFC4]">A better way to discover what matters — ProblemPulse</p>
      </div>
    </main>
  );
}
