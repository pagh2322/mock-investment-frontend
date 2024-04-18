import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PATH from './constants/path';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import StockPage from './pages/StockPage';
import ProfilePage from './pages/MyAccountPage';
import { SimulationContextProvider } from './context/simulation';
import { AuthContextProvider } from './context/auth';
import Global from './index.styles';
import SearchPage from './pages/SearchPage';

const App = () => {
  const AppProvider = ({ contexts, children }: { contexts: any, children: any }) => contexts.reduce(
    (prev: any, context: any) => React.createElement(context, {
      children: prev
    }),
    children
  );

  return (
    <>
      <Global />
      <AppProvider contexts={[SimulationContextProvider, AuthContextProvider]}>
        <Routes>
          <Route path={PATH.HOME} element={<MainPage />} />
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={`${PATH.STOCK}/:code`} element={<StockPage />} />
          <Route path={PATH.MY_ACCOUNT} element={<ProfilePage />} />
          <Route path={PATH.SEARCH} element={<SearchPage />} />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;
