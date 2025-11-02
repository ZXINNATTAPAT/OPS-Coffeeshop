import { useState, useEffect, useCallback } from 'react'
import { menuService } from '../lib/menuService'

export function useMenu() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadCategories = useCallback(() => {
    setLoading(true)
    setError(null)
    try {
      const cats = menuService.getCategories()
      setCategories(cats)
    } catch (err) {
      setError('Failed to load categories')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const getItemsForCategory = useCallback((categoryId) => {
    try {
      return menuService.getItems(categoryId)
    } catch (err) {
      console.error(err)
      return []
    }
  }, [])

  const getCategory = useCallback((categoryId) => {
    try {
      return menuService.getCategory(categoryId)
    } catch (err) {
      console.error(err)
      return null
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return {
    categories,
    loading,
    error,
    loadCategories,
    getItemsForCategory,
    getCategory,
  }
}
