var h = Object.defineProperty;
var d = (s, t, e) => t in s ? h(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var l = (s, t, e) => (d(s, typeof t != "symbol" ? t + "" : t, e), e);
const r = class {
  /**
   * Initialize all fakelinks in the context.
   * @param context
   */
  constructor(t = document) {
    l(this, "context");
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
    const a = document.createElement(e), i = t.attributes;
    for (let n = 0; n < i.length; n++) {
      const u = i[n];
      a.setAttribute(u.name, u.value);
    }
    if (Array.from(t.children).length > 0)
      for (const n of Array.from(t.children))
        a.append(n);
    else
      a.innerHTML = t.innerHTML;
    t.replaceWith(a), t.dispatchEvent(new CustomEvent(r.EVENT_FL_REPLACED, { detail: { newElem: a } }));
  }
  /**
   * Replace all links with the `data-fl-mute` attribute.
   */
  muteLinks() {
    var t;
    (t = this.getFlMutes()) == null || t.forEach(r.muteLink);
  }
  /**
   * Replace the element with a `data-fl-mute` attribute by a div by default.
   * @param {HTMLElement} mute
   */
  static muteLink(t) {
    const e = t.getAttribute("data-fl-mute") || "div";
    t.removeAttribute("data-fl-mute"), r.getLinkAttributesAllowed().forEach((a) => {
      t.removeAttribute(a);
    }), r.replaceTag(t, e);
  }
  /**
   * Replace `data-fl-href` elements by links.
   */
  createLinks() {
    this.getFlHrefs().forEach(r.createLink);
  }
  /**
   * Replace the element with a `data-fl-href` attribute by a link.
   * The link keeps all the attributes of the element.
   * Remove all the `data-fl-*` attributes replaced by allowed attributes.
   * @param {HTMLElement} elem
   */
  static createLink(t) {
    Object.keys(Object.assign({}, t.dataset)).forEach((a) => {
      const i = r.camelCaseToKebabCase(a);
      if (i.startsWith("fl-")) {
        const o = t.dataset[a] || "";
        t.removeAttribute(`data-${i}`);
        const n = i.replace("fl-", "");
        r.getLinkAttributesAllowed().includes(n) && t.setAttribute(n, o);
      }
    }), r.replaceTag(t, "a");
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
let c = r;
l(c, "EVENT_FL_REPLACED", "fl:replaced");
class f {
  attach(t) {
    new c(t);
  }
  detach() {
  }
}
const A = new f();
export {
  c as Fakelink,
  A as FakelinkDrupalBehaviorInstance
};
