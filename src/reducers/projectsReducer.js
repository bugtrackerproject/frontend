import { createSlice } from '@reduxjs/toolkit'
import { projectService } from '../services/apiServiceFactory'

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

export const { update, appendProject, setProjects } = projectsSlice.actions
export default projectsSlice.reducer