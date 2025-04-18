import { readFile } from 'node:fs/promises'
import logger from '../../utils/Logger.js'
import ProcessProcessor from '../base/ProcessProcessor.js'

class JSONReader extends ProcessProcessor {
    constructor(config) {
        super(config)
    }

    async execute(message) {
        try {
            const filePath = message.sourceFile
            logger.debug('Reading JSON from: ' + filePath)
            const content = await readFile(filePath, 'utf8')
            message.content = JSON.parse(content)
            this.emit('message', message)
        } catch (err) {
            logger.error("JSONReader.execute error: " + err.message)
            throw err
        }
    }
}

export default JSONReader
