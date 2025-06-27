import type { OrganizationWithStats } from '../types/organization'

export function generateOrganizationHTML(org: OrganizationWithStats): string {
    const description = org.description || 'No description available'
    const repoCount = org.public_repos || 0
    
    return `
<div align="center" style="margin: 10px;">
  <a href="${org.html_url}" target="_blank">
    <img src="${org.avatar_url}" width="60" height="60" alt="${org.login}" style="border-radius: 50%; margin-bottom: 8px;" />
  </a>
  <br>
  <strong><a href="${org.html_url}" target="_blank">${org.login}</a></strong>
  <br>
  <small>${description.length > 50 ? description.substring(0, 50) + '...' : description}</small>
  <br>
  <img src="https://img.shields.io/badge/repos-${repoCount}-blue?style=flat-square" alt="Repositories" />
</div>`.trim()
}

export function generateOrganizationsHTML(organizations: OrganizationWithStats[]): string {
    if (organizations.length === 0) {
        return `
<p align="center">
  <i>🔍 Looking for collaborations</i>
</p>`.trim()
    }

    const orgCards = organizations.map(generateOrganizationHTML)
    
    return `
<table align="center">
  <tr>
    ${orgCards.map((card, index) => 
      index % 3 === 0 && index > 0 ? `</tr><tr><td>${card}</td>` : `<td>${card}</td>`
    ).join('')}
  </tr>
</table>`.trim()
}
