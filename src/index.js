import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PaginatedReactTable from './PaginatedReactTable'
import { headersArray, dataArray, tableTitle } from './mockData'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <PaginatedReactTable tableTitle={tableTitle} headersArray={headersArray} dataArray={dataArray}/>
  </React.StrictMode>
)
