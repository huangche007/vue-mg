import http from '@/utils/http'

const serverPrefixList = {
  user: '/xxx/yyy'
}

export default {
  login: (data) => http.get(serverPrefixList.user + '/login', data)
}