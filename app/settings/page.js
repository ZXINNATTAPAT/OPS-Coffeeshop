'use client'

import { useState, useEffect } from 'react'
import { menuService } from '../../lib/menuService'
import { Card } from '../../components/atoms/Card'
import { Button } from '../../components/atoms/Button'
import { Input } from '../../components/atoms/Input'
import { Alert } from '../../components/atoms/Alert'
import { Badge } from '../../components/atoms/Badge'
import { CategoryButton } from '../../components/molecules/CategoryButton'

export default function SettingsPage() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [items, setItems] = useState([])
  const [showItemForm, setShowItemForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    id_pd: '',
    name: '',
    Type: 'Ice',
    price: '',
    quantity: '1',
    card: 'btn-primary',
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      loadItems(selectedCategory.id)
    }
  }, [selectedCategory])

  const loadCategories = () => {
    const cats = menuService.getCategories()
    setCategories(cats)
    if (cats.length > 0 && !selectedCategory) {
      setSelectedCategory(cats[0])
    }
  }

  const loadItems = (categoryId) => {
    const categoryItems = menuService.getItems(categoryId)
    setItems(categoryItems)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setShowItemForm(false)
    setEditingItem(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveItem = () => {
    if (!formData.id_pd || !formData.name || !formData.price) {
      setError('Please fill in all required fields')
      return
    }

    try {
      if (editingItem) {
        menuService.updateItem(selectedCategory.id, editingItem.id, {
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
        })
      } else {
        menuService.addItem(selectedCategory.id, {
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
        })
      }
      loadItems(selectedCategory.id)
      resetForm()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setFormData({
      id_pd: item.id_pd,
      name: item.name,
      Type: item.Type,
      price: item.price.toString(),
      quantity: item.quantity.toString(),
      card: item.card || 'btn-primary',
    })
    setShowItemForm(true)
  }

  const handleDeleteItem = (itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      menuService.deleteItem(selectedCategory.id, itemId)
      loadItems(selectedCategory.id)
    }
  }

  const resetForm = () => {
    setFormData({
      id_pd: '',
      name: '',
      Type: 'Ice',
      price: '',
      quantity: '1',
      card: 'btn-primary',
    })
    setEditingItem(null)
    setShowItemForm(false)
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-3">
          <Card title="Categories" className="mb-3">
            <div className="d-flex flex-column gap-2">
              {categories.map(category => (
                <CategoryButton
                  key={category.id}
                  category={category}
                  isActive={selectedCategory?.id === category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="w-100 text-start"
                />
              ))}
            </div>
          </Card>
          
          <Card title="Quick Actions" className="border-0 shadow-none">
            <Button
              variant="outline-secondary"
              size="sm"
              className="w-100 mb-2"
              onClick={() => {
                if (confirm('Reset all menu data to defaults?')) {
                  menuService.resetToDefaults()
                  loadCategories()
                  if (selectedCategory) {
                    loadItems(selectedCategory.id)
                  }
                  setSuccess(true)
                  setTimeout(() => setSuccess(false), 3000)
                }
              }}
            >
              🔄 Reset to Defaults
            </Button>
          </Card>
        </div>

        <div className="col-md-9">
          {selectedCategory ? (
            <>
              <Card
                title={`${selectedCategory.icon} ${selectedCategory.name} Items`}
                footer={
                  <Button
                    variant="primary"
                    onClick={() => {
                      resetForm()
                      setShowItemForm(true)
                    }}
                    icon="➕"
                  >
                    Add Item
                  </Button>
                }
              >
                {success && (
                  <Alert variant="success" dismissible onDismiss={() => setSuccess(false)}>
                    Item saved successfully!
                  </Alert>
                )}
                {error && (
                  <Alert variant="danger" dismissible onDismiss={() => setError(null)}>
                    {error}
                  </Alert>
                )}

                {showItemForm && (
                  <Card className="mb-4" title={editingItem ? 'Edit Item' : 'Add New Item'}>
                    <div className="row">
                      <div className="col-md-6">
                        <Input
                          label="Product ID"
                          name="id_pd"
                          value={formData.id_pd}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          label="Product Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Type</label>
                        <select
                          className="form-select"
                          name="Type"
                          value={formData.Type}
                          onChange={handleInputChange}
                        >
                          <option value="Ice">Ice</option>
                          <option value="Hot">Hot</option>
                          <option value="mix">Mix</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <Input
                          label="Price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleInputChange}
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <Input
                          label="Quantity"
                          name="quantity"
                          type="number"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          min="1"
                          required
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Button Style</label>
                        <select
                          className="form-select"
                          name="card"
                          value={formData.card}
                          onChange={handleInputChange}
                        >
                          <option value="btn-primary">Primary</option>
                          <option value="btn-danger">Danger</option>
                          <option value="btn-info">Info</option>
                          <option value="btn-success">Success</option>
                        </select>
                      </div>
                      <div className="col-md-12 mt-3">
                        <Button variant="success" onClick={handleSaveItem} className="me-2">
                          {editingItem ? 'Update' : 'Save'} Item
                        </Button>
                        <Button variant="secondary" onClick={resetForm}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center text-muted py-4">
                            No items found. Add your first item!
                          </td>
                        </tr>
                      ) : (
                        items.map(item => (
                          <tr key={item.id}>
                            <td>{item.id_pd}</td>
                            <td><strong>{item.name}</strong></td>
                            <td><Badge variant="secondary">{item.Type}</Badge></td>
                            <td>฿{item.price}</td>
                            <td>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditItem(item)}
                                className="me-2"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          ) : (
            <Card>
              <p className="text-muted">Select a category to manage items</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
