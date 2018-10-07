import axios from 'axios'
import history from '../history'
import {
  fetchHomes,
  fetchPlaces,
  fetchSelectedCategories,
  removeHomes,
  removePlaces
} from './index'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = {}

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    dispatch(getUser(res.data || defaultUser))
    if (res.data.id) {
      dispatch(fetchPlaces(res.data.id))
      dispatch(fetchHomes(res.data.id))
      await dispatch(fetchSelectedCategories(res.data.id))
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(removeHomes())
    dispatch(removePlaces())
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
