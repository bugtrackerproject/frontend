import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProjectsTable from "../../components/tables/ProjectsTable";
import TicketsTable from "../../components/tables/TicketsTable";
import Widget from "../../components/widgets/Widget";
import "./home.scss";

import {
	selectUserTickets,
	selectUserTicketsByStatus,
} from "../../reducers/appReducer";

const Home = () => {
	const dispatch = useDispatch();
	const [status, setStatus] = useState("All");
	const user = useSelector((state) => state.user);
	const tickets = useSelector(selectUserTicketsByStatus(status));
	const allUserTickets = useSelector(selectUserTickets);

	const totals = {
		todo: allUserTickets.filter((t) => t.status === "To Do").length,
		inprogress: allUserTickets.filter((t) => t.status === "In Progress")
			.length,
		completed: allUserTickets.filter((t) => t.status === "Completed")
			.length,
	};

	const handleStatusClick = (newStatus) => {
		if (status === newStatus) {
			setStatus("All");
		} else {
			setStatus(newStatus);
		}
	};

	return user ? (
		<>
			<main>
				<div className="flex-wrapper">
					<div className="widgets">
						<Widget
							type="to do"
							count={totals.todo}
							onClick={() => handleStatusClick("To Do")}
							active={status === "To Do"}
						/>
						<Widget
							type="in progress"
							count={totals.inprogress}
							onClick={() => handleStatusClick("In Progress")}
							active={status === "In Progress"}
						/>
						<Widget
							type="completed"
							count={totals.completed}
							onClick={() => handleStatusClick("Completed")}
							active={status === "Completed"}
						/>
					</div>

					<div className="table-wrapper">
						<div className="form-header">
							<h2>{status}</h2>
						</div>

						<div className="smaller-mui-table-container">
							<TicketsTable
								key={status}
								tickets={
									status === "All" ? allUserTickets : tickets
								}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	) : null;
};

export default Home;
