"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, FileText } from "lucide-react";

interface StatusHeroProps {
  status: "RESTRICTED" | "CLEAR";
  protocol: string;
}

export default function StatusHero({ status, protocol }: StatusHeroProps) {
  const isRestricted = status === "RESTRICTED";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl"
      style={{
        background: isRestricted
          ? "linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%)"
          : "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative px-8 py-12 md:px-16 md:py-16">
        <div className="max-w-4xl">
          {/* Status Icon with Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 200,
            }}
            className="mb-6"
          >
            {isRestricted ? (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-600 text-white shadow-2xl">
                <XCircle className="w-12 h-12" strokeWidth={2.5} />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-600 text-white shadow-2xl">
                <CheckCircle2 className="w-12 h-12" strokeWidth={2.5} />
              </div>
            )}
          </motion.div>

          {/* Status Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3"
              style={{
                color: isRestricted ? "#991b1b" : "#065f46",
                lineHeight: "1.1",
              }}
            >
              {isRestricted ? "Restrição Encontrada" : "Nada Consta"}
            </h1>

            <p
              className="text-lg md:text-xl font-medium"
              style={{ color: isRestricted ? "#7f1d1d" : "#064e3b" }}
            >
              Status: <span className="font-bold uppercase tracking-wider">{status}</span>
            </p>
          </motion.div>

          {/* Protocol Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              backgroundColor: isRestricted
                ? "rgba(127, 29, 29, 0.15)"
                : "rgba(6, 78, 59, 0.15)",
              border: `1px solid ${isRestricted ? "rgba(153, 27, 27, 0.3)" : "rgba(6, 95, 70, 0.3)"}`,
            }}
          >
            <FileText className="w-4 h-4" style={{ color: isRestricted ? "#991b1b" : "#065f46" }} />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: isRestricted ? "#7f1d1d" : "#064e3b" }}
            >
              Protocolo: {protocol}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
