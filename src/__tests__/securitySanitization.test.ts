import { describe, it, expect } from 'vitest';
import { sanitizeInput, isSafeUrl } from '../utils/security';
import { safeGetStorage, safeSetStorage, safeRemoveStorage } from '../utils/storage';

describe('Security & Input Sanitization Suite', () => {
  describe('sanitizeInput', () => {
    it('strips dangerous <script> tags and enclosed payload', () => {
      const malicious = '<script>alert("XSS vulnerability")</script>Mumbai';
      const result = sanitizeInput(malicious);
      expect(result).toBe('Mumbai');
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('alert');
    });

    it('strips iframe and embedded HTML tags', () => {
      const input = '<iframe src="evil.com"></iframe>Delhi<b>City</b>';
      const result = sanitizeInput(input);
      expect(result).toBe('DelhiCity');
    });

    it('removes ASCII control characters and quotes', () => {
      const input = 'London\x00\x08"\'`City';
      const result = sanitizeInput(input);
      expect(result).toBe('LondonCity');
    });

    it('collapses multiple whitespace characters and trims boundaries', () => {
      const input = '   San    Francisco     ';
      const result = sanitizeInput(input);
      expect(result).toBe('San Francisco');
    });

    it('enforces maximum length limits safely', () => {
      const longInput = 'A'.repeat(100);
      const result = sanitizeInput(longInput, 30);
      expect(result.length).toBe(30);
    });

    it('safely handles empty, null, or undefined values without crashing', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput(null as unknown as string)).toBe('');
      expect(sanitizeInput(undefined as unknown as string)).toBe('');
    });
  });

  describe('isSafeUrl', () => {
    it('accepts safe HTTPS, HTTP, and mailto URLs', () => {
      expect(isSafeUrl('https://waqi.info')).toBe(true);
      expect(isSafeUrl('http://example.com')).toBe(true);
      expect(isSafeUrl('mailto:support@urbanair.org')).toBe(true);
    });

    it('rejects unsafe protocols like javascript:, data:, or file:', () => {
      expect(isSafeUrl('javascript:alert(1)')).toBe(false);
      expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
      expect(isSafeUrl('file:///etc/passwd')).toBe(false);
    });
  });

  describe('Safe Storage Wrapper', () => {
    it('safely writes, reads, and removes keys in localStorage', () => {
      const testKey = '__TEST_KEY__';
      safeSetStorage(testKey, 'sample_value');
      expect(safeGetStorage(testKey)).toBe('sample_value');
      safeRemoveStorage(testKey);
      expect(safeGetStorage(testKey, 'default_fallback')).toBe('default_fallback');
    });
  });
});
