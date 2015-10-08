# jjv-utils
===========

Utils for [JJV JSON Validator](https://github.com/acornejo/jjv) - useful api to use json-schema and jjv tool.

## Installation

  `npm install jjv-utils`

## Usage

Lets have an example - jsonSchema

```
jsonSchema = {
    "name": "test",
    "common": {
        "properties": {
            "type": {
                "enum": ["common"]
            }
        },
        "required": [
            "type"
        ]
    }
};
```

Utils will create an jjv env for further usage with a `test` (jsonSchema.name) namespace. If jsonSchema is not given as an argument - an envirionment will be created without any namespace.
```
schema = require(pathToJjvUtils)(jsonSchema);
```

Use `add` to add json schema after initialization
```
schema.add('test1', jsonSchema);
```

Use `is` to validate an object by schema reference, like jjv validate method
```
commonObj = { type: 'common' };
schema.is('test#/common', commonObj) => true
```
Use `generate` to generate a function to compare conditions. Easy to use in `each`, `find` and other `lodash` iterable funnctions.
```
var testCommon = schema.generate('test#/common');
[commonObj].map(testCommon) => [true]

var testNotCommon = schema.generate('test#/common', true);
[commonObj].map(testNotCommon) => [false]
```

Use `find` to easy `switch` condition. Usable for cozy factory functions.
```
var references = {
    'test#/common': 1
};

schema.find(references, commonObj) => 1
schema.find(references, unknownObj, true) => undefined
```

## API

- **add(String namespace, Object jsonSchema)** add schema to existing jjv environment
- **is(String reference, Object data)** validate object by schema reference
- **generate(String reference[, Boolean isReverse])** generates function to use in functional expressions
- **find(Object/Array types, Object data, Boolean silent)** throws an error without silent flag in case of not found

## Tests

  `npm test`

## Resources

- [JJV JSON Validator](https://github.com/acornejo/jjv)
- [npm package](https://www.npmjs.com/package/jjv-utils)
- [github source code](https://github.com/korzio/jjv-utils)
- [How to Create and Publish Your First Node.js Module](https://medium.com/@jdaudier/how-to-create-and-publish-your-first-node-js-module-444e7585b738)