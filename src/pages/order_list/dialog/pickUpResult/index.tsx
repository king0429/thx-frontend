import React, { Component } from 'react'
import { Modal, Table, message} from 'antd';
import './index.scss'
import { words, columns } from './config'
import orderModel from '../../../../model/order.model'

class ChooseExpressCompanyResult extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = this.initialState()
  }
  initialState(): any {
    return {
      words,
      resultData: [],
      company: "",
      errorData: [],
      expressUrl: []
    }
  }
  // 处理预约快递的结果
  componentDidMount() {
    const data = this.props.resultData
    let _result: Array<any> = []
    data.forEach((val: any) => {
      if (val.success) {
        _result.push(val._result)
      }
    })
    this.setState({ resultData: _result, expressUrl: data.filter((val: any) => val.express_url)})

    const errorNo = data.filter((val: any) => !val.success)
    this.setState({ errorData: errorNo}, () => {
      console.log(this.state.errorData)
    })
  }
  
  // 关闭所有弹窗并刷新
  handleRefresh () {
    window.location.reload()
  }

  // 导出发货清单
  handleExportManifest () {
    let id:Array<string> = []
    this.state.resultData.forEach((item: any) => {
       id.push(item.combined_key)
    })
    const params = {
      "combined_keys": id
    }
    orderModel.exportExpressList(params).then((res:any) => {
      if (res.data.success) {
        this.handleDownload(res.data.data.file_name)
      }else {
        message.warning(res.data.msg)
      }
    }).catch(() => {
      message.warning(this.state.words.export_error)
    })
  }

  handleDownload(fileName: string) {
    this.setState({ loading: true })
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
      this.setState({ loading: false })
    })
  }

  // 批量打开快递单链接
  handlePrintAwb () {
    this.state.expressUrl.forEach((item: any, index: number) => {
      window.open(item.express_url, '_blank')
    })
  }

  render(): Object {
    return (
      <div className="pickup-company-result">
        <Modal
          width={700}
          footer={null}
          title={this.state.words.title}
          visible={this.props.resultShow}
          onCancel={() => this.props.closeResultModal(false)}
          bodyStyle={{ height: '600px', overflowY: 'scroll' }}
        >
          {
            this.state.errorData.length > 0 ? 
            <>
              <div className="error-number">{this.state.words.order_number}:</div>
              {
                this.state.errorData.map((val: any, index: number) => {
                  return (
                    <div className="order-number" key={index}>{val.id}</div>
                  )
                })
              }
              <div className="error-text">{this.state.words.error_text}</div>
            </> : ""
          }
          <div className="result">
            <div>{this.state.words.success_text}</div>
            <div>Request pick up time: dd-mm-yyyy, hh:mm:ss</div>
            <Table
              columns={columns}
              dataSource={this.state.resultData}
              bordered
              pagination={false}
              rowKey={item => item.combined_key}
            />
            <div className="opreate">
              <button className="action action-1" onClick={() => this.handleExportManifest()}>{this.state.words.button_export_list}</button>
              <button className="action action-2" onClick={() => this.handlePrintAwb()}>{this.state.words.button_print_awb}</button>
              <button className="action action-3" onClick={() => this.handleRefresh()}>{this.state.words.button_sure}</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}


export default ChooseExpressCompanyResult