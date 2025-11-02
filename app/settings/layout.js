'use client'

import Link from 'next/link'

export default function SettingsLayout({ children }) {
  return (
    <div className="pos-app">
      <div className="container-fluid px-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link href="/" className="navbar-brand mb-0 fw-bold text-decoration-none">
              ⚙️ Menu Settings
            </Link>
            <Link href="/" className="btn btn-outline-light btn-sm text-decoration-none">
              ← Back to POS
            </Link>
          </div>
        </nav>
        {children}
      </div>
    </div>
  )
}
