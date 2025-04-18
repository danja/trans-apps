import logger from '../../utils/Logger.js'
import ProcessProcessor from '../base/ProcessProcessor.js'

class JSONWalker extends ProcessProcessor {
    constructor(config) {
        super(config)
    }

    async execute(message) {
        try {
            const content = message.content
            if (!content || typeof content !== 'object') {
                throw new Error('Invalid JSON content')
            }

            // Walk the JSON structure and emit message for each item
            for (const item of Object.values(content)) {
                const clonedMessage = structuredClone(message)
                clonedMessage.currentItem = item 
                this.emit('message', clonedMessage)
            }

            // Signal completion
            message.done = true
            this.emit('message', message)
        } catch (err) {
            logger.error("JSONWalker.execute error: " + err.message)
            throw err
        }
    }
}

export default JSONWalker
