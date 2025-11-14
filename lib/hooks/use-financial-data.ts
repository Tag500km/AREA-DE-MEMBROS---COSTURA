"use client"

import { useState, useEffect, useCallback } from "react"
import { Expense, Revenue, DailyBalance, FinancialSummary, ExpenseCategory } from "@/lib/types"
import { format, parseISO, startOfDay, endOfDay, isWithinInterval } from "date-fns"

const STORAGE_KEY = "financial-data"

interface StorageData {
  expenses: Expense[]
  revenues: Revenue[]
}

export function useFinancialData() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [revenues, setRevenues] = useState<Revenue[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load data from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: StorageData = JSON.parse(stored)
        setExpenses(data.expenses || [])
        setRevenues(data.revenues || [])
      }
    } catch (error) {
      console.error("Error loading financial data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save data to localStorage
  const saveData = useCallback((newExpenses: Expense[], newRevenues: Revenue[]) => {
    try {
      const data: StorageData = {
        expenses: newExpenses,
        revenues: newRevenues,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error("Error saving financial data:", error)
    }
  }, [])

  // Add expense
  const addExpense = useCallback(
    (expense: Omit<Expense, "id" | "createdAt">) => {
      const newExpense: Expense = {
        ...expense,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }
      const newExpenses = [...expenses, newExpense]
      setExpenses(newExpenses)
      saveData(newExpenses, revenues)
      return newExpense
    },
    [expenses, revenues, saveData]
  )

  // Add revenue
  const addRevenue = useCallback(
    (revenue: Omit<Revenue, "id" | "createdAt">) => {
      const newRevenue: Revenue = {
        ...revenue,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }
      const newRevenues = [...revenues, newRevenue]
      setRevenues(newRevenues)
      saveData(expenses, newRevenues)
      return newRevenue
    },
    [expenses, revenues, saveData]
  )

  // Delete expense
  const deleteExpense = useCallback(
    (id: string) => {
      const newExpenses = expenses.filter((e) => e.id !== id)
      setExpenses(newExpenses)
      saveData(newExpenses, revenues)
    },
    [expenses, revenues, saveData]
  )

  // Delete revenue
  const deleteRevenue = useCallback(
    (id: string) => {
      const newRevenues = revenues.filter((r) => r.id !== id)
      setRevenues(newRevenues)
      saveData(expenses, newRevenues)
    },
    [expenses, revenues, saveData]
  )

  // Get daily balance for a specific date
  const getDailyBalance = useCallback(
    (date: Date): DailyBalance => {
      const dateStr = format(date, "yyyy-MM-dd")
      const start = startOfDay(date)
      const end = endOfDay(date)

      const dayRevenues = revenues.filter((r) => {
        const revDate = parseISO(r.date)
        return isWithinInterval(revDate, { start, end })
      })

      const dayExpenses = expenses.filter((e) => {
        const expDate = parseISO(e.date)
        return isWithinInterval(expDate, { start, end })
      })

      const totalRevenue = dayRevenues.reduce((sum, r) => sum + r.amount, 0)
      const totalExpenses = dayExpenses.reduce((sum, e) => sum + e.amount, 0)

      return {
        date: dateStr,
        totalRevenue,
        totalExpenses,
        balance: totalRevenue - totalExpenses,
        revenues: dayRevenues,
        expenses: dayExpenses,
      }
    },
    [expenses, revenues]
  )

  // Get financial summary for a date range
  const getFinancialSummary = useCallback(
    (startDate: Date, endDate: Date): FinancialSummary => {
      const start = startOfDay(startDate)
      const end = endOfDay(endDate)

      const periodRevenues = revenues.filter((r) => {
        const revDate = parseISO(r.date)
        return isWithinInterval(revDate, { start, end })
      })

      const periodExpenses = expenses.filter((e) => {
        const expDate = parseISO(e.date)
        return isWithinInterval(expDate, { start, end })
      })

      const totalRevenue = periodRevenues.reduce((sum, r) => sum + r.amount, 0)
      const totalExpenses = periodExpenses.reduce((sum, e) => sum + e.amount, 0)

      const expensesByCategory = periodExpenses.reduce(
        (acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + expense.amount
          return acc
        },
        {} as Record<ExpenseCategory, number>
      )

      return {
        totalRevenue,
        totalExpenses,
        balance: totalRevenue - totalExpenses,
        expensesByCategory,
      }
    },
    [expenses, revenues]
  )

  return {
    expenses,
    revenues,
    isLoading,
    addExpense,
    addRevenue,
    deleteExpense,
    deleteRevenue,
    getDailyBalance,
    getFinancialSummary,
  }
}
