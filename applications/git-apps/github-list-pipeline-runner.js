import path from 'path'
import { fileURLToPath } from 'url'
import TransmissionBuilder from '../../../transmissions/src/engine/TransmissionBuilder.js'
import GitHubProcessorsFactory from './processors/GitHubProcessorsFactory.js'
import AbstractProcessorFactory from '../../../transmissions/src/engine/AbstractProcessorFactory.js'
import logger from '../../../transmissions/src/utils/Logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
    logger.setLogLevel('debug')

    const transmissionDatasetFile = path.join(__dirname, 'github-list-transmission.ttl')
    const processorsConfigFile = path.join(__dirname, 'processors-config.ttl')

    try {
        // Register the custom processor factory
        AbstractProcessorFactory.registerFactory('GitHubList', GitHubProcessorsFactory)

        const transmissions = await TransmissionBuilder.build(transmissionDatasetFile, processorsConfigFile)

        const message = {
            github: { name: 'danja' }
        }

        for (const transmission of transmissions) {
            await transmission.execute(message)
        }
    } catch (error) {
        logger.error('Error:', error)
        logger.debug('Error details:', error.stack)
    }
}

main().catch(console.error)