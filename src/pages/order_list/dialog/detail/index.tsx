import React, { Component } from 'react'
import { Modal, message, Spin} from 'antd';
import './index.scss'
import { words } from './config'
import orderModel from '../../../../model/order.model'


class detailModal extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = this.initialState()
  }
  initialState(): any {
    return {
      words,
      loading: false,
      detailData: [],
      detailModal: false
    }
  }

  componentDidMount() {
    const parmas = {
      combined_key: this.props.currentRow.combined_key
    }
    this.setState({loading: true})
    orderModel.getDetail(parmas).then((res: any) => {
      if (res.data.success) {
        this.setState({ detailData: res.data.data, loading: false })
      }
    }).catch(() => {
      message.warning('error')
    })
  }


  render(): Object {
    return (
      <Modal
      title="order detail"
      visible={this.props.detailModalShow} footer={null}
      // onOk={() => this.handleOk}
      onCancel={() => this.props.closeModal(false, 1)}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      bodyStyle={{ height: '600px', overflowY: 'scroll' }}
      width="650px"
      className="order_detail_model"
    >
      <Spin spinning={this.state.loading}>
        <div className="detail">
            <div className="order_id">
              <span>order number:</span>
              <span>{this.state.detailData.combined_key}</span>
            </div>
            <p className="title">{this.state.words.recipient_info}</p>
            <div className="address_name">{this.state.words.name}:  {this.state.detailData.receiver_location?.name}</div>
            {
              this.state.detailData.receiver_location ?
                <div className="address_detail">
                  <span>{this.state.detailData.receiver_location.city_name},</span>
                  <span>{this.state.detailData.receiver_location.province_name},</span>
                  <span>{this.state.detailData.receiver_location.district_name},</span>
                  <span>{this.state.detailData.receiver_location.detail_address},</span>
                  <span>{this.state.detailData.receiver_location.post_code}</span>
                  <span>{this.state.detailData.receiver_location.landmark ? `,${this.state.detailData.receiver_location.landmark}` : ''}</span>
                </div>
                :
                <div className="address_detail">{this.state.words.address}</div>
            }
            <p className="title">{this.state.words.logistics_info}</p>
            <div className="pick_up_time">
              request pick up time:{window.$utils.$time(this.state.detailData.created_time, 8)}
            </div>
            {
              this.state.detailData.order_express_info ?
                <div>
                  <span>{this.state.detailData.order_express_info.express_name}</span>
                  <span>{this.state.detailData.order_express_info.express_no}</span>
                  <span>{this.state.detailData.order_express_info.express_name}</span>
                </div>
                : null
            }
            <p className="title">{this.state.words.order_info}</p>
            <div className="order_status">
              <span>{this.state.words.status}:</span>
              <span>{this.state.detailData.status_description}</span>
            </div>
            <div className="order_info">
              <span>{this.state.words.created_time}: {window.$utils.$time(this.state.detailData.created_time, 8)}</span>
              <span>{this.state.words.amount}: {this.state.detailData.order_count}</span>
              <span>{this.state.words.total_price}: Rp{window.$utils.$encodeMoney(this.state.detailData.total_price, true)}</span>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>productid</td>
                  <td>sku </td>
                  <td>price</td>
                </tr>
                {
                  this.state.detailData.orders?.map((val: any, index: number) => {
                    return val.order_sku.map((sku: any, sku_idx: number) => {
                      return (
                        <tr key={sku_idx}>
                          <td>{val.product_code}</td>
                          <td>{sku.sku_properties.toString()}</td>
                          <td>Rp{window.$utils.$encodeMoney(val.contract_price, true)} * {sku.amount}</td>
                        </tr>
                      )
                    })
                  })
                }
              </tbody>
            </table>
            {
              this.state.detailData.vendor_delayed_penalty || this.state.detailData.vendor_aftersale_penalty ?
                <p className="title">disbursement info</p>
                :
                null
            }
            {
              this.state.detailData.vendor_delayed_penalty || this.state.detailData.vendor_aftersale_penalty ?
                <div className="penalty_line">disbursement value：Rp{window.$utils.$encodeMoney(this.state.detailData.vendor_aftersale_penalty + this.state.detailData.vendor_delayed_penalty, true)}</div>
                :
                null
            }
            {
              this.state.detailData.vendor_delayed_penalty ?
                <div className="penalty_line">penalty：Rp{window.$utils.$encodeMoney(this.state.detailData.vendor_delayed_penalty, true)}(reason:cancel)</div>
                :
                null
            }
            {
              this.state.detailData.vendor_aftersale_penalty ?
                <div className="penalty_line">penalty：Rp{window.$utils.$encodeMoney(this.state.detailData.vendor_aftersale_penalty, true)}(reason:aftersales)</div>
                :
                null
            }
        </div>
      </ Spin>
    </Modal>
    )
  }
}


export default detailModal