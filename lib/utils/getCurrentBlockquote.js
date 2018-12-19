// @flow
import { type Block, type Value } from 'slate';
import type Options from '../options';

/**
 * Return the current blockquote, from current selection or from a node.
 */
function getCurrentBlockquote(
    opts: Options,
    value: Value,
    block?: Block
): ?Block {
    const { document } = value;

    if (!block) {
        if (!value.selection.anchor.key) return null;
        block = value.startBlock;
    }

    // FIXME - getParent?
    const parent = document.getParent(block.key);

    return parent && parent.type === opts.type ? parent : null;
}

export default getCurrentBlockquote;
