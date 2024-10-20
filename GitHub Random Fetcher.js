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