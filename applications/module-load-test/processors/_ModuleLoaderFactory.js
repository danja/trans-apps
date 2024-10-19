import { ModuleLoader } from '../../../../transmissions/src/engine/ModuleLoader.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ModuleLoaderFactory {
    static createModuleLoader() {
        const classpath = [
            path.resolve(__dirname, 'processors'),
            path.resolve(__dirname, '../../../../transmissions/src/processors')
        ];
        return new ModuleLoader(classpath);
    }
}

export default ModuleLoaderFactory;