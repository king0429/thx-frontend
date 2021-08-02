import React, {Component, ReactNode} from 'react'
import { Table, Select, DatePicker } from 'antd'
import { columns } from './config'
import orderModel from '../../model/order.model'
import customerModel from '../../model/customs.model'
import { orderListParams } from '../../interface/model/order'
import $header from '../../libs/headers'
import './index.scss';

const { Option } = Select;

class Order extends Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = this.initialState()
  }
  initialState () {
    return {
      tableData: [],
      customers: [],
      filter: {},
      page_size: 10,
      page: 1,
      total: 0
    }
  }
  async handleOrderList(page:number):Promise<any> {
    const params:orderListParams = {
      page,
      page_size: this.state.page_size
    }
    if (this.state.filter.order_number && this.state.filter.order_number.trim()) {
      params.order_number = this.state.filter.order_number
    }
    if (this.state.filter.product_name && this.state.filter.product_name.trim()) {
      params.product_name = this.state.filter.product_name
    }
    if (this.state.filter.customer) {
      params.customer = this.state.customers[this.state.filter.customer].title
    }
    if (this.state.filter.plan_delivery_date) {
      params.plan_delivery_date = this.state.filter.plan_delivery_date.format('yyyy/M/D')
    }
    if (this.state.filter.real_delivery_date) {
      params.real_delivery_date = this.state.filter.real_delivery_date.format('yyyy/M/D')
    }
    if (this.state.filter.warehouse_date) {
      params.warehouse_date = this.state.filter.warehouse_date.format('yyyy/M/D')
    }
    orderModel.getOrderList(params).then((res:any) => {
      if (res.data.success) {
        this.setState({page, total: res.data.data.total, tableData: res.data.data.list.map((val:any, index:number) => {
          return {...val, key: index}
        })})
      }
    })
  }
  async handleCustomerList():Promise<any> {
    const that = this
    customerModel.getOrderCustomers().then((res:any) => {
      if (res.data.success) {
        const customers:Array<any> = res.data.data.map((val:string, index: number) => ({title: val,id: index + 1 }))
        customers.unshift({id: 0, title: '全部'})
        that.setState({customers})
      }
    })
  }
  handleSearch (_e:any) {
    this.handleOrderList(1)
  }
  handleInput (e:any, key:string) {
    const value = e.target.value
    const filter:orderListParams = this.state.filter
    filter[key] = value
    this.setState({filter})
  }
  handleSelectCustomer (e:number) {
    const filter:orderListParams = this.state.filter
    filter.customer = e
    this.setState({filter})
  }
  handlePage (e:number) {
    this.handleOrderList(e)
  }
  handleReset (_e:any) {
    this.setState({filter: {}}, () => {
      this.handleOrderList(1)
    })
    
  }
  handleDate (e:string, key:string) {
    const filter:orderListParams = this.state.filter
    filter[key] = e
    this.setState({filter})
  }
  componentDidMount () {
    // console.log(this.props)
    $header({title: this.props.title})
    this.handleOrderList(1).then(() => this.handleCustomerList())
  }
  render ():ReactNode {
    return (
      <div className="order_page">
        <div className="table_filter">
          <div className="filter_item">
            <span>订单号</span>
            <div>
              <input type="text" onChange={(e:any) => this.handleInput(e, 'order_number')} />
            </div>
          </div>
          <div className="filter_item">
            <span>产品名称</span>
            <div>
              <input type="text" onChange={(e:any) => this.handleInput(e, 'product_name')}  />
            </div>
          </div>
          <div className="filter_item">
            <span>客户</span>
            <div>
              <Select value={this.state.filter.customer || 0} onChange={(e:number) => this.handleSelectCustomer(e)}>
                {this.state.customers.map((val:any, index:number) => {
                  return (
                    <Option value={val.id} key={index}>{val.title}</Option>
                  )
                })}
              </Select>
            </div>
          </div>
          <div className="filter_item">
            <span>交货日期</span>
            <div>
              <DatePicker placeholder="" value={this.state.filter.plan_delivery_date || ''} onChange={(e:any) => this.handleDate(e, 'plan_delivery_date')}></DatePicker>
            </div>
          </div>
          <div className="filter_item">
            <span>出货日期</span>
            <div>
              <DatePicker value={this.state.filter.real_delivery_date || ''} placeholder="" onChange={(e:any) => this.handleDate(e, 'real_delivery_date')}></DatePicker>
            </div>
          </div>
          <div className="filter_item">
            <span>入库日期</span>
            <div>
              <DatePicker placeholder="" value={this.state.filter.warehouse_date} onChange={(e:any) => this.handleDate(e, 'warehouse_date')}></DatePicker>
            </div>
          </div>
          <div className="filter_item filter_result">
          {
            this.state.total ?
            <p>当前符合条件数据共{this.state.total}条</p>
            :
            null
          }
        </div>
          <div className="filter_item filter_button">
            <button onClick={(e:any) => this.handleReset(e)}>重置</button>
            <button onClick={(e:any) => this.handleSearch(e)}>搜索</button>
          </div>
        </div>

        <div className="table_wrap">
          <Table bordered columns={columns} dataSource={this.state.tableData} pagination={{showSizeChanger: false, onChange: (e:number) => this.handlePage(e), total: this.state.total, pageSize: this.state.page_size}}></Table>
        </div>
      </div>
    )
  }
}


export default Order