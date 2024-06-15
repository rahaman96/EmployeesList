import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeById } from '../redux/employeeSlice';
import EmployeeForm from '../components/EmployeeForm';


const EmployeeDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.employees.selectedEmployee);

    React.useEffect(() => {
        dispatch(fetchEmployeeById(id));
    }, [dispatch, id]);

    return (
        <div>
            <h1>Employee Details</h1>
            {employee && (
                <>
                    <h2>{employee.employee_name}</h2>
                    {/* <EmployeeForm employee={employee} /> */}
                    <EmployeeForm employee={employee} />
                </>
            )}
        </div>
    );
};

export default EmployeeDetails;