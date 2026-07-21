export interface MusicItem {
  liked: boolean
  id: number
  title: string
  artist: string
  cover: string
  url: string
}

export const mockMusicList: MusicItem[] = [
  { liked: false, id: 1, title: 'Baby', artist: 'Justin Bieber', cover: 'https://img2.kuwo.cn/star/albumcover/500/s4s64/94/4055464021.jpg', url: '/audios/M500001q63pp02DaoZ.mp3' },
  { liked: false, id: 2, title: '冷夜', artist: '陈默之', cover: 'https://img2.kuwo.cn/star/albumcover/500/s3s89/52/2924140709.jpg', url: '/audios/M50000300WdO05Ge5b.mp3' },
  { liked: false, id: 3, title: 'ミスターブロークンハート', artist: '松下優也', cover: 'https://img2.kuwo.cn/star/albumcover/500/34/66/1675129280.jpg', url: '/audios/M500000UzR0D1ZNlPH.mp3' },
  { liked: false, id: 4, title: 'Walk on Water', artist: 'G.E.M. 邓紫棋', cover: 'https://img2.kuwo.cn/star/albumcover/500/14/48/3950982335.jpg', url: '/audios/M5000001Yfsh0c4Prv.mp3' },
  { liked: false, id: 5, title: 'Cruel Summer', artist: 'Taylor Swift', cover: 'https://img2.kuwo.cn/star/albumcover/500/4/57/315619434.jpg', url: '/audios/M500002KxCFP2VLfWn.mp3' },
  { liked: false, id: 6, title: 'Beauty And A Beat', artist: 'Justin Bieber&Nicki Minaj', cover: 'https://img2.kuwo.cn/star/albumcover/500/97/83/2471325083.jpg', url: '/audios/M5000048rP603zMFbC.mp3' },
  { liked: false, id: 7, title: '苏幕遮', artist: '张晓棠', cover: 'https://img2.kuwo.cn/star/albumcover/500/s4s86/91/4146300507.jpg', url: '/audios/M500004YP01s40DN5H.mp3' },
  { liked: false, id: 8, title: 'By Your Side', artist: 'Jonas Blue&RAYE', cover: 'https://img2.kuwo.cn/star/albumcover/500/s4s70/4/1578775631.jpg', url: '/audios/M500003jFGHr4RJT6N.mp3' },
  { liked: false, id: 9, title: 'Where Did U Go (Album Version)', artist: 'G.E.M. 邓紫棋', cover: 'https://img2.kuwo.cn/star/albumcover/500/s4s94/30/3855673140.jpg', url: '/audios/M500003vdrEu3OQ3mV.mp3' },
  { liked: false, id: 10, title: 'Creation', artist: ' Clarinda', cover: 'https://img2.kuwo.cn/star/albumcover/500/s4s27/1/2766639521.jpg', url: '/audios/M500004SHxKE32vgxx.mp3' },
  { liked: false, id: 11, title: '真爱假说', artist: '庄东茹&LvJam', cover: 'https://img2.kuwo.cn/star/albumcover/500/s4s8/46/3573601443.jpg', url: '/audios/M500001k9Lb21iYo60.mp3' },
  { liked: false, id: 12, title: '红颜如霜', artist: '周杰伦', cover: 'https://img2.kuwo.cn/star/albumcover/500/s4s14/55/4227772595.jpg', url: '/audios/M500002qhTSb0QhR9A.mp3' },
  { liked: false, id: 13, title: '清欢别', artist: '一颗狼星', cover: 'https://img2.kuwo.cn/star/albumcover/500/s4s47/7/2892177033.jpg', url: '/audios/M500001LBuiE3KiBWy.mp3' },
  { liked: false, id: 14, title: 'Come Around Me', artist: 'Justin Bieber', cover: 'https://img2.kuwo.cn/star/albumcover/500/s4s70/96/2914903895.jpg', url: '/audios/M5000049uTDV38OVBG.mp3' },
  // { id: 15, title: '', artist: '', cover: '', url: '' },
]