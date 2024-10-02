function formatISBN(isbn) {
  // Remove "ISBN", hyphens, and whitespace in a single step
  return isbn.replace(/\bISBN\b|[-\s]/g, '').trim();
}
/**
 * Valid ISBN sample:
 * - ISBN 0-306-40615-2
 * - 0-306-40615-2
 * - 0306406152
 * - ISBN 978-0-306-40615-7
 * - 978-0-306-40615-7
 * - 9780306406157
 */
function isValidISBN(isbn) {
  // Remove "ISBN", hyphens, and whitespace in a single step
  isbn = formatISBN(isbn);

  // Regex check ISBN-10 and ISBN-13
  const isbn10Pattern = /^(?:\d[\-\ ]?){9}[\dX]$/;
  const isbn13Pattern = /^(?:\d[\-\ ]?){13}$/;

  if (!isbn10Pattern.test(isbn) && !isbn13Pattern.test(isbn)) {
    return false;
  }

  if (isbn.length !== 10 && isbn.length !== 13) {
    return false;
  }

  let isValid = false;

  // rule caculate: https://www.csuohio.edu/sites/default/files/88-2015.pdf
  // Calculate the checksum for ISBN-10
  if (isbn.length === 10) {
    //0201530821
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = parseInt(isbn[i]);
      if (isNaN(digit)) {
        return false;
      }
      sum += (i + 1) * digit;
    }
    const checksum = sum % 11;
    const lastDigit = parseInt(isbn[9]);
    isValid = checksum === lastDigit || (checksum === 10 && lastDigit === 'X');
  }

  // Calculate the checksum for ISBN-13
  if (isbn.length === 13) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(isbn[i]);
      if (isNaN(digit)) {
        return false;
      }
      sum += (i % 2 === 0 ? 1 : 3) * digit;
    }
    const checksum = 10 - (sum % 10);
    const lastDigit = parseInt(isbn[12]);
    isValid = checksum === lastDigit;
  }
  return {
    isValid,
    isbn,
  };
}

module.exports = { isValidISBN, formatISBN };
