/**
 * Security utilities for input sanitization and XSS protection.
 */

/**
 * Sanitizes user input text (such as search queries) by:
 * - Trimming leading/trailing whitespace
 * - Removing HTML tags and scripts (<script>, <iframe>, etc.)
 * - Neutralizing dangerous characters (<, >, ", ', `)
 * - Stripping unprintable ASCII control characters
 * - Enforcing a maximum length limit to prevent buffer exploitation
 */
export function sanitizeInput(input: string, maxLength: number = 60): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // 1. Remove dangerous script/style tags and their inner content
  let cleaned = input.replace(/<\s*(script|style|iframe|embed|object)[^>]*>.*?<\s*\/\s*\1\s*>/gis, '');

  // 2. Remove remaining HTML/XML tags
  cleaned = cleaned.replace(/<[^>]+>/g, '');

  // 3. Remove ASCII control characters (0x00 - 0x1F, 0x7F)
  cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, '');

  // 4. Neutralize quotes and backticks
  cleaned = cleaned.replace(/["'`]/g, '');

  // 5. Consolidate multiple spaces
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // 6. Enforce maximum length limit
  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength).trim();
  }

  return cleaned;
}

/**
 * Validates that an outbound URL strictly starts with safe protocols.
 */
export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith('https://') || trimmed.startsWith('http://') || trimmed.startsWith('mailto:');
}
