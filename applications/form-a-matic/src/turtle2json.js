// turtle2json.js

import { Readable } from 'stream';
import N3Parser from '@rdfjs/parser-n3';
// import rdf from 'rdf-ext';

export class Fam {
    constructor() {
        this.parser = new N3Parser();
        this.prefixes = {};
        this.result = {};
    }

    // Parse the input Turtle string
    async parse(turtleString) {
        const input = Readable.from([turtleString]);
        const quads = [];

        for await (const quad of this.parser.import(input)) {
            quads.push(quad);
            if (quad.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                this.prefixes[quad.object.value.split(':')[0]] = quad.object.value.split(':')[1];
            }
        }

        return quads;
    }

    // Process the parsed quads and generate JSON
    processQuads(quads) {
        const rootQuad = quads.find(q => q.subject.value === '#ROOT');
        if (!rootQuad) throw new Error('No #ROOT subject found');

        this.result.ROOT = this.processNode(rootQuad.subject, quads);
        return this.result;
    }

    // Process a single node in the RDF graph
    processNode(subject, quads) {
        const node = { properties: [] };
        const relevantQuads = quads.filter(q => q.subject.equals(subject));

        for (const quad of relevantQuads) {
            if (quad.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
                const [namespace, type] = quad.object.value.split(':');
                node.namespace = `http://xmlns.com/${namespace}/0.1/`;
                node.type = type;
            } else {
                const property = this.processProperty(quad, quads);
                node.properties.push(property);
            }
        }

        return node;
    }

    // Process a property of a node
    processProperty(quad, quads) {
        const property = {
            key: quad.predicate.value.split('/').pop(),
            type: this.getPropertyType(quad.object)
        };

        if (property.type === 'BNODE') {
            property.children = this.processNode(quad.object, quads);
        }

        return property;
    }

    // Determine the type of a property value
    getPropertyType(object) {
        if (object.termType === 'Literal') {
            return object.value === 'LITERAL' ? 'LITERAL' : 'BNODE';
        } else if (object.termType === 'NamedNode') {
            return object.value === '#URI' ? 'URI' : 'BNODE';
        } else {
            return 'BNODE';
        }
    }

    // Main method to convert Turtle to JSON
    async turtle2json(turtleString) {
        const quads = await this.parse(turtleString);
        return this.processQuads(quads);
    }
}