import { createSlice } from '@reduxjs/toolkit'
import ticketService from '../services/tickets'


const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: [],
  reducers: {
    appendTicket(state, action) {
      state.push(action.payload)
    },
    setTickets(state, action) {
      return action.payload
    },
    update(state, action) {
      return state.map(ticket =>
        ticket.id !== action.payload.id ? ticket : action.payload
      )
    },
  },
})

export const initializeTickets = () => {
  return async (dispatch) => {
    const tickets = await ticketService.getAll()
    dispatch(setTickets(tickets))
  }
}

export const createTicket = (ticketObject) => {
  return async (dispatch) => {
    const newTicket = await ticketService.create(ticketObject)
    dispatch(appendTicket(newTicket))
  }
}


export const updateTicket = (ticketObject) => {
  return async (dispatch) => {
    const updatedTicket = await ticketService.update(ticketObject)
    dispatch(update(updatedTicket))
  }
}

export const { appendTicket, setTickets, update  } = ticketsSlice.actions
export default ticketsSlice.reducer