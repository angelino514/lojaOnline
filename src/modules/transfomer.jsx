export default function transformText(text) {
   return text
      .toLowerCase()
      .trim()
      .replace(/^./, letter => letter.toUpperCase());
}