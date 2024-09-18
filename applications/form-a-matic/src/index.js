// index.js
import { Fam } from './turtle2json.js';
import fs from 'fs/promises';

async function main() {
    const turtleString = await fs.readFile('src/test-data/foaf-template.ttl', 'utf-8');
    const fam = new Fam();
    const result = await fam.turtle2json(turtleString);
    console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);