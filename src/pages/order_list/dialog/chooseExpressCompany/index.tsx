import React, { Component } from 'react'
import { Modal, Radio, Space, Spin, message, Button } from 'antd';
import './index.scss'
import { words } from './config'
import ChooseExpressCompanyResult from '../pickUpResult/index'
import orderModel from '../../../../model/order.model'

class ChooseExpressCompany extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = this.initialState()
  }
  initialState(): any {
    return {
      words,
      data: [],
      errorCompany: [],
      loading: false,
      company: "",
      resultModalShow: false,
      resultData: [],
      sender: {},
      errorExpress: []
    }
  }
  // 校验每个单号支持的快递公司
  componentDidMount() {
    this.setState({ data: this.props.data, loading: true }, () => {
      let chooseData = this.state.data
      const company = chooseData.map((val: any, idx: number) => {
        val.company_type = 1
        return new Promise((resolve: any, reject: any) => {
          orderModel.getReservationInfo(val).then((res: any) => {
            if (res.data.success) {
              this.setState({ sender: res.data.data.sender })
              resolve({
                id: val.combined_key,
                express_company: res.data.data.express.companies,
                success: res.data.success,
              })
            } else {
              resolve({
                id: val.combined_key,
                express_company: res.data.data.express.companies,
                success: res.data.success,
                msg: res.data.msg
              })
            }
          }).catch(() => {
            reject([])
          })
        })
      })

      Promise.all(company).then((res: any) => {
        chooseData.forEach((item: any, index: number) => {
          item.support_company = res[index].express_company
        })

        const supportCompany = chooseData.filter((val: any) => val.support_company.length)
        const notSupportCompany = chooseData.filter((val: any) => !val.support_company.length)

        this.setState({ data: supportCompany, errorCompany: notSupportCompany, loading: false })
      }).catch(() => {
        this.setState({ loading: false })
      })
    })
  }
  // 子组件成功后 关闭弹窗
  handleClose() {
    this.setState({ confirmDialog: true })
  }
  // 点击快递公司 增加选中的company_type
  onChange(e: any, idx: number) {
    let copyData = this.state.data
    copyData.forEach((val: any, index: number) => {
      if (index === idx) {
        val.company_type = e.target.value
      }
    })
    this.setState({
      data: copyData,
      resultData: copyData
    })
  }
  // 批量提交确认选择的快递
  handlePickUp = () => {
    const _result = this.state.resultData.filter((val: any) => {
      return val.company_type !== 0
    })
    if (_result.length === 0) {
      message.warning(this.state.words.toast)
      return
    }
    this.setState({ loading: true })
    const _express = _result.map((val: any, index: number) => {
      return new Promise((resolve: any, reject: any) => {
        let params = {
          express_id: val.company_type,
          combined_key: val.combined_key,
          location_id: this.state.sender.post_code_id,
          detail: this.state.sender.detail,
          name: this.state.sender.name,
          phone_number: this.state.sender.phone_number
        }
        orderModel.express(params).then((res: any) => {
          if (res.data.success) {
            resolve({
              success: res.data.success,
              id: params.combined_key,
              msg: "",
              _result: val,
              express_url: res.data.data.express_url
            })
          } else {
            resolve({
              success: res.data.success,
              id: params.combined_key,
              msg: res.data.msg || "",
            })
          }
        }).catch((err: any) => {
          resolve({
            success: false,
            id: params.combined_key,
            msg: err || "",
          })
        })
      })
    })
    Promise.all(_express).then(res => {
      this.setState({
        resultModalShow: true,
        resultData: res,
        loading: false
      })
    }).catch(err => {
      this.setState({
        loading: false
      })
      message.error(this.state.words.error_text)
    })
  }

  //  关闭预约快递结果弹窗
  closeResultModal(e: boolean) {
    this.setState({ resultModalShow: e })
  }

  render(): Object {
    return (
      <div className="choose-company">
        <Modal
          width={700}
          title={this.state.words.title}
          visible={this.props.show}
          onCancel={() => this.props.closeCompanyModal(false)}
          footer={[
            <Button type="ghost" size="middle" onClick={() => this.props.closeCompanyModal(false)}>
              {this.state.words.button_cancel}
            </Button>,
            <Button type="primary" size="middle" loading={this.state.loading} onClick={() => this.handlePickUp()}>
              {this.state.words.button_sure}
            </Button>
          ]}
          bodyStyle={{ height: '600px', overflowY: 'scroll' }}
        >
          {this.state.loading ? <Spin className="spin-loading"></Spin> :
            <>

              {this.state.errorCompany.length > 0 ?
                <>
                  <div className="error-number">For order no.:</div>
                  {
                    this.state.errorCompany.map((val: any, index: number) => {
                      return <div key={index}>{val.combined_key}</div>
                    })
                  }
                  <div className="error-text" >sorry, the address is not supported by any express company, please contact BD for more solutions.</div>
                </>
                : ""
              }
              <div className="choose">
                <p>{this.state.words.choose_text}</p>
                {
                  this.state.data.map((item: any, index: number) => {
                    return (
                      <div className="order-item" key={index}>
                        <p className="order-number">{this.state.words.order_number}:{item.combined_key}</p>
                        <div className="order-content">
                          <div className="left">
                            {item.orders.map((sku_item: any, sku_idx: number) => {
                              return sku_item.order_sku.map((val: any, idx: number) => {
                                return (
                                  <div className="product">
                                    <div className="image">
                                      <img src={sku_item.image_url} alt="" />
                                    </div>
                                    <div className="content">
                                      <div className="title">{sku_item.product_title}</div>
                                      <div className="sku">
                                        <div>
                                          {val.sku_properties}
                                          {val.sku_properties && val.sku_properties.length > 0 ? <span className="amount">*</span> : ""}
                                          <span className="amount">{val.amount}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                            })}
                          </div>
                          <Radio.Group onChange={(e: any) => this.onChange(e, index)} value={this.state.data[index].company_type}>
                            <Space direction="vertical">
                              {item.support_company.map((type: any, typeId: number) => {
                                if (type.enable) {
                                  return <Radio defaultChecked={type.selected} value={type.id} disabled={!type.enable} key={typeId}>{type.name}({type.description})</Radio>
                                } else {
                                  return ""
                                }
                              })}
                              <Radio value={0}>{this.state.words.not_request}</Radio>
                            </Space>
                          </Radio.Group>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </>
          }
        </Modal>
        {this.state.resultModalShow ? <ChooseExpressCompanyResult resultData={this.state.resultData} resultShow={this.state.resultModalShow} closeResultModal={(e: any) => this.closeResultModal(e)}></ChooseExpressCompanyResult> : ""}
      </div>
    )
  }
}


export default ChooseExpressCompany