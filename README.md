
# paginated-react-table

A React component that returns a table with a search input, sortable columns and customizable results per page.


## Installation

Install my-project with npm

```bash
  npm install paginated-react-table
```
    
## Usage/Examples

```javascript
import PaginatedReactTable from 'paginated-react-table'

const tableTitle = "Current Employees"
const headersArray = [
  'First Name', 
  'Last Name', 
  'Start Date', 
  'Department', 
  'Date of Birth', 
  'Street', 
  'City', 
  'State', 
  'Zip Code'
]
const dataArray = [
  {
    firstName: 'Larry', 
    lastName: 'Anderson', 
    startDate: '05/01/2020', 
    department: 'Human Resources', 
    dateOfBirth: '12/03/2001', 
    street: '4190 Woodside Circle', 
    city: 'Quincy', 
    state: 'FL', 
    zipCode: '32351'
  }, 
  {
    firstName: 'Simon', 
    lastName: 'Hornbeck', 
    startDate: '01/01/2018', 
    department: 'Legal', 
    dateOfBirth: '07/16/1999', 
    street: '3171 Cerullo Road', 
    city: 'Louisville', 
    state: 'KY', 
    zipCode: '40244'
  }, 
  { 
    firstName: 'Ashley', 
    lastName: 'Jones', 
    startDate: '09/14/2016', 
    department: 'Sales', 
    dateOfBirth: '09/03/1999', 
    street: '3931 Saints Alley', 
    city: 'Tampa', 
    state: 'FL', 
    zipCode: '33602'
  }
]

const App = () => {
  return (
    <PaginatedReactTable
      tableTitle={tableTitle}
      headersArray={headersArray}
      dataArray={dataArray}
    />
  )
}

export default App
```


## Props

| Prop | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `tableTitle` | `string` | **Required**. Title of the table |
| `headersArray` | `array of str` | **Required**. Array of strings that represents the headers of the table |
| `dataArray` | `array of str` | **Required**. Array of objects that represents the data of the table, each object should have keys that match the header names |

## Node version

This package requires Node.js version 16.16.0 or later.
## License

[MIT](https://choosealicense.com/licenses/mit/)

