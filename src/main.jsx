import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-datepicker/dist/react-datepicker.css';
import "bootstrap/dist/css/bootstrap.min.css"
import './index.scss'

import TodayProvider from './provider/TodayProvider';
import WeekProvider from './provider/WeekProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodayProvider>
      <WeekProvider>
        <App />
      </WeekProvider>
    </TodayProvider>
  </React.StrictMode>,
)
