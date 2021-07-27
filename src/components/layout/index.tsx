import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import 'moment/locale/id'

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
      <div className="base_layout" style={{"minHeight": this.state.minHeight}}>
        <h4>{this.props.title}</h4>
        {
          this.props.children || <div/>
        }
      </div>

    )
  }
}

export default withRouter(Layout)