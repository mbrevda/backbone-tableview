var should = require('should'),
    Backbone = require('backbone')

Backbone.$ = global.window.$
var TheadTr = require('../src').theadTr

describe('TheadTr', function(){
    beforeEach(function(){
        this.v = new TheadTr({})
    }) 

    it('tagName is tr', function(){
        this.v.tagName.should.eql('tr')    
    })

    it('should have exclusive state', function(){
        this.v.exclusiveState.should.be.ok
    })

    it('addCol() should add a th', function(){
        this.v.addCol({text: 'foobar'})
        
        this.v.$el.children().eq(0).text().should.eql('foobar')
    })
    
    it('should not have state if a click callback isnt passed', function(){
        var view = this.v.addCol({text: 'foo'})

        this.v.children.where({view: view})[0].get('hasState').should.be.falsse
    })

    it('should have state if a click callback is passed', function(){
        var view = this.v.addCol({text: 'foo', click: function(){}})
        
        this.v.children.where({view: view})[0].get('hasState').should.be.falsse
    })

    it('click should trigger the callback', function(done){
        var view = this.v.addCol({text: 'foo', click: function(){done()}})

        view.$el.trigger('click')
    })
})
