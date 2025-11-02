'use client'

import './App.css'
import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useOrders } from '../hooks/useOrders'
import { Card } from './atoms/Card'
import { Badge } from './atoms/Badge'

export default function Tableorder() {
  const [selectedDate, setSelectedDate] = useState(null)
  
  const { orders, loading, getOrdersByDate, getIncomeByDate, getCountByDate } = useOrders()

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  // Get filtered orders based on selected date
  const filteredOrders = selectedDate ? getOrdersByDate(selectedDate) : orders
  const totalIncome = selectedDate ? getIncomeByDate(selectedDate) : orders.reduce((total, order) => total + (order.price || 0), 0)
  const totalCount = selectedDate ? getCountByDate(selectedDate) : orders.reduce((total, order) => total + (order.quantity || 0), 0)

  return (
    <div className="col-12">
      <div className="container my-4">
        {/* Summary Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 opacity-75">📅 Selected Date</h6>
                  <i className="fs-4">📅</i>
                </div>
                <h3 className="card-text mb-0 fw-bold">
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  }) : 'All Dates'}
                </h3>
              </div>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 opacity-75">📋 Total Orders</h6>
                  <i className="fs-4">📋</i>
                </div>
                <h3 className="card-text mb-0 fw-bold">
                  {totalCount.toLocaleString()}
                </h3>
              </div>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 opacity-75">💰 Total Income</h6>
                  <i className="fs-4">💰</i>
                </div>
                <h3 className="card-text mb-0 fw-bold">
                  {totalIncome.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                </h3>
              </div>
            </Card>
          </div>
        </div>

        {/* Orders Table Card */}
        <Card 
          title={
            <>
              <span className="me-2">📊</span>
              Order History
              {filteredOrders.length > 0 && (
                <Badge variant="info" className="ms-2">{filteredOrders.length} orders</Badge>
              )}
            </>
          }
        >
          {/* Date Filter */}
          <div className="mb-4">
            <label htmlFor="desiredDates" className="form-label fw-semibold">
              <i className="me-2">📅</i>
              Filter by Date:
            </label>
            <DatePicker
              id="desiredDates"
              className="form-control form-control-lg"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              isClearable
              placeholderText="Select a date or leave empty for all dates"
              wrapperClassName="w-100"
            />
          </div>

          {/* Orders Table */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <div className="display-1 mb-3">📭</div>
              <h5>No orders found</h5>
              <p className="mb-0">Try selecting a different date or check back later</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="fw-semibold">Item Name</th>
                    <th className="fw-semibold">Type</th>
                    <th className="fw-semibold text-center">Quantity</th>
                    <th className="fw-semibold text-end">Price</th>
                    <th className="fw-semibold">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order.id || index} className="transition-hover">
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" 
                               style={{ width: '36px', height: '36px' }}>
                            <span className="text-primary fw-bold">{index + 1}</span>
                          </div>
                          <strong className="text-dark">{order.name}</strong>
                        </div>
                      </td>
                      <td>
                        <Badge 
                          variant={
                            order.Type === 'Ice' ? 'info' :
                            order.Type === 'Hot' ? 'danger' :
                            order.Type === 'mix' ? 'warning' : 'secondary'
                          }
                          className="px-3 py-2"
                        >
                          {order.Type || 'N/A'}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-secondary-subtle text-dark px-3 py-2">
                          {order.quantity || 1}
                        </span>
                      </td>
                      <td className="text-end">
                        <span className="fw-bold text-success">
                          {order.price?.toLocaleString('th-TH', { 
                            style: 'currency', 
                            currency: 'THB' 
                          }) || '฿0'}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">
                          <i className="me-1">🕐</i>
                          {new Date(order.time).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light">
                  <tr>
                    <td colSpan="3" className="fw-bold text-end">Total Income:</td>
                    <td colSpan="2" className="text-end">
                      <span className="fs-5 fw-bold text-primary">
                        {totalIncome.toLocaleString('th-TH', { 
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
