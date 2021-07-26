import $ajax from '../libs/ajax'

const userModel = {
  async getUserInfo ():Promise<any> {
    return $ajax.get('/api/v1/private/info')
  },
}

export default userModel