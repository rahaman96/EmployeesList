import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { TextField, Button } from '@mui/material';
import { updateEmployee } from '../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmployeeList from '../constant';

const EmployeeForm = ({ employee, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [employees, setEmployees] = useState(EmployeeList);
  useEffect(() => {
    setEmployees(employees)
  }, [])

  const formik = useFormik({
    initialValues: {
      employee_name: employee?.employee_name || '',
      employee_salary: employee?.employee_salary || '',
      employee_age: employee?.employee_age || '',
    },
    onSubmit: (values) => {
      const updatedData=employees.map(employee =>
        employee.id == id ? { ...employee, ...values } : employee
      )
      console.log("updatedData",updatedData)
      // dispatch(updateEmployee({ id: employee.id, data: values }));
      navigate('/',{ state: { employees: updatedData } })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        name="employee_name"
        value={formik.values.employee_name}
        onChange={formik.handleChange}
      />
      <TextField
        label="Salary"
        name="employee_salary"
        value={formik.values.employee_salary}
        onChange={formik.handleChange}
      />
      <TextField
        label="Age"
        name="employee_age"
        value={formik.values.employee_age}
        onChange={formik.handleChange}
      />
      <Button type="submit">Update</Button>
    </form>
  );
};

export default EmployeeForm;