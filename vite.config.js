import {defineConfig} from "vite";
import {resolve} from 'path';

const getConfig = ({mode}) => {
    const config = {
        build: {
            target: 'es2015',
            outDir: 'preview'
        }
    }

    if(mode === 'lib') {
        config.build.outDir = 'dist';
        config.build.lib = {
            entry: resolve(__dirname, 'lib/index.ts'),
            name: 'fakelink',
            fileName: 'fake-link'
        }
    }
    return config
}

export default defineConfig(getConfig)