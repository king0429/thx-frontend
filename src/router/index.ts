import { routeItem } from '../interface'

import Index from '../pages/index'
import OrderList from '../pages/order_list'



export const routes:Array<routeItem> = [
  {
    component: Index,
    url: '/',
    props: {
      title: '首页'
    }
  },
  {
    component: OrderList,
    url: '/order_list',
    props: {
      title: '订单列表',
    }
  },
  // {
  //   component: Login,
  //   url: '/login',
  //   props: {
  //     title: {
  //       en: 'login',
  //       zh: '登录'
  //     }
  //   }
  // },
]

