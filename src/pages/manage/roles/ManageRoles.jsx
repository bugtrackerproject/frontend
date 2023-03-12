import "./manageroles.scss"

import Sidebar from '../../../components/sidebar/Sidebar'

import Button from '@mui/material/Button';

import { useDispatch, useSelector } from "react-redux"
import SelectUsers from "../../../components/checkbox/SelectUsers"
import SelectRoles from "../../../components/checkbox/SelectRoles"

import { useState } from "react";
import { updateUser } from "../../../reducers/usersReducer";
import UsersTable from "../../../components/tables/UsersTable";
import Header from "../../../components/header/Header";


const ManageRoles = ({ isSidebarActive, toggleSidebar }) => {

  const dispatch = useDispatch();

  const [selectedUsers, setUsers] = useState([]);
  const [role, setRole] = useState('');
  

  const roles = ["Admin", "Developer", "Submitter"]

  const users = useSelector((state) => state.users)
  const user = useSelector(state => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (role !== "" && selectedUsers.length !== 0) {
      selectedUsers.forEach(user => {

        const obj = {

          ...user,
          role: role,
        }

        dispatch(updateUser(user.id, obj))

      })
    }
  }


  return (
    <>
        <Sidebar isSidebarActive={isSidebarActive} />
        
        <div className="main-content">
          <Header page={"Manage Users"} user={user} toggleSidebar={toggleSidebar} />


          <main>
            
            <div className="add-page">

                <div className="select-form">
                  <div className="main-title">ASSIGN USER ROLES</div>
                  <div className="form-container">
                      <div className="sub-title">SELECT USERS</div>
                      <SelectUsers data={users} onChange={(event, selectedValue) => setUsers(selectedValue)}/>
                      <div className="sub-title">SELECT ROLE</div>
                      <SelectRoles data={roles} onChange={(event, selectedValue) => setRole(selectedValue)}/>
                      <div className="buttons">
                        <Button sx={{ minWidth: 150 }} variant="outlined" onClick={handleSubmit}>Add Role</Button>
                      </div>
                  </div>
                </div>   

                <div className="table-wrapper">
                    <div className="main-title">ALL USERS</div>
                    <UsersTable />
                </div>
            </div>

        </main>
      </div>
    </>
  )
}

export default ManageRoles