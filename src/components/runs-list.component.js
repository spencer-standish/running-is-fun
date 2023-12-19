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
    axios.delete('http://localhost:8000/runs/delete/' + id)
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
            <Link to={"/edit/" + currentRun._id}>edit</Link> |{" "}
            <button onClick={() => this.deleteRun(currentRun._id)}>delete</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Runs</h3>
        <table className="table">
          <thead className="thead-light">
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
