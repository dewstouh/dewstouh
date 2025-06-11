import { REPO_COUNT } from "../config";
import { Repo } from "../types/github";

export function generateTopReposHTML(repos: Repo[]): string {
  const header = `| ⭐ Repo | Description | ⭐ Stars |
|--------|-------------|-------|`

  const rows = repos.map(repo => {
    const stars = `x${repo.stargazers_count}`
    const desc = repo.description?.replace(/\n/g, ' ') ?? '_No description_'
    return `| [${repo.name}](${repo.html_url}) | ${desc} | ${stars} |`
  })

  return [header, ...rows].splice(0, REPO_COUNT).join('\n')
}
  