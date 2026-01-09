import { motion } from "framer-motion";
import { FileText, Search, CheckCircle, Download } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Insira o CPF",
    description:
      "Digite o número do CPF que deseja consultar no campo de busca.",
  },
  {
    icon: Search,
    title: "Pesquisa Inteligente",
    description:
      "Nossa IA busca informações em múltiplas bases de dados em segundos.",
  },
  {
    icon: CheckCircle,
    title: "Dados Verificados",
    description:
      "Todas as informações são verificadas e atualizadas em tempo real.",
  },
  {
    icon: Download,
    title: "Resultado Completo",
    description:
      "Receba um relatório detalhado com todas as informações disponíveis.",
  },
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="como-funciona" className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como <span className="text-gradient">funciona</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Processo simples e rápido para você consultar as informações que
            precisa
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative inline-flex"
                >
                  <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/10 transition-colors duration-300">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </motion.div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
