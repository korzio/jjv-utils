'use strict';

var expect = require('chai').expect;
var mock = require('./../mock/common.json');
var schema = require('./../index')(mock);

var commonObj = { type: 'common' },
    unknownObj = { type: 'unknown' };

describe('jjv-utils', function() {
    it('should generate api object', function() {
        expect(schema).to.be.a('object');
    });

    it('should add test schema on initialize with json name property as a root', function() {
        expect(schema.is(mock.name + '#/common', commonObj)).to.equal(true);
    });

    describe('api', function() {
        it('contains is, add, generate, find', function() {
            ['is', 'add', 'generate', 'find'].forEach(function(property){
                expect(schema).to.have.property(property);
            });
        });

        it('is - works like jjv validate', function() {
            expect(schema.is('test#/common', commonObj)).to.equal(true);
            expect(function(){
                return schema.is('unknown', commonObj);
            }).to.throw(Error);
        });

        it('add - adds json schema to existing env', function() {
            schema.add('test1', mock);
            expect(schema.is('test1#/common', commonObj)).to.equal(true);
        });

        it('generate - returns a function to compare conditions', function() {
            var testCommon = schema.generate('test#/common');

            expect([unknownObj].map(testCommon)).to.have.members([false]);
            expect([commonObj].map(testCommon)).to.have.members([true]);
        });

        it('generate - returns a negative function to compare conditions', function() {
            var testNotCommon = schema.generate('test#/common', true);

            expect([unknownObj].map(testNotCommon)).to.have.members([true]);
            expect([commonObj].map(testNotCommon)).to.have.members([false]);
        });

        it('find - can find an item with appropriate schema in iterable', function() {
            var references = {
                'test#/common': 1
            };

            expect(schema.find(references, commonObj)).to.equal(1);

            expect(function(){
                return schema.find(references, unknownObj)
            }).to.not.throw(Error);
            expect(schema.find(references, unknownObj)).to.equal(undefined);

            var referencesArr = ['test#/common'];
            expect(schema.find(referencesArr, commonObj)).to.equal(0);
            expect(schema.find(referencesArr, unknownObj)).to.equal(undefined);
        });
    });
});