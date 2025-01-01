# fxml - fast XML

This is a maintained fork of [rapidx2j](https://github.com/damirn/rapidx2j), with some changes detailed next.

Node.JS module for converting XML documents into JSON objects. \
It is one of the fastest converters available (benchmarks next). Uses [RapidXML](http://rapidxml.sourceforge.net/).

## Installation
`npm install --save fxml`

## Usage
`fxml.parse(xml_string[, options]);`

### Options
| Option               | Description                                      | type                | default |
|----------------------|--------------------------------------------------|---------------------|---------|
| group_attrs          | Group attributes under attr_prefix dict          | boolean             | false   |
| attr_prefix          | Prefix attributes with this text                 | string              | @       |
| empty_tag_value      | Sets the value for empty tags                    | string \| undefined | ""      |
| parse_boolean_values | Parses boolean values in the XML content         | boolean             | true    |
| parse_int_values     | Parses integer numbers in the XML content        | boolean             | true    |
| parse_float_values   | Parses floating-point numbers in the XML content | boolean             | true    |
| ignore_attr          | Ignores attributes in the XML content            | boolean             | false   |
| preserve_case        | Preserves the case of tag and attribute names    | boolean             | true    |
| explicit_array       | Forces arrays to be used for repeated elements   | boolean             | false   |
| value_key            | Specifies the key to use for the value of a tag  | string              | ""      |

### Examples

```javascript
const fxml = require('fxml');
const json = fxml.parse(xml_string);
console.log(json);
```

## Fork changes
- Support for comments parsing
- Modified empty attr value to empty string `""`
- Remove skip_parse_when_begins_with - didn't see use for it
- Migrated to typescript

## License & copyright
RapidXml license is provided at [LICENSE.RapidXml](LICENSE.RapidXml). \
Original license it provided in repo at [LICENSE](LICENSE).
