import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CalendarCheck,
  MessageCircle,
  Settings,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  BarChart2,
  Clock,
  GitMerge,
  Zap,
} from "lucide-react"
import { KpiCard } from "@/components/dashboard/KpiCard"

export const DashboardPage = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Greeting Header */}
      <div className="flex flex-col items-start gap-6">
        <div className="flex h-12 w-12 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0">
          <Target className="h-5 w-5" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Welcome Back
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Alex Morgan
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Ready to conquer today's QA challenges? Your dashboard is ready for action.
          </p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Tests"
          value="1,247"
          trend="+12% vs last week"
        />
        <KpiCard
          title="Open Defects"
          value="24"
          trend="-8% vs last week"
        />
        <KpiCard
          title="Automated Tests"
          value="62%"
          trend="+5% vs last week"
        />
        <KpiCard
          title="Test Coverage"
          value="78%"
          trend="+3% vs last week"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Active Project (largest card) */}
        <Card className="col-span-2 md:col-span-1">
          <div className="space-y-6 p-8">
            <div className="flex items-start gap-5">
              <div className="flex h-11 w-11 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0 flex-shrink-0">
                <Target className="h-5 w-5" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold tracking-tight">
                  QA Dashboard Enhancement
                </h2>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span>Sprint: SP-2405</span>
                  <span className="mx-1">•</span>
                  <span>Owner: Alex Morgan</span>
                  <span className="mx-1">•</span>
                  <span>Due: Jun 30, 2026</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="mt-2 text-sm font-medium text-muted-foreground flex justify-between">
                <span>Progress</span>
                <span>75% Complete</span>
              </p>
            </div>

            <div className="mt-6">
              <Button
                variant="default"
                size="sm"
                className="w-full"
              >
                View Project Details
              </Button>
            </div>
          </div>
        </Card>

        {/* Release Snapshot */}
        <Card className="h-full">
          <div className="space-y-6 p-8">
            <div className="flex items-start gap-5">
              <div className="flex h-11 w-11 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0 flex-shrink-0">
                <GitMerge className="h-5 w-5" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold tracking-tight">
                  Release 2.1.0
                </h2>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span>Released: June 28, 2026</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="flex flex-col items-start gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Features Added
                </p>
                <p className="text-3xl font-bold">15</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Bugs Fixed
                </p>
                <p className="text-3xl font-bold text-destructive">23</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Improvements
                </p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Breaking Changes
                </p>
                <p className="text-3xl font-bold text-destructive">2</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Pending Actions */}
        <Card className="h-full">
          <div className="space-y-6 p-8">
            <div className="flex items-start gap-5">
              <div className="flex h-11 w-11 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0 flex-shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold tracking-tight">
                  Pending Actions
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl">
                  Actions requiring your attention
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="flex h-9 w-9 items-center justify-center bg-secondary/20 rounded-lg text-secondary shrink-0 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-medium">Review test plan for login feature</p>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="font-medium">Due:</span>
                    <span>Today at 3:00 PM</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary">High Priority</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="flex h-9 w-9 items-center justify-center bg-secondary/20 rounded-lg text-secondary shrink-0 flex-shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-medium">Update device lab inventory</p>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="font-medium">Due:</span>
                    <span>Tomorrow</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="flex h-9 w-9 items-center justify-center bg-secondary/20 rounded-lg text-secondary shrink-0 flex-shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-medium">Prepare QA metrics report</p>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="font-medium">Due:</span>
                    <span>Jun 30</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary">Low Priority</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="h-full">
          <div className="space-y-6 p-8">
            <div className="flex items-start gap-5">
              <div className="flex h-11 w-11 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0 flex-shrink-0">
                <BarChart2 className="h-5 w-5" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold tracking-tight">
                  Recent Activity
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl">
                  Latest updates in your workspace
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="flex h-9 w-9 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0 flex-shrink-0">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="font-medium">Added new test case for payment flow</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="whitespace-nowrap">2 hours ago</span>
                    <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">Test Cases</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="flex h-9 w-9 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0 flex-shrink-0">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="font-medium">Updated defect #452 with reproduction steps</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="whitespace-nowrap">4 hours ago</span>
                    <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">Defects</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="flex h-9 w-9 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0 flex-shrink-0">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="font-medium">Generated weekly test report</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="whitespace-nowrap">6 hours ago</span>
                    <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">Reports</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="flex h-9 w-9 items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0 flex-shrink-0">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="font-medium">Executed regression test suite</p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="whitespace-nowrap">8 hours ago</span>
                    <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">Test Execution</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}