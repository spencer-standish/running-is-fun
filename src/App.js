import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import RunsList from './components/runs-list.component';
import EditRun from './components/edit-run.component';
import CreateRun from './components/create-run.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<RunsList />} />
          <Route path="/edit/:id" element={<EditRun />} />
          <Route path="/create" element={<CreateRun />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
