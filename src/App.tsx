import { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import Cart from './components/cart/Cart';

import Checkout from './components/checkout/Checkout';

import ConfigureQuery from './components/general/ConfigureQuery';

import FetchAppData from './components/general/FetchAppData';

import NavBar from './components/general/NavBar';

import { processCookies } from './controllers/GeneralCtrl';

import IndexPage from './pages/IndexPage';

import LoginPage from './pages/LoginPage';

import PageNotFound from './pages/PageNotFound';

import ProductPage from './pages/ProductPage';

import SignupPage from './pages/SignupPage';

import "react-image-gallery/styles/css/image-gallery.css";


const App = () => {

  const location = useLocation()

  useEffect(() => { processCookies() }, []) // Queries user for permisission to use cookies

  return (

    <div className="App">

      <FetchAppData />

      <ConfigureQuery />

      <NavBar />

      <Routes location={location} key={location.pathname}>

        <Route path='/' element={<IndexPage />} />

        <Route path='/product' element={<ProductPage />} />

        <Route path='/login' element={<LoginPage />} />

        <Route path='/signup' element={<SignupPage />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <Cart />

      <Checkout />

    </div>

  )

}

export default App;
