const alertButton = document.getElementById("alert");

const confirmButton = document.getElementById("confirm");
const confirmOutput = document.getElementById("confirmOutput");

const promptButton = document.getElementById("prompt");
const promptOutput = document.getElementById("promptOutput")

const saferPromptButton = document.getElementById("saferPrompt");
const saferPromptOutput = document.getElementById("saferPromptOutput")

alertButton.addEventListener("click", () => {
    alert("This is an alert box");
});

confirmButton.addEventListener("click", () => {
    const value = confirm("This is a confirm box");
    confirmOutput.innerHTML = `The value returned by the confirm method is : ${value}`
});

promptButton.addEventListener("click", () => {
    const value = prompt("This is a prompt box");

    if (value !== null) {
        promptOutput.innerHTML = `User entered : ${value}`
    } else {
        promptOutput.innerHTML = `User didn't enter anything`
    }
});

saferPromptButton.addEventListener("click", () => {
    const value = prompt("This is a safer prompt box");

    if (value !== null) {
        //DOMPurify doesn't work with tagged template strings
        saferPromptOutput.innerHTML = `User entered : ${DOMPurify.sanitize(value)}`
    } else {
        saferPromptOutput.innerHTML = `User didn't enter anything`
    }
});