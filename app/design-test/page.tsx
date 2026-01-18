"use client";

import {
  Button,
  Card,
  Input,
  StatsCard,
  Badge,
  BalanceBadge,
  ConsultationCard,
  Modal,
  LoadingSpinner,
  Skeleton,
} from '@/components/candle';
import { useState } from 'react';

/**
 * Página de teste do Design System Candle
 * Acesse: http://localhost:4000/design-test
 */

export default function DesignTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold gradient-text mb-4">
            Candle Design System
          </h1>
          <p className="text-gray-600 text-lg">
            Teste todos os componentes disponíveis
          </p>
        </div>

        {/* Buttons Section */}
        <Card className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Botões</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Pequeno</Button>
            <Button size="lg">Grande</Button>
            <Button isLoading>Carregando...</Button>
          </div>
        </Card>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card hover>
            <h3 className="font-display text-xl font-bold mb-2">Card com Hover</h3>
            <p className="text-gray-600">Passe o mouse aqui para ver o efeito</p>
          </Card>

          <Card gradient>
            <h3 className="font-display text-xl font-bold mb-2">Card com Gradiente</h3>
            <p className="text-gray-600">Background com gradiente sutil</p>
          </Card>

          <Card hover gradient>
            <h3 className="font-display text-xl font-bold mb-2">Card Completo</h3>
            <p className="text-gray-600">Hover + Gradiente</p>
          </Card>
        </div>

        {/* Stats Cards */}
        <Card className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Stats Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={<span className="text-2xl">📊</span>}
              label="Consultas Hoje"
              value="42"
              trend={15}
              delay={0}
            />
            <StatsCard
              icon={<span className="text-2xl">💸</span>}
              label="Gasto Mensal"
              value="R$ 320,50"
              trend={-8}
              delay={0.1}
            />
            <StatsCard
              icon={<span className="text-2xl">⭐</span>}
              label="Créditos"
              value="R$ 127,50"
              delay={0.2}
            />
            <StatsCard
              icon={<span className="text-2xl">📈</span>}
              label="Economia"
              value="R$ 89,20"
              trend={23}
              delay={0.3}
            />
          </div>
        </Card>

        {/* Inputs */}
        <Card className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Email" type="email" placeholder="seu@email.com" />
            <Input label="Senha" type="password" placeholder="••••••••" />
            <Input
              label="Com Erro"
              type="text"
              placeholder="Digite algo..."
              error="Este campo é obrigatório"
            />
            <Input label="Desabilitado" type="text" disabled placeholder="Desabilitado" />
          </div>
        </Card>

        {/* Badges */}
        <Card className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge size="sm">Pequeno</Badge>
            <Badge size="md">Médio</Badge>
          </div>
        </Card>

        {/* Balance Badge */}
        <Card className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Balance Badge</h2>
          <BalanceBadge balance={127.50} onClick={() => alert('Recarregar clicked!')} />
        </Card>

        {/* Consultation Card */}
        <Card className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Consultation Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ConsultationCard
              name="Consulta CPF Premium"
              description="Análise completa com CADIN, CCF e score de crédito"
              price={12.90}
              features={[
                'Dados cadastrais',
                'Score de crédito',
                'CADIN (Dívidas Federais)',
                'CCF (Cheques sem Fundo)',
              ]}
              icon={<span className="text-3xl">⭐</span>}
              isPremium
              onClick={() => alert('Consulta Premium clicked!')}
            />

            <ConsultationCard
              name="Consulta CPF Básica"
              description="Informações essenciais sobre CPF e dívidas"
              price={4.90}
              features={[
                'Dados cadastrais',
                'Score de crédito',
                'Dívidas ativas',
                'Protestos',
              ]}
              icon={<span className="text-3xl">👤</span>}
              isPopular
              onClick={() => alert('Consulta Básica clicked!')}
            />

            <ConsultationCard
              name="Consulta Veicular"
              description="Histórico completo do veículo por placa"
              price={6.90}
              features={[
                'Dados do veículo',
                'Débitos e multas',
                'Histórico de proprietários',
                'Restrições judiciais',
              ]}
              icon={<span className="text-3xl">🚗</span>}
              onClick={() => alert('Consulta Veicular clicked!')}
            />
          </div>
        </Card>

        {/* Modal */}
        <Card className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Modal</h2>
          <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Exemplo de Modal"
          >
            <p className="text-gray-600 mb-6">
              Este é um modal de exemplo com backdrop blur e animações suaves.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => setIsModalOpen(false)}>Confirmar</Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
            </div>
          </Modal>
        </Card>

        {/* Loading States */}
        <Card className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Loading States</h2>
          <div className="flex items-center gap-8 mb-8">
            <div className="text-center">
              <LoadingSpinner size="sm" />
              <p className="text-sm text-gray-600 mt-2">Small</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="md" />
              <p className="text-sm text-gray-600 mt-2">Medium</p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="text-sm text-gray-600 mt-2">Large</p>
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-24 w-full" />
          </div>
        </Card>

        {/* Glassmorphism Classes */}
        <Card className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">Glassmorphism</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold mb-2">Glass Padrão</h3>
              <p className="text-sm text-gray-600">Opacity 70%, blur 20px</p>
            </div>
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="font-bold mb-2">Glass Strong</h3>
              <p className="text-sm text-gray-600">Opacity 85%, blur 24px</p>
            </div>
            <div className="glass-weak rounded-2xl p-6">
              <h3 className="font-bold mb-2">Glass Weak</h3>
              <p className="text-sm text-gray-600">Opacity 40%, blur 16px</p>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card>
          <h2 className="font-display text-2xl font-bold mb-6">Typography</h2>
          <div className="space-y-4">
            <h1 className="font-display text-4xl font-bold">Heading 1 - Outfit</h1>
            <h2 className="font-display text-3xl font-bold">Heading 2 - Outfit</h2>
            <h3 className="font-display text-2xl font-bold">Heading 3 - Outfit</h3>
            <p className="font-body text-base">
              Body text - DM Sans. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="gradient-text text-2xl font-bold">
              Texto com Gradiente Azul
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
