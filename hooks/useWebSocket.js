'use client'

import { useEffect, useState, useRef } from 'react'
import { wsService } from '../lib/websocket'

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const listenersRef = useRef([])

  useEffect(() => {
    // Connect if not already connected
    if (!wsService.isConnected()) {
      wsService.connect()
    }

    // Update connection status
    const updateConnectionStatus = () => {
      setIsConnected(wsService.isConnected())
    }

    // Listen for connection events
    const handleConnected = () => {
      setIsConnected(true)
    }

    const handleDisconnected = () => {
      setIsConnected(false)
    }

    const handleError = (error) => {
      console.error('WebSocket error:', error)
      setIsConnected(false)
    }

    wsService.on('connected', handleConnected)
    wsService.on('disconnected', handleDisconnected)
    wsService.on('error', handleError)

    updateConnectionStatus()

    return () => {
      wsService.off('connected', handleConnected)
      wsService.off('disconnected', handleDisconnected)
      wsService.off('error', handleError)
    }
  }, [])

  const send = (type, payload) => {
    return wsService.send(type, payload)
  }

  const subscribe = (event, callback) => {
    wsService.on(event, callback)
    
    // Store listener for cleanup
    const listener = { event, callback }
    listenersRef.current.push(listener)

    return () => {
      wsService.off(event, callback)
      const index = listenersRef.current.indexOf(listener)
      if (index > -1) {
        listenersRef.current.splice(index, 1)
      }
    }
  }

  useEffect(() => {
    // Cleanup listeners on unmount
    return () => {
      listenersRef.current.forEach(({ event, callback }) => {
        wsService.off(event, callback)
      })
      listenersRef.current = []
    }
  }, [])

  return {
    isConnected,
    send,
    subscribe,
    lastMessage,
  }
}

