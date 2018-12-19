// @flow

import { Block, type Editor } from 'slate';
import { CHILD_OBJECT_INVALID } from 'slate-schema-violations';

import type Options from '../options';

/**
 * Create a schema definition with rules to normalize blockquotes
 */
function schema(opts: Options): Object {
    return {
        blocks: {
            [opts.type]: {
                nodes: [
                    {
                        match: { object: 'block' }
                    }
                ],
                normalize(editor, error) {
                    const { code } = error;
                    switch (code) {
                        case CHILD_OBJECT_INVALID:
                            return containBlocks(opts, editor, error);
                        default:
                            return undefined;
                    }
                }
            }
        }
    };
}

/**
 *  Ensures that blockquotes always contain blocks.
 */
function containBlocks(opts: Options, editor: Editor, error: Object): ?Editor {
    const toWrap = error.node.nodes.filter(n => n.object !== 'block');

    if (toWrap.isEmpty()) {
        return undefined;
    }

    // Wrap text/inline nodes in default block
    const wrapper = Block.create({
        type: opts.typeDefault,
        nodes: []
    });

    // Be careful of Slate's core schema removing inlines or blocks when
    // a block contains a mix of them.
    editor.withoutNormalizing(() => {
        editor.insertNodeByKey(error.node.key, 0, wrapper);
    });

    toWrap.forEach((child, index) => {
        const isLast = index === toWrap.size - 1;
        if (isLast) {
            editor.moveNodeByKey(child.key, wrapper.key, index);
        } else {
            editor.withoutNormalizing(() => {
                editor.moveNodeByKey(child.key, wrapper.key, index);
            });
        }
    });

    return editor;
}

export default schema;
