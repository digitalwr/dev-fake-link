var l = Object.defineProperty;
var u = (s, t, e) => t in s ? l(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var o = (s, t, e) => (u(s, typeof t != "symbol" ? t + "" : t, e), e);
class a {
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
    const r = document.createElement(e), c = t.attributes;
    for (let n = 0; n < c.length; n++) {
      const i = c[n];
      r.setAttribute(i.name, i.value);
    }
    r.innerHTML = t.innerHTML, t.replaceWith(r);
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
      const c = a.camelCaseToKebabCase(r);
      if (c.startsWith("fl-")) {
        const n = t.dataset[r] || "";
        t.removeAttribute(`data-${c}`);
        const i = c.replace("fl-", "");
        a.getLinkAttributesAllowed().includes(i) && t.setAttribute(i, n);
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
}
class h {
  attach(t) {
    new a(t);
  }
  detach() {
  }
}
const d = new h();
export {
  a as Fakelink,
  d as FakelinkDrupalBehaviorInstance
};
