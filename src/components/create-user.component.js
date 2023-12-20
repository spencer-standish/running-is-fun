import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: ''
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
    };
    console.log(newUser);
    
    axios.post('http://localhost:8000/users/add', newUser)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    });
  }

  render() {
    return (
      <div className="mx-5 mt-4" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}> {/* Added background color, padding, and border-radius */}
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group mt-3"> {/* Increased margin */}
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
