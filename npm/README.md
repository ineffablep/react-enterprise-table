# react-enterprise-table

`npm install react-enterprise-table --save`


### React JS Enterprise Grade Table
* Support Excel Style Filtering
* Excel Style Sorting
* Client Side and Server Side Filtering and Sorting
* Global Search
* Export to CSV
* Upload File with Data
* Add new records, Edit and Delete Records

### Coming Features
* Full Documentation with Examples
* Re-Ordering of Rows
* Re-Sizing Columns
* Hierarchical Data Grid
* Pivot Grid 
* Batch Edit
* Copy and Paste Data to Grid
 
### Sample to Use
``` js
import React, { Component } from 'react';
import Table from 'react-enterprise-table';

class App extends Component {
  render() {
    const columns = [{
      id: 'fname',
      dataType: 'text',
      name: 'Full Name'
    },
    {
      id: 'dob',
      dataType: 'date',
      name: 'Date of Birth'
    }, {
      id: 'age',
      dataType: 'number',
      name: 'Age'
    }];
    const data = [
      { fname: "Test 1", dob: "17/08/1982", age: "35" },
      { fname: "Test 2", dob: "17/08/1983", age: "34" },
      { fname: "Test 3", dob: "17/08/1984", age: "33" },
      { fname: "Test 4", dob: "17/08/1985", age: "32" },
      { fname: "Test 5", dob: "17/08/1986", age: "31" },
      { fname: "Test 6", dob: "17/08/1987", age: "30" }
    ];
    return (
      <div className="App">
        <Table columns={columns} data={data} />
      </div>
    );
  }
}

export default App;
```