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
      .then(res => {
        console.log(res.data);
        alert(res.data.message); // Display the confirmation message
      })
      .catch(err => console.log('Error: ' + err));

    this.setState({
      username: ''
    });
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mx-5 mt-4" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
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
                <div className="form-group mt-3">
                  <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}  
