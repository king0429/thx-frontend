export const columns:Array<any> = [
  {
    title: '',
    dataIndex: 'key',
    align: 'center',
    width: '10%',
    render: (key:number) => key + 1 
  },
  {
    title: '生产日期',
    dataIndex: 'product_date',
    key: 'product_date',
    align: 'center',
    width: '10%',
  },
  {
    title: '产品名称',
    dataIndex: 'product_name',
    key: 'product_name',
    align: 'center',
    width: '10%',
  },
  {
    title: '加工工艺',
    dataIndex: 'product_style',
    key: 'product_style',
    align: 'center',
    width: '10%',
  },
  {
    title: '生产数量',
    dataIndex: 'product_amount',
    key: 'product_style',
    align: 'center',
    width: '10%',
  },
  {
    title: '负责师傅',
    dataIndex: 'productor_ownner',
    key: 'productor_ownner',
    align: 'center',
    width: '10%',
  },
  {
    title: '操机员',
    dataIndex: 'product_operator',
    key: 'product_style',
    align: 'center',
    width: '10%',  
  },
  {
    title: '状态',
    dataIndex: 'product_status',
    key: 'product_status',
    align: 'center',
    width: '10%',  
  }
]