import $lan from '../../lan'
import { NavItem } from '../../interface'

const navList:Array<any> = [
  {
    title: '首页',
    url: '/',
    slide: false,
    select: false,
    icon: 'iconfont icon-dashujuzhongxin'
  },
  {
    title: '订单管理',
    url: '/order',
    slide: false,
    select: false,
    icon: 'iconfont icon-dingdanguanli35'
  },
  {
    title: '生产管理',
    children: [
      {
        url: '/product/managerment',
        title: '产品管理',
        select: false,
        icon: 'iconfont icon-shengchanguanli2'
      },
      {
        url: '/product/outter',
        title: '外协交工',
        select: false,
        icon: 'iconfont icon-dingdanguanli1'
      }
    ],
    icon: 'iconfont icon-shengchanguanli',
    slide: false,
    select: false,
  },
  {
    title: '仓库',
    // url: '/warehouse',
    slide: false,
    select: false,
    icon: 'iconfont icon-kucunguanli1',
    children: [
      {
        url: '/warehouse/managerment',
        title: '入库查询',
        select: false,
        icon: 'iconfont icon-rukuguanli'
      }
    ]
  },
  {
    title: '采购管理',
    slide: false,
    select: false,
    icon: 'iconfont icon-webicon05',
    children: [
      {
        url: '/purchase/managerment',
        title: '外购采购单',
        select: false,
        icon: 'iconfont icon-goodswhoutStock'
      },
      {
        url: '/purchase/apply',
        title: '请购单',
        select: false,
        icon: 'iconfont icon-iconzhengli_shenpi'
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
    icon: 'iconfont icon-neibujixiao',
    slide: false,
    select: false,
  },
  {
    title: '考核管理',
    slide: false,
    select: false,
    icon: 'iconfont icon-caigouguanli',
    children: [
      {
        url: '/test/list',
        title: '考核查看',
        select: false,
        icon: 'iconfont icon-jixiaoguanli'
      },
    ]
  },
  {
    title: '联络单',
    slide: false,
    select: false,
    icon: 'iconfont icon-jiabanshixiang',
    children: [
      {
        url: '/contact/write',
        title: '联络单填写',
        select: false,
        icon: 'iconfont icon-a-mobankubeifen4'
      },
      {
        url: '/contact/list',
        title: '联络单查看',
        select: false,
        icon: 'iconfont icon-kaoheguanlix'
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