import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../../components/layouts/DashboardLayout';

const EmptyUser = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const CreateUser = () => {
  const location = useLocation();
  const { userId } = location.state || {};

  const navigate = useNavigate();
  const [userData, setUserData] = useState(EmptyUser)
  const [currentUser, setCurrentUser] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setUserData((prevData) => ({ ...prevData, [key]: value }))
  }
  const clearData = () => {
    setUserData(EmptyUser)
  }

  // Create User
  const createUser = async () => {};

  // Update User
  const updateUser = async () => {};

  const handleSubmit = async () => {};

  // Get User by Id
  const getUserById = async () => {};

  // Delete User
  const removeUser = async () => {};

  return (
    <DashboardLayout activeMenu={Pengguna}></DashboardLayout>
  )
}

export default CreateUser