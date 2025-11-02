// Menu Management Service
// This manages menu categories and items (can be extended to use API or localStorage)

const STORAGE_KEY = 'pos_menu_data'

// Default menu structure
const defaultMenuData = {
  categories: [
    {
      id: '1',
      name: 'Coffee',
      icon: '☕',
      color: '#8B4513',
      bgColor: '#D2691E',
      enabled: true,
    },
    {
      id: '2',
      name: 'Softdrink',
      icon: '🥤',
      color: '#0066CC',
      bgColor: '#0066CC',
      enabled: true,
    },
    {
      id: '3',
      name: 'Tea',
      icon: '🍵',
      color: '#FF4500',
      bgColor: '#FF4500',
      enabled: true,
    },
    {
      id: '4',
      name: 'Special',
      icon: '⭐',
      color: '#9ACD32',
      bgColor: '#9ACD32',
      enabled: true,
    },
    {
      id: '5',
      name: 'Expenses',
      icon: '💰',
      color: '#DC143C',
      bgColor: '#DC143C',
      enabled: true,
    },
    {
      id: '6',
      name: 'Orders',
      icon: '📋',
      color: '#6C757D',
      bgColor: '#6C757D',
      enabled: true,
    },
  ],
  items: {
    '1': [ // Coffee items
      { id: 0, id_pd: 'A001', Type: 'Ice', name: 'Mocha', quantity: 1, price: 45, card: "btn-primary", enabled: true },
      { id: 1, id_pd: 'A002', Type: 'Ice', name: 'Cappuccino', quantity: 1, price: 50, card: "btn-primary", enabled: true },
      { id: 2, id_pd: 'A003', Type: 'Ice', name: 'Espresso', quantity: 1, price: 40, card: "btn-primary", enabled: true },
      { id: 3, id_pd: 'A004', Type: 'Ice', name: 'Latte', quantity: 1, price: 50, card: "btn-primary", enabled: true },
      { id: 4, id_pd: 'A005', Type: 'Ice', name: 'Americano', quantity: 1, price: 35, card: "btn-primary", enabled: true },
      { id: 5, id_pd: 'A006', Type: 'Ice', name: 'Nest coffee', quantity: 1, price: 25, card: "", enabled: true },
      { id: 6, id_pd: 'A001', Type: 'Hot', name: 'Mocha', quantity: 1, price: 45, card: "btn-danger", enabled: true },
      { id: 7, id_pd: 'A002', Type: 'Hot', name: 'Cappuccino', quantity: 1, price: 50, card: "btn-danger", enabled: true },
      { id: 8, id_pd: 'A003', Type: 'Hot', name: 'Espresso', quantity: 1, price: 40, card: "btn-danger", enabled: true },
      { id: 9, id_pd: 'A004', Type: 'Hot', name: 'Latte', quantity: 1, price: 50, card: "btn-danger", enabled: true },
      { id: 10, id_pd: 'A005', Type: 'Hot', name: 'Americano', quantity: 1, price: 35, card: "btn-danger", enabled: true },
      { id: 11, id_pd: 'A006', Type: 'Hot', name: 'Nest coffee', quantity: 1, price: 20, card: "btn-danger", enabled: true },
      { id: 12, id_pd: 'A001', Type: 'mix', name: 'Mocha', quantity: 1, price: 50, card: "btn-info", enabled: true },
      { id: 13, id_pd: 'A002', Type: 'mix', name: 'Cappuccino', quantity: 1, price: 55, card: "btn-info", enabled: true },
      { id: 14, id_pd: 'A003', Type: 'mix', name: 'Espresso', quantity: 1, price: 45, card: "btn-info", enabled: true },
      { id: 15, id_pd: 'A004', Type: 'mix', name: 'Latte', quantity: 1, price: 55, card: "btn-info", enabled: true },
      { id: 16, id_pd: 'A005', Type: 'mix', name: 'Americano', quantity: 1, price: 40, card: "btn-info", enabled: true },
      { id: 17, id_pd: 'A006', Type: 'mix', name: 'Nest coffee', quantity: 1, price: 30, card: "btn-info", enabled: true },
    ],
    '2': [ // Softdrink items
      { id: 0, id_pd: 'B001', Type: 'Ice', name: 'Coke', quantity: 1, price: 25, card: "btn-danger", enabled: true },
      { id: 1, id_pd: 'B002', Type: 'Ice', name: 'Fanta Red', quantity: 1, price: 25, card: "btn-danger", enabled: true },
      { id: 2, id_pd: 'B003', Type: 'Ice', name: 'Fanta O', quantity: 1, price: 25, card: "btn-warning", enabled: true },
      { id: 3, id_pd: 'B004', Type: 'Ice', name: 'Fanta Green', quantity: 1, price: 25, card: "btn-success", enabled: true },
      { id: 4, id_pd: 'B005', Type: 'Ice', name: 'OISHI', quantity: 1, price: 25, card: "btn-success", enabled: true },
      { id: 5, id_pd: 'B006', Type: 'Ice', name: 'water', quantity: 1, price: 10, card: "btn-primary", enabled: true },
      { id: 6, id_pd: 'B007', Type: 'Ice', name: 'Est', quantity: 1, price: 25, card: "btn-primary", enabled: true },
      { id: 7, id_pd: 'B008', Type: 'Ice', name: 'SPRITE', quantity: 1, price: 25, card: "btn-primary", enabled: true },
    ],
    '3': [ // Tea items
      { id: 0, id_pd: 'T001', Type: 'Ice', name: 'TEA', quantity: 1, price: 40, card: "btn-primary", enabled: true },
      { id: 1, id_pd: 'T002', Type: 'Ice', name: 'Green Tea', quantity: 1, price: 40, card: "btn-primary", enabled: true },
      { id: 2, id_pd: 'T003', Type: 'Ice', name: 'Black Tea', quantity: 1, price: 35, card: "btn-primary", enabled: true },
      { id: 3, id_pd: 'T004', Type: 'Hot', name: 'TEA', quantity: 1, price: 30, card: "btn-danger", enabled: true },
      { id: 4, id_pd: 'T005', Type: 'Hot', name: 'Green Tea', quantity: 1, price: 35, card: "btn-danger", enabled: true },
      { id: 5, id_pd: 'T006', Type: 'Hot', name: 'Black Tea', quantity: 1, price: 30, card: "btn-danger", enabled: true },
      { id: 6, id_pd: 'T007', Type: 'Mix', name: 'TEA', quantity: 1, price: 45, card: "btn-info", enabled: true },
      { id: 7, id_pd: 'T008', Type: 'Mix', name: 'Green Tea', quantity: 1, price: 45, card: "btn-info", enabled: true },
      { id: 8, id_pd: 'T009', Type: 'Mix', name: 'Black Tea', quantity: 1, price: 40, card: "btn-info", enabled: true },
    ],
    '4': [ // Special items
      { id: 0, id_pd: 'S001', Type: 'Ice', name: 'TEA Lemon', quantity: 1, price: 45, card: "btn-primary", enabled: true },
      { id: 1, id_pd: 'S002', Type: 'Ice', name: 'Lemon+H', quantity: 1, price: 45, card: "btn-primary", enabled: true },
      { id: 2, id_pd: 'S003', Type: 'Ice', name: 'RedsLemon', quantity: 1, price: 45, card: "btn-primary", enabled: true },
      { id: 3, id_pd: 'S004', Type: 'Ice', name: 'Nest TEA', quantity: 1, price: 40, card: "btn-primary", enabled: true },
      { id: 4, id_pd: 'S005', Type: 'Ice', name: 'Red soda', quantity: 1, price: 30, card: "btn-primary", enabled: true },
      { id: 5, id_pd: 'S006', Type: 'Ice', name: 'Green soda', quantity: 1, price: 30, card: "btn-primary", enabled: true },
      { id: 6, id_pd: 'S007', Type: 'Ice', name: 'Coco', quantity: 1, price: 40, card: "btn-warning", enabled: true },
      { id: 7, id_pd: 'S008', Type: 'Hot', name: 'Coco', quantity: 1, price: 40, card: "btn-warning", enabled: true },
      { id: 8, id_pd: 'S009', Type: 'mix', name: 'Coco', quantity: 1, price: 45, card: "btn-warning", enabled: true },
      { id: 9, id_pd: 'S010', Type: 'Mix', name: 'M150 pepo', quantity: 1, price: 40, card: "btn-primary", enabled: true },
      { id: 10, id_pd: 'S011', Type: 'Mix', name: 'Yacol pepo', quantity: 1, price: 45, card: "btn-primary", enabled: true },
      { id: 11, id_pd: 'S012', Type: 'Mix', name: 'Milk Pink', quantity: 1, price: 45, card: "btn-primary", enabled: true },
      { id: 12, id_pd: 'S013', Type: 'Ice', name: 'Red soda(S)', quantity: 1, price: 25, card: "btn-primary", enabled: true },
      { id: 13, id_pd: 'S014', Type: 'Ice', name: 'Coffee old', quantity: 1, price: 25, card: "btn-primary", enabled: true },
      { id: 14, id_pd: 'S015', Type: 'Ice', name: 'G soda(S)', quantity: 1, price: 25, card: "btn-primary", enabled: true },
      { id: 15, id_pd: 'S016', Type: 'Ice', name: 'Rednosoda', quantity: 1, price: 25, card: "btn-primary", enabled: true },
      { id: 16, id_pd: 'S017', Type: 'Ice', name: 'Gnosoda', quantity: 1, price: 25, card: "btn-primary", enabled: true },
    ],
  }
}

