import React from 'react'
import "./list.scss"

import Header from '../../components/header/Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TicketsTable from '../../components/tables/TicketsTable'
import { Button } from '@mui/material'

const ListTickets = ({ toggleSidebar }) => {
    
    const user = useSelector(state => state.user)
  
    const navigate = useNavigate()

    const handleCreateTicket = async (e) => {
        e.preventDefault()
    
        navigate("new")
    
    }
        

  return user ? (
    <>
        <Header page={"My Tickets"} user={user} toggleSidebar={toggleSidebar}/>

          <main>
              <div className="flexWrapper">


                  <div className="formWrapper">
                      <div className="button">

                          <Button sx={{ marginBottom: 4, minWidth: 150, backgroundColor: '##2873ff' }} variant="contained" onClick={handleCreateTicket}>Create New Ticket </Button>

                      </div>
                  </div>

                  <div className="table-wrapper">
                      <div className="formHeader">
                          <h2>Projects</h2>
                      </div>
                      <div className="tableContainer">
                          <TicketsTable filter={"user"} value={user} />
                      </div>

              </div>
          
        </div>
    </main>
    </>
  ) : null
}

export default ListTickets