/**
 * Formats a phone number into a user-friendly display format
 * @param phoneNumber - Raw phone number (10 digits)
 * @returns Formatted phone number string (XXX) XXX-XXXX
 */
export function formatPhoneNumber(phoneNumber: number | string): string {
  const phoneStr = phoneNumber.toString();
  
  // Handle 10-digit US phone numbers
  if (phoneStr.length === 10) {
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  }
  
  // Handle 11-digit numbers (with country code 1)
  if (phoneStr.length === 11 && phoneStr.startsWith('1')) {
    const number = phoneStr.slice(1);
    return `+1 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
  }
  
  // Return original if format is unexpected
  return phoneStr;
}

/**
 * Formats years of experience with proper singular/plural
 * @param years - Number of years
 * @returns Formatted string with proper grammar
 */
export function formatExperience(years: number): string {
  return years === 1 ? `${years} year` : `${years} years`;
}