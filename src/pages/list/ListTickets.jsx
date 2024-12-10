import React from 'react'
import { useSelector } from 'react-redux'
import TicketsTable from '../../components/tables/TicketsTable'

import './list.scss'

const ListTickets = () => {
    const user = useSelector(state => state.user)
    
    return (
        <>

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