import { createSlice } from '@reduxjs/toolkit'
import { ticketService } from '../services/apiServiceFactory'


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
      updateField(state, action) {
        return state.map(ticket =>
         ticket.id !== action.payload.id ? ticket : { ...ticket, [action.payload.field]: action.payload.value }
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

export const createTicket = (ticket) => {
  return async (dispatch) => {
    const newTicket = await ticketService.create(ticket)
    dispatch(appendTicket(newTicket))
  }
}


export const updateTicket = (id, ticket) => {
  return async (dispatch) => {
    const updatedTicket = await ticketService.update(id, ticket)
    dispatch(update(updatedTicket))
  }
}

export const updateTicketField = (id, field, value) => {
    return async (dispatch) => {
        const updatedTicket = await ticketService.update(id, { [field]: value })
        dispatch(updateTicketField({ id, field, value: updatedTicket[field] }))
    }
}

export const { updateField, appendTicket, setTickets, update  } = ticketsSlice.actions
export default ticketsSlice.reducer