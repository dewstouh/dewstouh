export interface GitHubOrganization {
  login: string;
  id: number;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string | null;
}

export interface OrganizationWithStats {
  login: string;
  description: string | null;
  avatar_url: string;
  public_repos: number;
  html_url: string;
  blog?: string;
  location?: string;
  created_at: string;
}