export const menuService = {
  // Get all categories
  getCategories() {
    if (typeof window === 'undefined') return defaultMenuData.categories
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : defaultMenuData
    return data.categories.filter(cat => cat.enabled !== false)
  },

  // Get category by ID
  getCategory(id) {
    return this.getCategories().find(cat => cat.id === id)
  },

  // Save categories
  saveCategories(categories) {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : defaultMenuData
    data.categories = categories
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },

  // Get items for a category
  getItems(categoryId) {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : defaultMenuData
    return (data.items[categoryId] || []).filter(item => item.enabled !== false)
  },

  // Save items for a category
  saveItems(categoryId, items) {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : defaultMenuData
    data.items[categoryId] = items
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },

  // Add item to category
  addItem(categoryId, item) {
    const items = this.getItems(categoryId)
    const newItem = {
      ...item,
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 0,
    }
    items.push(newItem)
    this.saveItems(categoryId, items)
    return newItem
  },

  // Update item
  updateItem(categoryId, itemId, updates) {
    const items = this.getItems(categoryId)
    const index = items.findIndex(item => item.id === itemId)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates }
      this.saveItems(categoryId, items)
      return items[index]
    }
    return null
  },

  // Delete item
  deleteItem(categoryId, itemId) {
    const items = this.getItems(categoryId)
    const filtered = items.filter(item => item.id !== itemId)
    this.saveItems(categoryId, filtered)
    return true
  },

  // Get all menu data
  getAllData() {
    if (typeof window === 'undefined') return defaultMenuData
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultMenuData
  },

  // Reset to defaults
  resetToDefaults() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
    return defaultMenuData
  },
}
