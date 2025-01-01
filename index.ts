'use strict';

const native = require('./build/Release/fxml');

type XML = string | Buffer;

interface Options {
    group_attrs?: boolean;
    attr_prefix?: string;
    empty_tag_value?: string | null;
    parse_boolean_values?: boolean;
    parse_int_values?: boolean;
    parse_float_values?: boolean;
    ignore_attr?: boolean;
    preserve_case?: boolean;
    explicit_array?: boolean;
    value_key?: string;
}


const DEFAULT_OPTIONS = {
    group_attrs: false,
    attr_prefix: "@",
    empty_tag_value: "",
    parse_boolean_values: true,
    parse_int_values: true,
    parse_float_values: true,
    ignore_attr: false,
    preserve_case: true,
    explicit_array: false,
    value_key: "",
} satisfies Options;

export const parse = (xml: XML, options: Options = {}) =>
    native.parse(xml, { ...DEFAULT_OPTIONS, ...options });
