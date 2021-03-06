import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import {Login, Signup} from '../../components'

const styles = theme => ({
  paper: {
    width: 'calc(100% / 3)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    margin: 'auto'
  }
})

class ModalAbout extends React.Component {
  constructor() {
    super()
    this.state = {
      auth: 'login',
      checked: true
    }
  }

  handleSlide = () => {
    this.setState(state => ({checked: !state.checked}))
  }

  handleClick = auth => {
    this.setState({auth})
  }

  render() {
    const {classes, history, location, isLoggedIn} = this.props
    const {checked} = this.state
    const {pathname} = location
    return (
      <div className="flex-container">
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!isLoggedIn}
          onBackdropClick={() => {
            pathname === '/about' && history.push('/home')
          }}
        >
          <div className="flex-container all-center">
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
              <div className={classes.paper}>
                <Typography variant="display2">Loco</Typography>
                <Typography
                  style={{color: 'gray'}}
                  variant="title"
                  gutterBottom
                >
                  Leverage the power of Google Maps to easily compare your
                  options when looking for a new home
                </Typography>
                <Typography variant="body1" gutterBottom>
                  To get started, login or signup
                </Typography>
                <div className="about-option">
                  {this.state.auth === 'login' ? (
                    <Login handleSlide={this.handleSlide} />
                  ) : (
                    <Signup handleSlide={this.handleSlide} />
                  )}
                </div>
              </div>
            </Slide>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapState = state => ({
  center: state.coordinates.center,
  isLoggedIn: !!state.user.id
})

ModalAbout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState)(withStyles(styles)(ModalAbout))
