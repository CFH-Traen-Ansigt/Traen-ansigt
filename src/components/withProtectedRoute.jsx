import React from 'react'
import ProtectedRoute from './components/ProtectedRoute'

export default function withProtectedRoute(Component) {
  return function ProtectedComponent(props) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    )
  }
}