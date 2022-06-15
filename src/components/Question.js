import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class Question extends Component {
    toPoll = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/question/${id}`)
      }
    render(){
        const {user, question}= this.props
        return(
            <div className="card m-0 mb-2">
                <h4 className="card-header p-3">{user.name} asks:</h4>
                <div className="card-body d-flex bd-highlight">
                    <div className='p-2 bd-highlight border-end m-2'>
                        <img 
                            src={user.avatarURL} 
                            alt={`Avatar of ${user.name}`} 
                            className="avatar" 
                        />
                    </div>
                    <div className="p-2 flex-grow-1 bd-highlight ">
                        <div className="card-title d-flex p-2 bd-highlight justify-content-center bg-primary">
                            <h4>Would you rather</h4>
                        </div>
                        <ul className='text-center '>
                            <li className="card-text p-2">
                                <h5>
                                    {question.optionOne.text}
                                </h5>
                            </li>
                            <li className="card-text d-inline-flex p-2 bd-highlight p-2 bg-primary">
                                    <h5>or</h5>
                            </li>
                            <li className="card-text p-2">
                                <h5>
                                    {question.optionTwo.text}
                                </h5>
                           </li>
                         </ul>
                        <div className="d-grid gap-2 col-6 mx-auto my-2">
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={(e) => this.toPoll(e, question.id)}
                            >
                                View Poll
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps({ questions , authedUser ,users }, {id }){
    const question = questions ?  questions[id] : [];
    const user = users ? users[question.author] : [];
    return{
        question,
        user,
    }

}

export default withRouter(connect(mapStateToProps)(Question))