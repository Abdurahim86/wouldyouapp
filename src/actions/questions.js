export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';

export function addQuestion (question){
    return{
        type: ADD_QUESTION,
        question,
    }
}
export function receiveQuestions (questions) {
    return{
        type: RECEIVE_QUESTIONS,
        questions
    }
}
export function addAnswerToquestion (questions, qid, answer, authedUser){
    return{
        type: ADD_ANSWER_TO_QUESTION,
        questions,
        qid,
        answer, 
        authedUser
    }
}