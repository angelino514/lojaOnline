export default function validateEmail(email) {
   const regex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/
   return regex.test(email)
}