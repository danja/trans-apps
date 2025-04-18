import path from 'path'
import { fileURLToPath } from 'url'
import TransmissionBuilder from '../../../transmissions/src/engine/TransmissionBuilder.js'
import logger from '../../../transmissions/src/utils/Logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
    logger.setLogLevel('debug')

    const transmissionConfigFile = path.join(__dirname, 'transmissions.ttl')
    const processorsConfigFile = path.join(__dirname, 'processors-config.ttl')

    try {
        const transmissions = await TransmissionBuilder.build(
            transmissionConfigFile, 
            processorsConfigFile,
            path.join(__dirname, 'processors')
        )

        const message = {
            sourceFile: path.join(__dirname, 'test-data/sample.json')
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
