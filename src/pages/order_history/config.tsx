import $lan from '../../lan'
const wordLang:any = {
  top_tip: {
    en: 'Only keep the history of the last one month',
    zh: '只保留最近一个月记录',
    yn: 'Hanya menyimpan riwayat satu bulan terakhir'
  },
  export_time: {
    en: 'export time',
    zh: '导出时间',
    yn: 'waktu ekspor'
  },
  order_no: {
    en: 'order number',
    zh: '订单编号',
    yn: 'nomor pesanan'
  },
  search: {
    en: 'search',
    zh: '搜索',
    yn: 'cari'
  },
  download: {
    en: 'download',
    zh: '下载',
    yn: 'unduh'
  },
  inTotal: {
    en: 'in total',
    zh: '共计',
    yn: 'secara total'
  },
  download_tip: {
    en: 'download PDF',
    zh: '下载 PDF',
    yn: 'unduh PDF'
  },
  noSearchResult: {
    en: 'No search results',
    zh: '无搜索结果',
    yn: 'Tidak ada hasil pencarian'
  },
  empty: {
    en: 'No product',
    zh: '没数据',
    yn: 'Tidak ada terkait'
  },
  generalFaild: {
    en: 'failed，please try again',
    zh: '失败，请重试',
    yn: 'gagal, silakan coba lagi'
  },
  downloadSuccess: {
    en: 'download success',
    zh: '下载成功',
    yn: 'unduh berhasil'
  }
}

const obj:any = {}

for (const item in wordLang) {
  obj[item] = $lan(wordLang[item], 'en')
}

export const words = obj

const tableColumn = [
  {
    title: {
      en: 'No',
      zh: '序号',
      yn: 'NO'
    },
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    width: '5%',
    render: (key:number) => (
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{key + 1}</div>
    ),
  },
  {
    title: {
      en: 'order number',
      yn: 'Order No',
      zh: '订单编号'
    },
    dataIndex: 'order_no',
    key: 'order_no',
    align: 'center',
    width: '18%',
    render: (text:any) => {
      return (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          <div style={{height: '100%'}}>{text}</div>
        </div>
      )
    },
  },
  {
    title: {
      yn: 'Nomer Resi',
      zh: '快递单号',
      en: 'express number'
    },
    dataIndex: 'express_info',
    key: 'express_info',
    render: (express_info:any) => (
      <div className="inner_td" style={{ wordWrap: 'break-word', wordBreak: 'break-word', minHeight: '100px' }}>
        {express_info.express_no || ''}
      </div>
    ),
    align: 'center',
    width: '18%',
  },
  {
    title: {
      yn: 'SKU',
      zh: '规格',
      en: 'sku'
    },
    dataIndex: 'sku_list',
    key: 'sku_list',
    align: 'left',
    width: '22%',
    render: (sku_list:Array<any>) => {
      return (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{
          sku_list.map((val:any, index:number) => {
            return (
              <div key={index} style={{marginTop: index ? '10px' : ''}}>
                <span>{val.sku?.product_title} : </span>
                <span>{val.count}</span>
              </div>
            )
          })
        }</div>
      )
    },
  },
  {
    title: {
      yn: 'Qty in total',
      zh: '总数量',
      en: 'total amount'
    },
    dataIndex: 'total_sku_count',
    key: 'total_sku_count',
    align: 'center',
    width: '7%'
  },
  {
    title: {
      yn: 'Label tercetak',
      zh: '快递单打印',
      en: 'label printed'
    },
    dataIndex: 'label',
    key: 'label',
    render: (text:number) => (
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
        {text ? 'yse' : 'no'}
      </div>
    ),
    align: 'center',
    width: '10%',
  },
  {
    title: {
      yn: 'Dikemas',
      zh: '打包',
      en: 'Packed'
    },
    align: 'center',
    width: '10%'
  },
  {
    title: {
      yn: 'Pickup Oleh Kurir',
      zh: '发件人取货',
      en: 'pick up by sender'
    },
    align: 'center',
    width: '10%'
  }
]

export const column = tableColumn.map((val:any) => {
  const obj:any = val
  obj.title = $lan(val.title, 'en')
  return obj
})
