import React, { Component } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import { tableColumn } from './config'
import './index.scss'


class OrderTable extends Component<any, any> {
  constructor (props:any) {
    super(props)
    this.state = this.initialState()
  }
  initialState () {
    return {
      tableData: []
    }
  }
  handleDetail (e:any, item:any) {
    console.log(item)
  }
  componentDidMount () {
    axios.get('/api/today_order').then(res => {
      if (res.data.success) {
        console.log(res.data.data)
        this.setState({tableData: res.data.data.map((val:any, index:number) => {
          val.action = (
            <button className="check_btn" onClick={(e:any) => this.handleDetail(e, val)}>查看</button>
          )
          return {...val, key: index}
        })})
      }
    })
  }
  render () {
    return (
      <div className="order_table">
        <p>当日订单</p>
        <div className="table_wrap">
          <Table columns={tableColumn} dataSource={this.state.tableData} bordered pagination={false} />
        </div>
      </div>
    )
  }
}

export default OrderTable