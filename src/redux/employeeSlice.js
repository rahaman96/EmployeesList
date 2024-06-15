import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://dummy.restapiexample.com/api/v1';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get(`${apiUrl}/employees`);
  return response.data.data;
});

export const fetchEmployeeById = createAsyncThunk('employees/fetchEmployeeById', async (id) => {
  const response = await axios.get(`${apiUrl}/employee/${id}`);
  console.log("response", response)
  return response.data.data;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, data }) => {
  const response = await axios.put(`${apiUrl}/update/${id}`, data);
  return response.data.data;
});

export const createEmployee = createAsyncThunk('employees/createEmployee', async (data) => {
  const response = await axios.post(`${apiUrl}/create`, data);
  return response.data.data;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    selectedEmployee: null,
    status: null,
  },
  reducers: {
    removeEmployee: (state, action) => {
      state.list = state.list.filter(employee => employee.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload;
        state.list = state.list.map(employee => employee.id === action.payload.id ? action.payload : employee);
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const { removeEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;