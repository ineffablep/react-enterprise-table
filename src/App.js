import React, { Component } from 'react';
import Table from './table';
const pageData = (data, page, limit) => {
  if (page < 1) {
    page = 1;
  }
  let total = Math.round(data.length / limit);
  if (page > total) {
    page = total;
  }
  let from = (page - 1) * limit,
    to = page * limit;

  return data.slice(from, to);
};
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
    const data = [];
    for (let i = 1; i < 100; i++) {
      let dt = new Date(),
        age = 35 + i;
      dt.setFullYear(dt.getFullYear() - age);
      data.push(
        { fname: 'Test ' + i, dob: dt, age: age },
      );
    };
    const pagination = {
      limit: 20,
      totalRows: 99,
      currentPage: 1,
      size: [20, 40, 60, 80, 100],
      onPagerClick: pageData
    };
    return (
      <div className="App">
        <Table columns={columns} data={data} pagination={pagination} />
      </div>
    );
  }
}

export default App;
