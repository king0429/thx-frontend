import { routeItem } from '../interface'

import Index from '../pages/index'
import Production from '../pages/production'
import Warehouse from '../pages/warehouse'
import Purchase from '../pages/purchase'
import Order from '../pages/order'
import Contact from '../pages/contact'



export const routes:Array<routeItem> = [
  {
    component: Index,
    url: '/',
    props: {
      title: '首页'
    }
  },
  {
    component: Order,
    url: '/order',
    props: {
      title: '订单管理'
    }
  },
  {
    component: Production,
    url: '/product/managerment',
    props: {
      title: '产品管理',
    }
  },
  {
    component: Warehouse,
    url: '/warehouse/managerment',
    props: {
      title: '库存管理',
    }
  },
  {
    component: Purchase,
    url: '/purchase/managerment',
    props: {
      title: '采购管理',
    }
  },
  {
    component: Contact,
    url: '/contact/list',
    props: {
      title: '联络单'
    }
  }
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

