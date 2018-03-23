import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.headers.post['App-Key'] = 'lapolito';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };



  }

  componentWillMount() {
    console.log("MOUNT");
    console.log(this.state);
    if(this.props.token){
      this.props.history.push('/search')
    }
  }

  // action handlers for this component, we use arrow funcs to skip the 'this' redefinition
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log(this.state);

  };

  handleSubmit = (event) => {
    event.preventDefault();

    let {login,password} = this.state;

    const params = {
      "key": "EA0800A6-7E18-4545-8F12-97264EF81103",
      "params": {
        "login": login,
        "password": password
      }
    };

    let self = this;

    axios.post('http://ibuyflowersdev.sbx.cloud/api/cloudscript/v1/run', params, null
    ).then(function (response) {

      console.log(response.data.response.body);

      let json = response.data;

      console.log(json);

      if (json.success && json.response.body.success) {
        console.log(json.response.body.data.token);
        localStorage.setItem('token',json.response.body.data.token);
        localStorage.setItem('user.key',json.response.body.data.user.key);
        self.props.history.push('/search')
      }
    })


  };

  render() {


    return (

      <form onSubmit={this.handleSubmit}>
        <table style={{backgroundColor:'lightblue', padding:50}}>
          <tbody>
          <tr>
            <td>
              <label>Login: </label>
            </td>
            <td>
              <input type="text" name="login"

                     onChange={this.handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Password: </label>
            </td>
            <td>
              <input type="password" name="password"
                     onChange={this.handleChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{textAlign: 'right'}}><input type="submit" value="Login"/></td>
          </tr>
          </tbody>
        </table>
      </form>
    )

  }

}

export default Home;