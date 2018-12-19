// @flow
import { type Editor } from 'slate';

import type Options from '../options';

import onEnter from './onEnter';
import onBackspace from './onBackspace';

const KEY_ENTER = 'Enter';
const KEY_BACKSPACE = 'Backspace';

/**
 * User is pressing a key in the editor
 */
function onKeyDown(
    opts: Options,
    event: *,
    editor: Editor,
    next: *
): void | any {
    // Build arguments list
    const args = [opts, event, editor, next];

    switch (event.key) {
        case KEY_ENTER:
            return onEnter(...args);
        case KEY_BACKSPACE:
            return onBackspace(...args);
        default:
            return next();
    }
}

export default onKeyDown;
