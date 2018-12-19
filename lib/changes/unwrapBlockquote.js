// @flow
import { type Editor } from 'slate';

import type Options from '../options';

/**
 * Unwrap from blockquote.
 */
function unwrapBlockquote(opts: Options, editor: Editor): Editor {
    return editor.unwrapBlock(opts.type);
}

export default unwrapBlockquote;
