import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Leaderboard from './Leaderboard';
import Newquestion from './Newquestion';
import Nav from './Nav'
import Pollstatus from './Pollstatus'
import history from './history';
import LoadingBar from 'react-redux-loading-bar'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import PageNotFound from './pageNotFound'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
    history.replace()
    history.length = 0 
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
            {this.props.loading === true
            ? null
            : <div>
              <Nav />
              <Switch>
                <Route path='/login' exact render={props => <Login {...props}/>} />
                <Route path='/404' exact render={props => <PageNotFound {...props}/>} />
                <PrivateRoute path='/new'  exact component={Newquestion}/>
                <PrivateRoute path='/question/:id' exact  component={Pollstatus}/> 
                <PrivateRoute path='/Leaderboard' exact component={Leaderboard} />
                <PrivateRoute   path='/' exact component={Home}/>  
                <Route component={PageNotFound} />             
              </Switch>
            </div>}
        </Fragment>
      </Router>
    )
  }
}
function mapStateToProps ({authedUser})
{
  return{
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)

