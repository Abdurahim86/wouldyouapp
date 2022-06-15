import React , {Component} from 'react';
import { Route  , Redirect , withRouter} from 'react-router-dom';
import { connect  } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const {authedUser ,users } = this.props
    if(users[authedUser] === undefined){
        return(
            <Redirect to={{ pathname:'/login',
                            state: {from: this.props.computedMatch}
                        }}
            />)
    }else{
        return((
            <Route  
                path={this.props.path}
                exact={this.props.exact}
                component={this.props.component}/>
            ))
        }
    }
  }

 function mapStateToProps({authedUser, users}){
    return{
          authedUser,
          users,
    }
}
export default withRouter(connect(mapStateToProps)(PrivateRoute))
