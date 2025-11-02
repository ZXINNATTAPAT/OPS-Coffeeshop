import { useState, useEffect, useCallback } from 'react'
import { orderService } from '../lib/api'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load orders from API
  const loadOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await orderService.getOrders()
      setOrders(data || [])
    } catch (err) {
      // API service now falls back to mock, so this shouldn't happen
      console.warn('Error loading orders (using mock data):', err)
      setOrders([]) // Set empty orders as fallback
    } finally {
      setLoading(false)
    }
  }, [])

  // Submit orders
  const submitOrders = useCallback(async (orderItems) => {
    if (!orderItems || orderItems.length === 0) {
      throw new Error('No items to submit')
    }

    setLoading(true)
    setError(null)
    try {
      await orderService.submitOrders(orderItems)
      await loadOrders() // Refresh orders
      return true
    } catch (err) {
      setError('Failed to submit orders')
      throw err
    } finally {
      setLoading(false)
    }
  }, [loadOrders])

  // Filter orders by date
  const getOrdersByDate = useCallback((date) => {
    if (!date) return orders
    const dateStr = new Date(date).toLocaleDateString()
    return orders.filter(order => {
      const orderDate = new Date(order.time).toLocaleDateString()
      return orderDate === dateStr
    })
  }, [orders])

  // Calculate income for a date
  const getIncomeByDate = useCallback((date) => {
    const filteredOrders = getOrdersByDate(date)
    return filteredOrders.reduce((total, order) => total + (order.price || 0), 0)
  }, [getOrdersByDate])

  // Calculate count for a date
  const getCountByDate = useCallback((date) => {
    const filteredOrders = getOrdersByDate(date)
    return filteredOrders.reduce((total, order) => total + (order.quantity || 0), 0)
  }, [getOrdersByDate])

  // Initial load
  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  return {
    orders,
    loading,
    error,
    submitOrders,
    loadOrders,
    getOrdersByDate,
    getIncomeByDate,
    getCountByDate,
    setError,
  }
}
