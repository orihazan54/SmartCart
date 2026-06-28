import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './contexts/StoreContext';
import { Landing } from './pages/Landing';
import { ShopList } from './pages/customer/ShopList';
import { StoreSelect } from './pages/customer/StoreSelect';
import { EmployeeLogin } from './pages/employee/EmployeeLogin';
import { ProductManager } from './pages/employee/ProductManager';
import { Dashboard } from './pages/manager/Dashboard';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/store-select" element={<StoreSelect />} />
            <Route path="/shop" element={<ShopList />} />
            <Route path="/employee/login" element={<EmployeeLogin />} />
            <Route path="/employee/admin" element={<ProductManager />} />
            <Route path="/manager" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </StoreProvider>
    </BrowserRouter>
  );
}
