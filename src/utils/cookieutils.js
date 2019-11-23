export default class cookieutils {
/**
* 保存账号密码到cookie
*/
  static setCookie (key, value) {
    var exDate = new Date()
    exDate.setTime(exDate.getTime() + 24 * 60 * 60 * 1000 * 15) // 保存的天数，我这里写的是15天
    window.document.cookie = key + '=' + value + ';path=/;expires=' + exDate.toGMTString() // 字符串拼接cookie
  }
  /**
 * 获取账号的cookie
 */
  static getCookie (param) {
    if (document.cookie.length > 0) {
      var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=') // 再次切割
        if (arr2[0] === param) {
          this.c_param = arr2[1]
        }
      }
    }
    return this.c_param
  }
  /**
 * 清除账号保存的cookie
 */
  static clearCookie (key) {
    this.setCookie(key, '')
  }
  /**
 * 获取cookie是否存在
 */
  static getCookieisEmpty (param) {
    if (this.getCookie(param) === undefined) {
      return true
    }
    return false
  }
}
