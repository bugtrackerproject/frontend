
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ProjectsTable from '../../components/tables/ProjectsTable'
import TicketsTable from '../../components/tables/TicketsTable'
import Widget from '../../components/widgets/Widget'
import "./home.scss"

import { setFilters } from '../../reducers/ticketsReducer'


const Home = () => {
    const dispatch = useDispatch()

    const filters = useSelector((state) => state.tickets.filters);

  let projectsSelector = useSelector((state) => state.projects.data)
    let projects = projectsSelector.slice()

    const allTickets = useSelector((state) => state.tickets.data); 
    const filteredTickets = useSelector((state) => state.tickets.filteredTickets);
  
  const user = useSelector(state => state.user)

    const filteredTicketsForTotals = allTickets.filter(ticket => ticket.assignee === user.id);

    const totals = {
        tickets: filteredTicketsForTotals.length,
        projects: projects.length,
        todo: filteredTicketsForTotals.filter(t => t.status === "To Do").length,
        inprogress: filteredTicketsForTotals.filter(t => t.status === "In Progress").length,
        completed: filteredTicketsForTotals.filter(t => t.status === "Completed").length
    };

    const handleStatusClick = (status) => {
        dispatch(setFilters({ ...filters, status }));
    };

    useEffect(() => {
        if (user) {
            dispatch(setFilters({ ...filters, assignee: user.id }));
        }
    }, [user, dispatch]);


    return user ? (
        <>

            <main>

                <div className="flex-wrapper">
                    <div className="widgets">
                        <Widget type="to do" count={totals.todo} onClick={() => handleStatusClick("To Do")} active={filters.status === "To Do"} />
                        <Widget type="in progress" count={totals.inprogress} onClick={() => handleStatusClick("In Progress")} active={filters.status === "In Progress"} />
                        <Widget type="completed" count={totals.completed} onClick={() => handleStatusClick("Completed")} active={filters.status === "Completed"} />
                    </div>

                    <div className="table-wrapper">
                        <div className="form-header">
                            <h2>My Tickets</h2>
                        </div>

                        <div className="home-mui-table-container">
                            <TicketsTable tickets={filteredTickets || []} />
                        </div>
                    </div>
                </div>

            </main>
        </>
  ) : null
}

export default Home

