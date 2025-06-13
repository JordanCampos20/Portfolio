import { sql } from "./db"
import type { Project, Technology, ContactMessage } from "@/types"

// Função para buscar todos os projetos
export async function getProjects(): Promise<Project[]> {
  const projects = await sql`
    SELECT * FROM projects ORDER BY featured DESC, created_at DESC
  `
  return projects as Project[]
}

// Função para buscar projetos em destaque
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await sql`
    SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC
  `
  return projects as Project[]
}

// Função para buscar todas as tecnologias
export async function getTechnologies(): Promise<Technology[]> {
  const technologies = await sql`
    SELECT * FROM technologies ORDER BY category, name
  `
  return technologies as Technology[]
}

// Função para salvar uma mensagem de contato
export async function saveContactMessage(
  name: string,
  email: string,
  subject: string,
  message: string,
): Promise<ContactMessage> {
  const [newMessage] = await sql`
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES (${name}, ${email}, ${subject}, ${message})
    RETURNING *
  `
  return newMessage as ContactMessage
}
