var should = require('should'),
    Backbone = require('backbone')

Backbone.$ = global.window.$
var TheadTh = require('../src').theadTh

describe('TheadTr', function(){
    beforeEach(function(){
        this.v = new TheadTh({text: 'foo'})
    })

    it('Should render state up', function(){
        this.v.renderState(null, 'up')
        
        this.v.$el.find('i').hasClass('fa-caret-down').should.be.false
        this.v.$el.find('i').hasClass('fa-caret-up').should.be.true
        this.v.$el.hasClass('active').should.be.true
    })

    it('Should render state down', function(){
        this.v.renderState(null, 'down')
        
        this.v.$el.find('i').hasClass('fa-caret-down').should.be.true
        this.v.$el.find('i').hasClass('fa-caret-up').should.be.false
        this.v.$el.hasClass('active').should.be.true
    })

    it('Should reset state', function(){
        this.v.renderState(null, null)

        this.v.$el.find('i').css('visibility').should.eql('hidden')
        this.v.$el.hasClass('active').should.be.false
    })

    it('Should toggel state down', function(){
        this.v.renderState(null, 'up')
        this.v.renderState(null, 'down')
        
        this.v.$el.find('i').hasClass('fa-caret-down').should.be.true
        this.v.$el.find('i').hasClass('fa-caret-up').should.be.false
        this.v.$el.hasClass('active').should.be.true
    })
    
    it('Should toggel state up', function(){
        this.v.renderState(null, 'down')
        this.v.renderState(null, 'up')
        
        this.v.$el.find('i').hasClass('fa-caret-down').should.be.false
        this.v.$el.find('i').hasClass('fa-caret-up').should.be.true
        this.v.$el.hasClass('active').should.be.true
    })
})
