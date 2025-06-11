import type { Repo, Activity } from '../types/github'

const GITHUB_API = 'https://api.github.com'

export async function getTopStarredRepos(username: string): Promise<Repo[]> {
    const url = `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`
    const res = await fetch(url)
    const repos:Repo[] = await res.json()

    return repos
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
}

export async function getRecentActivity(username: string): Promise<Activity[]> {
    const url = `${GITHUB_API}/users/${username}/events/public`
    const res = await fetch(url)
    const events: Activity[] = await res.json()

    return events
}
