'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Menu, X, CreditCard, User, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useIsAuthenticated, useUser } from '@/store/authStore';
import { Button } from '@/components/candle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <Search className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold gradient-text">
              Consulte Ai
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/consulta">
            <motion.div
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              whileHover={{ y: -1 }}
            >
              <CreditCard className="w-4 h-4" />
              Consultas
            </motion.div>
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <motion.div
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </motion.div>
              </Link>
              <div className="flex items-center gap-3 ml-2">
                <div className="px-3 py-1.5 bg-blue-50 rounded-lg">
                  <p className="text-xs font-semibold text-blue-600">
                    R$ {user?.balance.toFixed(2) || "0,00"}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {user?.name?.split(" ")[0] || "Usuário"}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Criar Conta
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 text-gray-700" />
          ) : (
            <Menu className="h-5 w-5 text-gray-700" />
          )}
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
        className="md:hidden overflow-hidden border-t border-gray-200"
      >
        <nav className="container mx-auto px-4 flex flex-col gap-4 py-4">
          <Link
            href="/consulta"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <CreditCard className="w-4 h-4" />
            Consultas de Crédito
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Saldo</span>
                  <span className="text-sm font-semibold text-blue-600">
                    R$ {user?.balance.toFixed(2) || "0,00"}
                  </span>
                </div>
                <p className="text-sm text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Criar Conta
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </motion.div>
    </motion.header>
  );
}

export default Header;
