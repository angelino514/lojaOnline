export default function validateName(text) {
   const regex = /^[A-Z][a-zÀ-ÿ]*$/
   return regex.test(text)
}