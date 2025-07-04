// import { getLatestYoutubeVideos } from "./services/youtube.service";
import { promises as fs } from 'fs'
import { format } from 'date-fns'
import { ACTIVITY_PLACEHOLDER, DATE_PLACEHOLDER, GITHUB_USERNAME, ORGANIZATIONS_PLACEHOLDER } from './config';
// import { generateYoutubeHTML } from './utils/generateYoutubeHTML';
import { getRecentActivity, getUserOrganizations } from "./services/github.service";
// import { generateTopReposHTML } from "./utils/generateTopReposHTML";
import { generateRecentActivityHTML } from "./utils/generateRecentActivityHTML";
import { generateOrganizationsHTML } from "./utils/generateOrganizationHTML";


(async () => {

    const readme = await fs.readFile('./src/README.md.template', 'utf-8')

    // ---- YOUTUBE ----

    const [activities, organizations] = await Promise.all([
        // getTopStarredRepos(GITHUB_USERNAME),
        getRecentActivity(GITHUB_USERNAME),
        /* getLatestYoutubeVideos(), */
        getUserOrganizations(GITHUB_USERNAME)
    ])

    /* const latestYoutubeVideos = videos.map(generateYoutubeHTML).join('\n') */

    const newMarkdown = readme
    /* .replace(YOUTUBE_PLACEHOLDER, `\n${latestYoutubeVideos}\n`) */
    .replace(DATE_PLACEHOLDER, format(new Date(), 'dd MMMM yyyy HH:mm'))
    //.replace(STARS_PLACEHOLDER, generateTopReposHTML(repos))
    .replace(ACTIVITY_PLACEHOLDER, generateRecentActivityHTML(activities))
    .replace(ORGANIZATIONS_PLACEHOLDER, generateOrganizationsHTML(organizations))


    console.log('✅ README.md updated with latest information!')


    await fs.writeFile('README.md', newMarkdown)


})()
