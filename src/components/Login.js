import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state={
    AUTHED_ID : "",
    redirectToReferrer: false,
    from : ""
  }
  handleChange = (e) => {
    this.setState({
      AUTHED_ID: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { AUTHED_ID } = this.state
    const { dispatch, location} = this.props
    const from =  location.state ? location.state.from.url : ""
    dispatch(setAuthedUser(AUTHED_ID))
    this.setState(() => ({
      AUTHED_ID : "",
      redirectToReferrer : true,
      from
    }))
  }
  pagename = (checkform) =>{
    switch (checkform) {
      case "/" :
        return "HOME"
        case "/new" :
          return "New Question"
        case "/Leaderboard" :
          return "Leader Board"
      default :
        return checkform
    }
  }
  
  render() {
    const {redirectToReferrer, from} = this.state
    const {location, history} = this.props
    const checkfrom = location.state ? location.state.from : null
    const checkprivate = (checkfrom && checkfrom !== location && history.length!== 1)
                         ? this.pagename(checkfrom.url) 
                         : null
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    return (
      <div className="container">
        <div className="card m-0 mb-2">
            <h4 className="card-header p-3 text-center">Welcome to Would You Rather APP</h4>
            <div className=' bg-light'>
                <img 
                  src={ require('../img/react-redux.PNG') }
                  className="rounded mx-auto d-block"
                  alt="Ract-Redux logo"
                />
                <h4 className='text-center text-info'>Sign in</h4>
            </div>
            {
              checkprivate ? 
              <h6 className='text-center text-danger p-2'>
                Please sign in before access <br/><strong>{checkprivate}  page</strong>
              </h6> 
              : null
            }
          </div>
        <select 
          className="form-select form-select-lg mb-3" 
          aria-label=".form-select-lg example" 
          onChange={this.handleChange} 
          value={this.state.value}>
          <option value="select one of the users">
            select one of the users
          </option>
          <option value="sarahedo">
            Sarah Edo
          </option>
          <option value="tylermcginnis">
            Tyler McGinnis
          </option>
          <option value="johndoe">
            John Doe
            </option>
        </select>
        <div className="d-grid gap-2 col-6 mx-auto my-2">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={(e) => this.handleSubmit(e)}>
            submit
          </button>
        </div>
      </div>
    )
  }
}
export default connect()(Login)