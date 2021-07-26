import React, { Component, ReactNode } from 'react'
import { Table } from 'antd'
import axios from 'axios'

class OrderTable extends Component {
  constructor (props:any) {
    super(props)
  }
  componentDidMount () {
    axios.get('/api/test').then(res => {
      console.log(res)
    })
  }
  render ():ReactNode {
    return (
      <div>
        order table
      </div>
    )
  }
}

export default OrderTable