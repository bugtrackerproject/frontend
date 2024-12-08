import "./single.scss"

import { useSelector } from "react-redux"

import ProjectsTable from "../../components/tables/ProjectsTable"
import TicketsTable from "../../components/tables/TicketsTable"
import Header from "../../components/header/Header"


const SingleUser = ({ toggleSidebar, selectedUser }) => {
    const users = useSelector(state => state.users)
    const user = useSelector(state => state.user)


    const displayUser = users.find(u => u.id === selectedUser.id);

    return selectedUser ? (
    <>
            <Header page={`${selectedUser.name}'s Profile`} user={user} toggleSidebar={toggleSidebar}/>

            <main>
                <div className="flex-wrapper">
                    <div className="formWrapper">

                        <div className="formHeader">
                            <h2>Profile Information</h2>
                        </div>
                        <div className="formContainer">
                            <div className="mainTitle">EMAIL</div>
                            {displayUser.email}
                            <div className="mainTitle">NAME</div>
                            {displayUser.name}
                            <div className="mainTitle">ROLE</div>
                            {displayUser.role}
                            <div className="mainTitle">ASSIGNED PROJECTS</div>
                            <ProjectsTable filter="user" value={displayUser} />
                            <div className="mainTitle">ASSIGNED TICKETS</div>
                            <TicketsTable filter="user" value={displayUser} />
                        </div>
                    </div>
                </div>
        </main >
    </>
  ) : null
}

export default SingleUser