# Foundation stylus plugin

## What?

This is _not_ a complete port of foundation 5 for stylus. For the specific reason that maintaining complete ports is painful, and so they get out of date.

This is:

* An easy way to import foundation into a new stylus project.
* Reformatting of the compiled foundation css so it can be imported into stylus as-is. This allows you to transparently use `@extend .small-4` in your css for prototyping quickly, without messing up your html.
* Exposes _some_ helper mixins to make that easier.

## Installation

* Use stylizer
* `npm install foundation-stylus`
* Add `'foundation-stylus`' to list of stylizer/stylus plugins.
* Add `@import stylus` to your `app.styl`.


## Usage

### With `@extend`

The simplest way to use this is with stylus's `@extend` function. This allows you to name your rows/columns/buttons/modules/etc semantically, and then extend them in css, just look at the foundation docs to know what classes you need to use.

E.g. for a three-column layout, you might have:

```html
<section class='app-main'>
    <nav class='main-navigation'>
        ...
    </nav>

    <div class='main-content'>
    </div>

    <div class='chat'>
    </div>
</section>
```

```stylus
@import 'foundation'

.app-main
    @extends .row

.main-navigation
    @extends .small-3
    @extends .large-2
    @extends .columns

.main-content
    @extends .small-7
    @extends .large-9
    @extends .columns

.chat
    @extends .small-2
    @extends .large-1
    @extends .columns
```

This keeps your html nice and clean, so that when you move from prototyping a layout -> production css, your UI/designer/team can refactor/rewrite most of the css, without having to remove all the stylus cruft.


### With mixins

Using foundation-stylus as above means that we can integrate stylus and foundation without having to rewrite stylus into css (since stylus understands normal css). But the @extends syntax can get a bit verbose when adding multiple classes, as above. So we maintain a small list of extra mixins to make that process easier.

```stylus
@import 'foundation'

.app-main
    grid-row

.main-navigation
    grid-columns(small: 3, large: 2)

.main-content
    grid-columns(small: 7, large: 9)

.chat
    grid-columns(small: 2, large: 1)
```

## Mixin documentation

* [Grid](#grid)
  * [`grid-row()`](#grid-row) - equivalent to .row
  * [`grid-columns(small, [medium], [large])`](#grid-columnssmall-medium-large) - equivalent to .small-n.medium-n.large-n.columns
  * [`grid-columns(small: n, medium: n, large: n)`](#grid-columnssmall-n-medium-n-large-n) - equivalent to .small-n.medium-n.large-n.columns



### Grid

#### `grid-row()`

Equivalent to adding foundation's `.row` class:

```stylus
.myapp
  grid-row
```

is equivalent to

```html
<div class='myapp row'></div>
```


#### `grid-columns(small, [medium], [large])`

Helper for creating columns, with positional arguments. `medium` and `large` are optional.

```stylus
.mycolumn
  grid-columns(2, 3, 4)
```

is equivalent to

```html
<div class='mycolumn small-2 medium-3 large-4 columns'></div>
```

#### `grid-columns(small: n, medium: n, large: n)`

Helper for creating columns, with keyword arguments. You may specify any 1, 2 or all, arguments to create the relevant columns.

```stylus
.mycolumn
  grid-columns(small: 4, large: 2)
```

is equivalent to

```html
<div class='mycolumn small-2 large-4 columns'></div>
```
