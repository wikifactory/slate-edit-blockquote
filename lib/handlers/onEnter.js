// @flow
import { type Editor } from 'slate';

import type Options from '../options';
import { getCurrentBlockquote } from '../utils';
import { unwrapBlockquote } from '../changes/';

/**
 * User pressed Enter in an editor
 *
 * Enter on an empty block inside a blockquote exit the blockquote.
 */
function onEnter(opts: Options, event: *, editor: Editor, next: *) {
    const { value } = editor;
    const { startBlock } = value;

    if (!getCurrentBlockquote(opts, value)) {
        return next();
    }

    if (startBlock.text.length !== 0) {
        return next();
    }

    // FIXME - Block is empty, we exit the blockquote
    event.preventDefault();
    return unwrapBlockquote(opts, editor);
}

export default onEnter;
