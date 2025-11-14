export type ExpenseCategory =
  | "ferramentas"
  | "marketing"
  | "impostos"
  | "materiais"
  | "funcionarios"
  | "aluguel"
  | "outros"

export interface Expense {
  id: string
  description: string
  amount: number
  category: ExpenseCategory
  date: string
  createdAt: string
}

export interface Revenue {
  id: string
  description: string
  amount: number
  date: string
  createdAt: string
}

export interface DailyBalance {
  date: string
  totalRevenue: number
  totalExpenses: number
  balance: number
  revenues: Revenue[]
  expenses: Expense[]
}

export interface FinancialSummary {
  totalRevenue: number
  totalExpenses: number
  balance: number
  expensesByCategory: Record<ExpenseCategory, number>
}
