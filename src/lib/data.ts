import { sql } from "./db"
import type { Project, Technology, ContactMessage, ProjectImage } from "@/types"

// Função para buscar imagens de um projeto
export async function getProjectImages(projectId: number): Promise<ProjectImage[]> {
  const images = await sql`
    SELECT * FROM project_images 
    WHERE project_id = ${projectId} 
    ORDER BY is_primary DESC, display_order ASC
  `
  return images as ProjectImage[]
}

// Função para buscar todos os projetos com suas imagens
export async function getProjects(): Promise<Project[]> {
  const projects = await sql`
    SELECT * FROM projects ORDER BY featured DESC, created_at DESC
  `

  // Para cada projeto, buscar suas imagens
  const projectsWithImages = await Promise.all(
    (projects as Project[]).map(async (project) => {
      const images = await getProjectImages(project.id)
      return {
        ...project,
        images,
        // Mantém image_url para compatibilidade (primeira imagem ou imagem principal)
        image_url: images.find((img) => img.is_primary)?.image_url || images[0]?.image_url || project.image_url,
      }
    }),
  )

  return projectsWithImages
}

// Função para buscar projetos em destaque
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await sql`
    SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC
  `

  const projectsWithImages = await Promise.all(
    (projects as Project[]).map(async (project) => {
      const images = await getProjectImages(project.id)
      return {
        ...project,
        images,
        image_url: images.find((img) => img.is_primary)?.image_url || images[0]?.image_url || project.image_url,
      }
    }),
  )

  return projectsWithImages
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

// Função para adicionar uma imagem a um projeto
export async function addProjectImage(
  projectId: number,
  imageUrl: string,
  altText: string,
  isPrimary = false,
  displayOrder = 0,
): Promise<ProjectImage> {
  // Se esta imagem for marcada como principal, remove a marcação das outras
  if (isPrimary) {
    await sql`
      UPDATE project_images 
      SET is_primary = false 
      WHERE project_id = ${projectId}
    `
  }

  const [newImage] = await sql`
    INSERT INTO project_images (project_id, image_url, alt_text, is_primary, display_order)
    VALUES (${projectId}, ${imageUrl}, ${altText}, ${isPrimary}, ${displayOrder})
    RETURNING *
  `
  return newImage as ProjectImage
}

// Função para remover uma imagem de projeto
export async function removeProjectImage(imageId: number): Promise<void> {
  await sql`
    DELETE FROM project_images WHERE id = ${imageId}
  `
}
