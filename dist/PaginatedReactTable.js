"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));
var _react = _interopRequireWildcard(require("react"));
require("./paginated-react-table.css");
var _fa = require("react-icons/fa");
/**
 * This component is a data table. The user can select options to sort the table.
 * @param { string } tableTitle - title for the table
 * @param { array } headersArray - data for the table headers
 * @param { array } dataArray - data for the table rows
 */
function PaginatedReactTable(_ref) {
  var tableTitle = _ref.tableTitle,
    headersArray = _ref.headersArray,
    dataArray = _ref.dataArray;
  /* STATE MANAGEMENT */

  // Initializing the state values
  var defaultData = function defaultData() {
    if (dataArray === null) {
      return null;
    } else {
      return (0, _toConsumableArray2.default)(dataArray);
    }
  };
  var defaultSelect = 10;
  var defaultSearch = '';
  var defaultPage = 1;
  var defaultSort = 0;
  var defaultMaxPage = 1;
  var defaultType = 'alpha-order';
  var defaultFirstEntry = 0;
  var defaultLastEntry = 0;
  var defaultEntriesLength = function defaultEntriesLength() {
    if (dataArray === null) {
      return 0;
    } else {
      return dataArray.length;
    }
  };
  var defaultColumn = 0;
  var defaultPagesNums = [];

  // initial state
  var _useState = (0, _react.useState)(defaultData),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    filteredData = _useState2[0],
    setFilteredData = _useState2[1];
  var _useState3 = (0, _react.useState)(defaultSelect),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    userSelect = _useState4[0],
    setUserSelect = _useState4[1];
  var _useState5 = (0, _react.useState)(defaultSearch),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    searchValue = _useState6[0],
    setSearchValue = _useState6[1];
  var _useState7 = (0, _react.useState)(defaultPage),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    currentPage = _useState8[0],
    setCurrentPage = _useState8[1];
  var _useState9 = (0, _react.useState)(defaultSort),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    sortBy = _useState10[0],
    setSortBy = _useState10[1];
  var _useState11 = (0, _react.useState)(defaultMaxPage),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    maxPage = _useState12[0],
    setMaxPage = _useState12[1];
  var _useState13 = (0, _react.useState)(defaultType),
    _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
    type = _useState14[0],
    setType = _useState14[1];
  var _useState15 = (0, _react.useState)(defaultFirstEntry),
    _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
    firstEntry = _useState16[0],
    setFirstEntry = _useState16[1];
  var _useState17 = (0, _react.useState)(defaultLastEntry),
    _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
    lastEntry = _useState18[0],
    setLastEntry = _useState18[1];
  var _useState19 = (0, _react.useState)(defaultEntriesLength),
    _useState20 = (0, _slicedToArray2.default)(_useState19, 2),
    entriesLength = _useState20[0],
    setEntriesLength = _useState20[1];
  var _useState21 = (0, _react.useState)(defaultColumn),
    _useState22 = (0, _slicedToArray2.default)(_useState21, 2),
    column = _useState22[0],
    setColumn = _useState22[1];
  var _useState23 = (0, _react.useState)(defaultPagesNums),
    _useState24 = (0, _slicedToArray2.default)(_useState23, 2),
    pagesNums = _useState24[0],
    setPagesNums = _useState24[1];

  /* HANDLING EVENTS */

  // triggered by selecting an option
  var handlePerPageChange = function handlePerPageChange(e) {
    var selectedValue = e.target.value;
    setUserSelect(selectedValue);
    setCurrentPage(1);
  };

  // triggered by clicking on previous btn
  var handlePrevious = function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // triggered by clicking on next btn
  var handleNext = function handleNext() {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // triggered by typing in search input
  var handleSearch = function handleSearch(e) {
    var selectedValue = e.target.value;
    setSearchValue(selectedValue);
    setCurrentPage(1);
  };

  // triggered by clicking inside a column header
  var handleColumnBackground = function handleColumnBackground(myHeader) {
    var columnIndex = headersArray.indexOf(myHeader);
    setColumn(columnIndex);
  };

  // triggered by clicking on down arrow inside of a header
  var handleSortByDown = function handleSortByDown(myHeader) {
    var sortIndex = headersArray.indexOf(myHeader);
    setSortBy(sortIndex);
    setType('alpha-order');
  };

  // triggered by clicking on down arrow inside of a header
  var handleSortByUp = function handleSortByUp(myHeader) {
    var sortIndex = headersArray.indexOf(myHeader);
    setSortBy(sortIndex);
    setType('non-alpha-order');
  };

  // triggered by clicking on a page number
  var handlePageClick = function handlePageClick(page) {
    setCurrentPage(page);
  };

  /* UPDATING TABLE WHEN EVENT OCCURRED */

  (0, _react.useEffect)(function () {
    if (dataArray === null) {
      return;
    } else {
      /**
           * Returns either the provided array (if no match found), either an array of objects containing searched value
           * @param {Array.<Object>} myData 
           * @param {string} myString - value entered by user inside search input
           * @returns {Array.<Object>}
           */
      var filterBySearch = function filterBySearch(myData, myString) {
        if (!myString) {
          return myData;
        }
        return myData.filter(function (data) {
          return Object.values(data).some(function (val) {
            return val.toString().toLowerCase().includes(myString.toLowerCase());
          });
        });
      };

      /**
       * Returns an array containing data for the current page
       * @param {Array.<Object>} myData 
       * @param {number} mySelect - the number of elements to display per page, selected by user
       * @param {number} myCurrentPage - current page number
       * @returns {Array.<Object>}
       */
      var paginatedBySelect = function paginatedBySelect(myData, mySelect, myCurrentPage) {
        var paginatedBySelectResults = myData.slice((myCurrentPage - 1) * mySelect, myCurrentPage * mySelect);
        return paginatedBySelectResults;
      };

      /**
       * Returns either a date object or the provided string
       * @param {string} myString - the content of a table cell
       * @returns {(Date|string)}
       */
      var testIsDate = function testIsDate(myString) {
        var myObject = new Date(myString);
        if (Object.prototype.toString.call(myObject) === '[object Date]') {
          if (isNaN(myObject)) {
            return myString;
          } else {
            return myObject;
          }
        } else {
          return myString;
        }
      };

      /**
       * Returns an array with data sorted ASC or DESC, depending on the properties chosen by user
       * (it sorts the column below chosen header)
       * @param {Array.<Object>} myData 
       * @param {number} chosenIndex - index of chosen header inside headersArray
       * @param {string} myType - ASC or DESC sort
       * @returns {Array.<Object>}
       */
      var sortedByHeader = function sortedByHeader(myData, chosenIndex, myType) {
        var sortedByHeaderResults = myData.sort(function (a, b) {
          var firstValue = Object.values(a)[chosenIndex];
          var secondValue = Object.values(b)[chosenIndex];
          var testIsDateA = testIsDate(firstValue);
          var testIsDateB = testIsDate(secondValue);
          if (testIsDateA < testIsDateB) {
            return -1;
          }
          if (testIsDateA > testIsDateB) {
            return 1;
          }
          return 0;
        });
        if (myType === 'alpha-order') {
          return sortedByHeaderResults;
        } else if (myType === 'non-alpha-order') {
          return sortedByHeaderResults.reverse();
        }
      };

      /**
       * Returns an array containing the values of the cells that will be styled to visualize the column that triggered the sorting process
       * @param {number} myColumn - index of the selected column
       * @param {Array.<Object>} myData
       * @returns {Array}
       */
      var selectColumn = function selectColumn(myColumn, myData) {
        var myCells = myData.map(function (row) {
          return Object.values(row)[myColumn];
        });
        return myCells;
      };

      /**
       * Returns the max page number
       * @param {number} myLength - length of the data array
       * @param {number} mySelect - the number of elements to display per page, selected by user
       * @returns {number}
       */
      var determineMaxPage = function determineMaxPage(myLength, mySelect) {
        var myMaxPage = Math.ceil(myLength / mySelect);
        return myMaxPage;
      };

      /**
       * Returns an array of span elements reprensenting pages numbers, and adds a class name for the span containing the current page number for styling.
       * @param {number} myMaxPage - the max page number
       * @param {number} myCurrentPage - current page number
       * @returns {Array.<ReactElement>}
       */
      var determinePageNums = function determinePageNums(myMaxPage, myCurrentPage) {
        var updatedPages = [];
        var _loop = function _loop(i) {
          if (myCurrentPage === i) {
            updatedPages.push( /*#__PURE__*/_react.default.createElement("span", {
              key: i,
              className: "paginated-react-table__page-number--current",
              onClick: function onClick() {
                return handlePageClick(i);
              }
            }, myCurrentPage));
          } else {
            updatedPages.push( /*#__PURE__*/_react.default.createElement("span", {
              key: i,
              className: "paginated-react-table__page-number",
              onClick: function onClick() {
                return handlePageClick(i);
              }
            }, i));
          }
        };
        for (var i = 1; i <= myMaxPage; i++) {
          _loop(i);
        }
        return updatedPages;
      };
      var myMaxPage = determineMaxPage(dataArray.length, userSelect);
      setMaxPage(myMaxPage);
      var myFilteredData = filterBySearch(dataArray, searchValue);

      /**
       * Returns the rank of the first entry of the current page
       * @param {number} mySelect - the number of elements to display per page, selected by user
       * @param {number} myCurrentPage - current page number
       * @returns {number}
       */
      var determineFirstEntry = function determineFirstEntry(mySelect, myCurrentPage) {
        var calculateFirstEntry = (myCurrentPage - 1) * mySelect + 1;
        return calculateFirstEntry;
      };

      /**
       * Returns the rank of the last entry of the current page
       * @param {number} mySelect - the number of elements to display per page, selected by user
       * @param {number} myCurrentPage - current page number
       * @param {number} myMaxEntry - length of the data array
       * @returns {number}
       */
      var determineLastEntry = function determineLastEntry(mySelect, myCurrentPage, myMaxEntry) {
        var calculateLastEntry = myCurrentPage * mySelect;
        if (calculateLastEntry > myMaxEntry) {
          return myMaxEntry;
        }
        return calculateLastEntry;
      };
      setFirstEntry(function () {
        return determineFirstEntry(userSelect, currentPage);
      });
      setEntriesLength(myFilteredData.length);
      setLastEntry(function () {
        return determineLastEntry(userSelect, currentPage, entriesLength);
      });
      myFilteredData = sortedByHeader(myFilteredData, sortBy, type);
      selectColumn(column, myFilteredData);
      myMaxPage = determineMaxPage(myFilteredData.length, userSelect);
      setMaxPage(myMaxPage);
      myFilteredData = paginatedBySelect(myFilteredData, userSelect, currentPage);
      setFilteredData(myFilteredData);
      var myPagesNums = determinePageNums(maxPage, currentPage);
      setPagesNums(myPagesNums);
    }
  }, [dataArray, searchValue, currentPage, userSelect, sortBy, headersArray, type, entriesLength, column, maxPage]);
  return dataArray === null ? /*#__PURE__*/_react.default.createElement("div", {
    className: "paginated-react-table__container"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "paginated-react-table__title"
  }, tableTitle), /*#__PURE__*/_react.default.createElement("div", {
    className: "paginated-react-table__options"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "Show"), /*#__PURE__*/_react.default.createElement("select", {
    className: "paginated-react-table__select"
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: 10
  }, "10"), /*#__PURE__*/_react.default.createElement("option", {
    value: 25
  }, "25"), /*#__PURE__*/_react.default.createElement("option", {
    value: 50
  }, "50"), /*#__PURE__*/_react.default.createElement("option", {
    value: 100
  }, "100"))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "Search"
  }, "Search:"), /*#__PURE__*/_react.default.createElement("input", {
    className: "paginated-react-table__search",
    type: "text",
    id: "Search"
  }))), /*#__PURE__*/_react.default.createElement("table", {
    className: "paginated-react-table__table"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
    className: "paginated-react-table__headers"
  }, headersArray.map(function (header, index) {
    return /*#__PURE__*/_react.default.createElement("th", {
      className: "paginated-react-table__header",
      key: header + index,
      scope: "col"
    }, header, /*#__PURE__*/_react.default.createElement(_fa.FaRegArrowAltCircleDown, {
      className: "paginated-react-table__sort-arrow paginated-react-table__sort-arrow--down"
    }), /*#__PURE__*/_react.default.createElement(_fa.FaRegArrowAltCircleUp, {
      className: "paginated-react-table__sort-arrow"
    }));
  }))), /*#__PURE__*/_react.default.createElement("tbody", {
    className: "paginated-react-table__body"
  }, /*#__PURE__*/_react.default.createElement("tr", {
    className: "paginated-react-table__line"
  }, /*#__PURE__*/_react.default.createElement("td", {
    className: "paginated-react-table__cell paginated-react-table__cell--no-data",
    colSpan: "9"
  }, "No data available in table")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "paginated-react-table__pagination"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Showing 0 to 0 of 0 entries"), /*#__PURE__*/_react.default.createElement("div", {
    className: "paginated-react-table__btns"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "paginated-react-table__btn--disable"
  }, "Previous"), /*#__PURE__*/_react.default.createElement("div", {
    className: "paginated-react-table__btn--disable"
  }, "Next")))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "paginated-react-table__container"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "paginated-react-table__title"
  }, tableTitle), /*#__PURE__*/_react.default.createElement("div", {
    className: "paginated-react-table__options"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "Show", /*#__PURE__*/_react.default.createElement("select", {
    className: "paginated-react-table__select",
    value: userSelect,
    onChange: handlePerPageChange
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: 10
  }, "10"), /*#__PURE__*/_react.default.createElement("option", {
    value: 25
  }, "25"), /*#__PURE__*/_react.default.createElement("option", {
    value: 50
  }, "50"), /*#__PURE__*/_react.default.createElement("option", {
    value: 100
  }, "100")))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, "Search:", /*#__PURE__*/_react.default.createElement("input", {
    className: "paginated-react-table__search",
    type: "search",
    value: searchValue,
    onChange: function onChange(e) {
      return handleSearch(e);
    }
  })))), /*#__PURE__*/_react.default.createElement("table", {
    className: "paginated-react-table__table"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
    className: "paginated-react-table__headers"
  }, headersArray.map(function (header, index) {
    return /*#__PURE__*/_react.default.createElement("th", {
      className: "paginated-react-table__header",
      key: header + index,
      scope: "col",
      onClick: function onClick() {
        return handleColumnBackground(header);
      }
    }, header, /*#__PURE__*/_react.default.createElement(_fa.FaRegArrowAltCircleDown, {
      className: "paginated-react-table__sort-arrow paginated-react-table__sort-arrow--down",
      onClick: function onClick() {
        return handleSortByDown(header);
      }
    }), /*#__PURE__*/_react.default.createElement(_fa.FaRegArrowAltCircleUp, {
      className: "paginated-react-table__sort-arrow",
      onClick: function onClick() {
        return handleSortByUp(header);
      }
    }));
  }))), /*#__PURE__*/_react.default.createElement("tbody", {
    className: "paginated-react-table__body"
  }, filteredData.map(function (data, index) {
    return /*#__PURE__*/_react.default.createElement("tr", {
      className: "paginated-react-table__line",
      key: index
    }, Object.keys(data).map(function (key, index) {
      return /*#__PURE__*/_react.default.createElement("td", {
        key: index,
        className: column === index ? 'paginated-react-table__cell paginated-react-table__cell--selected-column' : 'paginated-react-table__cell'
      }, data[key]);
    }));
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "paginated-react-table__pagination"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Showing ", firstEntry, " to ", lastEntry, " of ", entriesLength, " entries"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    className: "paginated-react-table__btn",
    onClick: handlePrevious
  }, "Previous"), pagesNums, /*#__PURE__*/_react.default.createElement("button", {
    className: "paginated-react-table__btn",
    onClick: handleNext
  }, "Next"))));
}
var _default = PaginatedReactTable;
exports.default = _default;