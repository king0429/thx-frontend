import React, {Component, ReactNode} from 'react'
import axios from 'axios'


class Contact extends Component<any, any> {
  constructor (props:any) {
    super(props)
    this.state = this.initialState()
  }
  initialState () {
    return {}
  }
  componentDidMount () {
    axios.get('/api/contact').then(res => {
      console.log(res)
    })
  }
  render ():ReactNode {
    return (
      <div className="contact_list">
        contact
      </div>
    )
  }
}

export default Contact