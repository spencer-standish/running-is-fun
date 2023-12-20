import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <strong>Running is Fun</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <strong>Home</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  <strong>Create Run Log</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  <strong>Create User</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
