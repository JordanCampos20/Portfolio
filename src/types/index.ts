export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github_url: string
  demo_url: string
  image_url?: string
  featured: boolean
  created_at: string
  images?: ProjectImage[]
}

export interface ProjectImage {
  id: number
  project_id: number
  image_url: string
  alt_text: string | null
  is_primary: boolean
  display_order: number
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
