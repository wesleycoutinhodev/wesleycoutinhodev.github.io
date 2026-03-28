/**
 * Configuration Sections:
 * - Site metadata (URL, language, title, description)
 * - Author information (name, title, bio, email, location)
 * - Social links (GitHub, LinkedIn, Twitter, Mastodon, Bluesky)
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
  url: getEnv('SITE_URL', 'https://example.com'),
  
  /**
   * Site language (ISO 639-1 code)
   * 
   * Two-letter language code for HTML lang attribute and SEO.
   * Examples: 'en', 'id', 'es', 'fr'
   */
  language: getEnv('SITE_LANGUAGE', 'pt'),
  
  /**
   * Site title
   * 
   * Used as fallback when page-specific title is not provided.
   */
  title: getEnv('SITE_TITLE', 'Wesley Coutinho | Desenvolvedor Backend'),
  
  /**
   * Site description
   * 
   * Default meta description for SEO and social sharing.
   */
  description: getEnv('SITE_DESCRIPTION', 'Desenvolvedor backend focado em arquitetura de ponta a ponta, do codigo ao deploy, com integracao de RAG, LLM e automacoes.'),
  
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
    title: getEnv('SITE_AUTHOR_TITLE', 'Desenvolvedor Backend | Arquitetura de Software e IA aplicada (RAG/LLM)'),
    
    /** Short biography or professional summary */
    bio: getEnv('SITE_AUTHOR_BIO', 'Desenvolvedor backend focado em arquitetura de ponta a ponta, do codigo ao deploy, com integracao de RAG, LLM e automacoes. Experiencia com APIs em Python (FastAPI) e Java, e infraestrutura com Docker e AWS.'),
    
    /** Contact email address */
    email: getEnv('SITE_AUTHOR_EMAIL', 'wesleycoutinhodev@gmail.com'),
    
    /** Location (optional, empty string to hide) */
    location: getEnv('SITE_AUTHOR_LOCATION', 'Teresina, Piaui, Brasil'),
  },
  
  /**
   * Social media links
   * 
   * Set to empty string to hide a specific platform.
   * Only configured (non-empty) links will be displayed.
   */
  social: {
    /** GitHub profile URL */
    github: getEnv('SOCIAL_GITHUB', ''),
    
    /** LinkedIn profile URL */
    linkedin: getEnv('SOCIAL_LINKEDIN', ''),
    
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
    { label: 'Projetos', href: '/projects' },
    { label: 'Artigos', href: '/writing' },
    { label: 'Ferramentas', href: '/uses' },
    { label: 'Contato', href: '/contact' },
  ],
} as const;

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
