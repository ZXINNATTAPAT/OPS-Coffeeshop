'use client'

import './App.css'
import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useOrders } from '../hooks/useOrders'
import { Card } from './atoms/Card'
import { Badge } from './atoms/Badge'

export default function Tableorder() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  
  const { orders, loading, getOrdersByDate, getIncomeByDate, getCountByDate } = useOrders()

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setCurrentPage(1) // Reset to first page when date changes
  }

  // Get filtered orders based on selected date
  const filteredOrders = selectedDate ? getOrdersByDate(selectedDate) : orders
  const totalIncome = selectedDate ? getIncomeByDate(selectedDate) : orders.reduce((total, order) => total + (order.price || 0), 0)
  const totalCount = selectedDate ? getCountByDate(selectedDate) : orders.reduce((total, order) => total + (order.quantity || 0), 0)

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  // Reset to page 1 when filtered orders change
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredOrders.length])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // In the middle
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

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
            <>
              {/* Items per page selector */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="itemsPerPage" className="form-label mb-0 text-muted">
                    แสดง:
                  </label>
                  <select
                    id="itemsPerPage"
                    className="form-select form-select-sm"
                    style={{ width: 'auto' }}
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={5}>5 รายการ</option>
                    <option value={10}>10 รายการ</option>
                    <option value={20}>20 รายการ</option>
                    <option value={50}>50 รายการ</option>
                    <option value={100}>100 รายการ</option>
                  </select>
                  <span className="text-muted small">
                    (แสดง {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} จาก {filteredOrders.length} รายการ)
                  </span>
                </div>
              </div>

              {/* Desktop Table View - Hidden on Mobile */}
              <div className="table-responsive d-none d-md-block">
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
                    {paginatedOrders.map((order, index) => (
                      <tr key={order.id || startIndex + index} className="transition-hover">
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" 
                                 style={{ width: '36px', height: '36px' }}>
                              <span className="text-primary fw-bold">{startIndex + index + 1}</span>
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

              {/* Mobile Card List View - Hidden on Desktop */}
              <div className="d-block d-md-none">
                <div className="row g-3">
                  {paginatedOrders.map((order, index) => (
                    <div key={order.id || startIndex + index} className="col-12">
                      <Card className="shadow-sm h-100">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="d-flex align-items-center flex-grow-1">
                              <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" 
                                   style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                                <span className="text-primary fw-bold">{startIndex + index + 1}</span>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="card-title mb-1 fw-bold">{order.name}</h6>
                                <Badge 
                                  variant={
                                    order.Type === 'Ice' ? 'info' :
                                    order.Type === 'Hot' ? 'danger' :
                                    order.Type === 'mix' ? 'warning' : 'secondary'
                                  }
                                  className="me-2"
                                >
                                  {order.Type || 'N/A'}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-end">
                              <span className="fs-5 fw-bold text-success">
                                {order.price?.toLocaleString('th-TH', { 
                                  style: 'currency', 
                                  currency: 'THB' 
                                }) || '฿0'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="row g-2 mt-2">
                            <div className="col-6">
                              <small className="text-muted d-block mb-1">จำนวน:</small>
                              <span className="badge bg-secondary-subtle text-dark px-3 py-2">
                                {order.quantity || 1} ชิ้น
                              </span>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block mb-1">วันที่:</small>
                              <small className="text-muted">
                                <i className="me-1">🕐</i>
                                {new Date(order.time).toLocaleString('th-TH', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </small>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Total Income Card for Mobile */}
                <Card className="shadow-sm mt-3 border-primary">
                  <div className="card-body text-center">
                    <small className="text-muted d-block mb-2">รวมรายได้ทั้งหมด</small>
                    <span className="fs-4 fw-bold text-primary">
                      {totalIncome.toLocaleString('th-TH', { 
                        style: 'currency', 
                        currency: 'THB' 
                      })}
                    </span>
                  </div>
                </Card>
              </div>

              {/* Pagination Bar */}
              {totalPages > 1 && (
                <nav aria-label="Order pagination" className="mt-4">
                  <ul className="pagination justify-content-center mb-0">
                    {/* Previous Button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          page === '...' ? 'disabled' : page === currentPage ? 'active' : ''
                        }`}
                      >
                        {page === '...' ? (
                          <span className="page-link">...</span>
                        ) : (
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                            aria-label={`Go to page ${page}`}
                            aria-current={page === currentPage ? 'page' : undefined}
                          >
                            {page}
                          </button>
                        )}
                      </li>
                    ))}

                    {/* Next Button */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                  
                  {/* Page Info */}
                  <div className="text-center mt-2 text-muted small">
                    หน้าที่ {currentPage} จาก {totalPages}
                  </div>
                </nav>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
