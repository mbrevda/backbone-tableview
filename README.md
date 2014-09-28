# TableView
**TableView** is a [Backbone.js](http://backbonejs.org/) view that provides full 
lifecycle support for tables, including headers, filtering and sorting. It remains 
simple, fluent, and idiomatic by relying on [KinView](https://github.com/mbrevda/backbone-kinview)
for the underlying view management.

# Installation

KinView has been designed to `require`'d by [browserify](http://browserify.org/),
and is currently only supported in that environment. To install:

```
npm install backbone-tableview --save
```

# Code

## CI
TableView continuous integrations is handled by Wercker:

[![wercker status](https://app.wercker.com/status/ed888333a4f3fb17e3738866f446c5b9/s/master "wercker status")](https://app.wercker.com/project/bykey/ed888333a4f3fb17e3738866f446c5b9)

## Testing
TableView maintains 100% test coverage. To manually run the tests, install with with --dev (as above) and run:

```
gulp testc
```

You can generate a HTML code coverage report by appending the `--html` switch

## Issues
Issues can be opened in the [usual location](https://github.com/mbrevda/backbone-tableview/issues), pull requests welcome!

# Usage
## Prerequisits
All of TableViews basic features can be used out of the box with no dependencies other than those installed by npm. TableViews sorting options (see below) use [Font Awesome's](http://fortawesome.github.io/Font-Awesome/) [fa-caret-up](http://fortawesome.github.io/Font-Awesome/icon/caret-up/) and [fa-caret-down](http://fortawesome.github.io/Font-Awesome/icon/caret-down/) class. Additionally, the roughly the following css is used:

```css

table thead tr th {
  color: gray;
  text-align: center;
  vertical-align: middle;
  padding-left: 12px;
}
table thead tr th i {
  visibility: hidden;
  display: inline !important;
  /* force icon not to wrap */
  margin-left: 4px;
}
table thead tr th.sortable {
  cursor: pointer;
}
table thead tr th.sortable:hover {
  cursor: pointer;
  color: orange;
}
table thead tr th.active {
  color: orange;
}
```
 
## Getting started
Getting started with TableView is as simple as creating a new Backbone view:

```js
var TableView = require('backbone-tableview')

var table = TableView.extend({
    // regular Backbone.View opts here
    // remember to call this.render() in the initialize method!
})

```

Note that `this` in TableView contains en extremely limited amount of table manipulation tools. To access most methods, you'll need to call their containers. I.e. `this.body.someMethod()`

### Adding Columns (table headers)
Adding table headers is straightforward:

```js
table.addColumn({text: 'foo'})

```

### Adding Rows
Adding rows to the table requires passing a valid Backbone.Model to the table:

```js

var m = new Backbone.Model({foo: 'bar'})
table.addRow(m)
```

Passing a collection to the table will allow the table to auto-append all items of the collection to the table and manage their lifecycle including adding items as they get added to the collection, appending the items to the table, and cleaning up when the child view is removed. To pass a collection to the table:

```js
var collection = new Backbone.Collection([/* models */])
table.body.initCollection(collection)
```


## Filtering & Sorting
TableView has built in support for filtering the data displayed in the table. Filtering can come from any source or html element. TableView can also sort the table based on the table header (`thead > tr > th`, herein 'column'). Sorting is done when a click event is received on the `th` element.

### Filtering data
TableView can filter the data in the table when the data comes from a collection (i.e. when a collection is passed to the body using `this.body.initCollection()`). To filter the data in a table, a filter function should be added to the table body:

```js
this.body.addFilter('name', function(){/* do something */})
```

Filter functions should return a boolean value. Only models with truthy values on ALL filters will be shown.

A table can have multiple filters. To add more filters, just call `addFilter()` as necessary. Note, multiple filters will be treaded as AND's (not as OR's), and as above - ALL filters must return true for a model to be displayed.

A filter can be removed by calling `removeFilter('name')`.

Whenever a filter is added or removed, the table will be re-filtered. If rows have been added that aren't part of the collection, they will inadvertently be removed.

### Sorting rows
To specify that a column should be sortable, pass it a sorter when creating it:

```js
table.addCol({
    text: 'foo',
    click: this.body.getSorter('attribute', function(){/* do something */})
})

```

The builtin `Sorter` class includes two simple sorters, 'string' and 'int'. You can use either like:

```js
table.addCol({
    text: 'foo',
    click: this.body.getSorter('attribute', 'string')
})

```

### Adding a custom sorter
Custom sorters can be passed as shown above. A sorter takes two models and returns a boolean value if the first model sorts higher than the second.

A sorter should have the following signature:

```js
function(a, b)
```
where `a` and `b` are the models that will be compared. 

Sorting methods should use the `getAttr(model, attribute)` method to retrieve the value to compare:

```js
var firstValue getAttr(a, this.attr)
var secondValue getAttr(b, this.attr)
```

The function should check the Boolean `this.isReverse` to determine the sort order and should return `true` if `a` should be sorted higher than `b`, otherwise `false`. See the [builtin sorter methods](https://github.com/mbrevda/backbone-tableview/blob/master/src/sorter.js#L35-L56) for an example. 
