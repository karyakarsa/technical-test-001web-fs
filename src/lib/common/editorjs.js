import DOMPurify from 'dompurify';
export const renderedContent = (content) => {
  if (!content) {
    return '';
  }
  const html = content.blocks.map(block => {
    switch (block.type) {
      case 'header':
        return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
      case 'paragraph':
        return `<p>${block.data.text}</p>`;
      case 'link':
        return `<a href="${block.data.url}">${block.data.text}</a>`;
      case 'list':
        const listItems = block.data.items.map(item => `<li>${item}</li>`).join('');
        return block.data.style === 'unordered' ? `<ul>${listItems}</ul>` : `<ol>${listItems}</ol>`;
      // Add more cases as needed for other block types
      default:
        return '';
    }
  }).join('');
  return DOMPurify.sanitize(html);
};
