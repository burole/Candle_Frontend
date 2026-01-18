'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { PageHeader } from '@/components/shared';
import { QueryTypeCard } from '@/components/query';
import { useQueryTypes } from '@/hooks/useQueryTypes';
import { getCategoryBySlug } from '@/constants/query-categories';
import type { QueryType, CategoryConfig } from '@/types/query';

function ConsultaPageContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category') || 'credit';

  const { getByCategory, isLoading } = useQueryTypes();
  const [queryTypes, setQueryTypes] = useState<QueryType[]>([]);
  const [category, setCategory] = useState<CategoryConfig | undefined>();

  useEffect(() => {
    const loadQueryTypes = async () => {
      const categoryConfig = getCategoryBySlug(categorySlug);
      setCategory(categoryConfig);

      if (categoryConfig) {
        const types = await getByCategory(categoryConfig.category);
        setQueryTypes(types);
      }
    };

    loadQueryTypes();
  }, [categorySlug]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Categoria não encontrada</p>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = (Icons[category.icon as keyof typeof Icons] || Icons.FileText) as any;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="flex-1">
        <PageHeader
          backHref="/"
          backLabel="Voltar ao início"
          icon={IconComponent}
          badge={`Consultas de ${category.name}`}
          title={
            <>
              {category.name}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                completo e preciso
              </span>
            </>
          }
          description={category.description}
        />

        <section className="py-12">
          <div className="container max-w-7xl mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : queryTypes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Nenhuma consulta disponível nesta categoria no momento.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {queryTypes.map((queryType) => (
                  <QueryTypeCard key={queryType.id} queryType={queryType} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ConsultaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <ConsultaPageContent />
    </Suspense>
  );
}
