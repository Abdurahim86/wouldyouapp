import React, { Component } from 'react'
import { connect } from 'react-redux'
import {handleAddQuestion} from '../actions/shared.js'
import { Redirect, withRouter } from 'react-router-dom'

class Newquestion extends Component {
    state={
        option1: '',
        option2: '',
        toHome: false,
    }
    handleChangeoption1 = (e) => {
        const option1 = e.target.value
        this.setState(() => ({
          option1,
        }))
      }
      handleChangeoption2 = (e) => {
        const option2 = e.target.value
        this.setState(() => ({
          option2,
        }))
      }
      handleSubmit = (e) => {
        e.preventDefault()
        const { option1 , option2} = this.state
        const { dispatch} = this.props
        dispatch(handleAddQuestion(option1,option2))
        this.setState(() => ({
            option1: '',
            option2: '',
            toHome: true,
        }))
      }
  render() {
    const { option1, option2, toHome } = this.state
    if (toHome === true) {
        return <Redirect to='/' />
      }
    return (
        <div className='container'>
            <div className="card">
                <h3 className="card-header">
                    Create New Question
                </h3>
                <div className="card-body2 m-3 ">
                    <span className='m-3'>
                        complete the question:
                    </span>
                    <h3 className='m-3'>
                        Would you rather-
                    </h3>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            className="form-control m-3" 
                            id="option1" 
                            placeholder="Enter Option one Text Here"
                            value={option1}
                            onChange={this.handleChangeoption1}
                        />
                            <h3 className='m-3'>
                                OR
                            </h3>
                        <input 
                            type="text" 
                            className="form-control m-3" 
                            id="option2" 
                            placeholder="Enter Option two Text Here" 
                            value={option2}
                            onChange={this.handleChangeoption2}
                        />
                        <button 
                            type="submit" 
                            className="btn btn-primary m-3"
                            disabled={option1 === '' || option2 === ''}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>  
    )
  }
}
export default withRouter(connect()(Newquestion))