import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button ,Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { removeEmployee, fetchEmployees } from '../redux/employeeSlice';

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const employees = useSelector((state) => state.employees.list);

  React.useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (id) => {
    nagivate(`/employee/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(removeEmployee(id));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell> <Avatar alt="Profile Image" src={employee.profile_image} /></TableCell>
              <TableCell>{employee.employee_name}</TableCell>
              <TableCell>{employee.employee_age}</TableCell>
              <TableCell>{employee.employee_salary}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(employee.id)}>Edit</Button>
                <Button onClick={() => handleDelete(employee.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;