import {Fakelink, FakelinkDrupalBehaviorInstance} from "../lib/index";

// Render the code blocks correctly
document.querySelectorAll("code").forEach(function(element) {
    element.innerHTML = element.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
});

const Behaviors = {}
Behaviors.fl = FakelinkDrupalBehaviorInstance
Behaviors.fl.attach(window.document)

document.querySelector('[data-test]').addEventListener('click', ev => {
    ev.preventDefault()
})

const link = document.querySelector('[data-add-link]')
link.addEventListener('click', ev => {
    ev.preventDefault()
    appendLink(ev.currentTarget)
})

function appendLink(triggerElement) {
    const link = document.createElement('a')
    link.setAttribute('href', '/')
    link.setAttribute('data-fl-mute', '')
    link.textContent = 'Link appended and muted'
    triggerElement.closest('.Demo').querySelector('[data-appended-links]').append(link)
    new Fakelink(link)
}