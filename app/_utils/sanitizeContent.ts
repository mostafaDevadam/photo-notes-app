// utils/sanitizeContent.js
export const removeEmptyParagraphs = (htmlString: any) => {
  if (!htmlString || typeof htmlString !== 'string') return htmlString

  /*const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const paragraphs = doc.querySelectorAll('p')

  paragraphs.forEach((p) => {
    // Check if paragraph is truly empty (no text, no nested elements, no whitespace-only content)
    if (p.textContent.trim() === '' && p.childElementCount === 0) {
      p.remove()
    }
  })

  // Serialize back to HTML string, stripping outer <html><body> from parser
  return doc.body.innerHTML*/
 // return htmlString.replace(/<p>\s*<\/p>/g, '').trim()
  //const cleanString = htmlString.replace(/[^a-zA-Z0-9]/g, ' ');
 // return cleanString
  const strippedString = htmlString.replace(/<\/?p>/g, '');
  return strippedString
}