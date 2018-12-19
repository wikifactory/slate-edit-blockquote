import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';
import readMetadata from 'read-metadata';

import EditBlockquote from '../lib';

const PLUGIN = EditBlockquote();
const SCHEMA = { plugins: [PLUGIN] };

function deserializeValue(json) {
    return Slate.Value.fromJSON({ ...json, schema: SCHEMA });
}

describe('slate-edit-blockquote', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach((test, index) => {
        if (test[0] === '.' || path.extname(test).length > 0) return;
        it(test, () => {
            const dir = path.resolve(__dirname, test);
            const input = readMetadata.sync(path.resolve(dir, 'input.yaml'));
            const expectedPath = path.resolve(dir, 'expected.yaml');
            const expected =
                fs.existsSync(expectedPath) && readMetadata.sync(expectedPath);

            // eslint-disable-next-line
            const runChange = require(path.resolve(dir, 'change.js')).default;

            const valueInput = deserializeValue(input);

            const editorInput = new Slate.Editor({
                plugins: [PLUGIN],
                value: valueInput
            });

            runChange(PLUGIN, editorInput);

            if (expected) {
                const newDocJSon = editorInput.value.toJSON();
                expect(newDocJSon).toEqual(deserializeValue(expected).toJSON());
            }
        });
    });
});
