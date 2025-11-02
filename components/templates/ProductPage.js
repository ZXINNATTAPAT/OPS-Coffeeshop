'use client'

import { ProductCard } from '../molecules/ProductCard'
import { useMenu } from '../../hooks/useMenu'
import { Card } from '../atoms/Card'
import { useState, useEffect } from 'react'

export function ProductPage({ categoryId }) {
  const { getItemsForCategory, getCategory } = useMenu()
  const [items, setItems] = useState([])
  const [category, setCategory] = useState(null)

  useEffect(() => {
    const categoryItems = getItemsForCategory(categoryId)
    setItems(categoryItems)
    const cat = getCategory(categoryId)
    setCategory(cat)
  }, [categoryId, getItemsForCategory, getCategory])

  // Group items into rows (5 items per row for desktop, responsive)
  const groupedItems = []
  for (let i = 0; i < items.length; i += 5) {
    groupedItems.push(items.slice(i, i + 5))
  }

  if (items.length === 0) {
    return (
      <div className="col-12">
        <Card 
          title={category ? `${category.icon} ${category.name}` : 'Products'}
        >
          <div className="text-center py-5 text-muted">
            <div className="display-1 mb-3">📦</div>
            <h5>No items in this category</h5>
            <p className="mb-0">Add items in the Settings page</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="col-12">
      <Card 
        title={category ? `${category.icon} ${category.name}` : 'Products'}
        subtitle={`${items.length} item${items.length !== 1 ? 's' : ''} available`}
      >
        <div className="row g-3">
          {items.map(item => (
            <div key={item.id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
