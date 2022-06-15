import { getInitialData } from "../utils/api";
import { _saveQuestion } from "../utils/_DATA";
import { _getUsers } from "../utils/_DATA";
import { receiveQuestions } from "./questions";
import { addQuestion } from "./questions";
import { receiveUsers } from "./users";
import { addQuestionToUser } from "./users";
import {_saveQuestionAnswer} from "../utils/_DATA"
import { addAnswerToquestion } from "./questions";
import { addAnswerToUser } from "./users";
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { setAuthedUser } from "./authedUser";


export function handleInitialData () {
    return (dispatch) => {
      dispatch(showLoading())
      return getInitialData()
        .then(({ users, questions }) => {
          dispatch(receiveUsers(users))
          dispatch(receiveQuestions(questions))
          dispatch(setAuthedUser(""))
          dispatch(hideLoading())
        })
    }
}

export function handleAddQuestion (optionOneText, optionTwoText){
  return (dispatch, getState) =>{
      const { authedUser} = getState()
      dispatch(showLoading());
      Promise.all([
          _getUsers(),
          _saveQuestion({
              optionOneText,
              optionTwoText,
              author: authedUser,
          }),
        ]).then(([users, question]) => {
          dispatch(addQuestion(question))
          dispatch(addQuestionToUser(users, question))
          dispatch(hideLoading())})
          
           
  }
}
export function handlesaveQuestionAnswer (answer,qid){
  return (dispatch, getState) =>{
      console.log("QiD:", qid)
      const { authedUser, questions } = getState()
      dispatch(showLoading());
      Promise.all([
          _getUsers(),
          _saveQuestionAnswer({
              authedUser,
              qid,
              answer,
          }),
        ]).then((users) => {
         dispatch(addAnswerToquestion (questions, qid, answer, authedUser))
         dispatch(addAnswerToUser (users,qid, answer,authedUser))
         dispatch(hideLoading())
        })   
  }
}