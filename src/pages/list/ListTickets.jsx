import React from 'react'
import { useState } from 'react'
import Header from '../../components/header/Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TicketsTable from '../../components/tables/TicketsTable'
import { Button } from '@mui/material'
import CreateTicket from '../../components/forms/CreateTicket'
import UpdateTicket from '../../components/forms/UpdateTicket'

import './list.scss'

const ListTickets = ({ toggleSidebar }) => {
    const user = useSelector(state => state.user)
    
    return (
        <>
            <Header page={"My Tickets"} user={user} toggleSidebar={toggleSidebar} />

            <main>

                <div className="table-wrapper">
                    <div className="form-header">
                        <h2>Assigned Tickets</h2>
                    </div>

                    <div className="mui-table-container">
                        <TicketsTable
                            
                        ></TicketsTable>
                    </div>
                </div>

            </main>
        </>
    )
}

export default ListTickets