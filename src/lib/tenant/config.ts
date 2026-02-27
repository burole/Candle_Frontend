export interface TenantColors {
  primary: string; // e.g., '221.2 83.2% 53.3%'
  primaryForeground: string; // e.g., '210 40% 98%'
}

export interface TenantConfig {
  id: string; // e.g., 'candle', 'cliente-a'
  domain: string; // e.g., 'candel.com.br', 'clientea.com'
  name: string; // e.g., 'ConsultaAi', 'Cliente A'
  logoUrl: string; // e.g., '/logo.png'
  faviconUrl: string; // e.g., '/favicon.ico'
  contactEmail: string; // e.g., 'contato@empresa.com.br'
  colors: TenantColors;
}

// Default Configuration for the base product "Candle / ConsultaAi"
export const DEFAULT_TENANT: TenantConfig = {
  id: "candle",
  domain: "localhost", // Update for production
  name: "ConsultaAi",
  logoUrl: "/icon.png", // Fallback, will handle Search icon logic in component
  faviconUrl: "/icon.png",
  contactEmail: "contato@candle.com.br",
  colors: {
    primary: "221.2 83.2% 53.3%",
    primaryForeground: "210 40% 98%",
  },
};

/**
 * Parse the TENANTS_CONFIG environment variable
 */
export function getTenants(): TenantConfig[] {
  try {
    const tenantsJson = process.env.TENANTS_CONFIG;
    if (!tenantsJson) {
      return [DEFAULT_TENANT];
    }
    return JSON.parse(tenantsJson) as TenantConfig[];
  } catch (error) {
    console.error("Failed to parse TENANTS_CONFIG:", error);
    return [DEFAULT_TENANT];
  }
}

/**
 * Get tenant configuration based on the requested host
 */
export function getTenantByHost(host: string): TenantConfig {
  // Clear port for local testing
  const hostname = host.split(":")[0];

  const tenants = getTenants();

  const tenant = tenants.find(
    (t) => t.domain === hostname || t.domain === host,
  );

  if (!tenant) {
    return DEFAULT_TENANT;
  }

  return tenant;
}

/**
 * Get tenant configuration by its ID (useful for SSG/SSR components inside app/[tenant])
 */
export function getTenantById(id: string): TenantConfig {
  const tenants = getTenants();
  return tenants.find((t) => t.id === id) || DEFAULT_TENANT;
}
