import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import Lottie from "lottie-react";
import searchAnimation from "@/assets/search-animation.json";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/3"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              CONSULTA EXPRESSA
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
            >
              Encontre{" "}
              <span className="text-gradient">informações completas</span> em
              segundos
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Consulte dados por CPF com nossa Inteligência Artificial.
              Informações seguras, rápidas e confiáveis para suas pesquisas.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="gradient-primary button-shadow text-base font-semibold px-8"
                asChild
              >
                <a href="#consultar-cpf">
                  <Search className="mr-2 h-5 w-5" />
                  Consultar CPF
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Lottie
                  animationData={searchAnimation}
                  loop
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
