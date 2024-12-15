import { parse } from "./fxml";


const res = parse(`<parent attr0="value">
    <child attr1="value" childattr="val">
        <grandChild attr2="value" />
        <gandchild2 />
    </child>
    <child>
        <another test="value">
            Test
            multiline
        </another>
    </child>
</parent>
`);

console.log(JSON.stringify(res, undefined, 2));
