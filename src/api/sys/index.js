import request from '@/utils/request'

export default {
  /** 系统用户 */
  sysUserList: request.post('/sys-user/page-list'),
  sysUserAdd: request.post('/sys-user/add'),
  sysUserUpdate: request.post('/sys-user/update'),
  sysUserStatusChange: request.get('/sys-user/status-change'),
  initPassword: request.get('/sys-user/init-password'),
  updatePassword: request.post('/sys-user/update-password'),

  /** 菜单管理 */
  authMenuRouter: request.get('/sys-menu/auth-list'),
  allMenuTree: request.get('/sys-menu/all-tree'),
  addMenu: request.post('/sys-menu/add'),
  delMenu: request.get('/sys-menu/delete'),
  updateMenu: request.post('/sys-menu/update'),

  /** 角色管理 */
  sysRolePageList: request.post('/sys-role/page-list'),
  getRoleSelectList: request.get('/sys-role/select-list'),
  deleteSysRole: request.get('/sys-role/delete'),
  sysRoleAdd: request.post('/sys-role/add'),
  sysRoleUpdate: request.post('/sys-role/update'),

  // 文件上传
  getOssPolicy: request.post('/file/oss/policy'),

  /** 系统配置 */
  querySysConfigParamPage: request.post('/sys/config-param/page'),
  addSysConfigParam: request.post('/sys/config-param/add'),
  updateSysConfigParam: request.post('/sys/config-param/update'),
  deleteSysConfigParam: request.get('/sys/config-param/delete')
}
