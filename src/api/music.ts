import axios from 'axios'
import API_BASE_URL from './config'
import { mockMusicList, type MusicItem } from '../data/mockMusic'

// 是否使用模拟数据（当后端不可用时设为 true）
const USE_MOCK = true

export async function searchMusic(keywords: any) {
  // 如果使用模拟数据，直接返回本地数据
  if (USE_MOCK) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    // 根据关键词过滤本地数据
    const keyword = keywords.toLowerCase().trim()
    if (!keyword || keyword === '热门') {
      return mockMusicList
    }

    const filtered = mockMusicList.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.artist.toLowerCase().includes(keyword)
    )
    return filtered
  }

  // 以下代码仅在 USE_MOCK = false 时使用
  try {
    const { data } = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        keywords,
        randomCNIP: true,
        timeout: 30000,
        withCredentials: true
      }
    })
    const songs = data.result.songs
    return songs.map((song: any) => ({
      id: song.id,
      title: song.name,
      artist: song.artists[0].name,
      cover: `https://picsum.photos/200/200?seed=${song.id}`,
      url: '',
      liked: false
    }))
  } catch (error) {
    console.warn('后端不可用，使用模拟数据')
    // 如果后端请求失败，降级使用模拟数据
    const keyword = keywords.toLowerCase().trim()
    if (!keyword || keyword === '热门') {
      return mockMusicList
    }
    return mockMusicList.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.artist.toLowerCase().includes(keyword)
    )
  }
}

export async function getSongUrl(id: number) {
  if (USE_MOCK) {
    // 模拟返回本地音频文件路径
    const song = mockMusicList.find(item => item.id === id)
    return song?.url || ''
  }
  try {
    const { data } = await axios.get(`${API_BASE_URL}/song/url`, {
      params: { id, randomCNIP: true }
    })
    return data.data[0]?.url || ''
  } catch {
    return ''
  }
}

export async function getSongDetail(id: number) {
  if (USE_MOCK) {
    const song = mockMusicList.find(item => item.id === id)
    return song || null
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/song/detail`, {
      params: { ids: id, randomCNIP: true }
    })
    const songData = response.data.songs?.[0]
    if (!songData) return null
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
