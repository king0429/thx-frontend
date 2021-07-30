import React, {Component} from 'react'
import { Table, Tabs } from 'antd'
import { columns } from './config'
import productModel from '../../model/product.model'

const { TabPane } = Tabs;


class Settings extends Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = this.initialState()
  }
  initialState () {
    return {
      tableData: [],
      types: [],
      currentType: "0"
    }
  }
  componentDidMount () {
    productModel.productList().then((res:any) => {
      if (res.data.success) {
        this.setState({tableData: res.data.data.map((val:any, index:number) => {
          return {...val, key: index}
        })})
      }
    }).then(productModel.productTypes).then((res:any) => {
      if (res.data.success) {
        console.log(res.data.data)
        this.setState({types: res.data.data})
      }
    })
  }
  render ():Object {
    return (
      <div className="production_page">
        <div className="tabs">
          <Tabs defaultActiveKey={this.state.currentType}>
            {
              this.state.types.map((val:any, index:number) => {
                return <TabPane tab={
                  <div style={{padding: "0 15px"}}>{val.name}</div>
                } key={index.toString()}></TabPane>
              })
            }
          </Tabs>
        </div>
        <Table columns={columns} dataSource={this.state.tableData} pagination={{pageSize: 20}}></Table>
      </div>
    )
  }
}


export default Settings