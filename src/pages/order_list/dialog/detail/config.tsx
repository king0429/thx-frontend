import $lan from '../../../../lan'

const wordLang: any = {

  name: {
    en: 'name',
    zh: '姓名',
    yn: 'nomor pesanan'
  },
  address: {
    en: 'address',
    zh: '地址',
    yn: 'nomor pesanan'
  },
  logistics_info: {
    en: 'logistics info',
    zh: '快递信息',
    yn: 'info ekspedisi'
  },
  logistics_name: {
    en: 'logistics name',
    zh: '快递公司名称',
    yn: 'nomor pesanan'
  },
  logistics_number: {
    en: 'logistics number',
    zh: '快递单号',
    yn: 'nomor pesanan'
  },
  logistics_link: {
    en: 'logistics link',
    zh: '快递单链接',
    yn: 'nomor pesanan'
  },
  order_number: {
    en: 'order number',
    zh: '订单编号',
    yn: 'nomor pesanan'
  },
  recipient_info: {
    en: 'recipient info',
    zh: '收件人信息',
    yn: 'info resi'
  }, 
  order_info: {
    en: 'order info',
    zh: '订单信息',
    yn: 'info pesanan'
  },
  created_time: {
    en: 'create time',
    zh: '创建时间',
    yn: 'waktu pembuatan'
  },
  amount: {
    en: 'qty in total',
    zh: '总件数',
    yn: 'jumlah produk'
  },
  total_price: {
    en: 'total_price',
    zh: '订单金额',
    yn: 'total harga'
  },
  product_id: {
    en: 'product id',
    zh: '商品id',
    yn: 'kode produk'
  },
  sku: {
    en: 'sku',
    zh: 'sku',
    yn: 'varian'
  },
  price: {
    en: 'price',
    zh: '单价',
    yn: 'harga'
  },
  status: {
    en: 'status',
    zh: 'status',
    yn: 'status'
  },
  disbursement_info: {
    en: 'disbursement info',
    zh: '结款信息',
    yn: 'info pencairan'
  },
  disbursement_value: {
    en: 'disbursement value',
    zh: '结款金额',
    yn: 'nilai pencairan'
  },
  penalty: {
    en: 'penalty',
    zh: '罚金',
    yn: 'denda'
  },
  cancel_reason: {
    en: 'reason: cancel',
    zh: '罚金',
    yn: 'alasan：batal'
  },
  aftersale_reason: {
    en: 'reason: aftersale',
    zh: '罚金',
    yn: 'alasan：purna jual'
  },


}
  
const obj: any = {}

for (const item in wordLang) {
  obj[item] = $lan(wordLang[item], null)
}

export const words = obj


