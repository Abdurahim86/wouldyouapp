import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handlesaveQuestionAnswer } from '../actions/shared'
import { Route } from 'react-router-dom'

class Pollanswer extends Component {
    state={
        selectedOption: 'optionOne',
        toPollstatus: false
    }
    handleChangeoption = (e) => {
        this.setState({
            selectedOption: e.target.value,
          })
    }
    handleSubmit = (e, id) => {
        e.preventDefault()
    
        const { selectedOption } = this.state
        const { dispatch} = this.props
        
        dispatch(handlesaveQuestionAnswer(selectedOption,id))
        this.setState(() => ({
            toPollstatus : true
          }))
      }
      
  render() {
      const {question,questionowner , qid } = this.props
      const { toPollstatus } = this.state
      if (toPollstatus === true) {
        return <Route exact path={`/question/${qid}`} />
      }
     
        return (
            <div className='container'>
                <div className="card m-0 mb-2">
                    <h4 className="card-header p-3">{questionowner.name} asks:</h4>
                    <div className="card-body d-flex bd-highlight">
                        <div className='p-2 bd-highlight border-end m-2'>
                            <img 
                                src={questionowner.avatarURL} 
                                alt={`Avatar of ${questionowner.name}`} 
                                className="avatar" 
                            />
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight ">
                            <div className="card-title d-flex p-2 bd-highlight justify-content-center bg-primary">
                                <h4>Would you rather</h4>
                            </div>
                            <ul className='text-center '>
                                <li className="card-text p-3 m-2">
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="QuestionOption" 
                                            id="QuestionOptionOne"
                                            value="optionOne"
                                            onChange={this.handleChangeoption} 
                                            defaultChecked
                                        />
                                        <label 
                                            className="form-check-label" 
                                        >
                                            <h5>{question.optionOne.text}</h5>
                                        </label>
                                    </div>   
                                </li>
                                <li className="card-text d-inline-flex p-2 bd-highlight bg-primary">
                                        <h5>or</h5>
                                </li>
                                <li className="card-text p-3 m-2">
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="QuestionOption" 
                                            id="QuestionOptionTow"
                                            value="optionTwo"
                                            onChange={this.handleChangeoption} 
                                        />
                                        <label 
                                            className="form-check-label" 
                                        >
                                            <h5>{question.optionTwo.text}</h5>
                                        </label>
                                    </div>   
                                </li>
                            </ul>
                            <div className="d-grid gap-2 col-6 mx-auto my-2">
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={(e) => this.handleSubmit(e, question.id)}
                                >
                                    submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
          )    
  }
}

function mapStateToProps(users, props){
    return{
        users,
        props
    }
}
export default connect(mapStateToProps)(Pollanswer)

