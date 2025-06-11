import {
    CHANNEL_ID,
    VIDEO_COUNT,
    YOUTUBE_API_KEY
} from '../config'
import { VideoData, YouTubeResponse } from '../types/youtube'


export async function getLatestYoutubeVideos(channelId: string = CHANNEL_ID): Promise<VideoData[]> {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${channelId}&maxResults=${VIDEO_COUNT}&key=${YOUTUBE_API_KEY}`
    )

    if (!res.ok) throw new Error(`YouTube API error: ${res.statusText}`)

    const data: YouTubeResponse = await res.json()

    if (!data.items) throw new Error('No videos found or invalid API response')

    return data.items.map(({ snippet }) => ({
        title: snippet.title,
        videoId: snippet.resourceId.videoId
    }))
}

