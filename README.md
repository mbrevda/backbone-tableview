# TableView
**TableView** is a [Backbone.js](http://backbonejs.org/) view that provides full 
lifecyle support for tables, including filtering and sorting. It remains 
uncomplex by relying on (KinView)[https://github.com/mbrevda/backbone-kinview]
for basic view management.

# Installation

KinView has been designed to `require`'d by [browserify](http://browserify.org/),
and is currently only supported in that environment. To install:

```
npm install backbone-tableview --save
```

# Code

## CI
TableView continuous integrations is handled by Wercker:

[![wercker status](https://app.wercker.com/status/ed888333a4f3fb17e3738866f446c5b9/m "wercker status")](https://app.wercker.com/project/bykey/ed888333a4f3fb17e3738866f446c5b9)

## Testing
TableView proudly maintains 100% test coverage. To manually run the tests, install with with --dev (as above) and run:

```
gulp testc
```

You can optionally generate an HTML code coverage report by appending the `--html` argument

## Issues
Issues can be opened in the [usual location](https://github.com/mbrevda/backbone-tableview/issues), pull requests welcome!

# Usage
## Getting started
