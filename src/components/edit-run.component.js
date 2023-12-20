import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditRun = () => {
  const { id } = useParams();

  const [state, setState] = useState({
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/runs/${id}`);
        const runData = response.data;
        setState({
          username: runData.username || '', // Initialize with default value
          distance: runData.distance || 0,
          distanceUnit: runData.distanceUnit || 'KM',
          hours: runData.hours || 0,
          minutes: runData.minutes || 0,
          seconds: runData.seconds || 0,
          date: new Date(runData.date) || new Date(),
          time: runData.time || '',
          pace: runData.pace || 0,
          weather: {
            temperature: runData.weather?.temperature || 0,
            conditions: runData.weather?.conditions || '',
          },
          notes: runData.notes || '',
          users: [], // Make sure to set users here or replace it with the actual array
        });

        // Fetch users separately
        const usersResponse = await axios.get('http://localhost:8000/users/');
        setState((prevState) => ({
          ...prevState,
          users: usersResponse.data.map((user) => user.username),
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'hours' || name === 'minutes' || name === 'seconds') {
      setState(prevState => ({
        ...prevState,
        [name]: value !== '' ? parseInt(value, 10) : 0,  // Set a default value (e.g., 0) if the value is empty
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        [name]: value || '',  // Set an empty string as the default value if the value is falsy
      }));
    }
  };  

  const handleWeatherChange = (field, value) => {
    setState(prevState => ({
      ...prevState,
      weather: {
        ...prevState.weather,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const editedRun = {
      username: state.username,
      distance: state.distance,
      distanceUnit: state.distanceUnit,
      hours: state.hours,
      minutes: state.minutes,
      seconds: state.seconds,
      date: state.date,
      time: state.time,
      pace: state.pace,
      weather: {
        temperature: state.weather.temperature,
        conditions: state.weather.conditions,
      },
      notes: state.notes,
    };
  
    console.log(editedRun);
  
    try {
      // Make the update request
      const res = await axios.put(`http://localhost:8000/runs/update/${id}`, editedRun);
      
      // Log the response data
      console.log(res.data);
  
      // Redirect after the update request is complete
      window.location = '/';
    } catch (error) {
      console.error('Error updating run:', error);
      // Handle error, e.g., show a message to the user
    }
  };
  
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 mb-4"style={{ backgroundColor: '#95C8D8', padding: '20px', borderRadius: '10px' }}>
            <h3>Edit Run Log</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username: </label>
                <select
                  className="form-control"
                  value={state.username}
                  onChange={handleChange}
                  name="username"
                >
                  {state.users.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Distance: </label>
                <input
                  type="number"
                  required
                  className="form-control"
                  value={state.distance}
                  onChange={handleChange}
                  name="distance"
                />
              </div>
              <div className="form-group">
                <label>Distance Unit: </label>
                <select
                  className="form-control"
                  value={state.distanceUnit}
                  onChange={handleChange}
                  name="distanceUnit"
                >
                  <option value="KM">KM</option>
                  <option value="MI">MI</option>
                </select>
              </div>
              <div className="form-group">
                <label>Hours: </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Hours"
                  value={state.hours > 0 ? state.hours : ''}
                  onChange={handleChange}
                  name="hours"
                />
                <label>Minutes: </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Minutes"
                  value={state.minutes > 0 ? state.minutes : ''}
                  onChange={handleChange}
                  name="minutes"
                />
                <label>Seconds: </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Seconds"
                  value={state.seconds > 0 ? state.seconds : ''}
                  onChange={handleChange}
                  name="seconds"
                />
              </div>
              <br></br>
              <div className="form-group">
                <label>Date: </label>
                <DatePicker selected={state.date} onChange={date => setState(prevState => ({ ...prevState, date }))} />
              </div>
              <br></br>
              <div className="form-group">
                <label>Time: </label>
                <input
                  type="text"
                  className="form-control"
                  value={state.time}
                  onChange={handleChange}
                  name="time"
                />
              </div>
              <div className="form-group">
                <label>Pace: </label>
                <input
                  type="number"
                  className="form-control"
                  value={state.pace}
                  onChange={handleChange}
                  name="pace"
                />
              </div>
              <div className="form-group">
                <label>Temperature (°C): </label>
                <input
                  type="number"
                  className="form-control"
                  value={state.weather.temperature}
                  onChange={e => handleWeatherChange('temperature', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Conditions: </label>
                <input
                  type="text"
                  className="form-control"
                  value={state.weather.conditions}
                  onChange={e => handleWeatherChange('conditions', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Notes: </label>
                <input
                  type="text"
                  className="form-control"
                  value={state.notes}
                  onChange={handleChange}
                  name="notes"
                />
              </div>
              <br></br>
              <div className="form-group">
                <input type="submit" value="Edit Run Log" className="btn btn-primary" />
              </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditRun;
