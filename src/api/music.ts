import axios from 'axios'
import API_BASE_URL from './config'
export async function searchMusic(keywords: any) {
  try {
    let { data } = await axios.get(`${API_BASE_URL}/search`, { params: { keywords } })
    const songs = data.result.songs
    const formatted = songs.map((song: any) => {
      console.log('album 里的字段:', Object.keys(song.album))
      return {
        id: song.id,
        title: song.name,
        artist: song.artists[0].name,
        cover: `https://picsum.photos/200/200?seed=${song.id}`,
        url: '',
        liked: false
      }

    })
    return formatted
  } catch (error) {
    console.log('请求失败:', error)
    throw error  // ← 把错误抛出去，让调用方处理
  }

}

// 获取歌曲的url进行播放
export async function getSongUrl(id: number) {
  try {
    let { data } = await axios.get(`${API_BASE_URL}/search`, { params: { id } })
    console.log('完整响应:', data)
    const url = data.data[0]?.url || ''

    return url
  } catch (error) {
    console.log('获取播放地址失败:', error)
    return ''
  }
}

export async function getSongDetail(id: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { ids: id }
    })

    const songData = response.data.songs?.[0]
    if (!songData) {
      console.log('未找到歌曲详情')
      return null
    }

    return {
      id: songData.id,
      title: songData.name,
      artist: songData.ar?.map((a: any) => a.name).join(' / ') || '',
      cover: songData.al?.picUrl || 'https://picsum.photos/200/200?seed=default',
      url: '',
      liked: false
    }
  } catch (error) {
    console.log('获取歌曲详情失败:', error)
    return null
  }
}