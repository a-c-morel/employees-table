import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa"

/*
 * This component is a data table. The user can select options to sort the table.
 * 
 */
function PaginatedReactTable ({tableTitle, headersArray, dataArray}) {

  const defaultData = [...dataArray]
  const defaultSelect = 10
  const defaultSearch = ""
  const defaultPage = 1
  const defaultSort = 0
  const defaultMaxPage = 1
  const defaultType = "alpha-order"
  const defaultFirstEntry = 0
  const defaultLastEntry = 0
  const defaultEntriesLength = dataArray.length
  const defaultColumn = 0
  
  const [filteredData, setFilteredData] = useState(defaultData)
  const [userSelect, setUserSelect] = useState(defaultSelect)
  const [searchValue, setSearchValue] = useState(defaultSearch)
  const [currentPage, setCurrentPage] = useState(defaultPage)
  const [sortBy, setSortBy] = useState(defaultSort)
  const [maxPage, setMaxPage] = useState(defaultMaxPage)
  const [type, setType] = useState(defaultType)
  const [firstEntry, setFirstEntry] = useState(defaultFirstEntry)
  const [lastEntry, setLastEntry] = useState(defaultLastEntry)
  const [entriesLength, setEntriesLength] = useState(defaultEntriesLength)
  const [column, setColumn] = useState(defaultColumn)

  const handlePerPageChange = (e) => {
    const selectedValue = e.target.value
    setUserSelect(selectedValue)
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
    const selectedValue = e.target.value
    setSearchValue(selectedValue)
    setCurrentPage(1)
  }

  const handleColumnBackground = (myHeader) => {
    const columnIndex = headersArray.indexOf(myHeader)
    setColumn(columnIndex)
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

  const pages = [];
  const handlePageClick = (page) => {
    setCurrentPage(page);
  }
  for (let i = 1; i <= maxPage; i++) {
    if (currentPage === i) {
      pages.push(<span key={i} className="paginated-react-table__page-number--current" onClick={() => handlePageClick(i)}>{currentPage}</span>);
    } else {
      pages.push(<span key={i} className="paginated-react-table__page-number" onClick={() => handlePageClick(i)}>{i}</span>);
    }
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

    const selectColumn = (myColumn, myArray) => {
      let myCells = myArray.map(row => {
        return Object.values(row)[myColumn]
      })
      return myCells
    }

    const determineMaxPage = (myLength, mySelect) => {
      const myMaxPage = Math.ceil(myLength / mySelect)
      return myMaxPage
    }

    let myMaxPage = determineMaxPage(dataArray.length, userSelect)
    setMaxPage(myMaxPage)

    let myFilteredData = filterBySearch(dataArray, searchValue)

    const determineFirstEntry = (mySelect, myCurrentPage) => {
      const calculateFirstEntry = ((myCurrentPage -1) * mySelect) +1
      return calculateFirstEntry
    }
  
    const determineLastEntry = (mySelect, myCurrentPage, myMaxEntry) => {
      const calculateLastEntry = myCurrentPage * mySelect
      if(calculateLastEntry > myMaxEntry) {
        return myMaxEntry
      }
      return calculateLastEntry
    }

    setFirstEntry(() => determineFirstEntry(userSelect, currentPage))
    setEntriesLength(myFilteredData.length)
    setLastEntry(() => determineLastEntry(userSelect, currentPage, entriesLength))
    
    myFilteredData = sortedByHeader(myFilteredData, sortBy, type)

    selectColumn(column, myFilteredData)

    myMaxPage = determineMaxPage(myFilteredData.length, userSelect)
    setMaxPage(myMaxPage)

    myFilteredData = paginatedBySelect(myFilteredData, userSelect, currentPage)

    setFilteredData(myFilteredData)

  }, [dataArray, searchValue, currentPage, userSelect, sortBy, headersArray, type, entriesLength, column])

  return (
    <div className='paginated-react-table__container'>
      <h1 className='paginated-react-table__title'>{tableTitle}</h1>
      <div className='paginated-react-table__options'>
        <div>
          <label>Show
              <select className='paginated-react-table__select' value={userSelect} onChange={handlePerPageChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>
            </div>
          <div>
          <label>Search:
            <input  className='paginated-react-table__search' type="search" value={searchValue} onChange={(e) => handleSearch(e)}/>
          </label>
        </div>
      </div>
      <table className='paginated-react-table__table'>
        <thead>
          <tr className='paginated-react-table__headers'>
            {headersArray.map((header, index) => {
                return <th key={header + index} scope="col" onClick={() => handleColumnBackground(header)}>{header} < FaRegArrowAltCircleDown className='paginated-react-table__sort-arrow paginated-react-table__sort-arrow--down' onClick={() => handleSortByDown(header)} />< FaRegArrowAltCircleUp className='paginated-react-table__sort-arrow' onClick={() => handleSortByUp(header)} /></th>
              }
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => {
            return (
              <tr className="paginated-react-table__line" key={index}>
                {Object.keys(data).map((key, index) => {
                  return <td key={index} className={
                    (column === index)
                      ? 'paginated-react-table__cell--selected-column'
                      : null
                  }>{data[key]}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='paginated-react-table__pagination'>
        <p>
          Showing {firstEntry} to {lastEntry} of {entriesLength} entries
        </p>
        <div>
          <button className='paginated-react-table__btn' onClick={handlePrevious}>Previous</button>
          {pages}
          <button className='paginated-react-table__btn' onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default PaginatedReactTable

PaginatedReactTable.propTypes = {
  tableTitle: PropTypes.string,
  headersArray: PropTypes.array,
  dataArray: PropTypes.array
}