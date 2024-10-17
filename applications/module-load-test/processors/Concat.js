import ProcessProcessor from '../../../../../transmissions/src/processors/base/ProcessProcessor.js';
import logger from '../../../../../transmissions/src/utils/Logger.js';

class Concat extends ProcessProcessor {
    constructor(config) {
        super(config);
        this.firstKey = config.firstKey || 'first';
        this.secondKey = config.secondKey || 'second';
        this.resultKey = config.resultKey || 'result';
    }

    async execute(message) {
        logger.debug('Concat execute method called');
        logger.debug('Input message:', JSON.stringify(message, null, 2));

        const first = message[this.firstKey];
        const second = message[this.secondKey];

        if (!first || !second) {
            throw new Error('Missing required input values');
        }

        message[this.resultKey] = first + second;

        logger.debug('Updated message:', JSON.stringify(message, null, 2));
        this.emit('message', message);
    }
}

export default Concat;