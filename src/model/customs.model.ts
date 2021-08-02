import $ajax from '../libs/ajax'

export default {
  getOrderCustomers: async ():Promise<any> => {
    return $ajax(`/api/order/customer`)
  }
}