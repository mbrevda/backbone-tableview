var Backbone = require('backbone'),
    _ = require('underscore')

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
}

module.exports = Backbone.View.extend({
    tagName: 'th',
    template: _.template('{{text}}<i class="fa fa-caret-up"></i>'),
    initialize: function(opts) {
        this.text = opts.text || ''

        this.render()
    },
    render: function() {
        this.$el.html(this.template({text: this.text}))
    },
    renderState: function(foo, order) {
        var i = this.$('i')

        switch (order) {
            case 'up':
                this.$el.addClass('active')
                i.removeClass('fa-caret-down')
                    .addClass('fa-caret-up')
                    .css({visibility: 'visible'})
                break
            case 'down':
                this.$el.addClass('active')
                i.removeClass('fa-caret-up')
                    .addClass('fa-caret-down').css({visibility: 'visible'})
                break;
            default:
                this.$el.removeClass('active')
                i.css({visibility: 'hidden'})
                break
        }
    }
})
