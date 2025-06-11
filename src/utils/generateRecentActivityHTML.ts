import { formatDistanceToNow } from "date-fns"
import { Activity } from "../types/github"
import { ACTIVITY_COUNT, GITHUB_EVENTS } from "../config"


function splitTitleAndDescription(commitMessage:string){
    const [title, description] = commitMessage.split("\n\n")
    return [title, description];
}

export function generateRecentActivityHTML(activities: Activity[]): string {
    const filtered = activities.filter((event) =>
        GITHUB_EVENTS.includes(event.type)
    )
    const entries: Map<string, string> = new Map()

    for (const event of filtered) {
        const repoName = event.repo.name
        const eventType = event.type.replace(/Event$/, '')
        const timeAgo = formatDistanceToNow(new Date(event.created_at), { addSuffix: true })

        if (event.type === 'PushEvent' && event.payload?.commits?.length) {
            for (const commit of event.payload.commits) {
                const [commitTitle, commitDescription] = splitTitleAndDescription(commit.message);
                const text = `- <strong>Commit</strong> to <a href="https://github.com/${repoName}">${repoName}</a>: ${commitTitle}${commitDescription ? `\n  - ${commitDescription}` : ""} • `
                entries.set(text, timeAgo)
            }
        } else {
            entries.set(`- <strong>${eventType}</strong> on <a href="https://github.com/${repoName}">${repoName}</a> • `, timeAgo)
        }

    }

    const texts = Array.from(entries.entries()).map(([k, v]) => (`${k}${v}`)) // removes duplicates

    return `\n${texts.slice(0, ACTIVITY_COUNT).join('\n')}\n`
  }
  