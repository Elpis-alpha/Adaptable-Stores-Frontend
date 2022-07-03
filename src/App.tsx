import { useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/general/NavBar';

import { processCookies } from './controllers/GeneralCtrl';

import IndexPage from './pages/IndexPage';

import LoginPage from './pages/LoginPage';

import PageNotFound from './pages/PageNotFound';

import ProductPage from './pages/ProductPage';

import SignupPage from './pages/SignupPage';


const App = () => {

  const location = useLocation()

  useEffect(() => { processCookies() }, []) // Queries user for permisission to use cookies

  return (

    <div className="App">

      <NavBar />

      <Routes location={location} key={location.pathname}>

        <Route path='/' element={<IndexPage />} />

        <Route path='/product' element={<ProductPage />} />

        <Route path='/login' element={<LoginPage />} />

        <Route path='/signup' element={<SignupPage />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

    </div>

  )

}

export default App;
