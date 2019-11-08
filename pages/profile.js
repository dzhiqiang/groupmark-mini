const CURRENT = 'product'
const PROFILES = {
  'dev': {
    'domain': 'http://localhost:8080' // 把 <ip dev> 写进本地 hosts 文件, ip 表示对应后端开发的地址
  },
  'product': {
    'domain': 'https://www.wovfbuxdwjle.com'
  }
}
const ENV = PROFILES[CURRENT]

export { ENV }