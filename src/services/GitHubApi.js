import axios from 'axios';

const GITHUB_USERNAME = 'abhijit-karale';

export const fetchGithubRepos = async () => {
  try {
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};
