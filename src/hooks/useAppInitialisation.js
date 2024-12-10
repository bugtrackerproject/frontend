import { useDispatch } from 'react-redux';
import { setLoading } from '../reducers/appReducer';
import { initialiseUsers } from '../reducers/usersReducer';
import { initialiseTickets } from '../reducers/ticketsReducer';
import { initialiseProjects } from '../reducers/projectsReducer';
import { initialiseRoles } from '../reducers/rolesReducer';
import { setUser } from '../reducers/userReducer';
import { setAccessToken } from '../services/auth'


const useAppInitialisation = () => {
    const dispatch = useDispatch();

    const initialiseApp = async () => {

        const loggedUserJSON = window.localStorage.getItem("loggedBugtrackerAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            setAccessToken(user.token);
        } else {
            console.warn("No user found in local storage.");

        }

        dispatch(setLoading(true));
        try {

            await Promise.all([
                dispatch(initialiseUsers()),
                dispatch(initialiseRoles()),
                dispatch(initialiseProjects()),
                dispatch(initialiseTickets()),
            ]);

        } catch (error) {
            console.error('Initialization failed:', error);  // Log any error if one occurs
        } finally {
            dispatch(setLoading(false));  // Set loading to false when all is done
        }
    };

    return initialiseApp;
};


export default useAppInitialisation;
