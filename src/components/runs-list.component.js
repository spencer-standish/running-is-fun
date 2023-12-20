import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class RunsList extends Component {
  constructor(props) {
    super(props);
    this.deleteRun = this.deleteRun.bind(this);
    this.state = { runs: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/runs/')
      .then(response => {
        this.setState({ runs: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteRun(id) {
    axios.delete(`http://localhost:8000/runs/delete/${id}`)
      .then(res => {
        console.log(res.data);
        // Update the state only after successful deletion
        this.setState({
          runs: this.state.runs.filter(el => el._id !== id)
        });
      })
      .catch(error => {
        console.error('Error deleting run:', error);
      });
  }

  runList() {
    return this.state.runs.map(currentRun => {
      return (
        <tr key={currentRun._id}>
          <td>{currentRun.username}</td>
          <td>{currentRun.distance} {currentRun.distanceUnit}</td>
          <td>{currentRun.hours}h {currentRun.minutes}m {currentRun.seconds}s</td>
          <td>{new Date(currentRun.date).toLocaleDateString()}</td>
          <td>{currentRun.time}</td>
          <td>{currentRun.pace}</td>
          <td>{currentRun.weather.temperature}°C, {currentRun.weather.conditions}</td>
          <td>{currentRun.notes}</td>
          <td>
            <Link to={`/edit/${currentRun._id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
            &nbsp;
            <button onClick={() => this.deleteRun(currentRun._id)} className="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="mx-3"> {/* Added margin to both left and right */}
        <h3>Logged Runs</h3>
        <div className='mb-3'>
            <Link to="/create" className="btn btn-success">Add New Run</Link>
            &nbsp;
            <Link to="/user" className="btn btn-primary">Add New User</Link>
        </div>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Time</th>
              <th>Pace</th>
              <th>Weather</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.runList()}
          </tbody>
        </table>
      </div>
    )
  }
}
