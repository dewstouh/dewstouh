import type { Repo, Activity } from '../types/github'
import type { GitHubOrganization, OrganizationWithStats } from '../types/organization'

const GITHUB_API = 'https://api.github.com'

export async function getTopStarredRepos(username: string): Promise<Repo[]> {
    const url = `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`
    const res = await fetch(url)
    if(res.status == 403) throw new Error("Forbidden | Rate limit")
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

export async function getUserOrganizations(username: string): Promise<OrganizationWithStats[]> {
    try {
        const url = `${GITHUB_API}/users/${username}/orgs`
        const res = await fetch(url)
        if(res.status == 403) throw new Error("Forbidden | Rate limit")
        const orgs: GitHubOrganization[] = await res.json()

        // Get detailed info for each organization
        const orgDetails = await Promise.all(
            orgs.map(async (org) => {
                try {
                    const orgRes = await fetch(`${GITHUB_API}/orgs/${org.login}`)
                    if(orgRes.status === 403) throw new Error("Rate limit")
                    const orgDetail: OrganizationWithStats = await orgRes.json()
                    return orgDetail
                } catch (error) {
                    // Return basic info if detailed fetch fails
                    return {
                        login: org.login,
                        description: org.description,
                        avatar_url: org.avatar_url,
                        public_repos: 0,
                        html_url: `https://github.com/${org.login}`,
                        created_at: new Date().toISOString()
                    }
                }
            })
        )

        return orgDetails
    } catch (error) {
        console.error('Error fetching organizations:', error)
        return []
    }
}
