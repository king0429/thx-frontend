import React, {Component} from 'react'
import { Table } from 'antd'
import { columns } from './config'
import axios from 'axios'

class Settings extends Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = this.initialState()
  }
  initialState () {
    return {
      tableData: []
    }
  }
  componentDidMount () {
    axios.get('/api/warehouse').then(res => {
      if (res.data.success) {
        console.log(res.data.data)
        this.setState({tableData: res.data.data.map((val:any, index:number) => {
          return {...val, key: index}
        })})
      }
    })
  }
  render ():Object {
    return (
      <div className="production_page">
        <Table columns={columns} dataSource={this.state.tableData} pagination={{pageSize: 20}}></Table>
      </div>
    )
  }
}


export default Settings