import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateRun extends Component {
  constructor(props) {
    super(props);

     // Bind the methods to this instance
     this.onChangeUsername = this.onChangeUsername.bind(this);
     this.onChangeDistance = this.onChangeDistance.bind(this);
     this.onChangeDistanceUnit = this.onChangeDistanceUnit.bind(this);
     this.onChangeHours = this.onChangeHours.bind(this);
     this.onChangeMinutes = this.onChangeMinutes.bind(this);
     this.onChangeSeconds = this.onChangeSeconds.bind(this);
     this.onChangeDate = this.onChangeDate.bind(this);
     this.onChangeTime = this.onChangeTime.bind(this);
     this.onChangePace = this.onChangePace.bind(this);
     this.onChangeTemperature = this.onChangeTemperature.bind(this);
     this.onChangeConditions = this.onChangeConditions.bind(this);
     this.onChangeNotes = this.onChangeNotes.bind(this);
     this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      distance: 0,
      distanceUnit: 'KM',
      hours: 0,
      minutes: 0,
      seconds: 0,
      date: new Date(),
      time: '',
      pace: 0,
      weather: {
        temperature: 0,
        conditions: '',
      },
      notes: '',
      users: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/users/')
    .then(response => {
    if (response.data.length > 0) {
      this.setState({ 
        users: response.data.map(user => user.username),
        username: response.data[0].username
      });
    }
  })
  .catch((error) => {
    console.log(error);
  })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDistance(e) {
    this.setState({
      distance: e.target.value,
    });
  }

  onChangeDistanceUnit(e) {
    this.setState({
      distanceUnit: e.target.value.toUpperCase(), // Convert to uppercase
    });
  }

  onChangeHours(e) {
    this.setState({
      hours: e.target.value,
    });
  }

  onChangeMinutes(e) {
    this.setState({
      minutes: e.target.value,
    });
  }

  onChangeSeconds(e) {
    this.setState({
      seconds: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onChangeTime(e) {
    this.setState({
      time: e.target.value,
    });
  }

  onChangePace(e) {
    this.setState({
      pace: e.target.value,
    });
  }

  onChangeTemperature(e) {
    this.setState({
      weather: {
        ...this.state.weather,
        temperature: e.target.value,
      },
    });
  }

  onChangeConditions(e) {
    this.setState({
      weather: {
        ...this.state.weather,
        conditions: e.target.value,
      },
    });
  }

  onChangeNotes(e) {
    this.setState({
      notes: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    console.log('Form submitted!');

    const newRun = {
      username: this.state.username,
      distance: this.state.distance,
      distanceUnit: this.state.distanceUnit,
      hours: this.state.hours,
      minutes: this.state.minutes,
      seconds: this.state.seconds,
      date: this.state.date,
      time: this.state.time,
      pace: this.state.pace,
      weather: {
        temperature: this.state.weather.temperature,
        conditions: this.state.weather.conditions,
      },
      notes: this.state.notes,
    };
  
    console.log(newRun);

    axios.post('http://localhost:8000/runs/add', newRun)
    .then(res => console.log(res.data));
    
    window.location = '/';
  }
  
  render() {
    return (
      <div>
        <h3>Create New Run</h3>
        <form onSubmit={this.onSubmit}>
          {/* Example: */}
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

          {/* Distance */}
          <div className="form-group">
            <label>Distance: </label>
            <input
              type="number"
              required
              className="form-control"
              value={this.state.distance}
              onChange={this.onChangeDistance}
            />
          </div>

          {/* Distance Unit */}
        <div className="form-group">
        <label>Distance Unit: </label>
        <select
            required
            className="form-control"
            value={this.state.distanceUnit}
            onChange={this.onChangeDistanceUnit}>
            <option value="KM">Kilometers</option>
            <option value="MI">Miles</option>
        </select>
        </div>

          {/* Hours */}
          <div className="form-group">
            <label>Hours: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.hours}
              onChange={this.onChangeHours}
            />
          </div>

          {/* Minutes */}
          <div className="form-group">
            <label>Minutes: </label>
            <input
              type="number"
              required
              className="form-control"
              value={this.state.minutes}
              onChange={this.onChangeMinutes}
            />
          </div>

          {/* Seconds */}
          <div className="form-group">
            <label>Seconds: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.seconds}
              onChange={this.onChangeSeconds}
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          {/* Time */}
          <div className="form-group">
            <label>Time: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.time}
              onChange={this.onChangeTime}
            />
          </div>

          {/* Pace */}
          <div className="form-group">
            <label>Pace: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.pace}
              onChange={this.onChangePace}
            />
          </div>

          {/* Weather */}
          <div className="form-group">
            <label>Temperature: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.weather.temperature}
              onChange={this.onChangeTemperature}
            />
          </div>
          <div className="form-group">
            <label>Conditions: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.weather.conditions}
              onChange={this.onChangeConditions}
            />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label>Notes: </label>
            <textarea
              type="text"
              className="form-control"
              value={this.state.notes}
              onChange={this.onChangeNotes}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Run Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
