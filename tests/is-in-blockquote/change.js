import expect from 'expect';

export default function(plugin, editor) {
    const { document } = editor.value;
    const noquote = document.getDescendant('noquote');
    const quote = document.getDescendant('quote');
    const quotedeep = document.getDescendant('quotedeep');

    expect(
        plugin.utils.isSelectionInBlockquote(
            editor.moveToStartOfNode(noquote).value
        )
    ).toBe(false);
    expect(
        plugin.utils.isSelectionInBlockquote(
            editor.moveToStartOfNode(quote).value
        )
    ).toBe(true);
    expect(
        plugin.utils.isSelectionInBlockquote(
            editor.moveToStartOfNode(quotedeep).value
        )
    ).toBe(false);
}
