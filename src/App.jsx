import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import InvoiceGenerator from './pages/InvoiceGenerator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice-generator" element={<InvoiceGenerator />} />
      </Routes>
    </Router>
  )
}

export default App