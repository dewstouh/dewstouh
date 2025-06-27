import 'dotenv/config'


export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY!;
export const CHANNEL_ID = "UUFEt74PJAXUKBBWyVFZaCrw";

export const YOUTUBE_PLACEHOLDER = "%{{latest_youtube}}%"
export const VIDEO_COUNT = 3;

export const ACTIVITY_PLACEHOLDER = "%{{latest_activity}}%"
export const ACTIVITY_COUNT = 5

export const STARS_PLACEHOLDER = "%{{popular_repos}}%"
export const REPO_COUNT = 3

export const ORGANIZATIONS_PLACEHOLDER = "%{{organizations}}%"
export const ORG_COUNT = 6

export const DATE_PLACEHOLDER = "%{{last_updated}}%"

export const GITHUB_USERNAME = "dewstouh"
export const GITHUB_EVENTS = ["CreateEvent", "IssuesEvent", "PublicEvent", "PullRequestEvent", "PushEvent", "ReleaseEvent"]
