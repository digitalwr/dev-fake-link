export class Fakelink {
    private context: HTMLElement | Document;

    public static EVENT_FL_REPLACED = 'fl:replaced'

    /**
     * Initialize all fakelinks in the context.
     * @param context
     */
    constructor(context: HTMLElement | Document = document) {

        this.context = context.parentElement || document

        this.run()
    }

    /**
     * Initialize all fakelinks in the context.
     */
    run(): void {
        this.muteLinks()
        this.createLinks()
    }

    /**
     * Get all allowed attributes for links.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
     */
    static getLinkAttributesAllowed(): string[] {
        return [
            'href',
            'hreflang',
            'target',
            'rel',
            'download',
            'ping',
            'type',
        ]
    }

    /**
     * Convert camelCase to kebab-case.
     * @param str
     */
    static camelCaseToKebabCase(str: string): string {
        return str.replace(/[A-Z]/g, (match: string) => `-${match.toLowerCase()}`)
    }

    /**
     * Replace element tag with another tag.
     * @param elem
     * @param tagReplacer
     */
    static replaceTag(elem: HTMLElement, tagReplacer: string): void {
        const newElem: HTMLElement = document.createElement(tagReplacer)
        const attributes: NamedNodeMap = elem.attributes
        for (let i = 0; i < attributes.length; i++) {
            const attribute: Attr = attributes[i]
            newElem.setAttribute(attribute.name, attribute.value)
        }
        const children = Array.from(elem.children)
        if(children.length > 0) {
            for (const child of Array.from(elem.children)) {
                newElem.append(child)
            }
        } else {
            newElem.innerHTML = elem.innerHTML
        }
        elem.replaceWith(newElem)
        elem.dispatchEvent(new CustomEvent(Fakelink.EVENT_FL_REPLACED, {detail: {newElem}}))
    }

    /**
     * Replace all links with the `data-fl-mute` attribute.
     */
    muteLinks(): void {
        this.getFlMutes()?.forEach(Fakelink.muteLink)
    }

    /**
     * Replace the element with a `data-fl-mute` attribute by a div by default.
     * @param {HTMLElement} mute
     */
    static muteLink(mute: HTMLElement): void {
        const tagReplacer: string = mute.getAttribute('data-fl-mute') || 'div'
        mute.removeAttribute('data-fl-mute')
        Fakelink.getLinkAttributesAllowed().forEach((attribute: string) => {
            mute.removeAttribute(attribute)
        })
        Fakelink.replaceTag(mute, tagReplacer)
    }

    /**
     * Replace `data-fl-href` elements by links.
     */
    createLinks(): void {
        this.getFlHrefs().forEach(Fakelink.createLink)
    }

    /**
     * Replace the element with a `data-fl-href` attribute by a link.
     * The link keeps all the attributes of the element.
     * Remove all the `data-fl-*` attributes replaced by allowed attributes.
     * @param {HTMLElement} elem
     */
    static createLink(elem: HTMLElement): void {
        const datasetKeys: string[] = Object.keys(Object.assign({}, elem.dataset));
        datasetKeys.forEach((datasetKey: any) => {
            const htmlFormatAttributeKey = Fakelink.camelCaseToKebabCase(datasetKey)
            if (htmlFormatAttributeKey.startsWith('fl-')) {
                const attributeValue: string = elem.dataset[datasetKey] || ''
                elem.removeAttribute(`data-${htmlFormatAttributeKey}`)
                const linkAttribute = htmlFormatAttributeKey.replace('fl-', '')
                if (Fakelink.getLinkAttributesAllowed().includes(linkAttribute)) {
                    elem.setAttribute(linkAttribute, attributeValue)
                }
            }
        })
        Fakelink.replaceTag(elem, 'a')
    }

    /**
     * Retrieves all links with the `data-fl-mute` attribute.
     * @return {NodeListOf<HTMLElement>}
     */
    getFlMutes(): NodeListOf<HTMLElement> {
        return this.context.querySelectorAll('[data-fl-mute]')
    }

    /**
     * Retrieves all elements with the `data-fl-href` attribute.
     * @return {NodeListOf<HTMLElement>}
     */
    getFlHrefs(): NodeListOf<HTMLElement> {
        return this.context.querySelectorAll('[data-fl-href]')
    }

}