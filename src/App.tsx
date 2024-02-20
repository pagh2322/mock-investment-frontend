import React from 'react';
import ReactECharts from 'echarts-for-react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PATH from './constants/path';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import StockPage from './pages/StockPage';

const App = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<MainPage />} />
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route path={`${PATH.STOCK}/:id`} element={<StockPage />} />
    </Routes>
  );
}

export default App;
