/// <reference types="node"/>

declare var c: c.Ifxml;

declare namespace c {
    type XML = string | Buffer;

    interface Options {
        attr_group?: boolean;
        attr_prefix?: string;
        empty_tag_value?: null;
        parse_boolean_values?: boolean;
        parse_int_numbers?: boolean;
        parse_float_numbers?: boolean;
        ignore_attr?: boolean;
        preserve_case?: boolean;
        explicit_array?: boolean;
        skip_parse_when_begins_with?: string;
        value_key?: string;
    }

    interface Ifxml {
        parse<T extends object>(xml: XML): T;

        parse<T extends object>(xml: XML, options: Options): T;
    }
}

export = c;
