import { VideoData } from "../types"

export function generateYoutubeHTML({ title, videoId }: VideoData): string {
    const safeTitle = title.replace(/'/g, "\\'").replace(/\n/g, ' ')
    return `
<a href='https://youtu.be/${videoId}' target='_blank'>
  <img width='30%' src='https://img.youtube.com/vi/${videoId}/mqdefault.jpg' alt='${safeTitle}' />
</a>`
}