"use client"

import { ArrowUpCircle, ArrowDownCircle, DollarSign, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FinancialSummaryProps {
  totalRevenue: number
  totalExpenses: number
  balance: number
}

export function FinancialSummary({
  totalRevenue,
  totalExpenses,
  balance,
}: FinancialSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const isProfit = balance >= 0

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receitas</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">Total de entradas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas</CardTitle>
          <ArrowDownCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">Total de saídas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {isProfit ? "Lucro" : "Prejuízo"}
          </CardTitle>
          <TrendingUp
            className={`h-4 w-4 ${isProfit ? "text-blue-600" : "text-orange-600"}`}
          />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              isProfit ? "text-blue-600" : "text-orange-600"
            }`}
          >
            {formatCurrency(Math.abs(balance))}
          </div>
          <p className="text-xs text-muted-foreground">
            {isProfit ? "Resultado positivo" : "Resultado negativo"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
