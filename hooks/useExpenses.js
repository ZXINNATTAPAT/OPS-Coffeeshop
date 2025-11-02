import { useState, useEffect, useCallback } from 'react'
import { expenseService } from '../lib/api'

export function useExpenses() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load expenses from API
  const loadExpenses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await expenseService.getExpenses()
      setExpenses(data || [])
    } catch (err) {
      // API service now falls back to mock, so this shouldn't happen
      console.warn('Error loading expenses (using mock data):', err)
      setExpenses([]) // Set empty expenses as fallback
    } finally {
      setLoading(false)
    }
  }, [])

  // Add expense
  const addExpense = useCallback(async (expenseData) => {
    setLoading(true)
    setError(null)
    try {
      await expenseService.addExpense(expenseData)
      await loadExpenses() // Refresh expenses
      return true
    } catch (err) {
      setError('Failed to add expense')
      throw err
    } finally {
      setLoading(false)
    }
  }, [loadExpenses])

  // Filter expenses by date
  const getExpensesByDate = useCallback((date) => {
    if (!date) return expenses
    const selectedDateOnly = new Date(date).setHours(0, 0, 0, 0)
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.dt).setHours(0, 0, 0, 0)
      return expenseDate === selectedDateOnly
    })
  }, [expenses])

  // Calculate total expenses for a date
  const getTotalExpensesByDate = useCallback((date) => {
    const filteredExpenses = getExpensesByDate(date)
    return filteredExpenses.reduce((total, expense) => {
      const price = expense.price || 0
      const quantity = expense.quantity || 0
      return total + (price * quantity)
    }, 0)
  }, [getExpensesByDate])

  // Initial load
  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  return {
    expenses,
    loading,
    error,
    addExpense,
    loadExpenses,
    getExpensesByDate,
    getTotalExpensesByDate,
    setError,
  }
}
