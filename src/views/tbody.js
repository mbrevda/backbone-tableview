var Backbone = require('backbone'),
    _ = require('underscore'),
    KinView = require('backbone-kinview'),
    Tr = require('./tbodyTr.js'),
    Sorter = require('../sorter')

module.exports = KinView.extend({
    tr: Tr,
    tagName: 'tbody',
    filters: {},
    initialize: function(opts) {
        if (opts && opts.collection) {
            this.initCollection(opts.collection)
        }

        this.on('filter', this.rerenderChildren, this)
    },
    initCollection: function(collection) {
        this.removeAll()
        this.collection = collection

        this.collection.each(_.bind(this.renderRow, this))
        this.listenTo(this.collection, 'add', _.bind(this.renderRow, this))
        this.listenTo(this.collection, 'remove sort', this.rerenderChildren, this)
    },
    renderRow: function(model) {
        if (this.filter(model)) {
            this.addRow(model)
        }
    },
    addRow: function(model) {
        return this.add({
            view: new this.tr({
                model: model
            })
        })
    },
    addFilter: function(name, filter) {
        this.filters[name] = filter
        this.trigger('filter')
    },
    removeFilter: function(name) {
        delete this.filters[name]
        this.trigger('filter')
    },
    clearFilters: function() {
        this.filters = {}
    },
    filter: function(model) {
        return _.every(this.filters, function(filter) {
            return filter(model)
        })
    },
    rerenderChildren: function() {
        this.removeAll()
        if (!this.collection) {
            return false
        }
        this.collection.each(_.bind(this.renderRow, this))
    },
    getSorter: function (attr, sorter) {
        var s = new Sorter(this.collection, attr, sorter)
        return s.getSorter()
    },
    setSorter: function(sorter) {
        this.children.sorter.call(this.children, sorter)
    },
    removeAll: function() {
        this.children.removeAll()
    }
})
