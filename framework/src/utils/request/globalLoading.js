import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let account = 0 // 请求次数;

const cancelLoading = () => {
  if (account === 0) {
    return
  }

  --account

  if (account === 0) {
    let timer = setTimeout(() => {
      NProgress.done()
      clearTimeout(timer)
      timer = null
    }, 100)
  }
}

const showLoading = () => {
  NProgress.start()
  ++account
}

export { cancelLoading, showLoading }
