var Backbone = require('backbone'),
    THead = require('./thead'),
    TBody = require('./tbody')

module.exports = Backbone.View.extend({
    tagName: 'table',
    constructor: function() {
        this.head = new THead()
        this.body = new TBody()

        Backbone.View.apply(this, arguments)
        this.superRemove = Backbone.View.prototype.remove
    },
    render: function() {
        this.$el.append(this.head.$el)
        this.$el.append(this.body.$el)
        
        return this
    },
    remove: function() {
        this.head.remove()
        this.body.remove()

        this.superRemove()
    },
    addColumn: function() {
        return this.head.row.addCol.apply(this.head.row, arguments)
    },
    addRow: function() {
        return this.body.addRow.apply(this.body, arguments)
    }
})
