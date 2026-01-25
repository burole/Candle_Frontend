'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Search, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Server
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardOverview } from '@/types/admin';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface DashboardViewProps {
  overview: DashboardOverview | null;
  revenueData: any; // Using any for now, should be typed properly with RevenueStats
  providerStats: any; // Should be typed properly with ProviderStats
  isLoading?: boolean;
}

export function DashboardView({ overview, revenueData, providerStats, isLoading }: DashboardViewProps) {
  if (!overview && !isLoading) return null;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const StatCard = ({ title, value, subtext, icon: Icon, trend, trendValue, colorClass }: any) => (
    <motion.div variants={item}>
      <Card className="border-none shadow-glass hover:shadow-glass-strong transition-all duration-300 overflow-hidden relative group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`}>
           <Icon className="w-24 h-24 -mr-4 -mt-4 transform rotate-12" />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-white shadow-sm ${colorClass} bg-opacity-10 text-opacity-100`}>
              <Icon className="w-6 h-6" />
            </div>
            {trend && (
              <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'text-emerald-600 bg-emerald-100' : 'text-red-600 bg-red-100'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {trendValue}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
            <div className="text-2xl font-black text-slate-900">{value}</div>
            {subtext && <p className="text-xs text-slate-400 font-medium">{subtext}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.div 
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-end justify-between text-slate-900 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Visão Geral</h1>
          <p className="text-slate-500">Bem-vindo ao painel de controle do Candle.</p>
        </div>
        <div className="text-right">
           <div className="text-sm text-slate-500 font-medium">Atualizado em</div>
           <div className="text-base font-semibold">{new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Patrimônio Total" 
          value={overview?.totalBalanceInCirculation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? 'R$ 0,00'}
          subtext="Em circulação (Wallets)"
          icon={DollarSign}
          colorClass="text-blue-600 bg-blue-600"
        />
        <StatCard 
          title="Receita Mensal" 
          value={overview?.revenueThisMonth.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? 'R$ 0,00'}
          subtext={`${overview?.queriesThisMonth} consultas realizadas`}
          icon={TrendingUp}
          colorClass="text-emerald-600 bg-emerald-600"
        />
        <StatCard 
          title="Usuários Ativos" 
          value={overview?.usersByStatus?.ACTIVE ?? 0}
          subtext={`${overview?.newUsersThisMonth} novos este mês`}
          icon={Users}
          colorClass="text-indigo-600 bg-indigo-600"
          trend="up"
          trendValue={`Total: ${overview?.totalUsers}`}
        />
        <StatCard 
          title="Taxa de Sucesso" 
          value={`${overview?.querySuccessRate}%`}
          subtext="Performance global da API"
          icon={Activity}
          colorClass="text-cyan-600 bg-cyan-600"
          trend={overview?.querySuccessRate && overview.querySuccessRate > 98 ? 'up' : 'down'}
          trendValue={overview?.querySuccessRate && overview.querySuccessRate > 98 ? 'Excelente' : 'Atenção'}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={item} className="col-span-2">
          <Card className="shadow-lg border-none h-[400px]">
            <CardHeader>
              <CardTitle>Receita x Consultas (30 dias)</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              {(!revenueData?.revenueByDay || revenueData.revenueByDay.length === 0) ? (
                 <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-sm font-medium">Sem dados de receita no período</p>
                 </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData?.revenueByDay || []}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(val) => new Date(val).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}  
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `R$ ${val}`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                      formatter={(value: any) => [`R$ ${value}`, 'Receita']}
                      labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* System Health */}
        <motion.div variants={item} className="col-span-1">
          <Card className="shadow-lg border-none h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle>Saúde do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between text-sm font-medium">
                   <span className="text-slate-600">Providers Ativos</span>
                   <span className="text-slate-900">{overview?.activeProviders} / {(overview?.providersHealth?.healthy || 0) + (overview?.providersHealth?.unhealthy || 0)}</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${((overview?.activeProviders || 0) / 5) * 100}%` }} />
                 </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Status por Serviço</h4>
                  
                  {/* Active Providers List from API */}
                  {providerStats?.providers?.map((provider: any) => (
                    <div key={provider.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full shadow-md ${
                          provider.healthStatus === 'healthy' ? 'bg-emerald-500 shadow-emerald-500/50' : 
                          provider.healthStatus === 'degraded' ? 'bg-amber-500 shadow-amber-500/50' :
                          'bg-red-500 shadow-red-500/50'
                        } ${provider.isActive ? 'animate-pulse' : ''}`} />
                        <span className="font-semibold text-sm text-slate-700">{provider.name}</span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                         provider.healthStatus === 'healthy' ? 'text-emerald-600 bg-emerald-100' : 
                         provider.healthStatus === 'degraded' ? 'text-amber-600 bg-amber-100' :
                         'text-red-600 bg-red-100'
                      }`}>
                        {provider.successRate}%
                      </span>
                    </div>
                  ))}

                  {(!providerStats?.providers || providerStats.providers.length === 0) && (
                     <div className="text-center text-xs text-slate-400 py-4">Nenhum provider encontrado</div>
                  )}
               </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

    </motion.div>
  );
}
