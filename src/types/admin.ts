import { UserRole } from './auth';
import { BillingType, PaymentStatus } from './payment';

// --- Dashboard & Stats Types ---

export interface DashboardOverview {
  totalUsers: number;
  usersByStatus: {
    PENDING_VERIFICATION: number;
    ACTIVE: number;
    SUSPENDED: number;
    BANNED: number;
  };
  newUsersToday: number;
  newUsersThisMonth: number;
  totalBalanceInCirculation: number;
  totalRevenue: number;
  revenueToday: number;
  revenueThisMonth: number;
  totalQueries: number;
  queriesToday: number;
  queriesThisMonth: number;
  querySuccessRate: number;
  activeProviders: number;
  providersHealth: {
    healthy: number;
    unhealthy: number;
  };
}

export interface RevenueStats {
  period: 'day' | 'week' | 'month';
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalTransactions: number;
  revenueByBillingType: {
    PIX: number;
    BOLETO: number;
    CREDIT_CARD: number;
  };
  revenueByDay: Array<{
    date: string;
    amount: number;
    count: number;
  }>;
}

export interface ProviderStats {
  summary: {
    totalProviders: number;
    activeProviders: number;
    healthyProviders: number;
    unhealthyProviders: number;
  };
  providers: Array<{
    id: string;
    code: string;
    name: string;
    isActive: boolean;
    priority: number;
    avgResponseTime: number;
    successRate: number;
    lastHealthCheck: string;
    lastErrorAt: string | null;
    healthStatus: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
    queryTypesCount: number;
    queriesLast24h: number;
  }>;
}

// --- User Management Types ---

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  cpfCnpj: string;
  phone?: string;
  status: 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  role: UserRole;
  emailVerifiedAt?: string;
  createdAt: string;
  lastLoginAt?: string;
  balance: {
    available: number;
  };
  stats?: {
    totalQueries: number;
    totalSpent: number;
    totalDeposits: number;
  };
}

export interface UserFilters {
  search?: string;
  status?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface AdjustBalanceDTO {
  amount: number;
  description: string;
}

// --- Query Types Management ---

export interface QueryType {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: string[];
  price: number;
  cachedPrice: number;
  cacheTtlMinutes: number;
  isActive: boolean;
  providerId: string;
  providerName: string;
  providerIsActive: boolean;
  createdAt: string;
  updatedAt: string;
  stats?: {
    totalQueries: number;
    successfulQueries: number;
    failedQueries: number;
    totalRevenue: number;
    cacheHitRate: number;
  };
}

export interface QueryTypeFilters {
  search?: string;
  category?: string;
  isActive?: boolean;
  providerId?: string;
  page?: number;
  limit?: number;
}

// --- Transaction Management ---

export interface AdminTransaction {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  idempotencyKey?: string;
  asaasId?: string;
  amount: number;
  netValue?: number;
  description: string;
  dueDate?: string;
  status: PaymentStatus;
  billingType: BillingType;
  invoiceUrl?: string;
  createdAt: string;
  confirmedAt?: string;
  canceledAt?: string;
  statusHistory?: Array<{
    id: string;
    fromStatus: string;
    toStatus: string;
    reason?: string;
    createdAt: string;
  }>;
}

export interface TransactionFilters {
  status?: string;
  billingType?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// --- Paginated Response Generic ---

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
