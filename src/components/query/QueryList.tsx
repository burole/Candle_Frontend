"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { QueryType } from "@/types/query";
import { QueryTypeCard } from "./QueryTypeCard";

interface QueryListProps {
  queries: QueryType[];
}

export function QueryList({ queries }: QueryListProps) {
  if (queries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-16"
      >
        <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
        <p className="text-muted-foreground">
          Nenhuma consulta encontrada com os filtros selecionados.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {queries.map((query, index) => (
          <motion.div
            key={query.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              layout: { duration: 0.3 },
            }}
          >
            <QueryTypeCard queryType={query} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
