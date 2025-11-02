'use client'

import { useState, useEffect } from 'react'
import { resetAPICheck } from '../lib/api'
import { useWebSocket } from '../hooks/useWebSocket'

export default function ApiStatusIndicator() {
  const [usingMock, setUsingMock] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const { isConnected: wsConnected } = useWebSocket()

  useEffect(() => {
    checkApiStatus()
    
    // Check API status periodically
    const interval = setInterval(checkApiStatus, 30000) // Check every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const checkApiStatus = async () => {
    setIsChecking(true)
    try {
      resetAPICheck() // Reset the check
      const response = await fetch('http://localhost:3001/api/showcart', {
        method: 'GET',
        signal: AbortSignal.timeout(2000),
      })
      setUsingMock(!response.ok)
    } catch (error) {
      setUsingMock(true)
    } finally {
      setIsChecking(false)
    }
  }

  if (!usingMock) return null

  return (
    <div className="alert alert-warning alert-dismissible fade show mb-0" role="alert" style={{ borderRadius: 0 }}>
      <div className="container d-flex align-items-center justify-content-between">
        <div>
          <strong>⚠️ Using Mock Data:</strong> Backend API is not available. All data is stored in browser localStorage and will persist across page refreshes.
          {wsConnected && (
            <span className="ms-2 text-success">
              <strong>✓ WebSocket Connected</strong> - Real-time updates enabled
            </span>
          )}
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-warning ms-3"
          onClick={checkApiStatus}
          disabled={isChecking}
        >
          {isChecking ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Checking...
            </>
          ) : (
            'Retry API'
          )}
        </button>
      </div>
    </div>
  )
}
