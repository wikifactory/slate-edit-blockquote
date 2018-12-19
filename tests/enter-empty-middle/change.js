export default function(plugin, editor) {
    const selectedBlock = editor.value.document.getDescendant('_selection_key');
    editor.moveToStartOfNode(selectedBlock);

    editor.run('onKeyDown', {
        preventDefault() {},
        stopPropagation() {},
        key: 'Enter'
    });

    return editor;
}
