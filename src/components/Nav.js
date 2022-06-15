import React , {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink,  withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
handleLogout(e){
    const { dispatch} = this.props
    const id = ""
    dispatch(setAuthedUser(id))
}
render() {  
    const {authedUser ,users} = this.props
    const path = this.props.location.pathname
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mx-auto my-0">
                            <li   className='p-3'   >
                                <NavLink exact  
                                    className={path === "/" ? "active" : null } 
                                    to='/' >
                                    Home
                                </NavLink>
                            </li>
                            <li   className='p-3' >
                                <NavLink 
                                    className={path === "/new" ? "active" : null } 
                                    to='/new' >
                                    New Question
                                </NavLink>
                            </li>
                            <li className='p-3'>
                                <NavLink  
                                    className={path === "/Leaderboard" ? "active" : null }  
                                    to='/Leaderboard' >
                                    Leader Board
                                </NavLink>
                            </li>
                        </ul>
                        {authedUser ? (
                            <ul className="navbar-nav m-auto">
                                <li className='p-3 m-auto'>
                                    <img 
                                        src={users[authedUser].avatarURL} 
                                        alt={`Avatar of ${users[authedUser].name}`} 
                                        className="avatar2"
                                    />
                                </li>
                                <li className='p-3 m-auto'>
                                    {`Hello, ${users[authedUser].name}`}
                                </li>
                                <li className='p-3 m-auto'>
                                    <NavLink 
                                        to="/login" 
                                        onClick={(e) => this.handleLogout(e)}> 
                                        logout
                                    </NavLink>
                                </li>
                            </ul>)
                            : null
                        }
                    </div>
                </div>
            </nav>  
        )
    }
}

function mapStateToProps({ authedUser ,users }){
    return{
        authedUser,
        users,
    }
}
export default withRouter(connect(mapStateToProps)(Nav))