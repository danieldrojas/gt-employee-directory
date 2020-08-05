import React, { Component, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import axios from 'axios';
import API from './utils/API';



class App extends React.Component {
  state = {
    employees: [],
    filteredEmployees: [],
    ascedening: true
  }

  handleTyping = (e) => {
    var newFiltered = this.state.employees.filter((emp) => {
      console.log('We are comparing', e.target.value)
      console.log('tooooo', emp.name.substring(0, e.target.value.length))
      // console.log('We are comparing', e.target.value, 'tooooo', emp.name.substring(0, e.target.value.length))
      if (e.target.value.toLowerCase() === emp.name.substring(0, e.target.value.length).toLowerCase()) {
        console.log('WE FOUND A MATCH!!!')
        console.log(emp)
        return emp

      }
    })
    console.log('new filtered!!', newFiltered)
    this.setState({
      filteredEmployees: newFiltered
    })
  }

  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.getEmployees()
  }

  handleOrder = () => {
    console.log("got clicked!!!")

    function compareAsc(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }

    function compareDsc(a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    }

    var compareToUse = compareDsc
    console.log('this is state ascending', this.state.ascedening)
    if (this.state.ascedening === true) {
      compareToUse = compareAsc
    }


    var sort = this.state.employees.sort(compareToUse);
    this.setState({
      employees: sort,
      ascedening: !this.state.ascedening
    })
    console.log("Thhis is the sorttt   :", sort)
  }




  getEmployees = (query) => {
    API.getEmployees()
      .then((response) => {
        var cleanedEmployees = []
        var apiEmployees = response.data.results
        apiEmployees.filter((employee) => {
          let { name, dob, email, phone, picture } = employee
          name = name.first + " " + name.last;
          picture = picture.thumbnail;
          dob = dob.date;
          cleanedEmployees.push({ name, dob, email, phone, picture })
        })
        console.log("new array var", cleanedEmployees)

        this.setState({
          employees: cleanedEmployees
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let employeesToDisplay = this.state.employees

    if (this.state.filteredEmployees.length > 0) {
      employeesToDisplay = this.state.filteredEmployees
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <NavBar />
              <input placeholder="Search" onChange={this.handleTyping}></input>
              <table className="table">
                <thead>
                  <tr>
                    <th
                      className="text-center" scope="col">Image</th>
                    <th className="text-center" onClick={this.handleOrder} scope="col"><button className="btn" className="hoverable">Name</button></th>
                    <th className="text-center" scope="col">Email</th>
                    <th className="text-center" scope="col">Phone</th>
                    <th className="text-center" scope="col">DOB</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesToDisplay.map((item) => (
                    <tr>
                      <th className="text-center" scope="row"><img src={item.picture} atl="profile picture" /></th>
                      <td className="text-center">{item.name} </td>
                      <td className="text-center">{item.email}</td>
                      <td className="text-center">{item.phone}</td>
                      <td >{item.dob}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
