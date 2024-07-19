import React,{useRef,useEffect} from 'react';
import './App.css';

import Footer from './components/Footer';
import Page from './components/Page';
import ErrorPage from './components/ErrorPage';
import Imprint from './components/Imprint';
import Menu from './components/Menu';
import Login from './components/Login'
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore'; 
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import { BrowserRouter as Router, Routes, Route, Link, createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { DEV_MODE } from './components/constants';
const routes = [
  {
    path: "/",
    element: 
    <Page/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/imprint",
    element: <Imprint/>
  },
  {
    path: "/menu",
    element:<Menu/>
  }]
const needAuth=["/","/menu"];

const router = createBrowserRouter(
  routes.map(({path,element})=>{
    return {
      path: path,
      errorElement: <ErrorPage />,
      element: (DEV_MODE && needAuth.findIndex(e=>e===path)>=0)? <RequireAuth fallbackPath='/login'>{element}</RequireAuth>:element
    }  
  })
)

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:' 
});

function App() {
  useEffect(()=>{
    document.title = 'Dream Baby Dream';
  },[])
  return (
    <AuthProvider store={store}>
    <div className="App">
      <div className='RouterWrapper'> 
      <RouterProvider router={router} />
      <Footer></Footer>
      </div>
    </div>
    </AuthProvider>
  );
}

export default App;
