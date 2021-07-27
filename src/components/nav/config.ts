import $lan from '../../lan'
import { NavItem } from '../../interface'

const navList:Array<any> = [
  {
    title: '首页',
    url: '/',
    slide: false,
    select: false,
    icon: 'iconfont icon-shangpin1'
  },
  {
    title: '生产管理',
    children: [
      {
        url: '/product/zidongche',
        title: '自动车',
        select: false,
        icon: 'iconfont icon-list1'
      },
      {
        url: '/product/datouji',
        title: '打头机',
        select: false,
        icon: 'iconfont icon-icon_history'
      }
    ],
    icon: 'iconfont icon-order1',
    slide: false,
    select: false,
  },
  {
    title: '仓库',
    // url: '/warehouse',
    slide: false,
    select: false,
    icon: 'iconfont icon-settings1',
    children: [
      {
        url: '/warehouse/managerment',
        title: '各部门领用查询',
        select: false,
        icon: 'iconfont icon-icon_history'
      }
    ]
  },
  {
    title: '采购管理',
    slide: false,
    select: false,
    icon: 'iconfont icon-settings1',
    children: [
      {
        url: '/purchase/apply',
        title: '请购单',
        select: false,
        icon: 'iconfont icon-icon_history'
      },
      {
        url: '/purchase/history',
        title: '外购采购单',
        select: false,
        icon: 'iconfont icon-icon_history'
      },
    ]
  },
  {
    title: '新绩效统计',
    children: [
      {
        url: '/kpi/zidongche',
        title: '自动车',
        select: false,
        icon: 'iconfont icon-list1'
      },
      {
        url: '/kpi/datouji',
        title: '打头机',
        select: false,
        icon: 'iconfont icon-icon_history'
      }
    ],
    icon: 'iconfont icon-order1',
    slide: false,
    select: false,
  },
  {
    title: '考核管理',
    slide: false,
    select: false,
    icon: 'iconfont icon-settings1',
    children: [
      {
        url: '/test/list',
        title: '考核查看',
        select: false,
        icon: 'iconfont icon-icon_history'
      },
    ]
  },
  {
    title: '联络单',
    slide: false,
    select: false,
    icon: 'iconfont icon-settings1',
    children: [
      {
        url: '/contact/write',
        title: '联络单填写',
        select: false,
        icon: 'iconfont icon-icon_history'
      },
      {
        url: '/contact/list',
        title: '联络单查看',
        select: false,
        icon: 'iconfont icon-icon_history'
      },

    ]
  },
]
const currentPath:string = window.location.pathname

export const nav = navList.map((val:any) => {
  if (val.children) {
    val.children.forEach((inner: any) => {
      if (inner.url === currentPath) {
        inner.select = true
        val.slide = true
        val.select = true
      }
    })
  } else {
    if (val.url === currentPath) {
      val.select = true
    }
  }
  return val
})