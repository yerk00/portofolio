export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  repositoryUrl?: string
  liveDemoUrl?: string
  imageUrl?: string
  featured?: boolean
}