var should = require('should'),
    Backbone = require('backbone')

Backbone.$ = global.window.$
var Thead = require('../src').thead

describe('Thead', function(){
    beforeEach(function(){
        this.v = new Thead()
    })

    it('add() should add a th to the tr', function(){
        var view = Backbone.View.extend({
            className: 'foobar',
            tagName: 'th'
        })
        this.v.add({view: new view() })

        this.v.row.children.length.should.eql(1)
        this.v.$el.find('tr').find('th').hasClass('foobar').should.be.true
    })

    it('remove() should remove the view', function(){
        this.v.row.addCol({text: 'foo'})

        this.v.remove()

        this.v.row.children.length.should.eql(0)
    })
})
