'use client'

import { CategoryButton } from '../molecules/CategoryButton'
import ApiStatusIndicator from '../ApiStatusIndicator'
import Link from 'next/link'

export function Navigation({ 
  categories = [], 
  activeCategory, 
  onCategoryChange,
  title = '☕ POS System'
}) {
  return (
    <>
      <ApiStatusIndicator />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container">
          <Link href="/" className="navbar-brand mb-0 fw-bold text-decoration-none">
            {title}
          </Link>
          <div className="d-flex flex-wrap gap-2">
            {categories.map((category) => {
              if (category.id === 'settings') {
                return (
                  <Link key={category.id} href="/settings" className="text-decoration-none">
                    <CategoryButton
                      category={category}
                      isActive={false}
                    />
                  </Link>
                )
              }
              return (
                <CategoryButton
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={() => onCategoryChange(category.id)}
                />
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
