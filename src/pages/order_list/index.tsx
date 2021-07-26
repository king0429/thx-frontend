import React, { Component } from 'react'
import orderModel from '../../model/order.model'
import './index.scss'
import { orderListQuery as OrderFilter } from '../../interface/model/order'
import { logisiticDomain } from '../../config'


import { Table, Spin, Radio, Tabs, Form, Button, Input, message, DatePicker, FormInstance, Checkbox } from 'antd';
import { columns, statusTab, words, processStatus, companyName  } from './config'
import DetailModal from './dialog/detail'
import CancelOrder from './dialog/cancelOrder'
import BatchPickUp from './dialog/batchPickUp'
import ExpressDetail from './dialog/expressDetail'
import EmptyComponent from '../../components/empty'

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

class orderList extends Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = this.initialState()
   
  }
  initialState():any {
    return {
      words,
      orderListData: [],
      page: 1,
      size: 10,
      totalNumber: 0,
      loading: true,
      currentTab: 2,
      count: 0,
      currentItem: {},
      selectedRowKeys: [],  
      selectedRows: [],
      detailModalShow: false,
      pickUpModalShow:false,
      batchPickUpShow: false,
      cancelOrderShow:false,
      cancelOrderModel: false,
      expressDetailShow: false,
      exportLoading: false,
      formSearch: [],
      statistics: [],
      formInit: {
        status: 0,
        page_id: 1,
        size: 10,
        product_fake_id: null,
        product_title: '',
        combined_key: null,
        created_time_min: null,
        created_time_max: null,
        process_status: null,
        express_no: null,
        express_company_id: null,
        delivery_time_min: null,
        delivery_time_max: null,
        express_label_printed: null,
        sort_direction: null,
        express_picked_up: null
      },
      filter: {
        page_id: 1,
        status: 2
      },
      dates: [],

    }

  }

  componentDidMount() {
    this.getDataList(this.state.page)
    const form = [...Array(7)].map(_ => React.createRef<FormInstance>());
    this.setState({ formSearch: form })
  }
  // 搜索表单
  formatFormSearch(id: number) {
    const productId = 
      <Form.Item label={this.state.words.product_id} name="product_fake_id">
        <Input onPressEnter={(e:any)=> this.handleSearch(e)} />
      </Form.Item>
    const productTitle = 
      <Form.Item label={this.state.words.product_title} name="product_title">
        <Input onPressEnter={(e:any)=> this.handleSearch(e)} />
      </Form.Item>
    const orderNumber = 
      <Form.Item label={this.state.words.order_number} name="combined_key">
          <Input onPressEnter={(e:any)=> this.handleSearch(e)} />
        </Form.Item>
    const logisticsNumber =
      <Form.Item label={this.state.words.logistics_number} name="express_no">
        <Input onPressEnter={(e:any)=> this.handleSearch(e)} />
      </Form.Item>
    const processStatusForm = 
      <Form.Item label={this.state.words.process_status} name="process_status">
        <Radio.Group onChange={(e: any) => this.onChangeStatus(e, 'process_status')}>
          <Radio.Button value={0}>{processStatus[0].name}</Radio.Button>
          <Radio.Button value={1}>{processStatus[1].name}</Radio.Button>
        </Radio.Group>
      </Form.Item>
    const processForm = 
      <Form.Item label={this.state.words.process_status} name="process_status">
        <Radio.Group onChange={(e: any) => this.onChangeStatus(e, 'process_status' )}>
          {
            processStatus.map((val: any, id: number) => {
              return (
                <Radio.Button value={val.id} key={id} >{val.name}</Radio.Button>
              )
            })
          }
        </Radio.Group>
      </Form.Item>
    const company = 
      <Form.Item label={this.state.words.logistics_company} name="express_company_id">
        <Radio.Group onChange={(e: any) => this.onChangeStatus(e, 'express_company_id')}>
          {
            companyName.map((val: any, id: number) => {
              return (
                <Radio.Button value={id} key={id}>{val.name}</Radio.Button>
              )
            })
          }
        </Radio.Group>
      </Form.Item>
    const orderStatus =
      <Form.Item label={this.state.words.process_status} name="status">
        <Radio.Group onChange={(e: any) => this.onChangeStatus(e, 'status')}>
          {
            statusTab.map((val: any, id: number) => {
              return (
                <Radio.Button value={val.id} key={val.id}>{val.name}</Radio.Button>
              )
            })
          }
        </Radio.Group>
      </Form.Item>
    const pickUpTime = 
      <Form.Item label={this.state.words.request_pick_up_time} name="delivery_time_min">
        <RangePicker
          dropdownClassName="order_history_datepicker"
          allowEmpty={[true, true]}
          // format="YYYY-MM-DD"
          allowClear={true}
          onChange={(dates:any) => {
            let datesCopy = [...dates]
            if (datesCopy.length !== 2) return
            datesCopy[0]?.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            datesCopy[1]?.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
            if (datesCopy[0] && datesCopy[1])  this.handleSearch(dates)

          }}
          value={this.state.words.request_pick_up_time}
        ></RangePicker>
      </Form.Item>
    const createTime = 
      <Form.Item label={this.state.words.created_time} name="created_time_min">
        <RangePicker
          dropdownClassName="order_history_datepicker"
          allowEmpty={[true, true]}
          allowClear={true}
          onChange={(dates:any) => {
            let datesCopy = [...dates];
            if (datesCopy.length !== 2) return
            datesCopy[0]?.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            datesCopy[1]?.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
            if (datesCopy[0] && datesCopy[1])  this.handleSearch(dates)
          }}
          value={this.state.words.created_time}
        ></RangePicker>
      </Form.Item>
    const searchButtonForm = 
      <Form.Item label="">
        <Button type="primary" onClick={(e: any) => this.handleSearch(e)}> search</Button>
      </Form.Item>
    const exportList = 
      <Form.Item label="">
        <Button type="primary" loading={this.state.exportLoading} onClick={() => this.handleExportManifest()}>{this.state.words.button_export_manifest_list}</Button>
      </Form.Item>
      
    const form = [
      {
        id: 0,
        key: 0,
        item: [productId, productTitle, orderNumber, logisticsNumber, processForm, pickUpTime, orderStatus, company, createTime, searchButtonForm, exportList,]
      },
      {
        id: 1,
        key: 1,
        item: [productId, productTitle, orderNumber, logisticsNumber, processForm, pickUpTime, orderStatus, company, createTime, searchButtonForm, exportList,]
      },
      {
        id: 2,
        key: 3,
        item: [productId, productTitle, orderNumber, createTime, processStatusForm, searchButtonForm]
      },{
        id: 3,
        key: 3,
        item: [productId, productTitle, orderNumber, logisticsNumber, processForm, company, pickUpTime, createTime, searchButtonForm, exportList,]
      }, {
        id: 4,
        key: 4,
        item: [productId, productTitle, orderNumber, logisticsNumber,  company, createTime, searchButtonForm]
      }, {
        id: 5,
        key: 5,
        item: [productId, productTitle, orderNumber, logisticsNumber, company, createTime, searchButtonForm]
      }, {
        id: 6,
        key: 6,
        item: [productId, productTitle, orderNumber, logisticsNumber, company, createTime, searchButtonForm]
      }
    ]
    return (
      <div>
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 16 }}
          initialValues={this.state.formInit}
          ref={this.state.formSearch[id]}
          key={id}
          autoComplete="off"
        >
          {
            form[id].item.map((val:any, index: number) => {
              if (id === 1) {
                return ""
              } else {
                return val
              }
            })
          }
        </Form>
      </div>
    )
  }

  refreshTab(e: boolean) {
    this.getDataList(this.state.page)
  }

  // 导出发货清单
  handleExportManifest() {
    let id: Array<string> = []
    this.state.orderListData.forEach((item: any) => {
      id.push(item.combined_key)
    })
    const params = {
      "combined_keys": id
    }
    this.setState({exportLoading: true})
    orderModel.exportExpressList(params).then((res: any) => {
      if (res.data.success) {
        this.handleDownload(res.data.data.file_name)
      } else {
        message.warning(res.data.msg)
      }
      this.setState({ exportLoading: false })
    }).catch(() => {
      message.error(this.state.words.export_error)
      this.setState({ exportLoading: false })
    })
  }
  // 下载发货清单
  handleDownload(fileName: string) {
    this.setState({ exportLoading: true })
    orderModel.getDownloadPdf(fileName).then((res: any) => {
      if (res.data) {
        const link = document.createElement('a')
        const blobData = new Blob([res.data], { type: 'application/pdf' })
        link.download = res.headers['content-disposition'].split(';')[1].split('"')[1].trim()
        link.href = URL.createObjectURL(blobData)
        link.style.display = "none"
        link.click()
        message.success(this.state.words.export_success)
      } else {
        message.error(this.state.words.export_error)
      }
    }).then((res: void) => {
      this.setState({ exportLoading: false })
    })
  }

  // 批量叫快递按钮 
  handleBatchPickUp() {
    if(this.state.selectedRowKeys.length <= 0) {
      message.error('please select order first', 10);
      return 
    } else {
      this.setState({ batchPickUpShow: true})
    }
  }
  // 列表中的显示
  handlFormatExpandTable(row:any) {
    return (
      <div className="desc-orders">
        <div className="desc-left">
          <div className="item">
            {row.orders.map((val: any, key: number) => {
              return (
                <div className="product-info" key={key}>
                  <img className="product-image" src={val.image_url} alt="" />
                  <div className="product-title">
                    <div> 
                      {val.product_title}
                      <a href={val.product_weblink} target="_blank" rel="noreferrer">{this.state.words.open_link}</a>
                    </div>
                    {
                      val.order_sku.map((sku_item: any, sku_idx:number) => {
                        return (
                          <div key={sku_idx}>
                            <div>
                              <div>
                                <span className="product-sku">
                                  {sku_item.sku_properties.map((sku: any) => {
                                    return (
                                      sku
                                    )
                                  })}
                                </span>
                                {sku_item.sku_properties.length > 0 ? <span className="amount">*</span> : ""}
                                <span className="amount">{sku_item.amount}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                   {
                    row.status === 3 || row.status === 4 ?
                        <span className="amount-price">Rp {window.$utils.$encodeMoney(val.contract_price, true)} * <span className="amount">{this.formatAmount(val)}</span></span>
                      : ""
                   }
                  </div>
                  {row.status === 2 ?
                    <div className="price">
                      <span>{!row.is_combined_order ? this.state.words.total_price : this.state.words.price}</span>
                      <span>Rp {window.$utils.$encodeMoney(val.contract_price, true)} * <span className="amount">{this.formatAmount(val)}</span></span>
                    </div>
                    : "" }
                </div>
              )
            })}
          </div>
        </div>
        {
          row.status === 3 || row.status === 4 ?
            <div className="express">
              { row.order_express_info ? <div>{row.order_express_info.express_name} : <span className="express-no" onClick={() => this.handlePrintLable(row)}>{row.order_express_info.express_no}</span></div> : ""}
              {
                row.order_express_info && row.order_express_info.records[0] ? 
                  <>
                    <button className="action express-button" onClick={() => this.handleOpenDialog(row, 'expressDetailShow')}>{this.state.words.button_express_detail}</button>
                    <div>{this.state.words.request_pick_up_time}: {window.$utils.$time(row.order_express_info.records[0].time, 8)}</div>
                  </>
                : ""
              }
            </div>
            : ""
        }
        <div className="item-button">
          <button className="action detail-btn" onClick={() => this.handleOpenDialog(row, 'detailModalShow')}>{this.state.words.action_order_detail}</button>
          {row.status === 2 ? <>
            <button className="action pick-up" onClick={() => this.handleOpenDialog(row, 'pickUpModalShow')}>{this.state.words.action_request_pickup}</button>
            <button className="action cancel-order" onClick={() => this.handleOpenDialog(row, 'cancelOrderShow')}>{this.state.words.action_cancel}</button>
          </> : 
            (row.status === 3 ?
            <button className="action pick-up" onClick={() => this.handlePrintLable(row)}>{this.state.words.button_print_label}</button> : "")
          }
        </div>
      </div>
    )
  }
  // 计算sku数量
  formatAmount(item: any) {
    const arr:Array<number> = []
    item.order_sku.forEach((val: any) => {
      arr.push(val.amount)
    })
    const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
    return arr.reduce(reducer)
  }


  // 关闭弹窗
  closeModal(val: any, type: number, refresh: boolean) {
    if (type === 1) {
      this.setState({ detailModalShow: false })
    } else if (type === 3) {
      this.setState({ cancelOrderShow: false })
    } else if (type === 4) {
      this.setState({ batchPickUpShow: false, pickUpModalShow: false, })
    } else if (type === 5) {
      this.setState({ expressDetailShow: false })
    }
    if (refresh) {
      this.getDataList(this.state.page)
    }
  }
  // 打开弹窗
  handleOpenDialog(val: any, dialog: string) {
    this.setState({ currentItem: JSON.parse(JSON.stringify(val)) }, () => {
      this.setState({ [dialog]: true })
    })
  }
  // 打开快递单链接
  handlePrintLable(val: any) {
    window.open(logisiticDomain + val.order_express_info.logistics_info_md5)
  }
  
  // 切换分页
  handleChangePagination(e: number) {
    setTimeout(() => {
      this.setState({ page: e })
    }, 100);
    this.getDataList(e)
  }
  // 全选按钮
  handleBatchSelect(e:any) {
    const { orderListData, selectedRowKeys } = this.state;
    if (orderListData.length === selectedRowKeys.length) {
      this.handleRowSelectChange([], []);
    } else {
      const index:Array<any>= [];
      orderListData.forEach((item: any) => {
        index.push(item.combined_key)
      });
      this.handleRowSelectChange(index, orderListData)
    }
  }
  handleRowSelectChange = (selectedRowKeys:Array<any>, selectedRows:Array<any>) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
    }, () => {
      this.setState({ selectedRows: selectedRows})
    })
  }

  onChangeStatus(e: any, name: string) {
    const filter: OrderFilter = this.state.filter
    filter.status = filter.from_search ? filter.status : this.state.currentTab
    if (name === "status") {
      filter.from_search = true
      filter[name] = e.target.value 
    } else if (name === "express_company_id") {
       filter[name] = e.target.value || null
    } else if (name === "process_status") {
      if (e.target.value === 1) {
        filter.hours_to_cancel_max = 48
        delete filter.express_label_printed
        delete filter.express_picked_up
      } else if (e.target.value === 2) {
        filter.express_label_printed = false
        delete filter.hours_to_cancel_max
        delete filter.express_picked_up
      } else if (e.target.value === 3) {
        filter.express_label_printed = true
        delete filter.hours_to_cancel_max
        delete filter.express_picked_up
      } else if (e.target.value === 4) {
        filter.express_picked_up = true
        delete filter.hours_to_cancel_max
        delete filter.express_label_printed
      } else if (e.target.value === 0) {
        delete filter.express_picked_up
        delete filter.hours_to_cancel_max
        delete filter.express_label_printed
      }
    }
    this.setState({ filter }, () => {
      this.getDataList(this.state.page)
    })
  }

  handleSearch(e: any) {
    let formData = this.state.formSearch[this.state.currentTab].current.getFieldValue()
    let copyData = JSON.parse(JSON.stringify(formData))
    const filter: OrderFilter = this.state.filter
    if (formData.created_time_min && formData.created_time_min.length === 2) {
      const [created_time_min, created_time_max] = formData.created_time_min
      copyData.created_time_min = created_time_min ? Math.ceil(new Date(created_time_min).getTime() /1000): 0
      copyData.created_time_max = created_time_max ? Math.ceil(new Date(created_time_max).getTime() /1000): 0
    }
    if (formData.delivery_time_min && formData.delivery_time_min.length === 2) {
      const [delivery_time_min, delivery_time_max] = formData.delivery_time_min
      copyData.delivery_time_min = delivery_time_min ? Math.ceil(new Date(delivery_time_min).getTime()/1000) : 0
      copyData.delivery_time_max = delivery_time_max ? Math.ceil(new Date(delivery_time_max).getTime()/1000) : 0
    }
    copyData.status = this.state.currentTab
    const obj = { ...filter, ...copyData}
    this.setState({ filter: obj }, () => {
      this.getDataList(this.state.page)
    })
  }

  // 切换status tab
  handleChangeTab(e: any) {
    const filter:OrderFilter = {status: 0}
    filter.status = Number(e)
    this.state.formSearch[this.state.currentTab].current.resetFields()
    this.setState({ currentTab: Number(e), loading: true, filter }, () => {
      this.getDataList(1)
    })
  }
  // 获取所有数据
  getDataList(page: number) {
    let params: OrderFilter = this.state.filter
    params.page_id = page
    let time = 0
    this.setState({count: new Date().getTime() + this.state.count, loading: true}, ()=> {
      time = this.state.count
    })
    orderModel.getOrderList(params).then((res: any) => {
      if (time === this.state.count) {
        if (res.data.success) {
          const reducer = (accumulator:any, currentValue:any) => accumulator + currentValue;
          const { UnDelivered, Delivering, Received, Refunded, Ineffective } = res.data.data.statistics
          let arr = [Object.values(res.data.data.statistics).reduce(reducer), UnDelivered, Delivering, Received, Refunded, Ineffective]
          this.setState({
            orderListData: res.data.data.items.map((val: any, index: number) => ({ ...val, key: index })),
            loading: false,
            totalNumber: res.data.data.total_page,
            statistics: arr
          })
        } else {
          this.setState({ loading: false })
        }
      } else {
        return 
      }
    }).catch(() => {
      this.setState({ loading: false })
    })
  }
  // 修改排序
  handleTableChange(pa:any, fi: any, sorter:any) {
    const {columnKey, order} = sorter
    const filter: OrderFilter = this.state.filter
    if (columnKey === "create_time") {
      filter.sort_direction = order === 'ascend' ? 'asc' : 'desc'
    }
    this.setState({filter}, () =>{
      this.getDataList(1)
    })
  }
  render ():Object {
    const { 
      selectedRowKeys, 
      loading, 
      orderListData, 
      totalNumber, 
      currentItem
    }  = this.state
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this.handleRowSelectChange,
    }

    return (
      <div className="order-list">
        {<Tabs defaultActiveKey="2" onChange={(e:any) => this.handleChangeTab(e)}>
          {statusTab.map((val: any, idx: number) => {
            return (
              <TabPane tab={val.name + (this.state.loading? "" :' (' + this.state.statistics[idx] + ')') } key={val.id}>
                {
                  this.formatFormSearch(val.id)
                }
                <Spin spinning={loading}>
                  <Table 
                    columns={columns} 
                    dataSource={this.state.orderListData} 
                    bordered
                    rowSelection={rowSelection}
                    rowKey={item => item.combined_key}
                    onChange={(pagination:any, filters:any, sorter:any) => this.handleTableChange(pagination, filters, sorter)} 
                    expandable={{
                      expandedRowRender: (val:any) => (this.handlFormatExpandTable(val)),
                      rowExpandable: record => record.combined_key !== 'Not Expandable',
                    }}
                    expandIconColumnIndex={-1}             　　
                    defaultExpandAllRows={true}
                    expandedRowKeys={this.state.orderListData.map((item:any) => item.combined_key)}
                    pagination={{
                      total: totalNumber,
                      onChange: (e: any) => this.handleChangePagination(e),
                      hideOnSinglePage: true,
                      showQuickJumper: false,
                      showSizeChanger: false,
                      pageSize: this.state.size
                    }}
                    locale={{
                      emptyText: EmptyComponent({errorTip: this.state.words.empyt_words})
                    }}
                  />
                </Spin>
              </TabPane>
            )
          })}
        </Tabs>
        }
        <Checkbox
          className="select-all"
          indeterminate={orderListData.length !== this.state.selectedRowKeys.length && this.state.selectedRowKeys.length !== 0}
          onChange={(e: any) => this.handleBatchSelect(e)}
          checked={orderListData.length === this.state.selectedRowKeys.length && orderListData.length !== 0}
        >{this.state.words.button_select_all}
        </Checkbox>
        {
          this.state.currentTab === 2 ? 
            <Button type="primary" className="batch-request" size="middle" onClick={() => this.handleBatchPickUp()}>
              {this.state.words.button_batch_request_pickup}
            </Button>
            : ""
        }
        {
          this.state.detailModalShow ? 
            <DetailModal 
              detailModalShow={this.state.detailModalShow} 
              currentRow={currentItem} 
              closeModal={(val: any, type: number, refresh: boolean) => this.closeModal(val, type, refresh)}
            ></DetailModal> : null 
        }
        {
          this.state.pickUpModalShow ? 
            < BatchPickUp 
              batchPickUpShow={this.state.pickUpModalShow}
              batchData={[currentItem]}
              closeModal={(val: any, type: number, refresh: boolean) => this.closeModal(val, type, refresh)}
            ></BatchPickUp>: null
        }
        {
          this.state.cancelOrderShow ? 
            <CancelOrder 
              cancelOrderShow={this.state.cancelOrderShow}  
              currentRow={currentItem} 
              refreshTab={(val: boolean) => this.refreshTab(val)}
              closeModal={(val: any, type: number, refresh: boolean) => this.closeModal(val, type, refresh)}
            ></CancelOrder> : null
        }
        {
          this.state.batchPickUpShow ? 
          <BatchPickUp 
            batchPickUpShow={this.state.batchPickUpShow} 
              batchData={JSON.parse(JSON.stringify(this.state.selectedRows))}
            closeModal={(val: any, type: number, refresh: boolean) => this.closeModal(val, type, refresh)}
          ></BatchPickUp>: null
        }
        {
          this.state.expressDetailShow ?
            <ExpressDetail
              expressDetailShow={this.state.expressDetailShow}
              data={currentItem}
              closeModal={(val: any, type: number, refresh: boolean) => this.closeModal(val, type, refresh)}
            ></ExpressDetail> : null
        }
      </div>
    )
  }
}


export default orderList