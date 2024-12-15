import { defaultFxmlOptions, fxmlOptions } from "./options";


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


    const isTextChar = (charCode: number) => (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)

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
        let start = pos;
        while (text.length >= pos && text.charCodeAt(pos) !== openCornerBrackerCC) {
            pos++;
        }
        return text.slice(start, pos);
    }

    const parseQuotedString = (): string => {
        const quoteType = text[pos];
        const stringStartPos = pos + 1;
        pos = text.indexOf(quoteType, stringStartPos);
        return text.slice(stringStartPos, pos);
    }

    const parseTag = () => {
        let parsed: Record<string, any> = {};
        let putasideChild = undefined;
        while(text.length >= pos) {
            if (text.charCodeAt(pos) === openCornerBrackerCC) {
                if (text.charCodeAt(pos + 1) === slashCC) {
                    // closing tag
                    pos += 2;
                    const closeTagName = parseName();
                    const expectedCloseTagName = tagPath.pop();
                    if (expectedCloseTagName !== closeTagName) {
                        throw new Error(`Closing tag ${closeTagName} doesn't match opening tag ${expectedCloseTagName}`);
                    }
                    console.log(`finished parsing ${closeTagName}`);
                    pos++;
                    return parsed;
                } else if (text.charCodeAt(pos + 1) === exclamationCC) {
                    // comment
                } else {
                    pos++;
                    const tagName = parseName();
                    tagPath.push(tagName);
                    let attributes: Record<string, string | null> = {};
                    let comments: string[] = [];
                    let children: string | Record<string, any> = {};

                    if (parsed[tagName] !== undefined) {
                        // Already found child with this tag name -> a list of tags
                        putasideChild = Array.isArray(parsed[tagName]) ? parsed[tagName] : [parsed[tagName]];
                    }

                    parsed[tagName] = {};
            
                    // Parse attributes
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
                                    return {
                                        [tagName]: {
                                            [options.attributesTagName]: attributes,
                                            [options.commentsTagName]: comments,
                                            ...children,
                                        }
                                    };
                                }
                            } else {
                                pos--;
                            }
            
                            attributes[attributeName] = attributeValue;
                        }
                        pos++;
                    }
                    parsed[tagName][options.attributesTagName] = attributes;
            
                    if (text.charCodeAt(pos - 1) !== slashCC) {
                        // Open node
                        pos++;
                        children = parseTag();
                        if (typeof children === "string") {
                            // If context is string, ignore attributes
                            parsed[tagName] = children;
                        } else {
                            parsed[tagName] = {
                                ...parsed[tagName],
                                ...children,
                            }
                        }
                        // Return the other children with that tagName, if exist
                        if (putasideChild !== undefined)
                            parsed[tagName] = [...putasideChild, parsed[tagName]];
                        console.log(tagName, children, pos, text[pos])
                    } else {
                        // No body
                        console.log(`finished parsing ${tagPath.pop()} (no body)`);
                        pos++;
                    }
                }
            }
            else if (isTextChar(text.charCodeAt(pos))) {
                return parseFreeTextBody().trim();
            } else {
                pos++;
            }
        }

        return parsed;
    }


    return parseTag();
};
