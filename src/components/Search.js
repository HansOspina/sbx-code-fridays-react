import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import logo from './../logo.svg';
import InvItem from './InvItem'


import 'react-datepicker/dist/react-datepicker.css';




class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inventory: [],
      arrivalDate: moment(),
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user.key')
    };




    if(!this.state.token){
      this.props.history.push('/');
      return;
    }

    console.log(this.state.token);
    axios.defaults.headers.common['Authorization'] = 'Bearer '+this.state.token;

    const self = this;
    // this binds the 'this' into the execution of all the action handlers
    this.configureActions().forEach(fun => {
      self[fun.name] = fun.bind(self)
    });

  }

  configureActions() {
    return [

      function handleDate(date) {
        this.setState({
          arrivalDate: date
        });
        console.log(this.state);
      },

      function handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });

        console.log(this.state);

      },

      function handleSubmit(event) {
        event.preventDefault();
        this.loadData();
      },

      function loadData() {
        const format = this.state.arrivalDate.format('YYYYMMDD');

        const arrival = parseInt(format);

        const conditions = {};

        if (this.state.searchTerm && this.state.searchTerm.length > 0) {
          conditions['search'] = this.state.searchTerm
        }

        let self = this;

        const params = {
          "key": "CF092FC5-D987-4C7F-AA00-1FF049FA3882",
          "params": {
            "arrival_date": arrival,
            "conditions": conditions,
            "user": self.state.user
          }
        };




        axios.post('http://ibuyflowersdev.sbx.cloud/api/cloudscript/v1/run', params, null
        ).then(function (response) {

          console.log(response.data.response.body);

          let json = response.data;

          if (json.success && json.response.body.success && !json.response.body.isEmpty) {
            self.loadInventory(arrival, json.response.body.inv)
          }
        })

      },

      function loadInventory(arrivalDate, searchResult) {

        const params = {
          "key": "6139B9E1-B273-41A7-9B07-0283EA76139F",
          "params": {
            "arrival_date": arrivalDate,
            "inv": searchResult,
            "user": self.state.user
          }
        };

        let self = this;

        axios.post('http://ibuyflowersdev.sbx.cloud/api/cloudscript/v1/run', params, null
        ).then(function (response) {

          console.log(response.data);

          let json = response.data;

          let data = json.success ? json.response.body.box : [];

          console.log(data);


          self.setState({
            inventory: data
          });
        })

      }


    ]
  }


  render() {


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to the Jungle</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
            <tr>
              <td>
                <label>Arrival Date: </label>
              </td>
              <td>
                <DatePicker name="arrival"
                            selected={this.state.arrivalDate}
                            onChange={this.handleDate}
                />
              </td>
              <td>
                <label>Filter Product</label>
              </td>
              <td>
                <input type="text" name="searchTerm"

                       onChange={this.handleChange}
                />
              </td>
              <td><input type="submit" value="Find Product!"/></td>
            </tr>
            </tbody>
          </table>
        </form>
        <br/>
        <table>
          <tbody>

          {this.state.inventory.map(el => {
            return <InvItem el={el}/>
          })}

          </tbody>
        </table>
      </div>
    );


  }
}

export default Search