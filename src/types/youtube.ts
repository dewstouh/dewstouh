export type YouTubeSnippet = {
    title: string
    resourceId: {
        videoId: string
    }
}

export type YouTubeItem = {
    snippet: YouTubeSnippet
}

export type YouTubeResponse = {
    items: YouTubeItem[]
}

export type VideoData = {
    title: string
    videoId: string
}