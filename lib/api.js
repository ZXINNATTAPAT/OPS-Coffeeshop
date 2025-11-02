const API_BASE_URL = 'http://localhost:3001/api'

// Check if API is available (with timeout)
let apiAvailable = null

async function checkAPI() {
  if (apiAvailable !== null) return apiAvailable
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000) // 2 second timeout
    
    const response = await fetch(`${API_BASE_URL}/showcart`, {
      method: 'GET',
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    apiAvailable = response.ok
    return apiAvailable
  } catch (error) {
    apiAvailable = false
    console.warn('API not available, using mock data:', error.message)
    return false
  }
}

// Mock data storage (using localStorage for persistence)
const MOCK_CART_KEY = 'pos_mock_cart'
const MOCK_ORDERS_KEY = 'pos_mock_orders'
const MOCK_EXPENSES_KEY = 'pos_mock_expenses'

// Helper functions for mock data persistence
function getMockCart() {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(MOCK_CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading mock cart:', error)
    return []
  }
}

function saveMockCart(cart) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MOCK_CART_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving mock cart:', error)
  }
}

function getMockOrders() {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(MOCK_ORDERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading mock orders:', error)
    return []
  }
}

function saveMockOrders(orders) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MOCK_ORDERS_KEY, JSON.stringify(orders))
  } catch (error) {
    console.error('Error saving mock orders:', error)
  }
}

function getMockExpenses() {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(MOCK_EXPENSES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading mock expenses:', error)
    return []
  }
}

function saveMockExpenses(expenses) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MOCK_EXPENSES_KEY, JSON.stringify(expenses))
  } catch (error) {
    console.error('Error saving mock expenses:', error)
  }
}

// API Service for Cart operations
export const cartService = {
  // Get all cart items
  async getCart() {
    const useMock = !(await checkAPI())
    
    if (useMock) {
      await new Promise(resolve => setTimeout(resolve, 200))
      const mockCart = getMockCart()
      return [...mockCart]
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/showcart`)
      if (!response.ok) throw new Error('Failed to fetch cart')
      const data = await response.json()
      // Sync mock cart with real API data
      saveMockCart(data)
      return data
    } catch (error) {
      console.error('Error fetching cart, using mock data:', error)
      apiAvailable = false // Mark API as unavailable
      const mockCart = getMockCart()
      return [...mockCart] // Fallback to mock
    }
  },

  // Add item to cart
  async addToCart(item) {
    const useMock = !(await checkAPI())
    
    if (useMock) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const mockCart = getMockCart()
      const newItem = {
        id: mockCart.length > 0 ? Math.max(...mockCart.map(i => i.id || 0)) + 1 : 1,
        ...item,
        time: new Date().toISOString(),
      }
      mockCart.push(newItem)
      saveMockCart(mockCart)
      return newItem
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...item,
          time: new Date().toISOString(),
        }),
      })
      if (!response.ok) throw new Error('Failed to add item to cart')
      const data = await response.json()
      // Also add to mock cart for sync
      const mockCart = getMockCart()
      mockCart.push(data)
      saveMockCart(mockCart)
      return data
    } catch (error) {
      console.error('Error adding to cart, using mock data:', error)
      apiAvailable = false
      // Fallback to mock
      const mockCart = getMockCart()
      const newItem = {
        id: mockCart.length > 0 ? Math.max(...mockCart.map(i => i.id || 0)) + 1 : 1,
        ...item,
        time: new Date().toISOString(),
      }
      mockCart.push(newItem)
      saveMockCart(mockCart)
      return newItem
    }
  },

  // Clear cart
  async clearCart() {
    const useMock = !(await checkAPI())
    
    if (useMock) {
      await new Promise(resolve => setTimeout(resolve, 200))
      saveMockCart([])
      return true
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/cartdelete`, {
        method: 'POST',
      })
      if (!response.ok) throw new Error('Failed to clear cart')
      // Also clear mock when API works
      saveMockCart([])
      return true
    } catch (error) {
      console.error('Error clearing cart, using mock data:', error)
      apiAvailable = false
      saveMockCart([])
      return true
    }
  },
}

