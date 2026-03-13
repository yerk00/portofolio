import type { Project } from '../types/project.types'

export const projects: Project[] = [
  {
    id: 'portfolio-mvp',
    title: 'Portfolio MVP',
    description:
      'Landing personal desarrollada para presentar proyectos, habilidades y experiencia con una arquitectura frontend limpia.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    repositoryUrl: 'https://github.com/portfolio-mvp',
    liveDemoUrl: '',
    featured: true,
  },
  {
    id: 'project-two',
    title: 'Project Two',
    description:
      'Aplicación web enfocada en resolver documentacion administrativa de COFADENA.',
    technologies: ['React', 'TypeScript', 'Node.js'],
    repositoryUrl: 'https://github.com/project-two',
  },
]