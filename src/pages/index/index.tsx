import React, { Component } from 'react'
import { Table, Spin, Radio, Modal, message, Popover } from 'antd'
import { column, statusList, words } from './config'
import OrderTable from '../../components/order_table'
import './index.scss'
import productModel from '../../model/product.model'
import { productListQuery as ProductFilter } from '../../interface/model/product'
// import { productItem } from '../../interface/pages/product'
import $header from '../../libs/headers'
import EmptyComponent from '../../components/empty'
// import styles from '../../theme.scss';

// const { TabPane } = Tabs


class Index extends Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = this.initialState()
  }
  initialState ():any {
    return {
      words,
      page: 1,
      tableData: [],
      columns: [],
      loading: true,
      statusList,
      stockModal: false,
      previewModal: false,
      currentCover: '',
      total: 0,
      stockLoading: true,
      filter: {
        status: 0,
        page_size: 10
      },
      currentItem: {},
      firstLoad: true,
      emptyWord: '',
      selectAll: false
    }
  }
  async componentDidMount () {
    $header({title: this.props.title})
    await this.handleColumns()
    // this.handleProductList(this.state.page)
  }
  // 获取商品详细信息
  handleProductDetail (code:string = ''):Promise<any> {
    return new Promise((resolve:any ,reject:any) => {
      productModel.getProductDetail(code).then((res:any) =>{
        if (res.data && res.data.success) {
          resolve(res.data.data)
        } else {
          reject(new Error('faild'))
        }
      }).catch((err:Error) => {
        reject(new Error(err.message))
      })
    })
  }
  // 配置每一行
  async handleRow (tableData: Array<any>) {
    tableData.map((val:any) => {
      const statusActions = [
        '',
        <button className="action action-4" onClick={(e:any) => this.handleChangeProductStatus(e, val, 2)}>{this.state.words.changeOffline}</button>,
        <button className="action action-5" onClick={(e:any) => this.handleChangeProductStatus(e, val, 1)}>{this.state.words.changeOnline}</button>,
        <button className="action action-4" onClick={(e:any) => this.handleChangeProductStatus(e, val, 2)}>{this.state.words.changeOffline}</button>,
      ]
      val.select = false
      val.action = 
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }} className="action_list">
        <button className="action action-3" onClick={() => this.handleStockMoal(val)}>{this.state.words.changeStock}</button>
        {
          statusActions[val.status]
        }
      </div>
      return val
    })
    console.log(this.state.firstLoad)
    if (this.state.firstLoad) {
      this.setState({emptyWord: this.state.words.empty, firstLoad: false})
    } else {
      this.setState({emptyWord: this.state.words.noSearchResult})
    }
    this.setState({tableData})
    return tableData
  }
  // 配置显示弹窗（修改库存）
  handleStockMoal (item:any) {
    this.setState({stockLoading: true, stockModal: true})
    this.handleProductDetail(item.code).then(res => {
      this.setState({currentItem: res, stockLoading: false})
    }).catch(err => {
      message.error(this.state.words.generalFaild)
    })
    // console.log(item)
  }
  async handleColumns () {
    const columns:Array<any> = column.map((val:any) => {
      if (val.key === 'select') {
        val.title = 
        <div className="checkbox" onClick={() => this.handleSelectAll()}>
          {
            this.state.selectAll ? 
            <i className="iconfont icon-tijiao"></i>
            : 
            null
          }
        </div>
        val.render = (select:boolean, item:any) => {
          return select ? 
          <div className="checkbox" onClick={(e:any) => this.handleSelect(e, item)}>
            <i className="iconfont icon-tijiao"></i>
          </div>
          :
          <div className="checkbox" onClick={(e:any) => this.handleSelect(e, item)}></div>
        }
      } else if (val.key === 'cover_image_url') {
        val.render = (e:string, item:any) => {
          return (<div className="inner_img" style={{ wordWrap: 'break-word', wordBreak: 'break-word', minHeight: '100px' }}>
            <img src={e} onClick={(e:any) => this.handlePreview(e, item)} alt="" />
          </div>)
        }
      } else if (val.key === 'title') {
        val.render = (text:string, item:any) => {
          const ast = <div className="popup_info">
            <p>{text}</p>
            <p>{item.web_link}</p>
          </div>
          return (
            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
              <Popover content={ast} title={null}>
                <a target="_blank" rel="noreferrer" className="shop_link" href={item.web_link}>{text}</a>
              </Popover>
            </div>
          )
        } 
      }
      return val
    })
    this.setState({columns})
  }
  handlePreview (e:any, item: any) {
    this.setState({currentCover: item.cover_image_url}, () => {
      this.setState({previewModal: true})
    })
  }
  // 资源型函数（接口）
  handleProductList (page:number) {
    const params: ProductFilter = this.state.filter
    params.page_id = page
    productModel.getProductList(params).then((res:any) => {
      if (res.data.success) {
        this.setState({
          statusList: this.state.statusList.map((val:any, index: number) => {
            let statusCount:number = 0
            if (index) {
              statusCount = res.data.data.statistics[index - 1].count
            } else {
              statusCount = params.status ? 0 : window.$utils.$sum(res.data.data.statistics.map((item:any) => item.count))
            }
            return {...val, number: statusCount}
          }),
          page: page++,
          total: res.data.data.total
        })
        return res.data.data.items
      } else {
        return []
      }
    }).then(async (res:any) => {
      const arr:Array<any> = res.map((val:any, index: number) => ({...val, select: false, show_contract_price: window.$utils.$encodeMoney(val.contract_price, true), key: index}))
      this.handleRow(arr).then(() => {
        this.setState({
          loading: false
        })
      })
    }).catch(() => {
      this.setState({loading: false})
      message.error(this.state.words.generalFaild)
    })
  }
  handleSelectAll () {
    const {tableData, selectAll} = this.state
    const arr:Array<any> = tableData.map((val:any) => {
      val.select = !selectAll
      return val
    })
    this.setState({selectAll: !selectAll, tableData:arr}, () => {
      this.handleColumns()
    })
  }
  // 翻页
  handlePage (e:number) {
    if (!this.state.loading) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
      this.setState({
        loading: true
      }, () => {
        this.handleProductList(e)
      })
    }
  }
  // 取消弹窗
  handleCancelModal (key:string) {
    const obj:any = {}
    obj[key] = false
    this.setState(obj, () => {
      this.setState({
        currentItem: {},
        currentCover: ''
      })
    })
  }
  // 筛选商品状态
  handleChangeStatus (e:any) {
    const currentStatus = e.target.value
    const filter:ProductFilter = this.state.filter
    filter.status = currentStatus
    window.$logs('button_click', {
      type: 'search',
      sub_type: `product_status=${this.state.statusList[currentStatus].title}`,
      content: Object.entries(this.state.filter).map((val:any) => `${val[0]}=${val[1]}`).join(';'),
      page: 'product'
    })
    this.setState({filter, loading: true}, () => {
      this.handleProductList(1)
    })
  }
  // 修改库存金额
  handleChangeStock (e:any, index: number | undefined) {
    const { currentItem } = this.state
    let formatNumber = e.target.value.split('').map((val: string, index:number) => {
      if (!index && val === '0') {
        return ''
      } else if (!(/\d{1}/.test(val))) {
        return ''
      } else {
        return val
      }
    }).join('')
    // console.log(e.target.value)
    if (index || index === 0) {
      currentItem.skus[index].stock = Number(formatNumber)
      currentItem.stock = window.$utils.$sum(currentItem.skus.map((val:any) => val.stock))
      this.setState({currentItem})
    } else {
      currentItem.stock = formatNumber || '0'
      this.setState({currentItem})
    }
  }
  // 选择商品
  handleSelect (e:any, item:any) {
    const tableData = this.state.tableData
    tableData[item.key].select = !item.select
    const selectLength:number = tableData.filter((val:any) => val.select).length
    this.setState({tableData, selectAll: selectLength === this.state.filter.page_size}, () => {
      this.handleColumns()
    })
  }
  // 提交修改库存
  handleSubmitStock () {
    const { currentItem } = this.state
    const stock = {}
    currentItem.skus.forEach((val:any) => {
      stock[val.id] = val.stock
    })
    this.setState({stockLoading: true})
    productModel.setProductStock({code: currentItem.code, stock, etag: currentItem.etag}).then((res:any) => {
      // console.log(res)
      if (res.data.success) {
        this.setState({stockLoading: false, stockModal: false}, () => {
          const changeSum:number = window.$utils.$sum(Object.values(stock))
          if (currentItem.status === 3 && changeSum > 0) {
            message.success(this.state.words.changeStockSuccess2)
          } else if (currentItem.status === 1 && changeSum === 0) {
            message.success(this.state.words.changeStockSuccess3)
          } else {
            message.success(this.state.words.changeStockSuccess)
          }
          this.setState({loading: true}, () => {
            this.handleProductList(this.state.filter.page_id)
          })
        })
      } else {
        message.error(this.state.words.generalFaild)
      }
    })
  }
  // 搜索按钮点击
  handleSearch () {
    window.$logs('button_click', {
      type: 'search',
      sub_type: 'search',
      content: Object.entries(this.state.filter).map((val:any) => `${val[0]}=${val[1]}`).join(';'),
      page: 'product'
    })
    this.setState({loading: true}, () => {
      this.handleProductList(1)
    })
  }
  // 修改商品上线下线状态
  handleChangeProductStatus (e:any, item: any, key:number) {
    this.setState({loading: true})
    productModel.updateProductStatus({status: key, codes: [item.code]}).then((res:any) => {
      if (res.data && res.data.success) {
        this.handleProductList(this.state.filter.page_id)
        message.success(key === 1 ? (item.stock > 0 ? this.state.words.onlineSuccess : this.state.words.onlineNoStockSuccess) : this.state.words.offlineSuccess)
      } else {
        message.error(this.state.words.generalFaild)
      }
    })
  }
  // 获取输入
  handleInput (e:any, key:string) {
    const filter:ProductFilter = this.state.filter
    const _v = e.target.value
    filter[key] = _v
    this.setState({filter})
  }
  // 批量修改上线下线规则
  handleStatusList (e:any, key: number) {
    const list:Array<any> = JSON.parse(JSON.stringify(this.state.tableData)).filter((val:any) => val.select)
    console.log()
    if (!list.length) {
      message.error(this.state.words.chooseOne)
    } else {
      const codes:Array<string> = list.map((val:any) => val.code)
      const modelConfig:any = {
        okText: 'ya',
        maskClosable: false,
        title: 'change status',
        content: `you will change these products to ${key === 1 ? 'online' : 'offline'}`,
        onOk: () => {
          return new Promise((resolve:any, reject: () => unknown) => {
            productModel.updateProductStatus({status: key, codes}).then((res:any) => {
              if (res.data && res.data.success) {
                this.setState({loading: true}, () => {
                  this.handleProductList(this.state.filter.page_id)
                })
                message.success(key === 1 ? this.state.words.onlineManySucess : this.state.words.offlineManySucess)
                resolve(true)
              } else {
                message.error(this.state.words.generalFaild)
                resolve(true)
              }
            })
          })
        }
      }
      Modal.confirm(modelConfig)
      // if (!statusProductList.length) {
      //   message.error(this.state.words.chooseOne)
      // } else {

      // }
    }

  }
  render () {
    return (
      <div className="index_page">
        <OrderTable />
      </div>
    )
  }
}


export default Index