import React from 'react'
import {connect} from 'react-redux'
import {fetchHomes, fetchPlaces} from '../../../store'
import AddressCard from './AddressCard'
import {sort} from '../../../utilities'

class List extends React.Component {
  componentDidMount() {
    // THIS LOADS THE LIST UPON LOGIN, DONT REMOVE :)
    if (this.props.userId) {
      if (this.props.name === 'homes') {
        this.props.fetchHomes(this.props.userId)
      } else {
        this.props.fetchPlaces(this.props.userId)
      }
    }
  }

  render() {
    const {userId, list, name, children} = this.props

    return !userId || !list ? (
      children
    ) : (
      <div>
        <ul className="list">
          {sort(list).map(item => {
            return (
              <li className="li-item" key={item.id}>
                {name === 'homes' ? (
                  <AddressCard home={item} />
                ) : (
                  <AddressCard place={item} />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapHomes = state => ({
  userId: state.user.id,
  list: state.homes,
  places: state.places,
  name: 'homes'
})

const mapPlaces = state => ({
  userId: state.user.id,
  list: state.places,
  name: 'places'
})

const mapHomesDispatch = dispatch => {
  return {
    fetchHomes: userId => dispatch(fetchHomes(userId))
  }
}

const mapPlacesDispatch = dispatch => {
  return {
    fetchPlaces: userId => dispatch(fetchPlaces(userId))
  }
}

export const HomesList = connect(mapHomes, mapHomesDispatch)(List)
export const PlacesList = connect(mapPlaces, mapPlacesDispatch)(List)
