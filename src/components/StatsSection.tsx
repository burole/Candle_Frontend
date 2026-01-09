import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Search, Shield, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Usuários Ativos",
  },
  {
    icon: Search,
    value: 2000000,
    suffix: "+",
    label: "Consultas Realizadas",
  },
  {
    icon: Shield,
    value: 99.9,
    suffix: "%",
    label: "Dados Seguros",
  },
  {
    icon: Clock,
    value: 3,
    suffix: "s",
    label: "Tempo Médio",
  },
];

const CountUp = ({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, inView]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toLocaleString("pt-BR");
  };

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Números que <span className="text-gradient">comprovam</span> nossa
            qualidade
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milhares de pessoas confiam em nossa plataforma para obter
            informações precisas e seguras
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="card-shadow rounded-2xl bg-card p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1 border border-border/50">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary mb-4"
                >
                  <stat.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
