import LoadingImg from '@/assets/images/loadings.gif'

export default {
  bind: (el, binding) => {
    if (binding.value.src === '') {
      el.src = LoadingImg
      return
    }
    var img = new Image()
    img.src = binding.value.src
    img.onload = function () {
      el.src = this.src
      img = null
    }
  }
}
