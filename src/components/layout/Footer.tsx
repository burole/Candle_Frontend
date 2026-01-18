'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Mail, Phone } from 'lucide-react';

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
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <Search className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">
                Consulte Ai
              </span>
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
                  href="/credito"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Consultas de Crédito
                </Link>
              </li>
              <li>
                <Link
                  href="/credito/avalie-credito-cpf"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Consulta CPF
                </Link>
              </li>
              <li>
                <Link
                  href="/credito/credito-total-cenprot-cnpj"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Consulta CNPJ
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/carteira"
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
                  href="/privacidade"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/lgpd"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  LGPD
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
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+551199999999"
                  className="hover:text-blue-400 transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="text-gray-400 text-sm mt-4">
                <p className="font-medium text-white mb-1">
                  Horário de Atendimento
                </p>
                <p>Segunda a Sexta: 9h às 18h</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Consulte Ai. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/termos"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Termos
              </Link>
              <Link
                href="/privacidade"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
