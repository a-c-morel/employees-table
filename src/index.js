import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import EmployeesTable from './EmployeesTable'
import { headersArray, dataArray } from './mockData'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <EmployeesTable headersArray={headersArray} dataArray={dataArray}/>
  </React.StrictMode>
)
