import React, {Component} from 'react'
import './header.scss'
import logo from '../../assets/img/logo/logo.png'
import { word } from './config'
import { Modal } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'



class Header extends Component<any, any> {
  constructor (props: unknown) {
    super(props)
    this.state = this.initialState()
  }
  initialState () :any  {
    return {
      word,
      userEmail: localStorage.getItem('user_email'),
      shopName: localStorage.getItem('user_name')
    }
  }
  handleLogout () {
    Modal.info({
      centered: true,
      keyboard: true,
      okText: 'ya',
      title: this.state.word.logout,
      cancelText: 'no',
      icon: <LogoutOutlined className="theme-color" />,
      closable: true,
      onOk: (e) => {
        return new Promise((resolve:any, reject:any) => {
          window.$utils.$firebase.auth().signOut().then((res:any) => {
            localStorage.clear()
          }).catch((err: any) => {
            localStorage.clear()
          }).then(() => {
            setTimeout(() => {
              window.location.href = window.location.origin + '/login'
              resolve(true)
            }, 1000)
          })
        })
      },
    })
  }
  render () {
    return (
      <div className="base_header">
        <div className="logo">
          <img src={logo} alt="" />
          <span>{this.state.shopName}</span>
        </div>
        <ul className="slide_tools">
          <li>
            <i className="iconfont icon-icon-user"></i>
            <span>hi, {this.state.userEmail}</span>
            </li>
          <li className="logout" onClick={() => this.handleLogout()}>
            <LogoutOutlined />
            <span>{this.state.word.logout}</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Header