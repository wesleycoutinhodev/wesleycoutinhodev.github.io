/**
 * Page Metadata Configuration
 * 
 * Centralized SEO metadata for all static pages. Single source of truth
 * for titles and descriptions to ensure consistency across the site.
 * 
 * Usage:
 * ```astro
 * ---
 * import BaseLayout from '../layouts/BaseLayout.astro';
 * import SEO from '../components/SEO.astro';
 * import { pagesConfig } from '../pages.config';
 * ---
 * 
 * <BaseLayout>
 *   <SEO 
 *     slot="head"
 *     title={pagesConfig.projects.title}
 *     description={pagesConfig.projects.description}
 *   />
 *   <!-- Page content -->
 * </BaseLayout>
 * ```
 * 
 * @module pages.config
 */

/**
 * Page metadata interface
 */
interface PageMeta {
  /** Page title (used in browser tab and SEO) */
  title: string;
  
  /** Page description (used in meta tags and SEO) */
  description: string;
  
  /** Page heading (displayed as h1, optional - defaults to title) */
  heading?: string;
  
  /** Page intro text (displayed below heading, optional) */
  intro?: string;
}

/**
 * Pages configuration object
 * 
 * Contains metadata for all static pages. Individual project pages generate
 * their metadata from content.
 */
export const pagesConfig = {
  /**
   * Home page (/)
   * Note: Home page uses siteConfig for title/description as it represents the site itself
   */
  home: {
    title: 'Home',
    description: 'Backend Software Engineer focused on Python, FastAPI, distributed systems, reliability and applied AI.',
  },
  
  /**
   * Projects listing page (/projects)
   */
  projects: {
    title: 'Projects - Engineering Case Studies',
    description: 'Engineering case studies covering backend systems, distributed processing, cloud infrastructure and applied AI integration.',
    heading: 'Projects',
    intro: 'Engineering case studies showing how I approach technical problems, evaluate trade-offs and turn requirements into working systems.',
  },
  
  /**
   * Uses/tools page (/uses)
   */
  uses: {
    title: 'Uses - Tools, Stack and Environment',
    description: 'Tools, technologies and environments I use for backend software engineering.',
    heading: 'Uses',
    intro: 'A practical overview of the tools, technologies and environments that support my development workflow.',
  },
  
  /**
   * Contact page (/contact)
   */
  contact: {
    title: 'Contact - Get in Touch',
    description: 'Get in touch to discuss backend software engineering opportunities, collaborations or technical challenges.',
    heading: 'Get in Touch',
  },
} as const;

/**
 * Type export for the pages configuration
 */
export type PagesConfig = typeof pagesConfig;

/**
 * Type export for a single page metadata
 */
export type PageConfig = PageMeta;
