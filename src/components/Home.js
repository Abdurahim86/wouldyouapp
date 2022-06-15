import React, { Component } from 'react'
import Tabs from './Tabs'

class Home extends Component {
  render() {
      console.log(this.props)
    return (
      <div>
         <Tabs />
      </div>
    )
  }
}



export default Home