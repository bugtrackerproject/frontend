import React from 'react'
import "./list.scss"

import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TicketsTable from '../../components/tables/TicketsTable'
import { Button } from '@mui/material'

const ListTickets = ({ isSidebarActive, toggleSidebar }) => {
    
    const user = useSelector(state => state.user)
  
    const navigate = useNavigate()

    const handleCreateTicket = async (e) => {
        e.preventDefault()
    
        navigate("new")
    
    }
        

  return user ? (
    <>
        <Sidebar isSidebarActive={isSidebarActive}/>
        
        <div className="main-content">
          <Header page={"My Tickets"} user={user} toggleSidebar={toggleSidebar}/>


          <main>
          
            <div>
                
              <Button sx={{ minWidth: 150 }} variant="outlined" onClick={handleCreateTicket} >Create new ticket</Button>
              
            </div>

            <div className="tableWrapper">
              <div className="main-title">TICKETS</div>

              
              <TicketsTable filter={"user"} value={user} />
            </div>
        </main>
    </div>
    </>
  ) : null
}

export default ListTickets