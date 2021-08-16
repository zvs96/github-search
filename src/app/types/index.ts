export interface State {
  loading: boolean;
  total_count: number;
  repositories: IRepository[];
  filterInput: IFilterInput,
  searchFilter: ISearchFilter
}

export interface RepositoryState {
  loading: boolean;
  repository: IRepository | null;
}

export interface IRepositoriesResult {
  total_count: number;
  incomplete_results: boolean;
  items: IRepository[]
}

export interface IFilterInput {
  query: string;
  per_page: number;
  page: number;
}

export interface ISearchFilter {
  stars: string;
}

export interface IRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string;
  watchers: number;
  language: string;
  homepage: string;
  open_issues_count: number;
  default_branch: string;
  disabled: boolean;
  archived: boolean;
  has_issues: boolean;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  url: string;
  html_url: string;
  license: {
    key: string,
    name: string,
    url: string,
  },
  owner: {
    id: number;
  };
}
