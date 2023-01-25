import React, { useState, useEffect } from 'react'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa"

export default function PaginatedReactTable ({tableTitle, headersArray, dataArray}) {

  const defaultData = [...dataArray]
  const defaultSelect = 10
  const defaultSearch = ""
  const defaultPage = 1
  const defaultSort = 0
  const defaultMaxPage = 1
  const defaultType = "alpha-order"
  
  const [filteredData, setFilteredData] = useState(defaultData)
  const [userSelect, setUserSelect] = useState(defaultSelect)
  const [searchValue, setSearchValue] = useState(defaultSearch)
  const [currentPage, setCurrentPage] = useState(defaultPage)
  const [sortBy, setSortBy] = useState(defaultSort)
  const [maxPage, setMaxPage] = useState(defaultMaxPage)
  const [type, setType] = useState(defaultType)

  const handlePerPageChange = (e) => {
    setUserSelect(e.target.value)
    setCurrentPage(1)
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    setCurrentPage(1)
  }

  const handleSortByDown = (myHeader) => {
    const sortIndex = headersArray.indexOf(myHeader)
    setSortBy(sortIndex)
    setType("alpha-order")
  }

  const handleSortByUp = (myHeader) => {
    const sortIndex = headersArray.indexOf(myHeader)
    setSortBy(sortIndex)
    setType("non-alpha-order")
  }
  
  useEffect(() => {

    const filterBySearch = (myData, myString) => {
      if(!myString) {
        return myData
      }
      return myData.filter(data => {
        return Object.values(data).some(val => 
          val.toString().toLowerCase().includes(myString.toLowerCase())
        )
      })
    }

    const paginatedBySelect = (myData, mySelect, myCurrentPage) => {
      const paginatedBySelectResults = myData.slice((myCurrentPage - 1) * mySelect, myCurrentPage * mySelect)
      return paginatedBySelectResults
    }

    const testIsDate = (myString) => {
      let myObject = new Date(myString)
      if (Object.prototype.toString.call(myObject) === "[object Date]") {
        if (isNaN(myObject)) {
          return myString
        } else {
          return myObject
        }
      } else {
        return myString
      }
    }

    const sortedByHeader = (myData, chosenIndex, myType) => {
        const sortedByHeaderResults = myData.sort(function(a, b) {
          let firstValue = Object.values(a)[chosenIndex]
          let secondValue = Object.values(b)[chosenIndex]
          let testIsDateA = testIsDate(firstValue)
          let testIsDateB = testIsDate(secondValue)
          if (testIsDateA < testIsDateB) {
            return -1;
          }
          if (testIsDateA > testIsDateB) {
            return 1;
          }
          return 0
        })
        if (myType === "alpha-order") {
          return sortedByHeaderResults
        } else if (myType === "non-alpha-order") {
          return sortedByHeaderResults.reverse()
        }
    }

    const determineMaxPage = (myLength, mySelect) => {
      const myMaxPage = Math.ceil(myLength / mySelect)
      return myMaxPage
    }

    let myMaxPage = determineMaxPage(dataArray.length, userSelect)
    setMaxPage(myMaxPage)

    let myFilteredData = filterBySearch(dataArray, searchValue)

    myFilteredData = sortedByHeader(myFilteredData, sortBy, type)

    myMaxPage = determineMaxPage(myFilteredData.length, userSelect)
    setMaxPage(myMaxPage)

    myFilteredData = paginatedBySelect(myFilteredData, userSelect, currentPage)

    setFilteredData(myFilteredData)

  }, [dataArray, searchValue, currentPage, userSelect, sortBy, headersArray, type])

  return (
    <div className="paginated-react-table__container">
      <h1>{tableTitle}</h1>
      <div className="paginated-react-table__table-wrapper">
        <div className="paginated-react-table__options">
          <div>
            <label>Show
                <select value={userSelect} onChange={handlePerPageChange}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </label>
              </div>
            <div>
            <label>Search:
              <input type="search" value={searchValue} onChange={(e) => handleSearch(e)} className="" placeholder=""/>
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {headersArray.map((header, index) => {
                  return <th key={header + index}>{header}< FaRegArrowAltCircleDown onClick={() => handleSortByDown(header)} />< FaRegArrowAltCircleUp onClick={() => handleSortByUp(header)} /></th>
                }
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => {
              return (
                <tr key={index}>
                  {Object.keys(data).map((key, index) => {
                    return <td key={index} className='cell'>{data[key]}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
          </table>
          <div>
        <button className="paginated-react-table__btn" onClick={handlePrevious}>Previous</button>
        <span className="paginated-react-table__page-number">{currentPage}</span>
        <button className="paginated-react-table__btn" onClick={handleNext}>Next</button>
      </div>
    </div>
    </div>
  )
}
