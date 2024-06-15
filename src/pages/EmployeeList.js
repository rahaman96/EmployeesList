import React, { useState } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../redux/employeeSlice';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


// Validation schema
const validationSchema = Yup.object().shape({
    employee_name: Yup.string().required('Employee name is required'),
    employee_salary: Yup.number().required('Employee salary is required').positive('Salary must be positive'),
    employee_age: Yup.number().required('Employee age is required').positive('Age must be positive').integer('Age must be an integer'),
    profile_image: Yup.string().url('Profile image must be a valid URL').required('Profile image is required'),
});

// Modal style
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EmployeeList = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <h1>Employee List</h1>
            <div>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Create User
                </Button>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2" marginBottom={2}>
                            Create User
                        </Typography>
                        <Formik
                            initialValues={{
                                employee_name: '',
                                employee_salary: '',
                                employee_age: '',
                                profile_image: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                dispatch(createEmployee(values))
                                setTimeout(() => {
                                    console.log(values);
                                    setSubmitting(false);
                                    handleClose();
                                }, 400);
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        name="employee_name"
                                        label="Employee Name"
                                        fullWidth
                                        margin="normal"
                                        error={touched.employee_name && !!errors.employee_name}
                                        helperText={touched.employee_name && errors.employee_name}
                                    />
                                    <Field
                                        as={TextField}
                                        name="employee_salary"
                                        label="Employee Salary"
                                        type="number"
                                        fullWidth
                                        margin="normal"
                                        error={touched.employee_salary && !!errors.employee_salary}
                                        helperText={touched.employee_salary && errors.employee_salary}
                                    />
                                    <Field
                                        as={TextField}
                                        name="employee_age"
                                        label="Employee Age"
                                        type="number"
                                        fullWidth
                                        margin="normal"
                                        error={touched.employee_age && !!errors.employee_age}
                                        helperText={touched.employee_age && errors.employee_age}
                                    />
                                    <Field
                                        as={TextField}
                                        name="profile_image"
                                        label="Profile Image URL"
                                        fullWidth
                                        margin="normal"
                                        error={touched.profile_image && !!errors.profile_image}
                                        helperText={touched.profile_image && errors.profile_image}
                                    />
                                    <Box mt={2}>
                                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                                            Submit
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Modal>
            </div>
            <EmployeeTable />
        </div>
    );
};

export default EmployeeList;