var Backbone = require('backbone'),
    THead = require('js/TableView/views/thead'),
    TBody = require('js/TableView/views/tbody')

module.exports = Backbone.View.extend({
    tagName: 'table',
    constructor: function() {
        this.head = new THead()
        this.body = new TBody()

        Backbone.View.apply(this, arguments)
    },
    render: function() {
        //this.$el.append(Template())
        this.$el.append(this.head.$el)
        this.$el.append(this.body.$el)
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
        return this.body.add.apply(this.body, arguments)
    }
})
