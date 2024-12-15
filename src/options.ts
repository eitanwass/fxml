export type fxmlOptions = {
    commentsTagName: string;
    attributesTagName: string;
}

export const defaultFxmlOptions = {
    commentsTagName: "_comments",
    attributesTagName: "_attributes",
} satisfies fxmlOptions;
