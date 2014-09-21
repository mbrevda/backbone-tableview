var Backbone = require('backbone'),
    KinView = require('backbone-kinview'),
    Row = require('js/TableView/views/theadTr.js')

module.exports = KinView.extend({
    tagName: 'thead',
    initialize: function() {
        this.row = new Row()
        this.render()
    },
    render: function() {
        this.$el.append(this.row.$el)
    },
    add: function() {
        return this.row.add.apply(this, arguments)
    },
    remove: function() {
        this.row.remove()

        this.superRemove()
    }
})
