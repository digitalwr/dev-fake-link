var u = Object.defineProperty;
var h = (c, t, e) => t in c ? u(c, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : c[t] = e;
var o = (c, t, e) => (h(c, typeof t != "symbol" ? t + "" : t, e), e);
const a = class {
  /**
   * Initialize all fakelinks in the context.
   * @param context
   */
  constructor(t = document) {
    o(this, "context");
    this.context = t.parentElement || document, this.run();
  }
  /**
   * Initialize all fakelinks in the context.
   */
  run() {
    this.muteLinks(), this.createLinks();
  }
  /**
   * Get all allowed attributes for links.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
   */
  static getLinkAttributesAllowed() {
    return [
      "href",
      "hreflang",
      "target",
      "rel",
      "download",
      "ping",
      "type"
    ];
  }
  /**
   * Convert camelCase to kebab-case.
   * @param str
   */
  static camelCaseToKebabCase(t) {
    return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
  }
  /**
   * Replace element tag with another tag.
   * @param elem
   * @param tagReplacer
   */
  static replaceTag(t, e) {
    const r = document.createElement(e), i = t.attributes;
    for (let s = 0; s < i.length; s++) {
      const n = i[s];
      r.setAttribute(n.name, n.value);
    }
    for (const s of Array.from(t.children))
      r.append(s);
    t.replaceWith(r), t.dispatchEvent(new CustomEvent(a.EVENT_FL_REPLACED, { detail: { newElem: r } }));
  }
  /**
   * Replace all links with the `data-fl-mute` attribute.
   */
  muteLinks() {
    var t;
    (t = this.getFlMutes()) == null || t.forEach(a.muteLink);
  }
  /**
   * Replace the element with a `data-fl-mute` attribute by a div by default.
   * @param {HTMLElement} mute
   */
  static muteLink(t) {
    const e = t.getAttribute("data-fl-mute") || "div";
    t.removeAttribute("data-fl-mute"), a.getLinkAttributesAllowed().forEach((r) => {
      t.removeAttribute(r);
    }), a.replaceTag(t, e);
  }
  /**
   * Replace `data-fl-href` elements by links.
   */
  createLinks() {
    this.getFlHrefs().forEach(a.createLink);
  }
  /**
   * Replace the element with a `data-fl-href` attribute by a link.
   * The link keeps all the attributes of the element.
   * Remove all the `data-fl-*` attributes replaced by allowed attributes.
   * @param {HTMLElement} elem
   */
  static createLink(t) {
    Object.keys(Object.assign({}, t.dataset)).forEach((r) => {
      const i = a.camelCaseToKebabCase(r);
      if (i.startsWith("fl-")) {
        const s = t.dataset[r] || "";
        t.removeAttribute(`data-${i}`);
        const n = i.replace("fl-", "");
        a.getLinkAttributesAllowed().includes(n) && t.setAttribute(n, s);
      }
    }), a.replaceTag(t, "a");
  }
  /**
   * Retrieves all links with the `data-fl-mute` attribute.
   * @return {NodeListOf<HTMLElement>}
   */
  getFlMutes() {
    return this.context.querySelectorAll("[data-fl-mute]");
  }
  /**
   * Retrieves all elements with the `data-fl-href` attribute.
   * @return {NodeListOf<HTMLElement>}
   */
  getFlHrefs() {
    return this.context.querySelectorAll("[data-fl-href]");
  }
};
let l = a;
o(l, "EVENT_FL_REPLACED", "fl:replaced");
class d {
  attach(t) {
    new l(t);
  }
  detach() {
  }
}
const b = new d();
export {
  l as Fakelink,
  b as FakelinkDrupalBehaviorInstance
};
