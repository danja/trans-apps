import logger from '../../utils/Logger.js'
import ProcessProcessor from '../base/ProcessProcessor.js'

class MarkdownFormatter extends ProcessProcessor {
    constructor(config) {
        super(config)
    }

    async execute(message) {
        try {
            const item = message.currentItem
            if (!item) {
                return
            }

            // Convert item to markdown
            const markdown = this.formatMarkdown(item)
            message.content = markdown
            message.targetFile = `${item.id}.md`
            
            this.emit('message', message)
        } catch (err) {
            logger.error("MarkdownFormatter.execute error: " + err.message)
            throw err
        }
    }

    formatMarkdown(item) {
        const lines = []
        lines.push(`# ${item.title || 'Untitled'}`)
        lines.push('')
        
        for (const [key, value] of Object.entries(item)) {
            if (key !== 'title' && value !== null) {
                lines.push(`## ${key}`)
                lines.push('')
                lines.push(typeof value === 'object' ? JSON.stringify(value, null, 2) : value.toString())
                lines.push('')
            }
        }

        return lines.join('\n')
    }
}

export default MarkdownFormatter
