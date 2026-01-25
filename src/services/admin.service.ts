import { serverHttpClient } from '@/lib/api/serverHttpClient';
import type { 
  DashboardOverview, 
  RevenueStats, 
  ProviderStats, 
  AdminUser, 
  UserFilters, 
  PaginatedResponse, 
  AdjustBalanceDTO,
  QueryType,
  QueryTypeFilters,
  AdminTransaction,
  TransactionFilters,
  DashboardQueries
} from '@/types/admin';
import type { UserRole } from '@/types/auth';

const BASE_URL = '/admin';

export const AdminService = {
  // --- Dashboard ---
  getDashboardOverview: async (): Promise<DashboardOverview> => {
    const response = await serverHttpClient.get<DashboardOverview>(`${BASE_URL}/dashboard/overview`);
    return response.data;
  },

  getRevenueStats: async (params?: { period?: string; days?: number }): Promise<RevenueStats> => {
    const response = await serverHttpClient.get<RevenueStats>(`${BASE_URL}/dashboard/revenue`, { params });
    return response.data;
  },

  getProviderStats: async (): Promise<ProviderStats> => {
    const response = await serverHttpClient.get<ProviderStats>(`${BASE_URL}/dashboard/providers`);
    return response.data;
  },

  getDashboardQueries: async (): Promise<DashboardQueries> => {
    const response = await serverHttpClient.get<DashboardQueries>(`${BASE_URL}/dashboard/queries`);
    return response.data;
  },

  // --- Users ---
  getUsers: async (filters: UserFilters): Promise<PaginatedResponse<AdminUser>> => {
    const response = await serverHttpClient.get<PaginatedResponse<AdminUser>>(`${BASE_URL}/users`, { params: filters });
    return response.data;
  },

  getUserById: async (id: string): Promise<AdminUser> => {
    const response = await serverHttpClient.get<AdminUser>(`${BASE_URL}/users/${id}`);
    return response.data;
  },

  updateUserStatus: async (id: string, status: string): Promise<AdminUser> => {
    const response = await serverHttpClient.patch<AdminUser>(`${BASE_URL}/users/${id}/status`, { status });
    return response.data;
  },

  updateUserRole: async (id: string, role: UserRole): Promise<AdminUser> => {
    const response = await serverHttpClient.patch<AdminUser>(`${BASE_URL}/users/${id}/role`, { role });
    return response.data;
  },

  adjustUserBalance: async (id: string, data: AdjustBalanceDTO): Promise<void> => {
    await serverHttpClient.post(`${BASE_URL}/users/${id}/adjust-balance`, data);
  },

  // --- Query Types ---
  getQueryTypes: async (filters: QueryTypeFilters): Promise<PaginatedResponse<QueryType>> => {
    const response = await serverHttpClient.get<PaginatedResponse<QueryType>>(`${BASE_URL}/query-types`, { params: filters });
    return response.data;
  },

  toggleQueryType: async (id: string): Promise<void> => {
    await serverHttpClient.post(`${BASE_URL}/query-types/${id}/toggle`);
  },

  updateQueryType: async (id: string, updates: Partial<QueryType>): Promise<QueryType> => {
    const response = await serverHttpClient.patch<QueryType>(`${BASE_URL}/query-types/${id}`, updates);
    return response.data;
  },

  // --- Transactions ---
  getTransactions: async (filters: TransactionFilters): Promise<PaginatedResponse<AdminTransaction>> => {
    const response = await serverHttpClient.get<PaginatedResponse<AdminTransaction>>(`${BASE_URL}/transactions`, { params: filters });
    return response.data;
  }
};
