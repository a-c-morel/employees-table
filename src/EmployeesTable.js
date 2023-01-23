import React, { useState, useEffect } from 'react'
import { FaRegArrowAltCircleDown } from "react-icons/fa";

export default function EmployeesTable ({headersArray, dataArray}) {

  const defaultData = [...dataArray]
  const defaultSelect = 10
  const defaultSearch = ""
  const defaultPage = 1
  const defaultSort = "First Name"
  const defaultMaxPage = 1
  
  const [filteredData, setFilteredData] = useState(defaultData)
  const [userSelect, setUserSelect] = useState(defaultSelect)
  const [searchValue, setSearchValue] = useState(defaultSearch)
  const [currentPage, setCurrentPage] = useState(defaultPage)
  const [sortBy, setSortBy] = useState(defaultSort)
  const [maxPage, setMaxPage] = useState(defaultMaxPage)

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
    console.log(currentPage, maxPage)
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    setCurrentPage(1)
  }

  useEffect(() => {

    const filterBySearch = (myData, myString) => {
      if(!myString) {
        return myData
      }
      const filteredBySearchResults = myData.filter(data => 
        data.firstName.toLowerCase().includes(myString.toLowerCase()) ||
        data.lastName.toLowerCase().includes(myString.toLowerCase()) ||
        data.startDate.toLowerCase().includes(myString.toLowerCase()) ||
        data.department.toLowerCase().includes(myString.toLowerCase()) ||
        data.dateOfBirth.toLowerCase().includes(myString.toLowerCase()) ||
        data.street.toLowerCase().includes(myString.toLowerCase()) ||
        data.city.toLowerCase().includes(myString.toLowerCase()) ||
        data.state.toLowerCase().includes(myString.toLowerCase()) ||
        data.zipCode.toLowerCase().includes(myString.toLowerCase()))
      return filteredBySearchResults
    }

    const paginatedBySelect = (myData, mySelect, myCurrentPage) => {
      const paginatedBySelectResults = myData.slice((myCurrentPage - 1) * mySelect, myCurrentPage * mySelect)
      return paginatedBySelectResults
    }

    /*const sortedByHeader = (myData, chosenHeader) => {
      let myKey = headersArray.indexOf(chosenHeader.header)
      const sortedByHeaderResults = myData.sort(function(a, b) {
        let firstValue = Object.values(a)[myKey].toUpperCase
        let secondValue = Object.values(b)[myKey].toUpperCase
        
        if (firstValue < secondValue) {
          return -1;
        }
        if (firstValue > secondValue) {
          return 1;
        }
        return 0
      })
      return sortedByHeaderResults
    }*/

    const determineMaxPage = (myLength, mySelect) => {
      const myMaxPage = Math.ceil(myLength / mySelect)
      console.log("my max page", myMaxPage)
      return myMaxPage
    }

    let myMaxPage = determineMaxPage(dataArray.length, userSelect)
    setMaxPage(myMaxPage)

    let myFilteredData = filterBySearch(dataArray, searchValue)
    console.log("after filter by search", myFilteredData)
    myMaxPage = determineMaxPage(myFilteredData.length, userSelect)
    setMaxPage(myMaxPage)
    myFilteredData = paginatedBySelect(myFilteredData, userSelect, currentPage)
    console.log("after paginating", myFilteredData)
    //myFilteredData = sortedByHeader(myFilteredData, sortBy)
    setFilteredData(myFilteredData)

  }, [dataArray, searchValue, currentPage, userSelect])

  return (
    <div className="employee-table__container">
      <h1>Current Employees</h1>
      <div className="employee-table__table-wrapper">
        <div className="employee-table__options">
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
              <input type="search" value={searchValue} onChange={(e) => handleSearch(e)} className="" placeholder="" aria-controls="employee-table"/>
            </label>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {headersArray.map((header, index) => {
                  return <th key={header + index}>{header}< FaRegArrowAltCircleDown onClick={() => setSortBy({header})} /></th>
                }
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employee, index) => {
              return <tr key={employee.firstName + index}>
                <td className='cell'>{employee.firstName}</td>
                <td className='cell'>{employee.lastName}</td>
                <td className='cell'>{employee.startDate}</td>
                <td className='cell'>{employee.department}</td>
                <td className='cell'>{employee.dateOfBirth}</td>
                <td className='cell'>{employee.street}</td>
                <td className='cell'>{employee.city}</td>
                <td className='cell'>{employee.state}</td>
                <td className='cell'>{employee.zipCode}</td>
              </tr>
            })}
          </tbody>
          </table>
          <div>
        <button className="employees-table__btn" onClick={handlePrevious}>Previous</button>
        <span className="employees-table__page-number">{currentPage}</span>
        <button className="employees-table__btn" onClick={handleNext}>Next</button>
      </div>
    </div>
    </div>
  )
}
