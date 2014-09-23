var Backbone = require('backbone'),
    _ = require('underscore')

module.exports = Backbone.View.extend({
    tagName: 'tr',
    initialize: function(opts) {
        this.model = opts.model
        this.render()
    },
    render: function() {
        var tr = _.reduce(this.model.toJSON(), function(tr, attr){
            return tr += '<td>' + attr + '</td>'
        }, '')

        this.$el.html(tr)
    }
})
