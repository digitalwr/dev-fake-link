#fake-link
[![npm version](https://badge.fury.io/js/fake-link.svg)](https://badge.fury.io/js/fake-link)

Library allowing to replace HTML elements by links.<br/>
Also allows replacing links with HTML elements.

This responds to an SEO logic according to which it is preferable to place a link on a term that makes sense,
but this term is not necessarily the one the front-end developer wishes to have a link to.

Thus, robots see a link to a term that makes sense, but the user benefits from more relevant ergonomics.

##Installation
###NPM
```shell
npm install fake-link
```

###CDN
```html
<script src="https://cdn.jsdelivr.net/npm/fake-link/dist/fake-link.umd.js"></script>
```
##Initialisation

```javascript
//ES6
import {Fakelink} from 'fake-link';
new Fakelink(context);

//script CDN
fakelink.Fakelink(context);
```
```context``` is an HTMLElement or `document`.

###Drupal
It is possible to initialize the library as Drupal Behavior from Drupal 8.
```javascript
//ES6
import {FakelinkDrupalBehaviorInstance} from 'fake-link';
Drupal.behaviors.fakelink = FakelinkDrupalBehaviorInstance;

//script CDN
Drupal.behaviors.fakelink = fakelink.FakelinkDrupalBehaviorInstance;
```
##Usage
Works with 2 attributes:

- `data-fl-href="/lien/target"` positioned on the element that wants to become the link
- `data-fl-mute="div?"` positioned on the current link which will be replaced by a default `div` tag

###Examples
####Article
```html
<article data-fl-href="/target/link">
    <a href="/target/link" data-fl-mute>
        <h1>Post title</h1>
    </a>
    <div>Read more</div>
</article>
```
_becomes :_
```html
 <a href="/target/link">
    <div>
        <h1>Post title</h1>
    </div>
    <div>Read more</div>
</a>
```
####Replacing a link with a custom item.
```html
<a href="/target/link" class="title" data-fl-mute="span">Title</a>
```
_becomes :_
```html
<span class="title">Title</span>
```