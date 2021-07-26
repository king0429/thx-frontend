import React, { Component } from 'react'
import { Modal, Button, message } from 'antd';
import './index.scss'
import { words } from './config'
import orderModel from '../../../../model/order.model'

// const { TabPane } = Tabs;

class cancelOrderModel extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = this.initialState()
  }
  initialState(): any {
    return {
      words,
      successDataModal: false,
      loading: false,
      cancelData: ""
      
    }
  }

  componentDidMount() {
    console.log(this.props.currentRow)
  }

  handleCancel() {
    const params = {
      "combined_key": this.props.currentRow.combined_key
    }
    this.setState({loading: true})
    orderModel.cancelOrder(params).then((res: any) => {
      this.props.refreshTab(true)
      if (res.data.success) {
        message.success('取消订单成功');
        this.setState({ successDataModal: true , loading: false, cancelData: res.data.data})
      } else {
        this.setState({ loading: false })
        message.error(res.data.msg || '取消订单失败');
      }
    }).catch(() => {
      this.setState({ loading: false })
      message.error('取消订单失败');
    })
  };



  render(): Object {
    return (
      <div className="index_page">
        <Modal
          className="cancel-order"
          visible={this.props.cancelOrderShow}
          onCancel={() => this.props.closeModal(false, 3, false)}
          footer={[
            <Button type="ghost" size="middle" onClick={() => this.props.closeModal(false, 3, false)}>
              {this.state.words.button_cancel}
            </Button>,
            <Button type="primary" size="middle" loading={this.state.loading} onClick={() => this.handleCancel()}>
              {this.state.words.button_sure}
            </Button>
          ]}
        >
          <p className="detailImgWrap" dangerouslySetInnerHTML={{ __html: this.props.currentRow.is_combined_order ? this.state.words.regular_order : this.state.words.combined_order }}></p>
        </Modal>
        <Modal
          title=""
          visible={this.state.successDataModal}
          footer={null}
          onCancel={() => this.props.closeModal(false, 3, false)}
        >
         <div className="cancel-order">
            <div>Order number：</div>
            <div className="order-number"> {this.props.currentRow.combined_key}</div>
            <div> Cancelled successfully！</div>
            {this.state.cancelData > 0 ? 
              <div>Charged penalty Rp{window.$utils.$encodeMoney(this.state.cancelData, true)} in total.</div>
              : ""
            }
            
            <div>Please do not forget update the stock of your product!</div>
         </div>
        </Modal>
      </div>
    )
  }
}


export default cancelOrderModel