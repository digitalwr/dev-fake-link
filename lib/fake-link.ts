export class Fakelink {
    private context: HTMLElement | Document;

    /**
     * Initialize all fakelinks in the context.
     * @param context
     */
    constructor(context: Element | Document = document) {
        // @ts-ignore
        this.context = context.parentElement || document

        this.run()
    }

    /**
     * Initialize all fakelinks in the context.
     */
    run() {
        this.muteLinks()
        this.createLinks()
    }

    /**
     * Replace element tag with another tag.
     * @param elem
     * @param tagReplacer
     */
    replaceTag(elem: Element, tagReplacer: string) {
        const newElem = document.createElement(tagReplacer)
        const attributes = elem.attributes
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i]
            newElem.setAttribute(attribute.name, attribute.value)
        }
        newElem.innerHTML = elem.innerHTML
        elem.replaceWith(newElem)
    }

    /**
     * Replace all links with the `data-fl-mute` attribute.
     */
    muteLinks() {
        this.getFlMutes()?.forEach((mute: Element) => {
            const tagReplacer = mute.getAttribute('data-fl-mute') || 'div'
            mute.removeAttribute('data-fl-mute')
            mute.removeAttribute('href')
            this.replaceTag(mute, tagReplacer)
        })
    }

    /**
     * Replace the element with a `data-fl-href` attribute by a link.
     */
    createLinks() {
        this.getFlHrefs().forEach((elem: Element) => {
            const href = elem.getAttribute('data-fl-href')
            elem.removeAttribute('data-fl-href')
            elem.setAttribute('href', href || '')
            this.replaceTag(elem, 'a')
        })
    }

    /**
     * Retrieves all links with the `data-fl-mute` attribute.
     */
    getFlMutes() {
        return this.context.querySelectorAll('[data-fl-mute]')
    }

    /**
     * Retrieves all elements with the `data-fl-href` attribute.
     */
    getFlHrefs() {
        return this.context.querySelectorAll('[data-fl-href]')
    }

}