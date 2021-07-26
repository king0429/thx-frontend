import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import 'moment/locale/id'
import id_ID from 'antd/lib/locale-provider/id_ID';

import './layout.scss'
// type LayoutProps = {
//   title?: string,
//   theme?: string
// }
// interface BacsLayOut {
//   props: LayoutProps
// }

class Layout extends Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = this.inititalState()
  }
  inititalState ():Object {
    return {
      childComponent: null,
      minHeight: document.documentElement.clientHeight + 'px'
    }
  }
  render () {
    return (
      <ConfigProvider locale={id_ID}>

        <div className="base_layout" style={{"minHeight": this.state.minHeight}}>
          <h4>{this.props.title}</h4>
          {
            this.props.children || <div/>
          }
        </div>
      </ConfigProvider>

    )
  }
}

export default withRouter(Layout)