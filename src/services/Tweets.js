import Api from './Api'

export const getInitialTweets = () => {
  return Api.get(`/api`).then(res => res.data)
}

export const getLatestTweetsAfterTimestamp = (timestamp, count) => {
  return Api.get(`/api?afterTime=${timestamp}&count=${count}`).then(res => res.data)
}