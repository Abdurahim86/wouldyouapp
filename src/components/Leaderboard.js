import React from 'react'


function Leaderboard (props) {
    console.log(props)
    const {users} = props
    const leadearBoardData = (users) => {
        let leaderboard_arr = {}
        for(let key in users)
        {
            let total_answer = Object.keys(users[key].answers).length
            let total_asked = users[key].questions.length
            let score = total_asked + total_answer
            leaderboard_arr[key] = {
                ...users[key] , 
                "totalAnswered" : total_answer , 
                "totlaAsked": total_asked, 
                "score": score
            }
        }
        const leaderboard_arr_sort = Object
                                    .keys(leaderboard_arr)
                                    .sort((a,b) => leaderboard_arr[b].score- leaderboard_arr[a].score)
        return{
            leaderboard_arr,
            leaderboard_arr_sort
        }
    }
    const {leaderboard_arr , leaderboard_arr_sort} = leadearBoardData(users)
    return (
        <div className='container'>
        <ul>
            {
                leaderboard_arr_sort.map(l =>
                    <li key={l}>
                    <div className="card">
                        <div className="card-body border border-danger d-flex justify-content-between">
                            <div className='align-middle w-40 border-end m-2'>
                                <img 
                                    src={leaderboard_arr[l].avatarURL} 
                                    alt={`Avatar of ${leaderboard_arr[l].name}`} 
                                    className="avatar" 
                                />
                            </div>
                            <div className="align-middle w-40">
                                <h3 className="card-title text-center p-3">
                                    {leaderboard_arr[l].name}
                                </h3>
                                <ul>
                                    <li className="card-text p-2">
                                        Answered Questions : 
                                        {leaderboard_arr[l].totalAnswered}
                                    </li>
                                    <li className="card-text p-2">
                                        Created Questions : 
                                        {leaderboard_arr[l].totlaAsked}
                                    </li>
                                </ul>
                            </div>
                            <div className="align-middle text-end w-20 ">
                                <div className="card mt-4">
                                    <div className="card-header bg-my text-center">
                                        Score
                                    </div> 
                                    <div className="card-body border border-secondary">
                                        <span className='text-center badge bg-danger rounded-pill fs-3'>
                                            {leaderboard_arr[l].score}
                                        </span>
                                    </div>   
                                </div>   
                            </div>
                            
                        </div>
                    </div>
                </li>)
            }
        </ul> 
    </div>
    )
}


export default Leaderboard