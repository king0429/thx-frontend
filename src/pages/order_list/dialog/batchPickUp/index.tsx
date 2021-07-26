import React, { Component } from 'react'
import { Modal, Popconfirm } from 'antd';
import './index.scss'
import { words } from './config'
import ChooseExpressCompany from '../chooseExpressCompany/index'

// const { TabPane } = Tabs;

class BatchPickUp extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = this.initialState()
  }
  initialState(): any {
    return {
      words,
      confirmShow: [],
      confirmDialog: false,
      data: [],
      chooseCompanyModal: false,
    }

  }

  componentDidMount() {
    this.state.confirmShow.forEach((val: any) => {
      val.confirmDialog = false
    })
    this.setState({ data: this.props.batchData})
  }

  handleRemoveOrder(val: any) {
    this.setState({ confirmDialog: true})
  }

  // 二次确认删除子订单
  handleDeleteOrder(index: any) {
    const copyData = this.state.data
    if (copyData.length === 1) {
      this.props.closeModal(false, 4)
    }
    copyData.splice(index, 1)
    this.setState({ data: copyData })
  }

  // 二次确认是否为所选订单
  handleSubmit = () => {
    Modal.confirm({
      maskClosable: true,
      content: this.state.words.double_confirm,
      cancelButtonProps: { style: { display: 'none' } },
      okText:  this.state.words.button_sure,
      onOk: async () => {
        this.setState({ chooseCompanyModal: true })
      }
    })
  }

  handleChooseExpreseCompany(e: any) {
    this.setState({
      chooseCompanyModal: true
    })

  }
  closeCompanyModal(val: boolean) {
    this.setState({ chooseCompanyModal: val})
  }

  render(): Object {
    return (
      <div className="batch-pick-up">
        <Modal
          title="stock check"
          width="700px"
          visible={this.props.batchPickUpShow}
          onOk={() => this.handleSubmit()}
          onCancel={() => this.props.closeModal(false, 4)}
          okText={this.state.words.button_sure}
          cancelText={this.state.words.button_cancel}
          bodyStyle={{ height: '700px', overflowY: 'scroll'}}
        > 
          {
            this.state.data.map((item: any, idx: number) => {
              return (
                <div className="orders" key={idx}>
                  <div className="order-item">
                    <div className="order-number">
                      <span>{'order number:' + item.combined_key}</span>
                      <Popconfirm
                        visible={this.state.data[idx].confirmDialog}
                        title={this.state.words.resure_title}
                        onConfirm={() => this.handleDeleteOrder(idx)}
                        okText="Yes"
                      >
                        <span onClick={(item: any) => this.handleRemoveOrder(item)} className="delete"> <i className="iconfont icon-close"></i> </span>
                      </Popconfirm>
                    </div>
                    <div className="sku">
                      {
                        item.orders.map((sku_item: any, index: number) => {
                          return sku_item.order_sku.map((sku: any, sku_idx: number) => {
                            return (
                              <>
                                <p>{sku_item.product_title}</p>
                                <table>
                                  <tbody>
                                    <tr key={sku_idx}>
                                      <td>{sku.sku_properties.toString()}</td>
                                      <td>{sku.amount}</td>
                                    </tr>
                                    </tbody>
                                </table>
                              </>
                            )
                          })
                        })
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </Modal>
        {this.state.chooseCompanyModal ? <ChooseExpressCompany show={this.state.chooseCompanyModal} data={this.state.data} closeCompanyModal={(val: any) => this.closeCompanyModal(val)}></ChooseExpressCompany> : null }
      </div>
    )
  }
}


export default BatchPickUp