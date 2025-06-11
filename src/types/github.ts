export type Repo = {
    name: string
    html_url: string
    description: string | null
    stargazers_count: number
    fork: boolean,
}

export type Activity = {
    type: string
    repo: {
        name: string
    }
    payload?: {
        commits?: {
            message: string
            url: string
        }[]
    }
    created_at: string
  }