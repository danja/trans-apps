```sh
~/github-danny/trans-apps/applications/git-apps
repopack --verbose -c ../../repopack.config.json .
```

# Git Processors

there are more notes under

/home/danny/github-danny/transmissions/docs/postcraft-site/articles/new-application-walkthrough.md

/home/danny/github-danny/transmissions/docs/postcraft-site/articles/new-service-walkthrough.md

## Processors

### GitHubList

- Goal : list a user's personal repositories
- Implementation : a #Transmissions application using the `octokit` JS client libs
- SoftGoal : reusability
- _non-goal_ - efficiency
