Carlino
=======

Carlino is kind of full-duplex [pug-cli](https://www.npmjs.com/package/pug-cli)
utility:

  * If provided with PUG input, it produces HTML output.
  * If provided with HTML input, it produces PUG output.

It has no command line options or modifiers and does not allow defining
template globals. Its purpose is to be reversible, aiming to facilitate the
production of static HTML using [PUG](https://pugjs.org) syntax while storing
it in HTML, eliminating the need for readers to know anything about PUG
template syntax.


Installation
------------

To install *Carlino* in your system globally you only need to execute:

```sh
npm install -g carlino
```


Usage
-----

You can use *Carlino* by executing either:

```sh
cat myPugFile.pug | carlino > myHtmlFile.html
```

or:

```sh
cat myHtmlFile.html | carlino > myPugFile.pug
```

...but it is more intended to be used as a shortcut filter in editors like *Vim*.

**Example:**

```
" F8 key -> Switch visually selected text between PUG and HTML:
:vmap <F8> :!carlino<enter>

" F8 key -> Visually select all text (with no blank lines) under cursor and
" switch between PUG and HTML:
:nmap <F8> vip<F8>j
```


Unique Features
---------------

### Readable JSON attributes in HTML output.

The original [PUG](https://www.npmjs.com/package/pug) behavior uses double
quotes (`"`) for HTML attributes, which requires encoding any double quote
character inside by replacing it with `&quot;`.

**Example:**

```html
<div someprop="{&quot;my_attribute&quot;:&quot;value's uggly&quot;}"></div>
```

Carlino adds an additional parsing step to decode any `&quot;` occurrence in
HTML properties and replaces enclosing double quotes with single quotes. It
also takes care of single quotes if they appear in any value.

**Example:**

```html
<div someprop='{"my_attribute":"value&apos;s pretty"}'></div>
```


Contributing
------------

Contributions are welcome! If you find any issues or have suggestions for
improvements, please open an issue or submit a pull request.


License
-------

  [MIT](LICENSE)

