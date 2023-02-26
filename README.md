<img src="https://github.com/digitalwr/fake-link/raw/main/src/fake-link-logo-full.png" width="400">

# fake-link
[![npm](https://img.shields.io/npm/v/fake-link?style=flat-square)](https://www.npmjs.com/package/fake-link)

Tiny library allowing to replace HTML elements by links.<br/>
Also allows replacing links with HTML elements.

This responds to a SEO logic according to which it is preferable to place a link on a term that makes sense,
but this term is not necessarily the one the front-end developer prefers to have a link to.

Thus, robots see a link to a term that makes sense, but the user benefits from more relevant ergonomics.

## Install
### NPM
```shell
npm install fake-link
```

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/fake-link/dist/fake-link.umd.js"></script>
```
## Init

```javascript
//ES6
import {Fakelink} from 'fake-link';
new Fakelink(context);

//script CDN
fakelink.Fakelink(context);
```
| Argument | Type |
| --- | --- |
| `context` | `HTMLElement` \| `document` |

### Drupal
It is possible to initialize the library as Drupal Behavior from Drupal 8.
```javascript
//ES6
import {FakelinkDrupalBehaviorInstance} from 'fake-link';
Drupal.behaviors.fakelink = FakelinkDrupalBehaviorInstance;

//script CDN
Drupal.behaviors.fakelink = fakelink.FakelinkDrupalBehaviorInstance;
```
## Usage
Add `data-fl-*` attributes to the elements you want to replace.

On initialization, the library will process the elements with `data-fl-*` attributes inside the `context`.

| Attribute | Required | Description |
| --- | --- | --- |
| `data-fl-href` | required | The link to replace the element with. The value must be a valid URL. |
| `data-fl-*` | optional | Any attribute starting with `data-fl-` will be added to the element without the `data-fl-` prefix. Need to be a valid `<a>` attribute.|
| `data-fl-mute` | required | Add this attribute to mute the element. The new element will be a tag of the type of the attribute value. If no value is provided, the element will be a `div`. |
### Examples
#### Article
```html
<article data-fl-href="/target/link" data-fl-target="_blank" data-fl-rel="nofollow">
    <a href="/target/link" data-fl-mute>
        <h1>Post title</h1>
    </a>
    <div>Read more</div>
</article>
```
_replaced by :_
```html
 <a href="/target/link" target="_blank" rel="nofollow">
    <div>
        <h1>Post title</h1>
    </div>
    <div>Read more</div>
</a>
```
#### Replacing a link with a custom item.
```html
<a href="/target/link" class="title" data-fl-mute="span">Title</a>
```
_replaced by :_
```html
<span class="title">Title</span>
```
#### More examples at [digitalwr.github.io/fake-link](https://digitalwr.github.io/fake-link/)

## ISC License

Copyright © 2023, Matthieu Rébillard, [DIGITALWR](https://lmwr.fr/digitalwr), LMWR

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.