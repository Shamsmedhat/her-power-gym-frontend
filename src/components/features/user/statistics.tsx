import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  DollarSign,
  TrendingUp,
  UserCheck,
  Calendar,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { getStatistics } from "@/lib/apis/statistics.api";
import { StatisticsSkeleton } from "@/components/skeletons/statistics/statistics.skeleton";
import { format } from "date-fns";

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("ar-EG").format(num);
};

const formatPercentage = (num: number) => {
  return `${num}%`;
};

const getCompletionRateColor = (rate: number) => {
  if (rate >= 90) return "text-green-600";
  if (rate >= 70) return "text-yellow-600";
  return "text-red-600";
};

// Main Statistics Component
const StatisticsContent = async () => {
  const response = await getStatistics();

  if ("statusCode" in response) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Error Loading Statistics
          </h3>
          <p className="text-muted-foreground">{response.message}</p>
        </div>
      </div>
    );
  }

  const { data } = response;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Statistics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Last updated:{" "}
            {format(new Date(data.statistics.generatedAt), "PPP p")}
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(data.statistics.overview.totalUsers)}
            </div>
            <p className="text-xs text-muted-foreground">All system users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(data.statistics.overview.totalClients)}
            </div>
            <p className="text-xs text-muted-foreground">Active gym members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.statistics.overview.totalIncome)}
            </div>
            <p className="text-xs text-muted-foreground">Total revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(data.statistics.overview.netProfit)}
            </div>
            <p className="text-xs text-muted-foreground">After salaries</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Main Subscriptions
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {formatCurrency(
                      data.statistics.financial.mainSubscriptionIncome
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Private Sessions</span>
                  <span className="text-sm font-bold text-purple-600">
                    {formatCurrency(
                      data.statistics.financial.privateSubscriptionIncome
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Salaries</span>
                  <span className="text-sm font-bold text-orange-600">
                    {formatCurrency(data.statistics.financial.totalSalaries)}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Salary</span>
                  <span className="text-sm font-bold">
                    {formatCurrency(data.statistics.financial.averageSalary)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Income per Client</span>
                  <span className="text-sm font-bold">
                    {formatCurrency(
                      data.statistics.financial.averageIncomePerClient
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              User Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">
                    Super Admin
                  </Badge>
                </div>
                <span className="text-sm font-bold">
                  {data.statistics.userBreakdown.superAdmins}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs">
                    Admin
                  </Badge>
                </div>
                <span className="text-sm font-bold">
                  {data.statistics.userBreakdown.admins}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Coach
                  </Badge>
                </div>
                <span className="text-sm font-bold">
                  {data.statistics.userBreakdown.coaches}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Staff</span>
                <span className="text-sm font-bold">
                  {data.statistics.userBreakdown.totalStaff}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription and Session Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Subscription Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {data.statistics.subscriptions.mainPlans}
                </div>
                <div className="text-xs text-muted-foreground">Main Plans</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {data.statistics.subscriptions.privatePlans}
                </div>
                <div className="text-xs text-muted-foreground">
                  Private Plans
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Plans</span>
                <span className="text-sm font-bold">
                  {data.statistics.subscriptions.totalPlans}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Clients with Private Plans
                </span>
                <span className="text-sm font-bold">
                  {data.statistics.subscriptions.clientsWithPrivatePlans}
                </span>
              </div>
            </div>

            {Object.keys(data.statistics.subscriptions.planUsage).length >
              0 && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Plan Usage</h4>
                <div className="space-y-2">
                  {Object.entries(data.statistics.subscriptions.planUsage)
                    .slice(0, 3)
                    .map(([planName, plan]) => (
                      <div
                        key={planName}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="truncate">{planName}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {plan.usage} users
                          </span>
                          <span className="text-muted-foreground">
                            ({formatCurrency(plan.revenue)})
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Session Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Session Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <span className="text-sm font-bold">
                  {formatNumber(data.statistics.sessions.completedSessions)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Pending</span>
                </div>
                <span className="text-sm font-bold">
                  {formatNumber(data.statistics.sessions.pendingSessions)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Canceled</span>
                </div>
                <span className="text-sm font-bold">
                  {formatNumber(data.statistics.sessions.canceledSessions)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Sessions</span>
                <span className="text-sm font-bold">
                  {formatNumber(data.statistics.sessions.totalSessions)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span
                  className={`text-sm font-bold ${getCompletionRateColor(
                    data.statistics.sessions.completionRate
                  )}`}
                >
                  {formatPercentage(data.statistics.sessions.completionRate)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coach Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Coach Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(data.statistics.performance.coachPerformance)
              .slice(0, 5)
              .map(([coachName, stats]) => (
                <div key={coachName} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{coachName}</h4>
                    <Badge
                      variant={
                        stats.completionRate >= 90
                          ? "default"
                          : stats.completionRate >= 70
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {formatPercentage(stats.completionRate)} completion
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {stats.completedSessions}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Completed
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">
                        {stats.pendingSessions}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Pending
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">
                        {stats.canceledSessions}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Canceled
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {stats.totalSessions}
                      </div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Recent Activity (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {
                  data.statistics.performance.recentActivity
                    .newClientsLast30Days
                }
              </div>
              <div className="text-sm text-muted-foreground">New Clients</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {
                  data.statistics.performance.recentActivity
                    .newSessionsLast30Days
                }
              </div>
              <div className="text-sm text-muted-foreground">New Sessions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Statistics Component with Suspense
export const Statistics = () => {
  return (
    <Suspense fallback={<StatisticsSkeleton />}>
      <StatisticsContent />
    </Suspense>
  );
};
