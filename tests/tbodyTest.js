var should = require('should'),
    Backbone = require('backbone')

Backbone.$ = global.window.$
var Tbody = require('../src').tbody

describe.only('TBody', function(){
    beforeEach(function(){
        this.v = new Tbody()
        this.c = new Backbone.Collection([
                {foo: 'bar0'},
                {foo: 'bar1'},
                {foo: 'bar2'}
            ])
    })

    it('addRow() should add a row', function(){
        var m = new Backbone.Model({foo: 'bar'})
        this.v.addRow(m)

        this.v.$el.find('tr').eq(0).find('td').eq(0).html().should.eql('bar')
    })

    it('initCollection() should add a colleciton', function(){
        this.v.initCollection.call(this.v, this.c)

        this.v.$el.find('tr').eq(0).find('td').eq(0).text().should.eql('bar0')
        this.v.$el.find('tr').eq(1).find('td').eq(0).text().should.eql('bar1')
        this.v.$el.find('tr').eq(2).find('td').eq(0).text().should.eql('bar2')
    })

    it('adding to a colleciton should add more tr\'s ', function(){
        this.v.initCollection.call(this.v, this.c)

        this.v.$el.find('tr').eq(2).find('td').eq(0).text().should.eql('bar2')

        this.c.add({foo: 'bar3'})

        this.v.$el.find('tr').eq(3).find('td').eq(0).text().should.eql('bar3')
    })

    it('clearing colleciton should remove all tr\'s', function(){
        this.v.initCollection.call(this.v, this.c)

        this.v.$el.find('tr').eq(2).find('td').eq(0).text().should.eql('bar2')

        this.c.remove(this.c.models)

        this.v.$el.find('tr').length.should.eql(0)
    })

    it('Initializeing view with colleciton', function(){
        this.v = new Tbody({collection: this.c})

        this.v.$el.find('tr').length.should.eql(3)
    })

    it('Should stop listening when a colleciton is replaced', function(){
        this.v.initCollection.call(this.v, this.c)

        this.c.remove(this.c)

        this.v.initCollection.call(this.v, null)

        this.v.$el.find('tr').length.should.eql(0)
        this.c.add({foo: 'bar4'})

        this.v.$el.find('tr').length.should.eql(0)
    })

    it('rerenderChildren() only render if collection is valid', function(){
        this.v.rerenderChildren()

    })
})
