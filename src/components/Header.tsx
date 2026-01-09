import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Search className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Consulte<span className="text-primary">AI</span>
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <motion.a
            href="#consultar-cpf"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -1 }}
          >
            Consultar CPF
          </motion.a>
          <motion.a
            href="#como-funciona"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -1 }}
          >
            Como Funciona
          </motion.a>
          <Button variant="default" size="sm" className="gradient-primary button-shadow">
            Já Paguei
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-t border-border/50"
      >
        <nav className="container flex flex-col gap-4 py-4">
          <a
            href="#consultar-cpf"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Consultar CPF
          </a>
          <a
            href="#como-funciona"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Como Funciona
          </a>
          <Button variant="default" size="sm" className="gradient-primary button-shadow w-full">
            Já Paguei
          </Button>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
