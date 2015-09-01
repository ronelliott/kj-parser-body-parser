'use strict';

var should = require('should'),
    sinon = require('sinon'),
    proxyquire = require('proxyquire'),
    reflekt = require('reflekt');

describe('body-parser', function() {
    beforeEach(function() {
        this.app = { use: sinon.spy() };
        this.bodyParserMock = {
            foo: sinon.spy(function() { return 'foo'; }),
            bar: sinon.spy(function() { return 'bar'; })
        };
        this.initializer = proxyquire('./', { 'body-parser': this.bodyParserMock });
        this.resolver = new reflekt.ObjectResolver();
    });

    it('should only configure enabled parsers', function() {
        this.initializer({ foo: { enabled: true } })(this.app, this.resolver);
        this.bodyParserMock.foo.called.should.equal(true);
        this.bodyParserMock.bar.called.should.equal(false);
    });

    it('should use the configured options', function() {
        this.initializer({ foo: { enabled: true, options: { foo: 'foo' } } })(this.app, this.resolver);
        this.bodyParserMock.foo.called.should.equal(true);
        this.bodyParserMock.foo.calledWith({ foo: 'foo' }).should.equal(true);
    });

    it('should inject configured parsers', function() {
        this.initializer({ foo: { enabled: true, inject: 'foo' } })(this.app, this.resolver);
        this.bodyParserMock.foo.called.should.equal(true);
        this.resolver('foo').should.equal('foo');
    });
});
