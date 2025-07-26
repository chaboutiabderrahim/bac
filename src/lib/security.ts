// Security utilities for XSS prevention and data sanitization

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  
  // Remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<iframe/gi, '')
    .replace(/<object/gi, '')
    .replace(/<embed/gi, '')
    .replace(/<link/gi, '')
    .replace(/<meta/gi, '');
};

/**
 * Sanitize text content to prevent XSS
 */
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate URL to prevent malicious redirects
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const validUrl = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(validUrl.protocol);
  } catch {
    return false;
  }
};

/**
 * Validate file URL for safe downloads
 */
export const isValidFileUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  
  try {
    const validUrl = new URL(url);
    // Only allow trusted domains and file types
    const allowedDomains = [
      'supabase.co',
      'storage.googleapis.com',
      'cdn.education.gov.dz', // Example government domain
      'youtube.com',
      'youtu.be'
    ];
    
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'];
    
    const domainAllowed = allowedDomains.some(domain => 
      validUrl.hostname.includes(domain)
    );
    
    const extensionAllowed = allowedExtensions.some(ext => 
      validUrl.pathname.toLowerCase().endsWith(ext)
    ) || validUrl.hostname.includes('youtube');
    
    return domainAllowed && extensionAllowed;
  } catch {
    return false;
  }
};

/**
 * Rate limiting helper
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxAttempts: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    return true;
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Content Security Policy headers for enhanced security
 */
export const cspHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://mkpxzvpizyetnrzxfrjy.supabase.co wss://mkpxzvpizyetnrzxfrjy.supabase.co",
    "frame-src 'self' https://www.youtube.com https://youtube.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ')
};