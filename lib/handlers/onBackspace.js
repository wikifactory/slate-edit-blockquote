// @flow
import { type Editor } from 'slate';

import type Options from '../options';
import { getCurrentBlockquote } from '../utils';
import { unwrapBlockquote } from '../changes';

/**
 * User pressed Delete in an editor:
 * Unwrap the blockquote if at the start of the inner block.
 */
function onBackspace(opts: Options, event: *, editor: Editor, next: *) {
    const { value } = editor;
    const { startOffset, isCollapsed } = value;

    if (!getCurrentBlockquote(opts, value) || !isCollapsed) {
        return next();
    }

    if (startOffset !== 0) {
        return next();
    }

    // FIXME - Block is empty, we exit the blockquote
    event.preventDefault();
    return unwrapBlockquote(opts, editor);
}

export default onBackspace;
