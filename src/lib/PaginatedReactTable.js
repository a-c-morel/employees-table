import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './paginated-react-table.css'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa'

/**
 * This component is a data table. The user can select options to sort the table.
 * @param { string } tableTitle - title for the table
 * @param { array } headersArray - data for the table headers
 * @param { array } dataArray - data for the table rows
 */
function PaginatedReactTable({ tableTitle, headersArray, dataArray }) {
  /* STATE MANAGEMENT */

  // Initializing the state values
  const defaultData = () => {
    if(dataArray === null) {
      return null
    }
    else {
      return [...dataArray]
    }
  }
  const defaultSelect = 10
  const defaultSearch = ''
  const defaultPage = 1
  const defaultSort = 0
  const defaultMaxPage = 1
  const defaultType = 'alpha-order'
  const defaultFirstEntry = 0
  const defaultLastEntry = 0
  const defaultEntriesLength = () => {
    if(dataArray === null) {
      return 0
    } else {
      return dataArray.length
    }
  }
  const defaultColumn = 0
  const defaultPagesNums = []
  
  // initial state
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
  const [pagesNums, setPagesNums] = useState(defaultPagesNums)

  /* HANDLING EVENTS */

  // triggered by selecting an option
  const handlePerPageChange = (e) => {
    const selectedValue = e.target.value
    setUserSelect(selectedValue)
    setCurrentPage(1)
  }

  // triggered by clicking on previous btn
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // triggered by clicking on next btn
  const handleNext = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  // triggered by typing in search input
  const handleSearch = (e) => {
    const selectedValue = e.target.value
    setSearchValue(selectedValue)
    setCurrentPage(1)
  }

  // triggered by clicking inside a column header
  const handleColumnBackground = (myHeader) => {
    const columnIndex = headersArray.indexOf(myHeader)
    setColumn(columnIndex)
  }

  // triggered by clicking on down arrow inside of a header
  const handleSortByDown = (myHeader) => {
    const sortIndex = headersArray.indexOf(myHeader)
    setSortBy(sortIndex)
    setType('alpha-order')
  }

  // triggered by clicking on down arrow inside of a header
  const handleSortByUp = (myHeader) => {
    const sortIndex = headersArray.indexOf(myHeader)
    setSortBy(sortIndex)
    setType('non-alpha-order')
  }

  // triggered by clicking on a page number
  const handlePageClick = (page) => {
    setCurrentPage(page)
  }
  
  /* UPDATING TABLE WHEN EVENT OCCURRED */

  useEffect(() => {

    if(dataArray === null) {
      return
    } else {
        /**
             * Returns either the provided array (if no match found), either an array of objects containing searched value
             * @param {Array.<Object>} myData 
             * @param {string} myString - value entered by user inside search input
             * @returns {Array.<Object>}
             */
        const filterBySearch = (myData, myString) => {
          if (!myString) {
            return myData
          }
          return myData.filter((data) => {
            return Object.values(data).some((val) =>
              val.toString().toLowerCase().includes(myString.toLowerCase())
            )
          })
        }

        /**
         * Returns an array containing data for the current page
         * @param {Array.<Object>} myData 
         * @param {number} mySelect - the number of elements to display per page, selected by user
         * @param {number} myCurrentPage - current page number
         * @returns {Array.<Object>}
         */
        const paginatedBySelect = (myData, mySelect, myCurrentPage) => {
          const paginatedBySelectResults = myData.slice(
            (myCurrentPage - 1) * mySelect,
            myCurrentPage * mySelect
          )
          return paginatedBySelectResults
        }

        /**
         * Returns either a date object or the provided string
         * @param {string} myString - the content of a table cell
         * @returns {(Date|string)}
         */
        const testIsDate = (myString) => {
          const myObject = new Date(myString)
          if (Object.prototype.toString.call(myObject) === '[object Date]') {
            if (isNaN(myObject)) {
              return myString
            } else {
              return myObject
            }
          } else {
            return myString
          }
        }

        /**
         * Returns an array with data sorted ASC or DESC, depending on the properties chosen by user
         * (it sorts the column below chosen header)
         * @param {Array.<Object>} myData 
         * @param {number} chosenIndex - index of chosen header inside headersArray
         * @param {string} myType - ASC or DESC sort
         * @returns {Array.<Object>}
         */
        const sortedByHeader = (myData, chosenIndex, myType) => {
          const sortedByHeaderResults = myData.sort(function (a, b) {
            const firstValue = Object.values(a)[chosenIndex]
            const secondValue = Object.values(b)[chosenIndex]
            const testIsDateA = testIsDate(firstValue)
            const testIsDateB = testIsDate(secondValue)
            if (testIsDateA < testIsDateB) {
              return -1
            }
            if (testIsDateA > testIsDateB) {
              return 1
            }
            return 0
          })
          if (myType === 'alpha-order') {
            return sortedByHeaderResults
          } else if (myType === 'non-alpha-order') {
            return sortedByHeaderResults.reverse()
          }
        }

        /**
         * Returns an array containing the values of the cells that will be styled to visualize the column that triggered the sorting process
         * @param {number} myColumn - index of the selected column
         * @param {Array.<Object>} myData
         * @returns {Array}
         */
        const selectColumn = (myColumn, myData) => {
          const myCells = myData.map((row) => {
            return Object.values(row)[myColumn]
          })
          return myCells
        }

        /**
         * Returns the max page number
         * @param {number} myLength - length of the data array
         * @param {number} mySelect - the number of elements to display per page, selected by user
         * @returns {number}
         */
        const determineMaxPage = (myLength, mySelect) => {
          const myMaxPage = Math.ceil(myLength / mySelect)
          return myMaxPage
        }

        /**
         * Returns an array of span elements reprensenting pages numbers, and adds a class name for the span containing the current page number for styling.
         * @param {number} myMaxPage - the max page number
         * @param {number} myCurrentPage - current page number
         * @returns {Array.<ReactElement>}
         */
        const determinePageNums = (myMaxPage, myCurrentPage) => {
          const updatedPages = []
          for (let i = 1; i <= myMaxPage; i++) {
            if (myCurrentPage === i) {
              updatedPages.push(
                <span
                  key={i}
                  className='paginated-react-table__page-number--current'
                  onClick={() => handlePageClick(i)}
                >
                  {myCurrentPage}
                </span>
              )
            } else {
              updatedPages.push(
                <span
                  key={i}
                  className='paginated-react-table__page-number'
                  onClick={() => handlePageClick(i)}
                >
                  {i}
                </span>
              )
            }
          }
          return updatedPages
        }

        let myMaxPage = determineMaxPage(dataArray.length, userSelect)
        setMaxPage(myMaxPage)

        let myFilteredData = filterBySearch(dataArray, searchValue)

        /**
         * Returns the rank of the first entry of the current page
         * @param {number} mySelect - the number of elements to display per page, selected by user
         * @param {number} myCurrentPage - current page number
         * @returns {number}
         */
        const determineFirstEntry = (mySelect, myCurrentPage) => {
          const calculateFirstEntry = (myCurrentPage - 1) * mySelect + 1
          return calculateFirstEntry
        }

        /**
         * Returns the rank of the last entry of the current page
         * @param {number} mySelect - the number of elements to display per page, selected by user
         * @param {number} myCurrentPage - current page number
         * @param {number} myMaxEntry - length of the data array
         * @returns {number}
         */
        const determineLastEntry = (mySelect, myCurrentPage, myMaxEntry) => {
          const calculateLastEntry = myCurrentPage * mySelect
          if (calculateLastEntry > myMaxEntry) {
            return myMaxEntry
          }
          return calculateLastEntry
        }

        setFirstEntry(() => determineFirstEntry(userSelect, currentPage))
        setEntriesLength(myFilteredData.length)
        setLastEntry(() => 
          determineLastEntry(userSelect, currentPage, entriesLength)
        )

        myFilteredData = sortedByHeader(myFilteredData, sortBy, type)

        selectColumn(column, myFilteredData)

        myMaxPage = determineMaxPage(myFilteredData.length, userSelect)
        setMaxPage(myMaxPage)

        myFilteredData = paginatedBySelect(myFilteredData, userSelect, currentPage)

        setFilteredData(myFilteredData)

        const myPagesNums = determinePageNums(maxPage, currentPage)
        setPagesNums(myPagesNums)
    }
  }, [
    dataArray,
    searchValue,
    currentPage,
    userSelect,
    sortBy,
    headersArray,
    type,
    entriesLength,
    column,
    maxPage
  ])

  return (dataArray === null) ? (
    <div className='paginated-react-table__container'>
        <h1 className='paginated-react-table__title'>{tableTitle}</h1>
        <div className='paginated-react-table__options'>
            <div>
                <label>
                    Show
                </label>
                <select
                    className='paginated-react-table__select'
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
              	    <option value={50}>50</option>
              	    <option value={100}>100</option>
                </select>
	    </div>
            <div>
                <label htmlFor='Search'>
                    Search:
                </label>
                <input
                    className='paginated-react-table__search'
                    type='text'
                    id='Search'
                />
            </div>
	</div>
        <table className='paginated-react-table__table'>
            <thead>
                <tr className='paginated-react-table__headers'>
                    {
                        headersArray.map((header, index) => 
                            <th
                                className='paginated-react-table__header'
                                key={header + index}
                                scope='col'
                            >
                                {header}
                                <FaRegArrowAltCircleDown className='paginated-react-table__sort-arrow paginated-react-table__sort-arrow--down' />
                                <FaRegArrowAltCircleUp className='paginated-react-table__sort-arrow' />
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody className='paginated-react-table__body'>
                <tr className="paginated-react-table__line">
                    <td className='paginated-react-table__cell paginated-react-table__cell--no-data' colSpan="9">
                        No data available in table
                    </td>
                </tr>
            </tbody>
        </table>
        <div className='paginated-react-table__pagination'>
            <p>
                Showing 0 to 0 of 0 entries
            </p>
            <div className='paginated-react-table__btns'>
                <div className='paginated-react-table__btn--disable'>Previous</div>
                <div className='paginated-react-table__btn--disable'>Next</div>
            </div>
        </div>
    </div>
    ) : (
        <div className='paginated-react-table__container'>
      <h1 className='paginated-react-table__title'>{tableTitle}</h1>
      <div className='paginated-react-table__options'>
        <div>
          <label>
            Show
            <select
              className='paginated-react-table__select'
              value={userSelect}
              onChange={handlePerPageChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Search:
            <input
              className='paginated-react-table__search'
              type='search'
              value={searchValue}
              onChange={(e) => handleSearch(e)}
            />
          </label>
        </div>
      </div>
      <table className='paginated-react-table__table'>
        <thead>
          <tr className='paginated-react-table__headers'>
            {
              headersArray.map((header, index) => 
                <th
                  className='paginated-react-table__header'
                  key={header + index}
                  scope='col'
                  onClick={() =>
                    handleColumnBackground(header)
                  }
                >
                  {header}
                  <FaRegArrowAltCircleDown
                    className='paginated-react-table__sort-arrow paginated-react-table__sort-arrow--down'
                    onClick={() =>
                      handleSortByDown(header)
                    }
                  />
                  <FaRegArrowAltCircleUp
                    className='paginated-react-table__sort-arrow'
                    onClick={() => 
                      handleSortByUp(header)}
                  />
                </th>
              )
            }
          </tr>
        </thead>
        <tbody className='paginated-react-table__body'>
          {filteredData.map((data, index) => {
            return (
              <tr className="paginated-react-table__line" key={index}>
                {
                  Object.keys(data).map((key, index) => 
                    <td key={index} className={
                      (column === index)
                        ? 'paginated-react-table__cell paginated-react-table__cell--selected-column'
                        : 'paginated-react-table__cell'
                    }>{data[key]}</td>
                  )
                }
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
          {pagesNums}
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