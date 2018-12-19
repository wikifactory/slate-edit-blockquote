// @flow
import { type Editor } from 'slate';

import type Options from '../options';

/**
 * Wrap the block in a new blockquote.
 */
function wrapInBlockquote(opts: Options, editor: Editor): Editor {
    return editor.wrapBlock(opts.type);
}

export default wrapInBlockquote;
