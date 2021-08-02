export const columns:Array<any> = [
  {
    title: '订单号',
    dataIndex: 'order_number',
    align: 'center',
    width: '15%'
  },
  {
    title: '产品名称',
    dataIndex: 'order_prodcut_name',
    key: 'order_prodcut_name',
    align: 'center',
    width: '15%',
  },
  {
    title: '客户',
    dataIndex: 'order_customer',
    key: 'order_customer',
    align: 'center',
    width: '10%',
  },
  {
    title: '订单数量',
    dataIndex: 'order_amount',
    key: 'order_amount',
    align: 'center',
    width: '10%',
  },
  {
    title: '交货日期',
    dataIndex: 'deliver_date',
    key: 'deliver_date',
    align: 'center',
    width: '10%',
    render: (date:string):string => {
      const arr:Array<string> = date.split('/')
      return arr.map((val:string) => Number(val) < 10 ? '0' + val : val).join('-')
    }
  },
  {
    title: '出货数量',
    dataIndex: 'deliver_amount',
    key: 'deliver_amount',
    align: 'center',
    width: '10%',
  },
  {
    title: '出货日期',
    dataIndex: 'real_delivery_date',
    key: 'real_delivery_date',
    align: 'center',
    width: '10%',
    render: (date:string):string => {
      const arr:Array<string> = date.split('/')
      return arr.map((val:string) => Number(val) < 10 ? '0' + val : val).join('-')
    }
  },
  {
    title: '迟交天数',
    dataIndex: 'delay_date',
    key: 'delay_date',
    align: 'center',
    width: '10%',
  },
  {
    title: '入库日期',
    dataIndex: 'warehouse_date',
    key: 'warehouse_date',
    align: 'center',
    width: '10%',
    render: (date:string):string => {
      const arr:Array<string> = date.split('/')
      return arr.map((val:string) => Number(val) < 10 ? '0' + val : val).join('-')
    }
  },
]