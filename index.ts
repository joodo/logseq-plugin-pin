import '@logseq/libs'


async function main() {
    logseq.useSettingsSchema([
        {
            key: 'pinLabel',
            type: 'string',
            title: 'Pin label',
            description: 'Label used to represent a pin',
            default: '📌',
        },
    ]);

    logseq.App.registerCommand(
        'paste-as-pin',
        {
            key: 'paste-as-pin',
            label: 'Paste block as Pin',
            keybinding: {
                mode: 'editing',
                binding: 'mod+p',
            },
        },
        async () => {
            const clipboardContent = await parent.navigator.clipboard.readText();
            const uuidRegex = /^\(\([\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}\)\)$/;
            if (uuidRegex.test(clipboardContent)) {
                const label = logseq.settings?.pinLabel ?? '📌';
                await logseq.Editor.insertAtEditingCursor(`[${label}](${clipboardContent})`);
            }
        }
    );
}

// Bootstrap the plugin
logseq.ready(main).catch(console.error);
