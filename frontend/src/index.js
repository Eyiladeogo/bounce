import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js'
import App from './App';
import Saved from './components/Saved';
import Cart from './components/Cart';
import Shop from './components/Shop';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/saved",
    element: <Saved />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  // {
  //   path: "/sign-in",
  //   element: <SignInModal />,
  // },
  {
    path: "/shop",
    element: <Shop />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
