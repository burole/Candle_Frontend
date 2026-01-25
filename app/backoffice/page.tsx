import { 
  getDashboardOverviewAction, 
  getRevenueStatsAction,
  getProviderStatsAction 
} from '@/actions/admin.actions';
import { DashboardView } from '@/components/admin/DashboardView';

export default async function BackofficePage() {
  // Parallel fetching
  const [overviewRes, revenueRes, providersRes] = await Promise.all([
    getDashboardOverviewAction(),
    getRevenueStatsAction({ days: 30 }),
    getProviderStatsAction()
  ]);

  return (
    <DashboardView 
      overview={overviewRes.success ? overviewRes.data! : null}
      revenueData={revenueRes.success ? revenueRes.data! : null}
      providerStats={providersRes.success ? providersRes.data! : null}
    />
  );
}
