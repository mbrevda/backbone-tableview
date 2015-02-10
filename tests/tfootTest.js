var should = require('should'),
Backbone = require('backbone')

Backbone.$ = global.window.$
var Table = require('../src')

describe('Table', function(){
    beforeEach(function(){
        this.v = new Table().render()
    })

    it('setFoot() should add tfoot', function() {
        this.v.setFoot({text: 'foo'})

        this.v.$el[0].outerHTML.should.eql(
            '<table><thead><tr></tr></thead><tfoot><tr><th>foo</th></tr></tfoot><tbody></tbody></table>'
        )
    })

    it('setFoot() should only add a single tr', function() {
        this.v.setFoot({text: 'bar'})
        this.v.setFoot({text: 'foo'})

        this.v.$el[0].outerHTML.should.eql(
            '<table><thead><tr></tr></thead><tfoot><tr><th>foo</th></tr></tfoot><tbody></tbody></table>'
        )
    })

    it('remove()', function() {
        this.v.setFoot({text: 'bar'})
        this.v.foot.remove()

        this.v.$el[0].outerHTML.should.eql('<table><thead><tr></tr></thead><tbody></tbody></table>')
    })

    it('table remove()', function(){
        this.v.setFoot({text: 'bar'})
        this.v.remove()

        this.v.$el[0].outerHTML.should.eql('<table></table>')
    })
})
