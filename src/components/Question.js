import React, { Component } from 'react'
import { connect } from 'react-redux'


class Question extends Component {
    render(){
        const {user, question}= this.props
        return(
            <div className="card">
                <h5 className="card-header">{user.name} asks:</h5>
                <div className="card-body">
                    <div className='align-middle w-25 border-end m-2'>
                        <img 
                            src={user.avatarURL} 
                            alt={`Avatar of ${user.name}`} 
                            className="avatar" 
                        />
                    </div>
                    <div className="align-middle w-75">
                        <h3 className="card-title text-center p-3 badge bg-primary">
                            Would you rather
                        </h3>
                         <ul>
                            <li className="card-text p-2">
                                {question.optionOne.text}
                            </li>
                            <li className="card-text p-2">
                                    or
                            </li>
                            <li className="card-text p-2">
                                {question.optionTwo.text}
                           </li>
                         </ul>
                        <div className="d-grid gap-2">
                            <button type="button" className="btn btn-primary">
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

export default connect(mapStateToProps)(Question)