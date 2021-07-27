import React, {Component} from 'react'
import './header.scss'
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
          <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7434" width="64" height="64"><path d="M41.037 959.973V74.075h53.037v832.856h885.918v53.042z" p-id="7435" fill="#298EEA"></path><path d="M194.881 593.94h113.172v261.708H194.881z" p-id="7436" fill="#298EEA"></path><path d="M392.931 509.063h113.171v346.586H392.931z" p-id="7437" fill="#298EEA"></path><path d="M590.979 332.239h113.173v523.41H590.979z" p-id="7438" fill="#298EEA"></path><path d="M789.029 204.924h113.173V855.65H789.029z" p-id="7439" fill="#298EEA"></path></svg>
          <span>同合心实业仓库管理</span>
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