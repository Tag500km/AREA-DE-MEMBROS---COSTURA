"use client"

import { useState } from "react"
import Link from "next/link"
import { format, subDays, startOfMonth, endOfMonth } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ArrowLeft, Calendar, Trash2 } from "lucide-react"
import { useFinancialData } from "@/lib/hooks/use-financial-data"
import { AddRevenueDialog } from "@/components/add-revenue-dialog"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { FinancialSummary } from "@/components/financial-summary"
import { ExpenseChart } from "@/components/expense-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const {
    addExpense,
    addRevenue,
    deleteExpense,
    deleteRevenue,
    getDailyBalance,
    getFinancialSummary,
    isLoading,
  } = useFinancialData()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"daily" | "monthly">("daily")

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  const dailyBalance = getDailyBalance(selectedDate)
  const monthlyBalance = getFinancialSummary(
    startOfMonth(selectedDate),
    endOfMonth(selectedDate)
  )

  const currentData = viewMode === "daily" ? dailyBalance : monthlyBalance

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const categoryLabels: Record<string, string> = {
    ferramentas: "Ferramentas",
    marketing: "Marketing",
    impostos: "Impostos",
    materiais: "Materiais",
    funcionarios: "Funcionários",
    aluguel: "Aluguel",
    outros: "Outros",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Dashboard Financeiro</h1>
                <p className="text-muted-foreground">
                  Controle completo dos seus gastos e receitas
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "daily" ? "default" : "outline"}
              onClick={() => setViewMode("daily")}
            >
              Diário
            </Button>
            <Button
              variant={viewMode === "monthly" ? "default" : "outline"}
              onClick={() => setViewMode("monthly")}
            >
              Mensal
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setSelectedDate(
                  viewMode === "daily"
                    ? subDays(selectedDate, 1)
                    : new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() - 1,
                        1
                      )
                )
              }
            >
              ←
            </Button>
            <div className="flex items-center gap-2 rounded-md border px-4 py-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">
                {viewMode === "daily"
                  ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })
                  : format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setSelectedDate(
                  viewMode === "daily"
                    ? subDays(selectedDate, -1)
                    : new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth() + 1,
                        1
                      )
                )
              }
            >
              →
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedDate(new Date())}
            >
              Hoje
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <AddRevenueDialog onAddRevenue={addRevenue} />
            <AddExpenseDialog onAddExpense={addExpense} />
          </div>
        </div>

        {/* Financial Summary */}
        <div className="mb-8">
          <FinancialSummary
            totalRevenue={currentData.totalRevenue}
            totalExpenses={currentData.totalExpenses}
            balance={currentData.balance}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Expense Chart */}
          <div>
            <ExpenseChart
              expensesByCategory={
                viewMode === "daily"
                  ? dailyBalance.expenses.reduce((acc, exp) => {
                      acc[exp.category] = (acc[exp.category] || 0) + exp.amount
                      return acc
                    }, {} as Record<string, number>)
                  : monthlyBalance.expensesByCategory
              }
            />
          </div>

          {/* Transactions List */}
          <div className="space-y-4">
            {/* Revenues */}
            {viewMode === "daily" && dailyBalance.revenues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Receitas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dailyBalance.revenues.map((revenue) => (
                      <div
                        key={revenue.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{revenue.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(revenue.date), "dd/MM/yyyy")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">
                            {formatCurrency(revenue.amount)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteRevenue(revenue.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Expenses */}
            {viewMode === "daily" && dailyBalance.expenses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Despesas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dailyBalance.expenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{expense.description}</p>
                            <Badge variant="secondary">
                              {categoryLabels[expense.category]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(expense.date), "dd/MM/yyyy")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-600">
                            {formatCurrency(expense.amount)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteExpense(expense.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {viewMode === "daily" &&
              dailyBalance.revenues.length === 0 &&
              dailyBalance.expenses.length === 0 && (
                <Card>
                  <CardContent className="py-8">
                    <p className="text-center text-muted-foreground">
                      Nenhuma transação registrada nesta data
                    </p>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
