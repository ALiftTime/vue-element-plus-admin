<template>
  <div class="login">
    <div class="loginBg" />
    <div class="loginVeiwBox">
      <div class="loginVeiw">
        <div class="flexCenter titleBox">
          <img
            src="@/assets/imgs/logo.png"
            alt="logo"
            class="loginImg"
          >
          <div class="title">
            ElementAdmin
          </div>
        </div>
        <div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="flexCenter loginForm">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                <template #prefix>
                  <IconEp icon="user" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="密码"
                @keyup.enter="handleLogin"
              >
                <template #prefix>
                  <IconEp icon="lock" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="rememberPwd">
                <el-checkbox v-model="loginForm.rememberMe">
                  记住密码
                </el-checkbox>
                <!-- <div>忘记密码?</div> -->
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                class="loginButtom"
                @click.prevent="handleLogin"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { loginAjax } from 'Ajax'

export default {
  name: 'Login',
  data() {
    return {
      cookiePassword: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: true,
        // code: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
        ],
        // code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  created() {
    console.log(this.$router)
    this.init()
  },
  mounted() {
    this.redirect = (this.$route.query && this.$route.redirect) || '/'
  },
  methods: {
    init() {
      const userInfo = this.g_getStorage('USER_INFO') || ''
      if (userInfo && userInfo.rememberMe) {
        this.loginForm = {
          username: userInfo.username,
          password: userInfo.password,
          rememberMe: userInfo.rememberMe
        }
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.getAutoTree(() => {
            const permissionStore = usePermissionStore()
            this.loading = false
            const _userStore = useUserStore()
            _userStore.setLoginInfo({ token: '123' })
            _userStore.setUserInfo(this.loginForm)
            this.g_jump(this.redirect || permissionStore.addRouters[0].path)
          })
        }
      })
    },
    getAutoTree(cb) {
      loginAjax.authTree().then(async res => {
        const permissionStore = usePermissionStore()
        await permissionStore.generateRoutes(res).catch(() => {})
        permissionStore.getAddRouters.forEach((route) => {
          this.$router.addRoute(route) // 动态添加可访问路由表
        })
        permissionStore.setIsAddRouters(true)
        this.g_setStorage('ROLE_ROUTERS', res)
        cb()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  font-size: 12px;
}
.loginBg{
  width: 67vw;
  height: 100%;
  background: url('http://merchant-manage.test.yxwl027.cn/static/img/login-background.76c52a7d.png') no-repeat;
  background-size: cover;
}
.loginVeiwBox{
  height: 100%;
  overflow: auto;
  position: fixed;
  top: 0;
  right: 0;
}
.loginVeiw{
  // width: 33.23vw;
  width: 33vw;
  height: 100%;
  background: #fff;
}
.titleBox{
  padding: 11.94vh 0 10.83vh;
}
.loginImg{
  width: 5.99vw;
  height: 5.99vw;
  display: block;
}
.title{
  font-size: 1.98vw;
  font-family: PingFang SC;
  font-weight: 800;
  color: #208DFF;
  margin-top: 3.51vh;
}

.loginForm{
  width: 100%;
  .el-input {
    width: 20.73vw;
    height: 4.81vh;
  }
}
.rememberPwd{
  width: 20.73vw;
  display: flex;
  justify-content: space-between;
  color: #999999;
  font-size: 0.83vw;
  .el-checkbox{
    color: #999999;
    /deep/.el-checkbox__label{
      font-size: 0.83vw;
    }
  }
}
.loginButtom{
  width: 20.7vW;
  height: 52px;
  background: linear-gradient(-28deg, #208DFF 32%, #1C92FF 81%);
  box-shadow: 0px 5px 15px 3px rgba(16, 103, 212, 0.25);
  border-radius: 52px;
}

.el-login-footer{
  height: 40px;
  line-height: 30px;
  position: fixed;
  bottom: 30px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
  padding-right: 33.23vw;
}
.flexCenter{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img{
  display: inline-block;
}

@media screen and (max-width: 1200px){
  .login{
    width: 1200px;
  }
  .loginVeiw{
    width: 400px;
  }
  .loginImg{
    width: 72px;
    height: 72px;
  }
  .title{
    font-size: 24px;
  }
  .loginForm  .el-input{
    width: 250px;
  }
  .rememberPwd{
    width: 250px;
    font-size: 12px;
  }
  /deep/.el-checkbox__label{
    font-size: 12px;
  }
  .loginButtom{
    width: 250px;
  }
}
@media screen and (max-height: 600px){
  .loginVeiw{
    height: 668px;
  }
  .loginVeiw::-webkit-scrollbar {
    display: block;
  }
  .titleBox{
    padding: 109px 0 99px;
  }
  .title{
    margin-top: 34px;
  }
  .loginForm  .el-input{
    height: 44px;
  }
}
</style>
