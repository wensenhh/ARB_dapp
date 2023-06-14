import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia'
import { Login } from '../api/app.js'
import { showToast } from 'vant';

// Setup写法
export const useAddrStore = defineStore('addr', {
  persist: {
    enabled: true,//开启数据持久化
    strategies: [
      {
        key: 'USER',//给一个要保存的名称
        storage: localStorage,//sessionStorage / localStorage 存储方式
      }
    ]
  },
  state: () => {
    return {
      address: '',
      usertoken: '',
      parentName: '',
      showtabbar: true,
      userinfo: null
    }
  },
  actions: {
    async loginaddr(addr, cb) {
      console.log('执行登录操作=' + addr)
      if (addr && addr !== '') await this.changeaddr(addr)
      // 执行登录操作
      // if (this.usertoken == '') await this.userLogin()
      await this.userLogin()
      let gettokenint = setInterval(() => {
        if (this.usertoken && this.usertoken !== '') {
          clearInterval(gettokenint)
          return cb && cb()
        }
      }, 500);
    },
  
    changeaddr(addr) {
      this.address = addr
    },
  
    changetoken(newtoken) {
      this.usertoken = newtoken
    },
  
    gettoken() {
      return this.usertoken
    },
  
    changeuser(obj) {
      this.userinfo = obj
    },
  
    changetab(boo) {
      this.showtabbar = boo
    },
  
    userLogin(){
      console.log(1111)
      Login({
        name: this.address,
        parentName: this.parentName
      }).then(({ obj }) => {
        showToast('登录成功~')
        this.changetoken(obj.token)
        this.changeuser(obj)
      })
    },
  }
  // State
  // const address = ref('');
  // const usertoken = ref('');
  // const parentName = ref('')
  // const showtabbar = ref(true)
  // const userinfo = ref()
  // getter
  //   const doubleCount = computed(() => count.value*2)
  // actions
  // const loginaddr = async function (addr, cb) {
  //   console.log('执行登录操作=' + addr)
  //   if (addr && addr !== '') await changeaddr(addr)
  //   // 执行登录操作
  //   if (usertoken.value == '') await userLogin()
  //   let gettokenint = setInterval(() => {
  //     if (usertoken.value && usertoken.value !== '') {
  //       clearInterval(gettokenint)
  //       return cb && cb()
  //     }
  //   }, 500);
  // }

  // const changeaddr = function (addr) {
  //   address.value = addr
  // }

  // const changetoken = function (newtoken) {
  //   usertoken.value = newtoken
  // }

  // const gettoken = function () {
  //   return usertoken.value
  // }

  // const changeuser = function (obj) {
  //   userinfo.value = obj
  // }

  // const changetab = function (boo) {
  //   showtabbar.value = boo
  // }

  // const userLogin = () => {
  //   Login({
  //     name: address.value,
  //     parentName: parentName.value
  //   }).then(({ obj }) => {
  //     showToast('登录成功~')
  //     changetoken(obj.token)
  //     changeuser(obj)
  //   })
  // }

  // return {
  //   address,
  //   usertoken,
  //   loginaddr,
  //   changeaddr,
  //   showtabbar,
  //   changetab,
  //   changetoken,
  //   changeuser,
  //   gettoken
  // }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAddrStore, import.meta.hot))
}
