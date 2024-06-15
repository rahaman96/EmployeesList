import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<EmployeeList/>} />
        <Route path="/emplyeelist"  element={<EmployeeList/>} />
        <Route path="/employee/:id" element={<EmployeeDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;

