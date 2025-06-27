import logger from '../../utils/Logger.js'
import ns from '../../utils/ns.js'

import JSONReader from './JSONReader.js'
import JSONWalker from './JSONWalker.js'
import MarkdownFormatter from './MarkdownFormatter.js'
import TurtleFormatter from './TurtleFormatter.js'

class JSONProcessorsFactory {
    static createProcessor(type, config) {
        if (type.equals(ns.t.JSONReader)) {
            return new JSONReader(config)
        }
        if (type.equals(ns.t.JSONWalker)) {
            return new JSONWalker(config) 
        }
        if (type.equals(ns.t.MarkdownFormatter)) {
            return new MarkdownFormatter(config)
        }
        if (type.equals(ns.t.TurtleFormatter)) {
            return new TurtleFormatter(config)
        }
        return false
    }
}

export default JSONProcessorsFactory
