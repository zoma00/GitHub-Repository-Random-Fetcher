# GitHub-Repository-Random-Fetcher
is a Google Apps Script project that fetches multiple random public repositories from GitHub and displays their details in a Google Sheet


## Overview

The **GitHub Repository Fetcher** is a Google Apps Script project that fetches multiple random public repositories from GitHub and displays their details in a Google Sheet. This project showcases my API integration, data handling, and visualization skills, making it a valuable addition to my portfolio as a backend developer and data scientist.

## Features

- **Fetch Multiple Repositories**: Retrieve a specified number of random public repositories from GitHub.
- **Repository Details**: Gather and display information such as:
  - Repository Name
  - Stars
  - Forks
  - Number of Commits
  - Number of Open Issues
- **Dynamic Search Criteria**: Easily modify the search query to fetch repositories based on programming language or other parameters.
- **Data Visualization**: Integrate with Google Looker Studio to visualize repository data through charts and dashboards.

## Skills Highlighted

- **API Integration**: Proficient in using RESTful APIs to fetch and manipulate data.
- **Google Apps Script**: Experience in automating tasks and enhancing Google Sheets functionality.
- **Data Management**: Ability to parse and handle JSON data effectively for reporting and analysis.
- **Data Visualization**: Capable of creating compelling visual representations of data using Google Looker Studio.
- **Error Handling**: Implemented error logging to ensure robustness and facilitate debugging during API interactions.

## Usage

### Setup Instructions

1. **Open Google Sheets**: Create a new Google Sheet.
2. **Access Apps Script**:
   - Click on `Extensions` > `Apps Script`.
3. **Copy and Paste Code**:
   - Copy the following code into the Apps Script editor:

   ```javascript
   function getMultipleRandomGitHubReposData(numRepos) {
     const searchUrl = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc';

     try {
       const response = UrlFetchApp.fetch(searchUrl);
       const data = JSON.parse(response.getContentText());

       if (data.items && data.items.length > 0) {
         numRepos = Math.min(numRepos, data.items.length);
         const allRepoData = [];

         for (let i = 0; i < numRepos; i++) {
           const randomIndex = Math.floor(Math.random() * data.items.length);
           const randomRepo = data.items[randomIndex];
           const repoName = randomRepo.full_name;
           const apiBaseUrl = `https://api.github.com/repos/${repoName}`;

           const repoResponse = UrlFetchApp.fetch(apiBaseUrl);
           const repoData = JSON.parse(repoResponse.getContentText());

           const commitsResponse = UrlFetchApp.fetch(`${apiBaseUrl}/commits`);
           const commitsData = JSON.parse(commitsResponse.getContentText());

           const issuesResponse = UrlFetchApp.fetch(`${apiBaseUrl}/issues`);
           const issuesData = JSON.parse(issuesResponse.getContentText());

           allRepoData.push([
             repoData.name,
             repoData.stargazers_count,
             repoData.forks_count,
             commitsData.length,
             issuesData.filter(issue => issue.state === 'open').length
           ]);
         }

         let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
         sheet.clear();
         sheet.appendRow(["Repo Name", "Stars", "Forks", "Commits Count", "Open Issues Count"]);
         allRepoData.forEach(repoRow => {
           sheet.appendRow(repoRow);
         });

         Logger.log(numRepos + ' random repositories added to the sheet.');
       } else {
         Logger.log('No repositories found.');
       }
     } catch (error) {
       Logger.log('Error fetching data: ' + error);
     }
   }

   function fetchAndFillRandomRepos() {
     getMultipleRandomGitHubReposData(5); // Adjust the number of repositories as needed
   }
   ```

4. **Run the Function**:
   - Execute the `fetchAndFillRandomRepos()` function to populate the Google Sheet with data from random repositories.

### Integration with Looker Studio

- Link the Google Sheet as a data source in Google Looker Studio to create visualizations based on the fetched repository data. This can include charts displaying stars, forks, and activity trends.

## Conclusion

This project showcases my ability to work with APIs and handle data efficiently. It reflects my skills in backend development, data analysis, and visualization. By integrating multiple GitHub APIs and utilizing Google Apps Script, I’ve created a versatile tool for tracking and analyzing GitHub repositories.

Feel free to reach out for collaborations or inquiries regarding this project!
