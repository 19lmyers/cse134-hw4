
function createDialog(title, subtitle) {
    const dialog = document.createElement('dialog');

    if (title) {
        const heading = document.createElement('h2');
        heading.innerHTML = title;
        dialog.appendChild(heading);
    }

    if (subtitle) {
        const subhead = document.createElement('p');
        subhead.innerHTML = subtitle;
        dialog.appendChild(subhead);
    }

    return dialog;
}

function createDialogButton(title, onClick) {
    const button = document.createElement('button');
    button.innerHTML = title;
    button.addEventListener("click", () => {
        onClick()
    })

    return button;
}

export function customAlert({title, subtitle}) {
    const dialog = createDialog(title, subtitle);

    dialog.appendChild(createDialogButton('OK', () => {
        dialog.close();
    }));

    document.body.append(dialog)
    dialog.showModal();
}

export function customConfirm({title, subtitle, onCancel, onConfirm}) {
    const dialog = createDialog(title, subtitle);

    dialog.appendChild(createDialogButton('Cancel', () => {
        dialog.close();
        onCancel()
    }));

    dialog.appendChild(createDialogButton('Confirm', () => {
        dialog.close();
        onConfirm()
    }));

    document.body.append(dialog)
    dialog.showModal();
}

export function customPrompt({title, subtitle, sanitize, onEnter}) {
    const dialog = createDialog(title, subtitle);

    const textInput = document.createElement('input');
    dialog.appendChild(textInput);

    dialog.appendChild(createDialogButton('Cancel', () => {
        dialog.close();
        onEnter(null)
    }));

    dialog.appendChild(createDialogButton('Confirm', () => {
        dialog.close();

        if (sanitize) {
            onEnter(DOMPurify.sanitize(textInput.value))
        } else {
            onEnter(textInput.value)
        }
    }));

    document.body.append(dialog)
    dialog.showModal();
}