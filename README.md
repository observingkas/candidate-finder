# GitHub Candidate Finder

GitHub Candidate Finder is a web application designed to help employers find and save potential candidates from GitHub. The application fetches user data from the GitHub API, displays it in a user-friendly interface, and allows employers to save promising candidates for later review.

# Table of Contents
Installation
Usage
License

# Installation
Clone the repository: git clone https://github.com/your-username/github-candidate-finder.git
cd github-candidate-finder
Install dependencies: npm install
Create a .env file in the root directory with your GitHub token:

VITE_GITHUB_TOKEN=your_github_personal_access_token
Start the development server: npm run dev

# Usage
Home Page: View random GitHub users one at a time

Click "+" to save a candidate and load the next one
Click "-" to skip a candidate and load the next one
Saved Candidates: View all saved candidates

See detailed information about each candidate
Click "View Profile" to visit their GitHub page
Click "Remove" to remove a candidate from your saved list
API Integration: The application uses the GitHub API to fetch user data. A personal access token is required to increase the API rate limit. The token is stored in an environment variable and used for all API requests.

# Deployment
The application is deployed on Render and can be accessed at https://your-app-name.onrender.com

# Contributing
If you'd like to contribute to this project, please fork the repository, create a new branch, and submit a pull request with your changes.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

##link to video walkthrough:

##link to deployed page on render: https://github-candidate-finder-6x1f.onrender.com
