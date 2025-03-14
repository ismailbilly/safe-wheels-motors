import sanitizeHTML from 'sanitize-html';
import parse from 'html-react-parser';
export const HTMLParser = ({ html }: { html: string }) => {
    return parse(sanitizeHTML(html))
 }