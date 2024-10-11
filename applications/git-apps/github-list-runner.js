// github-list-runner.js
import GitHubList from './processors/GitHubList.js';
import logger from '../../../transmissions/src/utils/Logger.js';

async function main() {
    logger.setLogLevel('debug');

    const config = {};
    const githubList = new GitHubList(config);

    const message = {
        github: { name: 'danja' }
    };

    try {
        await githubList.execute(message);
        logger.log('GitHub repositories:', message.github.repositories);
    } catch (error) {
        logger.error('Error:', error.message);
    }
}

main().catch(console.error);