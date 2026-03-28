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
 * Contains metadata for all static pages. Dynamic pages (like individual
 * project or article pages) generate their own metadata from content.
 */
export const pagesConfig = {
  /**
   * Home page (/)
   * Note: Home page uses siteConfig for title/description as it represents the site itself
   */
  home: {
    title: 'Inicio',
    description: 'Desenvolvedor backend focado em arquitetura completa do codigo ao deploy, integrando RAG, LLM e automacoes.',
  },
  
  /**
   * Projects listing page (/projects)
   */
  projects: {
    title: 'Projetos - Estudos de Caso',
    description: 'Estudos de caso detalhados mostrando abordagem de solucao de problemas, decisoes tecnicas e impacto mensuravel.',
    heading: 'Projetos',
    intro: 'Estudos de caso que mostram como abordo problemas complexos, tomo decisoes tecnicas e entrego impacto mensuravel. Cada projeto conta o desafio, as restricoes, as decisoes e os resultados.',
  },
  
  /**
   * Decisions listing page (/decisions)
   */
  decisions: {
    title: 'Decisoes - Arquitetura e Tecnologia',
    description: 'Registro de decisoes arquiteturais e tecnicas, documentando contexto, alternativas e raciocinio por tras das escolhas.',
    heading: 'Decisoes',
    intro: 'Um registro transparente das decisoes arquiteturais e tecnicas que tomei. Cada entrada documenta o contexto, alternativas consideradas e o raciocinio por tras da escolha.',
  },
  
  /**
   * Journey timeline page (/journey)
   */
  journey: {
    title: 'Jornada - Linha do Tempo de Carreira',
    description: 'Linha do tempo da minha jornada profissional, com marcos, aprendizados e transicoes que moldaram minha evolucao.',
    heading: 'Jornada',
    intro: 'Uma linha do tempo da minha evolucao profissional e de aprendizado. Nao e um curriculo - e a historia de como meu pensamento evoluiu e das habilidades que desenvolvi.',
  },
  
  /**
   * Writing/blog listing page (/writing)
   */
  writing: {
    title: 'Escrita - Artigos Tecnicos',
    description: 'Artigos tecnicos, insights e licoes aprendidas ao construir sistemas e resolver desafios de engenharia.',
    heading: 'Escrita',
    intro: 'Artigos tecnicos, insights e licoes aprendidas ao construir sistemas. Escrevo sobre decisoes de arquitetura, praticas de engenharia e desafios de confiabilidade em escala.',
  },

  /**
   * Speaking engagements page (/speaking)
   */
  speaking: {
    title: 'Palestras - Talks e Apresentacoes',
    description: 'Palestras, meetups, podcasts e workshops sobre engenharia de software, arquitetura e lideranca tecnica.',
    heading: 'Palestras',
    intro: 'Apresentacoes em conferencias, meetups e podcasts sobre arquitetura de software, praticas de engenharia e lideranca tecnica. Aqui esta uma selecao dos meus talks.',
  },
  
  /**
   * Uses/tools page (/uses)
   */
  uses: {
    title: 'Uses - Ferramentas, Stack e Ambiente',
    description: 'Lista das ferramentas, tecnologias e ambiente que uso no dia a dia de desenvolvimento.',
    heading: 'Ferramentas',
    intro: 'Uma visao transparente das ferramentas, tecnologias e ambiente que sustentam meu fluxo de trabalho. Aqui documento o que uso e por que.',
  },
  
  /**
   * Contact page (/contact)
   */
  contact: {
    title: 'Contato - Vamos Conversar',
    description: 'Entre em contato para discutir oportunidades, colaboracoes ou desafios tecnicos.',
    heading: 'Vamos Conversar',
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
