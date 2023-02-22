var l = Object.defineProperty;
var o = (r, t, e) => t in r ? l(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var c = (r, t, e) => (o(r, typeof t != "symbol" ? t + "" : t, e), e);
class u {
  /**
   * Initialize all fakelinks in the context.
   * @param context
   */
  constructor(t = document) {
    c(this, "context");
    this.context = t.parentElement || document, this.run();
  }
  /**
   * Initialize all fakelinks in the context.
   */
  run() {
    this.muteLinks(), this.createLinks();
  }
  /**
   * Replace element tag with another tag.
   * @param elem
   * @param tagReplacer
   */
  replaceTag(t, e) {
    const a = document.createElement(e), s = t.attributes;
    for (let n = 0; n < s.length; n++) {
      const i = s[n];
      a.setAttribute(i.name, i.value);
    }
    a.innerHTML = t.innerHTML, t.replaceWith(a);
  }
  /**
   * Replace all links with the `data-fl-mute` attribute.
   */
  muteLinks() {
    var t;
    (t = this.getFlMutes()) == null || t.forEach((e) => {
      const a = e.getAttribute("data-fl-mute") || "div";
      e.removeAttribute("data-fl-mute"), e.removeAttribute("href"), this.replaceTag(e, a);
    });
  }
  /**
   * Replace the element with a `data-fl-href` attribute by a link.
   */
  createLinks() {
    this.getFlHrefs().forEach((t) => {
      const e = t.getAttribute("data-fl-href");
      t.removeAttribute("data-fl-href"), t.setAttribute("href", e || ""), this.replaceTag(t, "a");
    });
  }
  /**
   * Retrieves all links with the `data-fl-mute` attribute.
   */
  getFlMutes() {
    return this.context.querySelectorAll("[data-fl-mute]");
  }
  /**
   * Retrieves all elements with the `data-fl-href` attribute.
   */
  getFlHrefs() {
    return this.context.querySelectorAll("[data-fl-href]");
  }
}
class h {
  attach(t) {
    console.log(t), new u(t);
  }
  detach() {
  }
}
const g = new h();
export {
  u as Fakelink,
  g as FakelinkDrupalBehaviorInstance
};
