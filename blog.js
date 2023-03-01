let posts;
if (!localStorage.getItem("posts")) {
    posts = { 1: {title: "Hello, world!", date: "2000-12-13T23:59", summary: "My simple blog post"} };
} else {
    posts = JSON.parse(localStorage.getItem("posts"));
}

function createDialog() {
    const template = document.querySelector('#edit');

    const clone = template.content.cloneNode(true);
    const dialog = clone.querySelector("dialog");

    const heading = clone.querySelector("h2");
    heading.textContent = "Create post";

    const titleField = clone.querySelector("#title");
    const dateField = clone.querySelector("#date");
    const summaryField = clone.querySelector("#summary");

    const cancel = dialog.querySelector("button");
    cancel.addEventListener("click", () => {
        dialog.close();
    })

    const submit = dialog.querySelector("form");
    submit.addEventListener("submit", () => {
        const id = Date.now().toString();
        posts[id] = {};

        const post = document.querySelector('#post');

        const clone = post.content.cloneNode(true);

        const container = clone.querySelector("div");
        container.id = id;

        const title = container.querySelector("h2");
        title.textContent = titleField.value;
        posts[id].title = titleField.value;

        const date = container.querySelector("time");
        date.textContent = dateField.value;
        posts[id].date = dateField.value;

        const summary = container.querySelector("p");
        summary.textContent = summaryField.value;
        posts[id].summary = summaryField.value;

        localStorage.setItem("posts", JSON.stringify(posts));

        const buttons = container.querySelectorAll("button");
        buttons[0].addEventListener("click", () => {
            editDialog(id, container);
        })
        buttons[1].addEventListener("click", () => {
            deleteDialog(id, container);
        })

        document.body.append(clone);

        dialog.close();
    })

    document.body.append(clone);
    dialog.showModal();
}

function editDialog(id, node) {
    const template = document.querySelector('#edit');

    const clone = template.content.cloneNode(true);
    const dialog = clone.querySelector("dialog");

    const titleField = clone.querySelector("#title");
    titleField.value = node.querySelector("h2").textContent;

    const dateField = clone.querySelector("#date");
    dateField.value = node.querySelector("time").textContent;

    const summaryField = clone.querySelector("#summary");
    summaryField.value = node.querySelector("p").textContent;

    const cancel = dialog.querySelector("button");
    cancel.addEventListener("click", () => {
        dialog.close();
    })

    const submit = dialog.querySelector("form");
    submit.addEventListener("submit", () => {
        const title = node.querySelector("h2");
        title.textContent = titleField.value;
        posts[id].title = titleField.value;

        const date = node.querySelector("time");
        date.textContent = dateField.value;
        posts[id].date = dateField.value;

        const summary = node.querySelector("p");
        summary.textContent = summaryField.value;
        posts[id].summary = summaryField.value;

        localStorage.setItem("posts", JSON.stringify(posts));

        dialog.close();
    })

    document.body.append(clone);
    dialog.showModal();
}

function deleteDialog(id, node) {
    const template = document.querySelector('#delete');

    const clone = template.content.cloneNode(true);
    const dialog = clone.querySelector("dialog");

    const cancel = dialog.querySelector("button");
    cancel.addEventListener("click", () => {
        dialog.close();
    })

    const submit = dialog.querySelector("form");
    submit.addEventListener("submit", () => {
        delete posts[id];
        localStorage.setItem("posts", JSON.stringify(posts));
        document.body.removeChild(node);
        dialog.close();
    })

    document.body.append(clone);
    dialog.showModal();
}

for (const post in posts) {
    const template = document.querySelector('#post');

    const clone = template.content.cloneNode(true);

    const container = clone.querySelector("div");
    container.id = post;

    const title = container.querySelector("h2");
    title.textContent = posts[post].title;

    const date = container.querySelector("time");
    date.textContent = posts[post].date;

    const summary = container.querySelector("p");
    summary.textContent = posts[post].summary;

    const buttons = container.querySelectorAll("button");
    buttons[0].addEventListener("click", () => {
        editDialog(post, container);
    })
    buttons[1].addEventListener("click", () => {
        deleteDialog(post, container);
    })

    document.body.append(clone);
}

const create = document.body.querySelector("#create");
create.addEventListener("click", () => {
    createDialog();
});