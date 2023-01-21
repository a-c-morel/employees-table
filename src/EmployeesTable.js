import React, { useState } from 'react'

import { FaRegArrowAltCircleDown } from "react-icons/fa";

export default function EmployeesTable ({headersArray, dataArray}) {

  let myArray = dataArray.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)

  const defaultSelect = 10
  //const defaultSort = dataArray.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
  const defaultSearch = ""
  const defaultPage = 1

  const [userSelect, setUserSelect] = useState(defaultSelect)
  //const [data, setData] = useState(defaultSort)
  const [currentPage, setCurrentPage] = useState(defaultPage)
  const [searchValue, setSearchValue] = useState(defaultSearch)
  
  //je divise la length de l'array par le nombre sélectionné par l'utilisateur, et j'arrondis à l'entier sup.
  const maxPage = Math.ceil(myArray.length / userSelect)

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

  const filteredData = myArray.filter(data => 
    data.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.startDate.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.department.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.dateOfBirth.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.street.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.city.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.state.toLowerCase().includes(searchValue.toLowerCase()) ||
    data.zipCode.toLowerCase().includes(searchValue.toLowerCase())
  )

  /*on indique à partir de quel index jusqu'à quel autre index (exclus) on veut conserver les éléments du tableau:
  exemple je suis sur la page 3 avec le defaultSelect,
  ce serait donc filteredData.slice((3 - 1) * 10, 3 * 10)
  c'est à dire filteredData.slice(20, 30) : de l'index 20 à l'index 30 exclus*/
  let paginatedData = filteredData.slice((currentPage - 1) * userSelect, currentPage * userSelect)

  const sortAlphabetical = ( chosenHeader ) => {
    let myKey = headersArray.indexOf(chosenHeader.header)
    paginatedData.sort(function(a, b) {
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
  }

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
                  return <th key={header + index}>{header}< FaRegArrowAltCircleDown onClick={() => sortAlphabetical({header})} /></th>
                }
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((employee, index) => {
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
