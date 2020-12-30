import BigNumber from 'bignumber.js'
import moment from 'moment'
/* eslint-disable */
const mgui = {
  cdn: 'https://r.moguyun.com/htzq/ump-front/mncg/',
  medalCDN: 'http://platform-test.moguyun.com/image_data/',
  baseRouter:'/platform/front-stock',
  userInfo: {
    avatarUrl: '',
    id: '',
    nickName: ''
  },
  state: {
    curAccountId: '',
    tempZqdm: '',
    switchZqdm: '',
    isActivity: '',
    tplId: '',
    actId: '',
    buyKey: '',
    sellKey: ''
  },

  upColor: 'FD3337',
  downColor: '5FA03C',

  isTestEnv: function () {
    return location.href.indexOf('test') !== -1 || location.href.indexOf('localhost') !== -1
  },
  formatDate: (value, pattern = 'YYYY.MM.DD HH:mm:ss') => {
    if (!value) {
      return ''
    }
    if (typeof value === 'string') {
      value = value.replace(/-/g, '/')
    }
    pattern = `${pattern}`.replace(/hh/g, 'HH')
    const date = new Date(value)
    return moment(date).format(pattern)
  },

  // 根据红涨绿跌
  getColor: function (value, value1) {
    const val = Number(value)
    const val1 = Number(value1)

    if (isNaN(val) || val === 0 || val === val1) {
      return '#5E5E5E'
    } else if (val < value1) {
      return this.downColor
    } else {
      return this.upColor
    }
  },

  getUpOrDown: (value) => {
    if (!value) {
      return 'default'
    }
    return value > 0 ? 'up' : 'down'
  },

  // 获取地址栏某个参数
  getParameter: function (param) {
    const query = window.location.search
    const iLen = param.length
    let iStart = query.indexOf(param)
    if (iStart === -1) return ''

    iStart += iLen + 1
    const iEnd = query.indexOf('&', iStart)
    if (iEnd === -1) return query.substring(iStart)

    return query.substring(iStart, iEnd)
  },
  getQueryString (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
    return null
  },
  setDotForZl: function (num, str, op, othercode = '') {
    this.getSessionInfo().then(res => {
      const id = 'uid=' + res.id + othercode
      window._paq.push(['trackEvent', 'leaf' + num, str, id, op])
    })
    // console.log(JSON.stringify(['trackEvent', 'leaf'+num,str,id,op]));
  },

  getImgCdn (path) {
    return this.cdn + path
  },
  getMedalImgCdn (path) {
    return this.medalCDN + path
  },

  /**
   * 
   * @param {*} object 
   * @param {*} isPercent 
   */
  toFixed (object, isPercent) {
    if (object === null || object === undefined) {
      return '--'
    }
    let value = object
    let n = 2
    if (object.constructor === Object) {
      value = object.value
      n = object.num
    }
    let num = new BigNumber(value).toFixed(n)
    // 有可能出現的情況是 -0.001  toFixed(2)後變成 -0.00
    return `${num == 0 ? '0.00' : num}${isPercent ? '%' : ''}`
  },
  /**
   * 处理数字显示的问题：如大于等于1000，显示1k；1200，显示1.2k(保留小数点后一位)
   * @param {*} num 
   */
  formateNumberTip(num) {
    if (typeof num !== 'number') {
      throw new TypeError(`the type of ${num} is must be number`)
    }
    if (num < 0) {
      return '--'
    } else if (num<1000) {
      return num
    } else {
      return `${new BigNumber((num/1000)).toFixed(1)}k`
    }
  },
  /**
   * 日期倒计时
   * @param {*} date 
   * @param {*} callback 
   */
  timeCountDown(date, callback = () => {}){
    let time = '';
    const formatNumber = (n)=>{
      n = n.toString();
      return n[1] ? n : '0' + n;
    };
    const setTime = ()=>{
      const leftTime = new Date(date.replace(/\-/g, '/')) - new Date();
      if (leftTime >= 0) {
        let d = Math.floor(leftTime / 1000 / 60 / 60 / 24),
            h = Math.floor(leftTime / 1000 / 60 / 60 % 24),
            m = Math.floor(leftTime / 1000 / 60 % 60),
            s = Math.floor(leftTime / 1000 % 60);
        h = h < 10 ? `0${h}` : h 
        m = m < 10 ? `0${m}` : m 
        s = s < 10 ? `0${s}` : s   
        time = `<div class="time-tip">${ d > 0 ? d + '天' : '' }<span class="time-rect">${h}</span>时<span class="time-rect">${m}</span>分<span class="time-rect">${s}</span>秒</div>`;
        callback(time, () => clearInterval(timer));
      } else {
        time = '已超时'
        callback(time, () => clearInterval(timer));
        return
      }
    };
    const timer = setInterval(() => {
      setTime()
    }, 1e3);
  },
}

export default mgui

/**
* @description 函数防抖
* @param func 目标函数
* @param wait 延迟执行毫秒数
* @param immediate true - 立即执行， false - 延迟执行
*/
export function debounce(func, wait, immediate) {
  let timer;
  return function() {
   let context = this,
       args = arguments;
   if (timer) clearTimeout(timer);
   if (immediate) {
     let callNow = !timer;
     timer = setTimeout(() => {
       timer = null;
     }, wait);
     if (callNow) func.apply(context, args);
   } else {
     timer  = setTimeout(() => {
       func.apply(context, args);
     }, wait)
   }
 }
}
