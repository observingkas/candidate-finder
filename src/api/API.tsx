console.log('Vite Env:', import.meta.env);
console.log('GitHub Token from Vite:', import.meta.env.VITE_GITHUB_TOKEN);


import axios from 'axios';

// Get the GitHub token from environment variables
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Log the token (first few characters only for security)
console.log('GitHub Token available:', GITHUB_TOKEN ? 'Yes (starts with ' + GITHUB_TOKEN.substring(0, 4) + '...)' : 'No');

// Define the GitHub user interface with all fields we need
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
}

// Function to fetch a list of GitHub users with a random starting point
const searchGithub = async (): Promise<any[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await axios.get(`https://api.github.com/users?since=${start}`, {
      headers: GITHUB_TOKEN ? {
        Authorization: `token ${GITHUB_TOKEN}`  // This is the correct format for GitHub API
      } : {},
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching data from GitHub:', err);
    return [];
  }
};

// Function to fetch a specific GitHub user
const searchGithubUser = async (username: string): Promise<any> => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: GITHUB_TOKEN ? {
        Authorization: `token ${GITHUB_TOKEN}`  // This is the correct format for GitHub API
      } : {},
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching user data from GitHub:', err);
    return null; 
  }
};

// Function to fetch data from the GitHub API for a specific user
export const getCandidateData = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: GITHUB_TOKEN ? {
        Authorization: `token ${GITHUB_TOKEN}`  // This is the correct format for GitHub API
      } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate data from GitHub API:', error);
    return null;
  }
};

// Function to get a random user with complete profile data
export const getRandomUser = async (): Promise<GitHubUser | null> => {
  try {
    // First get a list of users
    const users = await searchGithub();
    
    if (users.length === 0) {
      return null;
    }
    
    // Try to find a user with complete profile data
    for (let i = 0; i < Math.min(users.length, 5); i++) {
      const user = users[i];
      const userData = await searchGithubUser(user.login);
      
      if (userData) {
        return userData;
      }
    }
    
    return null;
  } catch (err) {
    console.error('Error getting random user:', err);
    return null;
  }
};

export { searchGithub, searchGithubUser };