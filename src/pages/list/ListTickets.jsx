import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TicketsTable from '../../components/tables/TicketsTable'
import { selectTicketsForUserProjects } from '../../reducers/appReducer';
import { useEffect, useState } from 'react'
import { setFilters as setProjectsFilter } from '../../reducers/projectsReducer';
import './list.scss'

const ListTickets = () => {

    const tickets = useSelector(selectTicketsForUserProjects)
    
    return (
        <>

            <main>

                <div className="table-wrapper">
                    <div className="form-header">
                        <h2>Tickets</h2>
                    </div>

                    <div className="mui-table-container">
                        <TicketsTable tickets={tickets} />
                    </div>
                </div>

            </main>
        </>
    )
}

export default ListTickets