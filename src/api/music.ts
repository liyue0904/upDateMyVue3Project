import axios from 'axios'
import API_BASE_URL from './config'

export async function searchMusic(keywords: any) {
  try {
    let { data } = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        keywords,
        randomCNIP: true  // 解决 Vercel 部署 IP 被限制的问题
      }
    })
    const songs = data.result.songs
    const formatted = songs.map((song: any) => {
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
    throw error
  }
}

export async function getSongUrl(id: number) {
  try {
    let { data } = await axios.get(`${API_BASE_URL}/song/url`, {
      params: {
        id,
        randomCNIP: true
      }
    })
    const url = data.data[0]?.url || ''
    return url
  } catch {
    return ''
  }
}

export async function getSongDetail(id: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/song/detail`, {
      params: {
        ids: id,
        randomCNIP: true,
        timeout: 30000
      }
    })

    const songData = response.data.songs?.[0]
    if (!songData) {
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
  } catch {
    return null
  }
}