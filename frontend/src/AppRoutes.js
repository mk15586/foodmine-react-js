import React from 'react'

import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import FoodPage from './pages/Food/FoodPage'
import CartPage from './pages/Cart/CartPage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import AuthRoute from './components/AuthRoute/AuthRoute'
import CheckoutPage from './pages/Checkout/CheckoutPage'
import PaymentPage from './pages/Payment/PaymentPage'
import OrderTrackPage from './pages/OrderTrack/OrderTrackPage'

export default function AppRoutes() {
  return (
    <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/search/:searchTerm" element={<HomePage />} />
         <Route path="/tag/:tag" element={<HomePage />} />
         <Route path="/food/:id" element={<FoodPage />} />
         <Route path="/Cart" element={<CartPage />} />
         <Route path="/login" element={<LoginPage/>} />
         <Route path="/register" element={<RegisterPage/>} />
         <Route 
           path="/checkout"
            element={
            <AuthRoute>
             <CheckoutPage/>
            </AuthRoute>
          } 
      />
          <Route 
           path="/payment"
            element={
            <AuthRoute>
             <PaymentPage/>
            </AuthRoute>
          } 
      />

          <Route 
           path="/track/:orderID"
            element={
            <AuthRoute>
             <OrderTrackPage/>
            </AuthRoute>
          } 
      />
         
    </Routes>
  )
}