import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pollanswer from './Pollanswer'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class Pollstatus extends Component {
    calculatepercent(total, num){
        return (num/total)*100
    }
  render() {
      const {users,id,question,authUser,authedUser } = this.props
      if(!question)
      {
            return <Redirect to='/404' />
      }
      const quesOneVot = question["optionOne"]["votes"].length
      const quesTwoVot = question["optionTwo"]["votes"].length
      const total = quesOneVot + quesTwoVot
      const OP_ONE_PER = this.calculatepercent(total,quesOneVot)
      const OP_TWO_PER = this.calculatepercent(total,quesTwoVot)
      const useransweroption = authedUser? users[authedUser]["answers"][id] : []
      const questionowner = users ? users[question.author] : []
      const answersarr = authUser ? authUser.answers : []
      if (!answersarr.hasOwnProperty(id)){
        return (
            <Pollanswer questionowner={questionowner} question={question} qid={id}/>           
          )
      }else{
        return (  
            <div className='container'>
                <div className="card m-0 mb-2">
                    <h4 className="card-header text-center p-3">
                        {questionowner.name} asks
                    </h4>
                    <div className="card-title d-flex p-2 bd-highlight justify-content-center bg-my">
                        <h4>Results</h4>
                    </div>
                    <div className="card-body d-flex bd-highlight">
                        <div className='p-2 bd-highlight m-auto'>
                            <img 
                                src={questionowner.avatarURL} 
                                alt={`Avatar of ${questionowner.name}`} 
                                className="avatar" 
                            />
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight ">
                            <div className="card  resultcard m-0 mb-2 ">
                                <div className='d-flex flex-row'>
                                    <div className="p-2 flex-grow-1">
                                        <h4 className="card-header resultheader p-3 text-center">
                                            Would You Rather Be a {question.optionOne.text} ?
                                        </h4>
                                    </div>
                                    {useransweroption === "optionOne" ? 
                                        <div className="p-2">
                                            <span className='badge bg-warning'>Your <br />vote</span>
                                        </div>  
                                        :  <div></div>
                                    }
                                </div>
                                <div className="progress m-4 " style={{height: "35px"}}>
                                    <div className="progress-bar progress-bar-striped bg-danger " style={{width:`${OP_ONE_PER}%`}} >{`${OP_ONE_PER}%`}</div>
                                </div>
                                <div>
                                    <h4 className=" p-3 text-center">
                                        {`${quesOneVot} out of ${total} votes`}
                                    </h4>
                                </div>
                            </div> 
                            <div className="card resultcard m-0 mb-2 ">
                            <div className='d-flex flex-row'>
                                    <div className="p-2 flex-grow-1">
                                        <h4 className="card-header resultheader p-3 text-center">
                                            Would You Rather Be a {question.optionTwo.text} ?
                                        </h4>
                                    </div>
                                    {useransweroption === "optionTwo" ? 
                                        <div className="p-2">
                                            <span className='badge bg-warning'>Your <br />vote</span>
                                        </div>  
                                        :  <div></div>
                                    }
                                </div>
                                <div className="progress m-4" style={{height: "35px"}}>
                                    <div className="progress-bar progress-bar-striped bg-danger" style={{width:`${OP_TWO_PER}%`}}>{`${OP_TWO_PER}%`}</div>
                                </div>
                                <div>
                                    <h4 className=" p-3 text-center">
                                        {`${quesTwoVot} out of ${total} votes`}
                                    </h4>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
      }
    
  }
}

function mapStateToProps({ questions , authedUser ,users }, props){
    const { id } = props.match.params
    const authUser = users ? users[authedUser] : [];
    const question = questions ?  questions[id] : [];
    return{
        users,
        id,
        question,
        authUser,
        authedUser
    }
}
Pollstatus.propTypes = {
    users: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    authUser: PropTypes.object.isRequired,
    id:PropTypes.string.isRequired,
    authedUser:PropTypes.string.isRequired,

}
export default connect(mapStateToProps)(Pollstatus)

