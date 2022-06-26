import request from '@/utils/request'

export default {
  // 获取菜单列表
  getMenuList: request.get('/api/sys/menu/authTree'),
  // 客户选择
  getSelectList: request.get('/api/member/selectList'),
  // 地址树
  getAddressTree: request.get('/sys/base/addressTree'),
  // 获取刷机组
  getRootGroupList: request.get('/api/rootGroup/selectList')
}
