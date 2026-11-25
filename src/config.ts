/**
 * Configuration Sections:
 * - Site metadata (URL, language, title, description)
 * - Author information (name, title, bio, email, location)
 * - Social links (GitHub, LinkedIn, Hugging Face, Twitter, Mastodon, Bluesky)
 * - Navigation structure
 * 
 * @module config
 */

/**
 * Helper function to get environment variable with fallback
 * 
 * Safely retrieves environment variables with a default fallback value.
 * Uses nullish coalescing to handle undefined values.
 * 
 * @param key - Environment variable key (e.g., 'SITE_URL')
 * @param fallback - Default value if environment variable is not set
 * @returns Environment variable value or fallback
 */
const getEnv = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] ?? fallback;
};

/**
 * Site configuration object
 * 
 * Centralized configuration loaded from environment variables with sensible defaults.
 * All values are loaded at build time and are type-safe throughout the application.
 * 
 * @constant
 */
export const siteConfig = {
  /**
   * Site URL (required for sitemap, canonical URLs, OG tags)
   * 
   * Should be the full production URL without trailing slash.
   * Example: 'https://example.com'
   */
  url: getEnv('SITE_URL', 'https://wesleycoutinhodev.me'),
  
  /**
   * Site language (ISO 639-1 code)
   * 
   * Two-letter language code for HTML lang attribute and SEO.
   * Examples: 'en', 'id', 'es', 'fr'
   */
  language: getEnv('SITE_LANGUAGE', 'en'),
  
  /**
   * Site title
   * 
   * Used as fallback when page-specific title is not provided.
   */
  title: getEnv('SITE_TITLE', 'Wesley Coutinho — AI Engineer | LLMs, RAG & Machine Learning'),
  
  /**
   * Site description
   * 
   * Default meta description for SEO and social sharing.
   */
  description: getEnv('SITE_DESCRIPTION', 'Software engineer focused on AI systems: LLM applications, RAG and machine learning, built with tested and reliable backend engineering in Python.'),
  
  /**
   * Author information
   * 
   * Personal details used throughout the site for attribution,
   * contact information, and structured data.
   */
  author: {
    /** Full name */
    name: getEnv('SITE_AUTHOR_NAME', 'Wesley Coutinho'),
    
    /** Professional title or role */
    title: getEnv('SITE_AUTHOR_TITLE', 'AI Engineer'),
    
    /** Short biography or professional summary */
    bio: getEnv('SITE_AUTHOR_BIO', 'Software engineer and Computer Science student at UFPI building AI systems you can measure, test and trust: LLM applications, RAG and machine learning.'),
    
    /** Contact email address */
    email: getEnv('SITE_AUTHOR_EMAIL', 'hello@wesleycoutinhodev.me'),
    
    /** Location (optional, empty string to hide) */
    location: getEnv('SITE_AUTHOR_LOCATION', 'Teresina, Piauí, Brazil'),
  },
  
  /**
   * Social media links
   * 
   * Set to empty string to hide a specific platform.
   * Only configured (non-empty) links will be displayed.
   */
  social: {
    /** GitHub profile URL */
    github: getEnv('SOCIAL_GITHUB', 'https://github.com/wesleycoutinhodev'),
    
    /** LinkedIn profile URL */
    linkedin: getEnv('SOCIAL_LINKEDIN', 'https://linkedin.com/in/wesleycoutinhodev'),
    
    /** Hugging Face profile URL */
    huggingface: getEnv('SOCIAL_HUGGINGFACE', 'https://huggingface.co/wesleycoutinhodev'),
    
    /** Twitter/X profile URL */
    twitter: getEnv('SOCIAL_TWITTER', ''),
    
    /** Mastodon profile URL */
    mastodon: getEnv('SOCIAL_MASTODON', ''),
    
    /** Bluesky profile URL */
    bluesky: getEnv('SOCIAL_BLUESKY', ''),
  },
  
  /**
   * Navigation links
   * 
   * Main site navigation structure. Order determines display order in the nav bar.
   * Add or remove items to customize navigation.
   */
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Uses', href: '/uses' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

/**
 * Display labels for social platforms
 *
 * Keys match `siteConfig.social`. Unknown keys fall back to a capitalized key.
 */
export const socialLabels: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  huggingface: 'Hugging Face',
  twitter: 'Twitter',
  mastodon: 'Mastodon',
  bluesky: 'Bluesky',
};

/**
 * Type export for the entire site configuration
 * 
 * Use this type when you need to reference the full config structure.
 */
export type SiteConfig = typeof siteConfig;

/**
 * Type export for social links object
 * 
 * Use this type when working specifically with social media links.
 */
export type SocialLinks = typeof siteConfig.social;

/**
 * Type export for a single navigation item
 * 
 * Use this type when working with individual nav items.
 */
export type NavItem = typeof siteConfig.nav[number];
