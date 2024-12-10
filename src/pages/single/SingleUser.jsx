import "./single.scss"

import { useSelector } from "react-redux"

import ProjectsTable from "../../components/tables/ProjectsTable"
import TicketsTable from "../../components/tables/TicketsTable"


const SingleUser = ({ selectedUser }) => {
    const users = useSelector(state => state.users.data)
    const user = useSelector(state => state.user)


    const displayUser = users.find(u => u.id === selectedUser.id);

    return selectedUser ? (
    <>
            <main>
                <div className="flex-wrapper">
                    <div className="formWrapper">

                        <div className="form-header">
                            <h2>Profile Information</h2>
                        </div>
                        <div className="form-container">
                            <div className="main-title">EMAIL</div>
                            {displayUser.email}
                            <div className="main-title">NAME</div>
                            {displayUser.name}
                            <div className="main-title">ROLE</div>
                            {displayUser.role}
                            <div className="main-title">ASSIGNED PROJECTS</div>
                            <ProjectsTable filter="user" value={displayUser} />
                            <div className="main-title">ASSIGNED TICKETS</div>
                            <TicketsTable filter="user" value={displayUser} />
                        </div>
                    </div>
                </div>
        </main >
    </>
  ) : null
}

export default SingleUser