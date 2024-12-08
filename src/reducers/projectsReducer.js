import { createSlice } from '@reduxjs/toolkit'
import { projectService } from '../services/apiServiceFactory'
import projectUserService  from '../services/projectUsers'

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    update(state, action) {
      return state.map(project =>
        project.id !== action.payload.id ? project : action.payload
      ) 
    }, 
    appendProject(state, action) {
      state.push(action.payload)
    },
    setProjects(state, action) {
      return action.payload
    },
    addUser(state, action) {
        const project = state.find(p => p.id === action.payload.projectId);
        if (project && !project.users.some(user => user.id === action.payload.userId)) {
            project.users.push({ id: action.payload.userId });
        }
    },
    removeUser(state, action) {
        const project = state.find(p => p.id === action.payload.projectId);
        if (project) {
            project.users = project.users.filter(user => user.id !== action.payload.userId);
        }
    }
},
})

export const initializeProjects = () => {
  return async (dispatch) => {
    const projects = await projectService.getAll()
    dispatch(setProjects(projects))
  }
}

export const createProject = (project) => {
  return async (dispatch) => {
    const newProject = await projectService.create(project)
    dispatch(appendProject(newProject))
  }
}

export const updateProject = (id, project) => {
  return async (dispatch) => {
    const newProject = await projectService.update(id, project)
    dispatch(update(newProject))
  }
}

export const addUserToProject = (projectId, userId) => async (dispatch) => {
    const addedUser = await projectUserService.create(projectId, userId)
    dispatch(addUser(addedUser))
}

export const removeUserFromProject = (projectId, userId) => async (dispatch) => {
    const removedUser = await projectUserService.remove(projectId, userId)
    dispatch(removeUser(removedUser))
}

export const { update, appendProject, setProjects, addUser, removeUser } = projectsSlice.actions
export default projectsSlice.reducer