import "./manageroles.scss"


import Button from '@mui/material/Button';

import { useDispatch, useSelector } from "react-redux"
import SelectMultiple from "../../../components/checkbox/SelectMultiple"
import Select from "../../../components/checkbox/Select"

import { useState } from "react";
import { updateUser } from "../../../reducers/usersReducer";
import UsersTable from "../../../components/tables/UsersTable";
import Header from "../../../components/header/Header";


const ManageRoles = ({ toggleSidebar }) => {

    const dispatch = useDispatch();

    const [selectedUsers, setUsers] = useState([]);
    const [role, setRole] = useState('');

    const users = useSelector((state) => state.users)
    const user = useSelector(state => state.user)
    const roles = useSelector((state) => state.roles)


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
            <Header page={"Manage Users"} user={user} toggleSidebar={toggleSidebar} />

            <main>
                <div className="flex-wrapper">

                    <div className="formWrapper">

                        <div className="form-header">
                            <h2>Add User Roles</h2>
                        </div>

                        <div className="form-container">
                            <div className="formContent">
                                <div className="sub-title">SELECT USERS</div>
                                <SelectMultiple data={users} label="Users" onChange={(event, selectedValue) => setUsers(selectedValue)} />
                                <div className="sub-title">SELECT ROLE</div>
                                <Select data={roles} label="Role" onChange={(event, selectedValue) => setRole(selectedValue)} />
                                <div className="button">
                                    <Button sx={{ minWidth: 150, backgroundColor: '#2873ff' }} variant="contained" onClick={handleSubmit}>Add Role</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table-wrapper">
                        <div className="form-header">
                            <h2>Users</h2>
                        </div>
                        <div className="table-container">
                            <UsersTable />
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}

export default ManageRoles