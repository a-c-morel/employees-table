import React from 'react'
import ReactDOM from 'react-dom/client'
import PaginatedReactTable from './lib/PaginatedReactTable'
import { headersArray, dataArray, tableTitle } from './lib/mockData'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <PaginatedReactTable tableTitle={tableTitle} headersArray={headersArray} dataArray={dataArray}/>
  </React.StrictMode>
)
