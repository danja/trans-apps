import { expect } from 'chai'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

import JSONReader from '../processors/JSONReader.js'
import JSONWalker from '../processors/JSONWalker.js'
import MarkdownFormatter from '../processors/MarkdownFormatter.js'
import TurtleFormatter from '../processors/TurtleFormatter.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('JSON Converter', () => {
    const config = {}
    let testData

    beforeAll(async () => {
        const testFile = path.join(__dirname, 'fixtures/test.json')
        const content = await fs.readFile(testFile, 'utf8')
        testData = JSON.parse(content)
    })

    describe('JSONReader', () => {
        it('should read and parse JSON file', async () => {
            const reader = new JSONReader(config)
            const message = { sourceFile: path.join(__dirname, 'fixtures/test.json') }
            
            const result = await reader.execute(message)
            expect(result.content).to.deep.equal(testData)
        })
    })

    describe('JSONWalker', () => {
        it('should walk JSON structure and emit messages', async () => {
            const walker = new JSONWalker(config)
            const message = { content: testData }
            
            const outputs = []
            walker.on('message', msg => outputs.push(msg))
            
            await walker.execute(message)
            expect(outputs.length).to.be.greaterThan(0)
        })
    })

    describe('MarkdownFormatter', () => {
        it('should format items as markdown', async () => {
            const formatter = new MarkdownFormatter(config)
            const message = { currentItem: testData[0] }
            
            const result = await formatter.execute(message)
            expect(result.content).to.include('# ')
            expect(result.targetFile).to.match(/\.md$/)
        })
    })

    describe('TurtleFormatter', () => {
        it('should format items as turtle', async () => {
            const formatter = new TurtleFormatter(config)
            const message = { currentItem: testData[0] }
            
            const result = await formatter.execute(message)
            expect(result.content).to.include('@prefix')
            expect(result.targetFile).to.match(/\.ttl$/)
        })
    })
})
