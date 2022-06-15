import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleState: 1
    };
  }
  render() {
    return (
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={this.state.toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => this.setState({ toggleState: 1 })}
          >
             unanswered Questions
          </button>
          <button
            className={this.state.toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => this.setState({ toggleState: 2 })}
          >
            answered Questions
          </button>
        </div>
        <div className="content-tabs">
          <div
            className={this.state.toggleState === 1 ? "content  active-content" : "content"}
          >
            <div>
              <ul>
                {this.props.unansweredQ_id
                 .map(q => 
                <li key={q}>
                  <div>
                    <Question id={q}/>
                  </div>
                </li>
              )}
              </ul> 
            </div>
          </div>

          <div
            className={this.state.toggleState === 2 ? "content  active-content" : "content"}
          >
            <div>
              <ul>
                {this.props.answeredQ_id
                .map(q => 
                <li key={q}>
                  <div>
                    <Question id={q} />
                  </div>
                </li>)}
              </ul> 
            </div>
          </div>
        </div>
    </div>
    )
  }
}

function mapStateToProps ({ questions ,authedUser ,users }) {
  const questions_id = questions ?  Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp) : []
  const loginuser = users[authedUser]
  const loginusr_answeredQ = loginuser ?  Object.keys(loginuser.answers) : [] 
  const unansweredQ = questions_id.filter(q => !loginusr_answeredQ.includes(q))
  const answeredQ = questions_id.filter(q => loginusr_answeredQ.includes(q))
  return {
    answeredQ_id: answeredQ,
    unansweredQ_id : unansweredQ
  }
}

export default connect(mapStateToProps)(Tabs)