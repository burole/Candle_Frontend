import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CPFConsultForm = () => {
  const [cpf, setCpf] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const validateCPF = (cpfValue: string) => {
    const numbers = cpfValue.replace(/\D/g, "");
    if (numbers.length !== 11) return false;

    // Check for known invalid CPFs
    if (/^(\d)\1{10}$/.test(numbers)) return false;

    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers[i]) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers[9])) return false;

    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers[i]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers[10])) return false;

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);

    if (formatted.replace(/\D/g, "").length === 11) {
      setIsValid(validateCPF(formatted));
    } else {
      setIsValid(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCPF(cpf)) {
      setIsValid(false);
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Here you would handle the actual consultation
    }, 2000);
  };

  return (
    <section id="consultar-cpf" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Consulte AI
            </h2>
            <p className="text-muted-foreground">
              Consulta segura e rápida de CPF com dados completos e atualizados
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-shadow rounded-2xl bg-card border-t-4 border-t-primary p-6 md:p-8"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Consulta de CPF</h3>
              <p className="text-sm text-muted-foreground">
                Insira um CPF válido para realizar a consulta
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={handleChange}
                    maxLength={14}
                    className={`h-14 text-lg pr-12 transition-all duration-300 ${
                      isValid === true
                        ? "border-primary focus-visible:ring-primary"
                        : isValid === false
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: isValid !== null ? 1 : 0,
                      scale: isValid !== null ? 1 : 0,
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {isValid === true ? (
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    ) : isValid === false ? (
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    ) : null}
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: isValid === false ? 1 : 0,
                    height: isValid === false ? "auto" : 0,
                  }}
                  className="text-sm text-destructive"
                >
                  Por favor, insira um CPF válido
                </motion.p>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={!isValid || isLoading}
                className="w-full h-14 text-base font-semibold gradient-primary button-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Consultar CPF
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Consulte de forma rápida e segura
              </p>
            </form>
          </motion.div>

          {/* LGPD Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 card-shadow rounded-xl bg-card p-5 border border-border/50"
          >
            <div className="flex gap-4">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Proteção de Dados (LGPD)</h4>
                <p className="text-sm text-muted-foreground">
                  Ao consultar, você concorda com nossos{" "}
                  <a href="#" className="text-primary hover:underline">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-primary hover:underline">
                    Política de Privacidade
                  </a>
                  .
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Consulta baseada em dados públicos, tratados conforme a LGPD.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CPFConsultForm;
