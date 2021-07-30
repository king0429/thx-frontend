export const columns:Array<any> = [
  {
    title: '',
    dataIndex: 'key',
    align: 'center',
    width: '10%',
    render: (key:number) => key + 1 
  },
  {
    title: '请购日期',
    dataIndex: 'purchase_plan_date',
    key: 'purchase_plan_date',
    align: 'center',
    width: '10%',
  },
  {
    title: '品名规格',
    dataIndex: 'purchase_style',
    key: 'purchase_style',
    align: 'center',
    width: '10%',
  },
  {
    title: '采购日期',
    dataIndex: 'purchase_date',
    key: 'purchase_date',
    align: 'center',
    width: '10%',
  },
  {
    title: '采购数量',
    dataIndex: 'purchase_amount',
    key: 'purchase_amount',
    align: 'center',
    width: '10%',
  },
  {
    title: '供应商',
    dataIndex: 'purchase_supplier',
    key: 'purchase_supplier',
    align: 'center',
    width: '10%',
  },
  {
    title: '领用部门',
    dataIndex: 'get_part',
    key: 'get_part',
    align: 'center',
    width: '10%',  
  },
  {
    title: '领用人',
    dataIndex: 'get_person',
    key: 'get_person',
    align: 'center',
    width: '10%',  
  },
  {
    title: '操作'
  }
]