export default class utils {
  static debug = false
  /**
     * 判断字符串是否为空
     * @param str
     * @returns {boolean}
     */
  static isNull (str) {
    return str == null || str.length === 0 || str === ''
  }
  /**
   * 判断用户名是否合法
   * @param {*} username
   */
  static isTrueUserName (username) {
    var test = /^[a-zA-Z0-9_-]{6,16}$/
    return test.test(username)
  }
  /**
   * 判断用户密码是否合法
   * @param {*}  password
   */
  static isTrueUserPassword (password) {
    var test = /^[a-zA-Z0-9_-]{6,16}$/
    return test.test(password)
  }
  /**
   * 判断emial是否合法
   * @param {*} email
   */
  static isTrueUserEmail (email) {
    // Email正则
    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return ePattern.test(email)
  }

  static isSameStr (str1, str2) {
    return str1 === str2
  }

  /**
     *
     * @desc  判断是否为身份证号
     * @param  {String|Number} str
     * @return {Boolean}
     */
  static isIdCard (str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  }

  /**
     *
     * @desc   判断是否为手机号
     * @param  {String|Number} str
     * @return {Boolean}
     */
  static isPhoneNum (str) {
    return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str)
  }
  /**
    * 时间格式的转换
     */

  static changeTime (str) {
    var dateee = new Date(str).toJSON()
    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return date
  }
  /**
   * 截取字符串长度，如果字符串长度大于200，返回截取前200的字符
   * @param {} str
   */
  static cropTheCpasuleContent (str) {
    if (str.length >= 200) {
      return str.substring(0, 200) + '...'
    }
    return str
  }

  static getUrl(){
    if (this.debug){
      return "http://127.0.0.1:8000"
    }
    return ""
  }

  static getIsLogin(){
    return this.$store.getters.getIsLogin
  }


}
