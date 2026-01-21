import { useQueriesSWR } from './useQueriesSWR';

export function useQueryByTypeSWR(code: string) {
  const { queries, isLoading, isError } = useQueriesSWR();
  
  const queryType = queries.find((q) => q.code === code);
  
  // If we have data but didn't find the query, it's a 404-like error
  const notFound = !isLoading && queries.length > 0 && !queryType;

  return {
    queryType,
    isLoading: isLoading && !queryType, // Keep loading if we don't have data yet
    isError: isError || notFound,
    notFound
  };
}
