import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <div>
      <h1>Brand Studio Test</h1>
      <p>React is working!</p>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<App />)
}