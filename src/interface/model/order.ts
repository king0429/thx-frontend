export interface orderListParams {
  page: number | string,
  page_size: number,
  customer?: string | number,
  order_number?: string,
  product_name?: string,
  plan_delivery_date?: string,
  real_delivery_date?: string,
  warehouse_date?:string
}
