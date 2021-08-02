import $ajax from '../libs/ajax'
// import mockOrderList from '../pages/order_history/mock'
import { orderListParams } from '../interface/model/order'
import $utils from '../libs/utils'



const orderModel: any = {
  getOrderList: async (params: orderListParams):Promise<any> => {
    const queryStr:string = $utils.$quary(params)
    return await $ajax.get(`/api/order${queryStr}`)
  }
}
export default orderModel