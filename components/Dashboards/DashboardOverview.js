'use client'

import React, { useState, useEffect } from 'react'
import { useOrders } from '../../hooks/useOrders'
import { useExpenses } from '../../hooks/useExpenses'
import { Card } from '../atoms/Card'
import { Badge } from '../atoms/Badge'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function DashboardOverview() {
  const { orders, loading: ordersLoading, getIncomeByDate, getCountByDate } = useOrders()
  const { expenses, loading: expensesLoading, getTotalExpensesByDate } = useExpenses()
  
  const [selectedPeriod, setSelectedPeriod] = useState('today')

  // Calculate today's metrics
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const todayIncome = getIncomeByDate(today)
  const todayOrders = getCountByDate(today)
  const todayExpenses = getTotalExpensesByDate(today)
  const todayProfit = todayIncome - todayExpenses

  // Calculate overall metrics
  const totalIncome = orders.reduce((total, order) => total + (order.price || 0), 0)
  const totalOrders = orders.length
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + ((expense.price || 0) * (expense.quantity || 1))
  }, 0)
  const totalProfit = totalIncome - totalExpenses

  // Get last 7 days data for chart
  const getLast7DaysData = () => {
    const labels = []
    const incomeData = []
    const expensesData = []
    const profitData = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      labels.push(dateStr)
      
      incomeData.push(getIncomeByDate(date))
      expensesData.push(getTotalExpensesByDate(date))
      profitData.push(getIncomeByDate(date) - getTotalExpensesByDate(date))
    }

    return { labels, incomeData, expensesData, profitData }
  }

  const { labels, incomeData, expensesData, profitData } = getLast7DaysData()

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expensesData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Profit',
        data: profitData,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Last 7 Days Performance',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString('th-TH', { 
              style: 'currency', 
              currency: 'THB' 
            })}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '฿' + value.toLocaleString()
          }
        }
      }
    }
  }

  const loading = ordersLoading || expensesLoading

  return (
    <div className="col-12">
      <div className="container my-4">
        {/* Page Title */}
        <div className="mb-4">
          <h2 className="fw-bold">
            <span className="me-2">📊</span>
            Dashboard Overview
          </h2>
          <p className="text-muted">Monitor your POS system performance at a glance</p>
        </div>

        {/* Today's Summary Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-6 col-lg-3">
            <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 opacity-75">💰 Today's Income</h6>
                  <i className="fs-4">💰</i>
                </div>
                <h3 className="card-text mb-0 fw-bold">
                  {todayIncome.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                </h3>
                <small className="opacity-75">
                  {todayOrders} {todayOrders === 1 ? 'order' : 'orders'}
                </small>
              </div>
            </Card>
          </div>
          <div className="col-md-6 col-lg-3">
            <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 opacity-75">💸 Today's Expenses</h6>
                  <i className="fs-4">💸</i>
                </div>
                <h3 className="card-text mb-0 fw-bold">
                  {todayExpenses.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                </h3>
              </div>
            </Card>
          </div>
          <div className="col-md-6 col-lg-3">
            <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 opacity-75">📈 Today's Profit</h6>
                  <i className="fs-4">📈</i>
                </div>
                <h3 className="card-text mb-0 fw-bold">
                  {todayProfit.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                </h3>
                <small className={`${todayProfit >= 0 ? 'opacity-75' : 'text-warning'}`}>
                  {todayProfit >= 0 ? '✓ Positive' : '⚠ Negative'}
                </small>
              </div>
            </Card>
          </div>
          <div className="col-md-6 col-lg-3">
            <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="card-body text-white">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 opacity-75">📋 Today's Orders</h6>
                  <i className="fs-4">📋</i>
                </div>
                <h3 className="card-text mb-0 fw-bold">
                  {todayOrders.toLocaleString()}
                </h3>
              </div>
            </Card>
          </div>
        </div>

        {/* Overall Summary Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <Card className="border-0 shadow-sm h-100 bg-light">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 text-muted">Total Income</h6>
                  <Badge variant="success" className="fs-6">✓</Badge>
                </div>
                <h4 className="card-text mb-0 fw-bold text-success">
                  {totalIncome.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                </h4>
              </div>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="border-0 shadow-sm h-100 bg-light">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 text-muted">Total Expenses</h6>
                  <Badge variant="danger" className="fs-6">-</Badge>
                </div>
                <h4 className="card-text mb-0 fw-bold text-danger">
                  {totalExpenses.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                </h4>
              </div>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="border-0 shadow-sm h-100 bg-light">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 text-muted">Net Profit</h6>
                  <Badge variant={totalProfit >= 0 ? "success" : "warning"} className="fs-6">
                    {totalProfit >= 0 ? "✓" : "⚠"}
                  </Badge>
                </div>
                <h4 className={`card-text mb-0 fw-bold ${totalProfit >= 0 ? 'text-success' : 'text-warning'}`}>
                  {totalProfit.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                </h4>
              </div>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="border-0 shadow-sm h-100 bg-light">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="card-title mb-0 text-muted">Total Orders</h6>
                  <Badge variant="info" className="fs-6">{totalOrders}</Badge>
                </div>
                <h4 className="card-text mb-0 fw-bold text-primary">
                  {totalOrders.toLocaleString()}
                </h4>
              </div>
            </Card>
          </div>
        </div>

        {/* Chart Card */}
        <Card 
          title={
            <>
              <span className="me-2">📈</span>
              Performance Chart
            </>
          }
          className="mb-4"
        >
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2">Loading chart data...</p>
            </div>
          ) : (
            <div style={{ height: '400px', position: 'relative' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <div className="row g-3">
          <div className="col-md-6">
            <Card 
              title={
                <>
                  <span className="me-2">📋</span>
                  Recent Orders
                  {orders.length > 0 && (
                    <Badge variant="info" className="ms-2">{Math.min(5, orders.length)}</Badge>
                  )}
                </>
              }
            >
              {orders.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <p className="mb-0">No recent orders</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {orders.slice(-5).reverse().map((order, index) => (
                    <div key={order.id || index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{order.name}</strong>
                        <Badge variant="secondary" className="ms-2">{order.Type}</Badge>
                        <br />
                        <small className="text-muted">
                          {new Date(order.time).toLocaleString()}
                        </small>
                      </div>
                      <span className="fw-bold text-success">
                        {order.price?.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
          <div className="col-md-6">
            <Card 
              title={
                <>
                  <span className="me-2">💰</span>
                  Recent Expenses
                  {expenses.length > 0 && (
                    <Badge variant="danger" className="ms-2">{Math.min(5, expenses.length)}</Badge>
                  )}
                </>
              }
            >
              {expenses.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <p className="mb-0">No recent expenses</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {expenses.slice(-5).reverse().map((expense, index) => (
                    <div key={expense.id || index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{expense.Name_pd}</strong>
                        <Badge variant="secondary" className="ms-2">Qty: {expense.quantity}</Badge>
                        <br />
                        <small className="text-muted">
                          {new Date(expense.dt).toLocaleDateString()}
                        </small>
                      </div>
                      <span className="fw-bold text-danger">
                        {((expense.price || 0) * (expense.quantity || 1)).toLocaleString('th-TH', { 
                          style: 'currency', 
                          currency: 'THB' 
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

