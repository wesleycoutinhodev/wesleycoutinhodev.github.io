/**
 * Content Collections Configuration
 * 
 * All collections use the glob loader to read MDX files from their respective directories.
 * Schemas enforce data structure and provide TypeScript types throughout the application.
 * 
 * @module content.config
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects (Case Studies) Collection
 * 
 * Structured case studies following a narrative format: Overview → Problem → 
 * Constraints → Approach → Key Decisions → Tech Stack → Impact → Learnings.
 * 
 * Features:
 * - Required narrative sections for consistent storytelling
 * - Key decisions with reasoning and alternatives
 * - Impact metrics (quantitative and qualitative)
 * - Featured flag for homepage showcase
 * - Optional custom order for manual curation
 * - Related project slugs for cross-referencing
 */
const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    /** Project title */
    title: z.string(),
    
    /** Your role in the project */
    role: z.string(),
    
    /** Year the project was completed */
    year: z.number(),
    
    /** Project duration (e.g., "3 months", "1.5 years") */
    duration: z.string().optional(),
    
    /** Team size for scope context */
    teamSize: z.number().optional(),
    
    /** Brief summary of outcomes and impact */
    outcomeSummary: z.string(),
    
    /** High-level project overview */
    overview: z.string(),
    
    /** Problem being addressed */
    problem: z.string(),
    
    /** Project constraints and limitations */
    constraints: z.array(z.string()),
    
    /** Solution approach and strategy */
    approach: z.string(),
    
    /** Key technical decisions with reasoning */
    keyDecisions: z.array(z.object({
      decision: z.string(),
      reasoning: z.string(),
      tradeOff: z.string().optional(),
      alternatives: z.array(z.string()).optional(),
    })),
    
    /** Technologies and frameworks used */
    techStack: z.array(z.string()),
    
    /** Project impact and results */
    impact: z.object({
      /** Quantitative metrics (optional) */
      metrics: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
      /** Qualitative impact description */
      qualitative: z.string(),
    }),
    
    /** Key learnings and takeaways */
    learnings: z.array(z.string()),
    
    /** Whether to feature on homepage */
    featured: z.boolean().default(false),
    
    /** Project status */
    status: z.enum(['completed', 'ongoing', 'archived']).default('completed'),
    
    /** Custom sort order (lower numbers first) */
    order: z.number().optional(),
    
    /** Related project slugs for cross-referencing */
    relatedProjects: z.array(z.string()).optional(),
  }),
});

/**
 * Uses Collection
 * 
 * Documentation of tools, technologies, and environment used in development workflow.
 * 
 * Features:
 * - Three categories (tools, stack, environment)
 * - Items with name, description, and optional URL
 * - Custom order for intentional presentation
 */
const usesCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/uses' }),
  schema: z.object({
    /** Category for grouping */
    category: z.enum(['tools', 'stack', 'environment']),
    
    /** List of items in this category */
    items: z.array(z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().url().optional(),
    })),
    
    /** Sort order within category */
    order: z.number(),
  }),
});

/**
 * Export all collections
 * 
 * This object is used by Astro to register all content collections
 * and generate TypeScript types for type-safe content queries.
 */
export const collections = {
  projects: projectsCollection,
  uses: usesCollection,
};
