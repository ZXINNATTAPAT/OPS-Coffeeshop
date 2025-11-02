'use client'

import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useExpenses } from '../../hooks/useExpenses'
import { Card } from '../atoms/Card'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { Alert } from '../atoms/Alert'
import { Badge } from '../atoms/Badge'

export default function Dashmain() {
  const [selectedDate, setSelectedDate] = useState()
  const [formData, setFormData] = useState({
    id_pd: '',
    Name_pd: '',
    price: '',
    quantity: '1',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const { expenses, loading, error, addExpense, getExpensesByDate, getTotalExpensesByDate } = useExpenses()

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.id_pd || formData.id_pd.trim() === '') {
      newErrors.id_pd = 'Product ID is required'
    }

    if (!formData.Name_pd || formData.Name_pd.trim() === '') {
      newErrors.Name_pd = 'Product name is required'
    }

    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required'
    }

    if (!formData.quantity || isNaN(formData.quantity) || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Valid quantity is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)
    setSuccess(false)

    try {
      const expenseData = {
        id_pd: formData.id_pd.trim(),
        Name_pd: formData.Name_pd.trim(),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      }

      await addExpense(expenseData)

      // Reset form
      setFormData({
        id_pd: '',
        Name_pd: '',
        price: '',
        quantity: '1',
      })
      setErrors({})
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error submitting expense:', err)
    } finally {
      setSubmitting(false)
    }
  }

  // Get filtered data based on selected date
  const tableData = selectedDate ? getExpensesByDate(selectedDate) : expenses
  const sum = selectedDate ? getTotalExpensesByDate(selectedDate) : getTotalExpensesByDate(null)

  return (
    <div className="col-12">
      <div className="container my-4">
        {/* Summary Card */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 opacity-75">💰 Total Expenses</h6>
                  <i className="fs-4">💰</i>
                </div>
                <h3 className="card-text mb-0 fw-bold">
                  {sum.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                </h3>
              </div>
            </Card>
          </div>
          <div className="col-md-6">
            <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 opacity-75">📊 Total Items</h6>
                  <i className="fs-4">📊</i>
                </div>
                <h3 className="card-text mb-0 fw-bold">
                  {tableData.length.toLocaleString()} items
                </h3>
              </div>
            </Card>
          </div>
        </div>

        {/* Insert Expense Form Card */}
        <Card 
          title={
            <>
              <span className="me-2">💸</span>
              Insert Expense
            </>
          }
          className="mb-4"
        >
          {success && (
            <Alert variant="success" dismissible onDismiss={() => setSuccess(false)} className="mb-3">
              <strong>✅ Success!</strong> Expense added successfully!
            </Alert>
          )}

          {error && (
            <Alert variant="danger" dismissible onDismiss={() => setError(null)} className="mb-3">
              <strong>❌ Error!</strong> {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className='row g-3'>
              <div className="col-md-6 col-lg-3">
                <label htmlFor="id_pd" className="form-label fw-semibold">
                  <i className="me-1">🏷️</i>
                  Product ID
                </label>
                <Input
                  type="text"
                  id="id_pd"
                  name="id_pd"
                  placeholder='Enter Product ID'
                  value={formData.id_pd}
                  onChange={handleChange}
                  className={errors.id_pd ? 'is-invalid' : ''}
                  required
                />
                {errors.id_pd && <div className="invalid-feedback">{errors.id_pd}</div>}
              </div>
              <div className="col-md-6 col-lg-3">
                <label htmlFor="Name_pd" className="form-label fw-semibold">
                  <i className="me-1">📦</i>
                  Product Name
                </label>
                <Input
                  type="text"
                  id="Name_pd"
                  name="Name_pd"
                  value={formData.Name_pd}
                  onChange={handleChange}
                  placeholder='Enter Product Name'
                  className={errors.Name_pd ? 'is-invalid' : ''}
                  required
                />
                {errors.Name_pd && <div className="invalid-feedback">{errors.Name_pd}</div>}
              </div>
              <div className="col-md-6 col-lg-2">
                <label htmlFor="price" className="form-label fw-semibold">
                  <i className="me-1">💵</i>
                  Price
                </label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  placeholder='0.00'
                  value={formData.price}
                  onChange={handleChange}
                  className={errors.price ? 'is-invalid' : ''}
                  step="0.01"
                  min="0"
                  required
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>
              <div className="col-md-6 col-lg-2">
                <label htmlFor="quantity" className="form-label fw-semibold">
                  <i className="me-1">🔢</i>
                  Quantity
                </label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder='1'
                  value={formData.quantity}
                  onChange={handleChange}
                  className={errors.quantity ? 'is-invalid' : ''}
                  min="1"
                  required
                />
                {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
              </div>
              <div className='col-md-12 col-lg-2 d-flex align-items-end'>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={submitting || loading}
                  loading={submitting}
                  icon={submitting ? null : "✅"}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
        {/* Expenses Table Card */}
        <Card 
          title={
            <>
              <span className="me-2">📋</span>
              Expense History
              {tableData.length > 0 && (
                <Badge variant="danger" className="ms-2">{tableData.length} expenses</Badge>
              )}
            </>
          }
        >
          {/* Date Filter */}
          <div className="mb-4">
            <label htmlFor="datePicker" className="form-label fw-semibold">
              <i className="me-2">📅</i>
              Filter by Date:
            </label>
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              onChange={handleDateChange}
              className="form-control form-control-lg"
              dateFormat="yyyy-MM-dd"
              isClearable
              placeholderText="Select a date or leave empty for all dates"
              wrapperClassName="w-100"
            />
          </div>

          {/* Expenses Table */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2">Loading expenses...</p>
            </div>
          ) : tableData.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <div className="display-1 mb-3">💰</div>
              <h5>No expenses found</h5>
              <p className="mb-0">Try selecting a different date or add your first expense above</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fw-semibold">Product Name</th>
                    <th className="fw-semibold text-end">Price</th>
                    <th className="fw-semibold text-center">Quantity</th>
                    <th className="fw-semibold text-end">Total</th>
                    <th className="fw-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={row.id || index} className="transition-hover">
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" 
                               style={{ width: '36px', height: '36px' }}>
                            <span className="text-danger fw-bold">{index + 1}</span>
                          </div>
                          <strong className="text-dark">{row.Name_pd}</strong>
                        </div>
                      </td>
                      <td className="text-end">
                        <span className="text-muted">
                          {row.price?.toLocaleString('th-TH', { 
                            style: 'currency', 
                            currency: 'THB' 
                          }) || '฿0'}
                        </span>
                      </td>
                      <td className="text-center">
                        <Badge variant="secondary" className="px-3 py-2">
                          {row.quantity || 1}
                        </Badge>
                      </td>
                      <td className="text-end">
                        <span className="fw-bold text-danger">
                          {((row.price || 0) * (row.quantity || 0)).toLocaleString('th-TH', { 
                            style: 'currency', 
                            currency: 'THB' 
                          })}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">
                          <i className="me-1">🕐</i>
                          {new Date(row.dt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light">
                  <tr>
                    <td colSpan="3" className="fw-bold text-end">Total Expenses:</td>
                    <td colSpan="2" className="text-end">
                      <span className="fs-5 fw-bold text-danger">
                        {sum.toLocaleString('th-TH', { 
                          style: 'currency', 
                          currency: 'THB' 
                        })}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