// API Service for Order operations
export const orderService = {
  // Get all orders
  async getOrders() {
    const useMock = !(await checkAPI())
    
    if (useMock) {
      await new Promise(resolve => setTimeout(resolve, 200))
      const mockOrders = getMockOrders()
      return [...mockOrders]
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/showorderdb`)
      if (!response.ok) throw new Error('Failed to fetch orders')
      const data = await response.json()
      // Sync mock orders with real API data
      saveMockOrders(data)
      return data
    } catch (error) {
      console.error('Error fetching orders, using mock data:', error)
      apiAvailable = false
      const mockOrders = getMockOrders()
      return [...mockOrders]
    }
  },

  // Submit order (single item)
  async submitOrder(order) {
    const useMock = !(await checkAPI())
    
    if (useMock) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const mockOrders = getMockOrders()
      const newOrder = {
        id: mockOrders.length > 0 ? Math.max(...mockOrders.map(o => o.id || 0)) + 1 : 1,
        ...order,
        time: new Date().toISOString(),
      }
      mockOrders.push(newOrder)
      saveMockOrders(mockOrders)
      return newOrder
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/order_db`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })
      if (!response.ok) throw new Error('Failed to submit order')
      const data = await response.json()
      // Also add to mock orders for sync
      const mockOrders = getMockOrders()
      mockOrders.push(data)
      saveMockOrders(mockOrders)
      return data
    } catch (error) {
      console.error('Error submitting order, using mock data:', error)
      apiAvailable = false
      // Fallback to mock
      const mockOrders = getMockOrders()
      const newOrder = {
        id: mockOrders.length > 0 ? Math.max(...mockOrders.map(o => o.id || 0)) + 1 : 1,
        ...order,
        time: new Date().toISOString(),
      }
      mockOrders.push(newOrder)
      saveMockOrders(mockOrders)
      return newOrder
    }
  },

  // Submit multiple orders (batch)
  async submitOrders(orders) {
    const useMock = !(await checkAPI())
    
    if (useMock) {
      await new Promise(resolve => setTimeout(resolve, 500))
      const mockOrders = getMockOrders()
      let nextId = mockOrders.length > 0 ? Math.max(...mockOrders.map(o => o.id || 0)) : 0
      const results = orders.map(order => {
        nextId++
        const newOrder = {
          id: nextId,
          ...order,
          time: new Date().toISOString(),
        }
        mockOrders.push(newOrder)
        return newOrder
      })
      saveMockOrders(mockOrders)
      return results
    }
    
    try {
      const promises = orders.map(order => this.submitOrder(order))
      const results = await Promise.all(promises)
      return results
    } catch (error) {
      console.error('Error submitting orders, using mock data:', error)
      apiAvailable = false
      // Fallback to mock
      const mockOrders = getMockOrders()
      let nextId = mockOrders.length > 0 ? Math.max(...mockOrders.map(o => o.id || 0)) : 0
      const results = orders.map(order => {
        nextId++
        const newOrder = {
          id: nextId,
          ...order,
          time: new Date().toISOString(),
        }
        mockOrders.push(newOrder)
        return newOrder
      })
      saveMockOrders(mockOrders)
      return results
    }
  },
}

// API Service for Expenses operations
export const expenseService = {
  // Get all expenses
  async getExpenses() {
    const useMock = !(await checkAPI())
    
    if (useMock) {
      await new Promise(resolve => setTimeout(resolve, 200))
      const mockExpenses = getMockExpenses()
      return [...mockExpenses]
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/showex`)
      if (!response.ok) throw new Error('Failed to fetch expenses')
      const data = await response.json()
      // Sync mock expenses with real API data
      saveMockExpenses(data)
      return data
    } catch (error) {
      console.error('Error fetching expenses, using mock data:', error)
      apiAvailable = false
      const mockExpenses = getMockExpenses()
      return [...mockExpenses]
    }
  },

  // Add expense
  async addExpense(expense) {
    const useMock = !(await checkAPI())
    
    if (useMock) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const mockExpenses = getMockExpenses()
      const newExpense = {
        id: mockExpenses.length > 0 ? Math.max(...mockExpenses.map(e => e.id || 0)) + 1 : 1,
        ...expense,
        dt: new Date().toISOString(),
      }
      mockExpenses.push(newExpense)
      saveMockExpenses(mockExpenses)
      return 'Data inserted into the database.'
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...expense,
          dt: new Date().toISOString(),
        }),
      })
      if (!response.ok) throw new Error('Failed to add expense')
      const data = await response.text()
      // Also add to mock expenses for sync
      const mockExpenses = getMockExpenses()
      const newExpense = {
        id: mockExpenses.length > 0 ? Math.max(...mockExpenses.map(e => e.id || 0)) + 1 : 1,
        ...expense,
        dt: new Date().toISOString(),
      }
      mockExpenses.push(newExpense)
      saveMockExpenses(mockExpenses)
      return data
    } catch (error) {
      console.error('Error adding expense, using mock data:', error)
      apiAvailable = false
      // Fallback to mock
      const mockExpenses = getMockExpenses()
      const newExpense = {
        id: mockExpenses.length > 0 ? Math.max(...mockExpenses.map(e => e.id || 0)) + 1 : 1,
        ...expense,
        dt: new Date().toISOString(),
      }
      mockExpenses.push(newExpense)
      saveMockExpenses(mockExpenses)
      return 'Data inserted into the database.'
    }
  },
}

// Export function to reset API availability check (useful for testing)
export function resetAPICheck() {
  apiAvailable = null
}
