'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, CreditCard } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { PageHeader } from '@/components/shared';
import { QueryList, QueryFilters, type FilterType } from '@/components/query';
import { queriesMock } from '@/lib/consultas';
import { QueryCategory } from '@/types/query';

function ConsultaPageContent() {
  const searchParams = useSearchParams();
  // Default to showing all or specific logic based on params in future
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Filter logic adapted from CreditoPageContent
  const filteredQueries = queriesMock.filter((query) => {
    let matchType = false;
    
    // Map FilterType to QueryCategory logic
    if (filter === "ALL") {
      matchType = true;
    } else if (filter === QueryCategory.PERSON) {
      matchType = query.category === QueryCategory.PERSON || query.category === QueryCategory.CREDIT;
    } else if (filter === QueryCategory.COMPANY) {
      matchType = query.category === QueryCategory.COMPANY || query.category === QueryCategory.CREDIT;
    } else if (filter === "BOTH") {
      matchType = query.category === QueryCategory.CREDIT; // Assuming CREDIT covers both or specific "BOTH" type if exists
    }

    const matchSearch =
      search === "" ||
      query.name.toLowerCase().includes(search.toLowerCase()) ||
      (query.description && query.description.toLowerCase().includes(search.toLowerCase()));

    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="flex-1">
        <PageHeader
          backHref="/"
          backLabel="Voltar ao início"
          icon={CreditCard}
          badge="Todas as Consultas"
          title={
            <>
              Soluções de <span className="text-blue-600">Consulta</span>
            </>
          }
          description="Encontre a consulta ideal para sua necessidade. CPF, CNPJ e muito mais."
        />

        <QueryFilters
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
        />

        <section className="py-12">
          <div className="container max-w-7xl mx-auto px-4">
             <QueryList queries={filteredQueries} />
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
