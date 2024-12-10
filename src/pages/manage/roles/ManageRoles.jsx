import "./manageroles.scss"




import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { updateUser } from "../../../reducers/usersReducer";
import UsersTable from "../../../components/tables/UsersTable";


const ManageRoles = () => {

    const dispatch = useDispatch();

    const [selectedUsers, setUsers] = useState([]);
    const [role, setRole] = useState('');

    const users = useSelector((state) => state.users.data)
    const user = useSelector(state => state.user)
    const roles = useSelector((state) => state.roles.data)



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
            <main>
                <div className="flex-wrapper">
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