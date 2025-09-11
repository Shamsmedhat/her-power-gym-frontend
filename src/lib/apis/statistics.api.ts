import { JSON_HEADER } from "../constants/api.constant";
import { getTokenDecoded } from "../utils/get-token";

// Statistics types based on the API documentation
export interface StatisticsOverview {
  totalUsers: number;
  totalClients: number;
  totalIncome: number;
  totalSalaries: number;
  netProfit: number;
}

export interface UserBreakdown {
  superAdmins: number;
  admins: number;
  coaches: number;
  totalStaff: number;
}

export interface FinancialMetrics {
  totalIncome: number;
  mainSubscriptionIncome: number;
  privateSubscriptionIncome: number;
  totalSalaries: number;
  averageSalary: number;
  netProfit: number;
  averageIncomePerClient: number;
}

export interface PlanUsage {
  planType: string;
  price: number;
  usage: number;
  revenue: number;
}

export interface SubscriptionStats {
  totalPlans: number;
  mainPlans: number;
  privatePlans: number;
  clientsWithPrivatePlans: number;
  planUsage: Record<string, PlanUsage>;
}

export interface SessionStats {
  totalSessions: number;
  completedSessions: number;
  pendingSessions: number;
  canceledSessions: number;
  completionRate: number;
}

export interface CoachPerformance {
  totalSessions: number;
  completedSessions: number;
  pendingSessions: number;
  canceledSessions: number;
  completionRate: number;
}

export interface PerformanceMetrics {
  coachPerformance: Record<string, CoachPerformance>;
  recentActivity: {
    newClientsLast30Days: number;
    newSessionsLast30Days: number;
  };
}

export interface ComprehensiveStatistics {
  overview: StatisticsOverview;
  userBreakdown: UserBreakdown;
  financial: FinancialMetrics;
  subscriptions: SubscriptionStats;
  sessions: SessionStats;
  performance: PerformanceMetrics;
  generatedAt: string;
}

export interface QuickStatistics {
  totalUsers: number;
  totalClients: number;
  totalRevenue: number;
  totalSalaries: number;
  netProfit: number;
  generatedAt: string;
}

// Get comprehensive statistics
export const getStatistics = async (): Promise<
  APIResponse<{ data: { statistics: ComprehensiveStatistics } }>
> => {
  // Get token
  const token = await getTokenDecoded();

  const response = await fetch(`${process.env.API}/statistics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
    next: {
      tags: ["statistics"],
      revalidate: 300, // Revalidate every 5 minutes
    },
  });

  const payload: APIResponse<{
    data: { statistics: ComprehensiveStatistics };
  }> = await response.json();

  return payload;
};

// Get quick statistics
export const getQuickStatistics = async (): Promise<
  APIResponse<{ quickStats: QuickStatistics }>
> => {
  // Get token
  const token = await getTokenDecoded();

  const response = await fetch(`${process.env.API}/statistics/quick`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
    next: {
      tags: ["statistics-quick"],
      revalidate: 300, // Revalidate every 5 minutes
    },
  });

  const payload: APIResponse<{ quickStats: QuickStatistics }> =
    await response.json();

  return payload;
};
