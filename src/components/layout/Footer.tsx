'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex-shrink-0 mb-6 block">
              <motion.div
                className="flex items-center gap-4 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Search className="h-5 w-5 text-white stroke-[2.5px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-display font-black tracking-tight text-white leading-none group-hover:text-blue-400 transition-colors">
                    Consulta<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Ai</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 leading-none mt-1 group-hover:text-blue-300 transition-colors">
                    Platform
                  </span>
                </div>
              </motion.div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Plataforma completa de consultas de crédito para CPF e CNPJ.
              Informações seguras, rápidas e confiáveis.
            </p>
          </div>

          {/* Produtos */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">
              Produtos
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/consulta"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Consultas de Crédito
                </Link>
              </li>

              <li>
                <Link
                  href="/carteira"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Recargas
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">
              Empresa
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Política de Privacidade
                </Link>
              </li>

            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato@candle.com.br"
                  className="hover:text-blue-400 transition-colors"
                >
                  contato@candle.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} ConsultaAi. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/termos"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Termos
              </Link>
              <Link
                href="/politica-de-privacidade"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
