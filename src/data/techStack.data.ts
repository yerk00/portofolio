export type TechKey =
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'tailwind'
  | 'vite'
  | 'node'
  | 'git'
  | 'github'
  | 'postman'

export interface TechStackItem {
  key: TechKey
  label: string
}

export const techStack: TechStackItem[] = [
  { key: 'react', label: 'React' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'tailwind', label: 'Tailwind' },
  { key: 'vite', label: 'Vite' },
  { key: 'node', label: 'Node.js' },
  { key: 'git', label: 'Git' },
  { key: 'github', label: 'GitHub' },
  { key: 'postman', label: 'Postman' },
]