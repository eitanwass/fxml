import { defaultFxmlOptions, fxmlOptions } from "./options";
import { indexOf, set } from "lodash";


const tagNameEnders = "\r\n\t>/= ";

const singleQuoteCC = "'".charCodeAt(0);
const doubleQuoteCC = '"'.charCodeAt(0);

const openCornerBrackerCC = '<'.charCodeAt(0);
const closeCornerBrackerCC = '>'.charCodeAt(0);
const slashCC = '/'.charCodeAt(0);
const exclamationCC = '!'.charCodeAt(0);


export const parse = (text: string, options?: fxmlOptions) => {
    options = Object.assign(defaultFxmlOptions, options ?? {});

    let pos = 0;
    let tagPath: string[] = [];


    const isTextChar = (charCode: number) => (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123);

    const upsertValueByPath = (obj: Record<string, any>, path: string[], value: any): object => {
        let o = obj;
        const lastPart = path.pop();
        if (lastPart === undefined) return obj;
        let part;
        for (part of path) {
            if (!(part in o)) o[part] = {};
            else if (typeof o[part] !== "object") throw new Error(`Unable to deep set in path of simple type ${obj} at ${path}`)
            o = o[part];
        }

        if (!(lastPart in o)) o[lastPart] = {};
        if (typeof o[lastPart] !== "object") throw new Error(`Unable to deep set in path of simple type ${obj} at ${path}`)
        if (typeof value === "object")
            o[lastPart] = {
                ...o[lastPart],
                ...value
            }
        else 
            o[lastPart] = value;
        return obj;
    };

    /**
     * Parse name until the first closed corner bracket or whitespace
     */
    const parseName = (): string => {
        let start = pos;
        while (text.length >= pos && tagNameEnders.indexOf(text[pos]) === -1) {
            pos++;
        }
        return text.slice(start, pos);
    }

    const parseFreeTextBody = (): string => {
        const start = pos;
        const end = text.indexOf("<", pos);
        if (end === -1) {
            pos = text.length + 1;
        } else {
            pos = end;
        }
        return text.slice(start, pos);
    }

    const parseQuotedString = (): string => {
        const quoteType = text[pos];
        const stringStartPos = pos + 1;
        pos = text.indexOf(quoteType, stringStartPos);
        return text.slice(stringStartPos, pos);
    }

    const parseTag = (parentTagName: string) => {
        let parsedXml: Record<string, any> = {};

        let parsedXmlLayers: any[] = [parsedXml];

        let tagPath: string[] = [];
        let curVal: any = undefined;
        while (text.length > pos) {
            if (text.charCodeAt(pos) === openCornerBrackerCC) {
                // Tag
                if (text.charCodeAt(pos+1) === slashCC) {
                    // Closing Tag
                    pos += 2;
                    const tagName = parseName();
                    const expectedCloseTagName = tagPath.pop();
                    if (expectedCloseTagName !== tagName) {
                        throw new Error(`Closing tag "${tagName}" doesn't match opening tag "${expectedCloseTagName}"`);
                    }
                    // console.log(`finished parsing ${tagName}`);
                    parsedXmlLayers.pop();
                    // console.log(`Setting ${[...tagPath, tagName]} to ${JSON.stringify(curVal)}`);
                    // upsertValueByPath(parsedXml, [...tagPath, tagName], curVal);
                    // console.log(JSON.stringify(parsedXml));
                    // curVal = undefined;
                } else if (text.charCodeAt(pos+1) === exclamationCC) {
                    // Comment Tag
                } else {
                    // Opening Tag
                    pos++;
                    const tagName = parseName();
                    tagPath.push(tagName);

                    if (!(tagName in parsedXmlLayers[parsedXmlLayers.length - 1])) {
                         parsedXmlLayers[parsedXmlLayers.length - 1][tagName] = {};
                         parsedXmlLayers.push(parsedXmlLayers[parsedXmlLayers.length - 1][tagName]);
                    } else {
                        parsedXmlLayers[parsedXmlLayers.length - 1][tagName] = [
                            ...(
                                Array.isArray(parsedXmlLayers[parsedXmlLayers.length - 1][tagName]) ? 
                                parsedXmlLayers[parsedXmlLayers.length - 1][tagName] : 
                                [parsedXmlLayers[parsedXmlLayers.length - 1][tagName]]
                            ),
                            {}
                        ];
                        parsedXmlLayers.push(
                            parsedXmlLayers[parsedXmlLayers.length - 1][tagName][
                                parsedXmlLayers[parsedXmlLayers.length - 1][tagName].length - 1
                            ]
                        );
                    }

                    // Parse Attributes
                    let attributes: Record<string, any> = {};
                    while (text.length >= pos && text.charCodeAt(pos) !== closeCornerBrackerCC) {
                        let curCharCode = text.charCodeAt(pos);
                        // Check if text
                        if (isTextChar(curCharCode)) {
                            const attributeName = parseName();
            
                            // Search for beginning of attribute value
                            curCharCode = text.charCodeAt(pos);
                            while(
                                curCharCode && 
                                curCharCode !== singleQuoteCC && 
                                curCharCode !== doubleQuoteCC && 
                                !isTextChar(curCharCode) 
                                && curCharCode !== closeCornerBrackerCC
                            ) {
                                pos++;
                                curCharCode = text.charCodeAt(pos);
                            }
            
                            let attributeValue = null;
                            if (curCharCode === singleQuoteCC || curCharCode === doubleQuoteCC) {
                                // Start of attribute value
                                attributeValue = parseQuotedString();
                                if (pos === -1) {
                                    // No end for attribute value
                                    throw new Error("No end for attribute value");
                                }
                            } else {
                                pos--;
                            }
            
                            attributes[attributeName] = attributeValue;
                        }
                        pos++;
                    }
                    parsedXmlLayers[parsedXmlLayers.length - 1][options.attributesTagName] = attributes
                    // curVal = {[options.attributesTagName]: attributes};

                    if (text.charCodeAt(pos-1) === slashCC) {
                        // No body
                        const closedTag = tagPath.pop();
                        // console.log(`finished parsing ${closedTag} (no body)`);
                        // console.log(`Setting ${[...tagPath, tagName]} to ${JSON.stringify(curVal)}`);
                        // upsertValueByPath(parsedXml, [...tagPath, tagName], curVal);
                        parsedXmlLayers.pop();
                        pos++;
                    }
                }
            }
            else if (tagNameEnders.indexOf(text[pos]) === -1) {
                // TODO: doesn't work on empty string tags
                // console.log(pos, text[pos]);
                // console.log(parsedXmlLayers[parsedXmlLayers.length - 2], [tagPath[tagPath.length - 1]]);
                const content = parseFreeTextBody().trim();
                // console.log(content);
                // console.log(tagPath);
                parsedXmlLayers[parsedXmlLayers.length - 2][tagPath[tagPath.length - 1]] = content;
                // console.log(parsedXmlLayers[parsedXmlLayers.length - 2], [tagPath[tagPath.length - 1]]);
            //     console.log(parsedXmlLayers[parsedXmlLayers.length - 2], tagPath[tagPath.length - 1]);
            //     parsedXmlLayers[parsedXmlLayers.length - 2][tagPath[tagPath.length - 1]] = parseFreeTextBody().trim();
            } else {
                pos++;
            }
        }

        // let parsed: Record<string, any> = {};
        // let stringChild: string | undefined = undefined;
        // let putasideChild = undefined;
        // while(text.length >= pos) {
        //     if (text.charCodeAt(pos) === openCornerBrackerCC) {
        //         if (text.charCodeAt(pos + 1) === slashCC) {
        //             // closing tag
        //             pos += 2;
        //             const closeTagName = parseName();
        //             const expectedCloseTagName = tagPath.pop();
        //             if (expectedCloseTagName !== closeTagName) {
        //                 throw new Error(`Closing tag ${closeTagName} doesn't match opening tag ${expectedCloseTagName}`);
        //             }
        //             pos++;
        //             if (closeTagName === parentTagName) {
        //                 if (stringChild !== undefined && Object.keys(parsed).length !== 0) {
        //                     throw new Error(`Free text body must be the only child of ${parentTagName} tag`);
        //                 }
        //                 // console.log(`finished parsing ${closeTagName}`);
        //                 if (stringChild !== undefined) {
        //                     return stringChild;
        //                 }
        //                 return parsed;
        //             }
        //         } else if (text.charCodeAt(pos + 1) === exclamationCC) {
        //             // comment
        //         } else {
        //             pos++;
        //             const tagName = parseName();
        //             tagPath.push(tagName);
        //             let attributes: Record<string, string | null> = {};
        //             let comments: string[] = [];
        //             let children: string | Record<string, any> = {};

        //             if (parsed[tagName] !== undefined) {
        //                 // Already found child with this tag name -> a list of tags
        //                 putasideChild = Array.isArray(parsed[tagName]) ? parsed[tagName] : [parsed[tagName]];
        //             }

        //             parsed[tagName] = {};
            
        //             // Parse attributes
        //             while (text.length >= pos && text.charCodeAt(pos) !== closeCornerBrackerCC) {
        //                 let curCharCode = text.charCodeAt(pos);
        //                 // Check if text
        //                 if (isTextChar(curCharCode)) {
        //                     const attributeName = parseName();
            
        //                     // Search for beginning of attribute value
        //                     curCharCode = text.charCodeAt(pos);
        //                     while(
        //                         curCharCode && 
        //                         curCharCode !== singleQuoteCC && 
        //                         curCharCode !== doubleQuoteCC && 
        //                         !isTextChar(curCharCode) 
        //                         && curCharCode !== closeCornerBrackerCC
        //                     ) {
        //                         pos++;
        //                         curCharCode = text.charCodeAt(pos);
        //                     }
            
        //                     let attributeValue = null;
        //                     if (curCharCode === singleQuoteCC || curCharCode === doubleQuoteCC) {
        //                         // Start of attribute value
        //                         attributeValue = parseQuotedString();
        //                         if (pos === -1) {
        //                             // No end for attribute value
        //                             return {
        //                                 [tagName]: {
        //                                     [options.attributesTagName]: attributes,
        //                                     [options.commentsTagName]: comments,
        //                                     ...children,
        //                                 }
        //                             };
        //                         }
        //                     } else {
        //                         pos--;
        //                     }
            
        //                     attributes[attributeName] = attributeValue;
        //                 }
        //                 pos++;
        //             }
        //             parsed[tagName][options.attributesTagName] = attributes;
            
        //             if (text.charCodeAt(pos - 1) !== slashCC) {
        //                 // Open node
        //                 pos++;
        //                 children = parseTag(tagName);
        //                 if (typeof children === "string") {
        //                     // If context is string, ignore attributes
        //                     parsed[tagName] = children;
        //                 } else {
        //                     parsed[tagName] = {
        //                         ...parsed[tagName],
        //                         ...children,
        //                     }
        //                 }
        //                 // Return the other children with that tagName, if exist
        //                 if (putasideChild !== undefined)
        //                     parsed[tagName] = [...putasideChild, parsed[tagName]];
        //                 // console.log(tagName, children, pos, text[pos])
        //             } else {
        //                 // No body
        //                 const closedTag = tagPath.pop();
        //                 // console.log(`finished parsing ${closedTag} (no body)`);
        //                 pos++;
        //             }
        //         }
        //     }
        //     else if (tagNameEnders.indexOf(text[pos]) === -1) {
        //         stringChild = parseFreeTextBody().trim();
        //     } else {
        //         pos++;
        //     }
        // }
// 
        // return parsed;
        return parsedXml;
    }


    return parseTag("");
};
