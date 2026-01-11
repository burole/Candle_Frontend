"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedNumber from "./AnimatedNumber";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: "red" | "emerald" | "blue" | "purple" | "amber" | "rose";
  delay: number;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const colorClasses = {
    red: {
      bg: "from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30",
      border: "border-red-200 dark:border-red-800",
      icon: "text-red-600 dark:text-red-400",
      text: "text-red-900 dark:text-red-100",
    },
    emerald: {
      bg: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
      border: "border-emerald-200 dark:border-emerald-800",
      icon: "text-emerald-600 dark:text-emerald-400",
      text: "text-emerald-900 dark:text-emerald-100",
    },
    blue: {
      bg: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      text: "text-blue-900 dark:text-blue-100",
    },
    purple: {
      bg: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
      border: "border-purple-200 dark:border-purple-800",
      icon: "text-purple-600 dark:text-purple-400",
      text: "text-purple-900 dark:text-purple-100",
    },
    amber: {
      bg: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30",
      border: "border-amber-200 dark:border-amber-800",
      icon: "text-amber-600 dark:text-amber-400",
      text: "text-amber-900 dark:text-amber-100",
    },
    rose: {
      bg: "from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30",
      border: "border-rose-200 dark:border-rose-800",
      icon: "text-rose-600 dark:text-rose-400",
      text: "text-rose-900 dark:text-rose-100",
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} p-6 card-shadow group hover:scale-105 transition-transform duration-300`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.icon} bg-white/50 dark:bg-black/20`}>
          <Icon className="w-6 h-6" strokeWidth={2.5} />
        </div>
      </div>

      <AnimatedNumber value={value} className={`text-5xl font-black tracking-tight ${colors.text} mb-1`} />

      <p className={`text-sm font-semibold uppercase tracking-wider ${colors.text} opacity-70`}>
        {label}
      </p>
    </motion.div>
  );
}
