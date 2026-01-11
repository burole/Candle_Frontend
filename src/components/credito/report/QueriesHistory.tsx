"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Clock, Search } from "lucide-react";
import { CreditReportResponse } from "@/types/credit";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";

interface QueriesHistoryProps {
  queries: CreditReportResponse["queries"];
}

export default function QueriesHistory({ queries }: QueriesHistoryProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleQueries = queries.slice(0, 5);
  const hiddenQueries = queries.slice(5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm p-6 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-blue-600 text-white">
            <Clock className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Histórico de Consultas</h2>
            <p className="text-sm text-muted-foreground">{queries.length} consulta{queries.length === 1 ? "" : "s"} realizada{queries.length === 1 ? "" : "s"}</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Primeiros 5 itens sempre visíveis */}
          {visibleQueries.map((query, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.05, duration: 0.3 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{query.entity}</span>
              </div>
              <span className="text-sm text-muted-foreground">{formatDate(query.date)}</span>
            </motion.div>
          ))}

          {/* Itens ocultos - usando max-height para animação suave */}
          {hiddenQueries.length > 0 && (
            <motion.div
              initial={false}
              animate={{
                maxHeight: showAll ? hiddenQueries.length * 100 : 0,
                opacity: showAll ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ overflow: "hidden" }}
            >
              <div className="space-y-3 pt-3">
                {hiddenQueries.map((query, index) => (
                  <div
                    key={index + 5}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{query.entity}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatDate(query.date)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {queries.length > 5 && (
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 w-full py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {showAll ? "Ver menos" : `Ver todas (${queries.length})`}
          </motion.button>
        )}
      </Card>
    </motion.div>
  );
}
