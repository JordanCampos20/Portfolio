export interface Project {
  id: number
  title: string
  description: string
  image_url: string
  technologies: string[]
  github_url: string
  demo_url: string
  featured: boolean
  created_at: string
}

export interface Technology {
  id: number
  name: string
  category: string
  icon: string
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  read: boolean
}
