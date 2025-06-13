"use server"

import { saveContactMessage } from "@/lib/data"
import { z } from "zod"

// Schema de validação para o formulário de contato
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(3, { message: "Assunto deve ter pelo menos 5 caracteres" }),
  message: z.string().min(3, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
})

type FormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
  }
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    // Extrair e validar os dados do formulário
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    const validatedFields = ContactFormSchema.safeParse({
      name,
      email,
      subject,
      message,
    })

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Dados inválidos. Por favor, verifique os campos.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    // Salvar a mensagem no banco de dados
    await saveContactMessage(name, email, subject, message)

    return {
      success: true,
      message: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error)
    return {
      success: false,
      message: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
    }
  }
}
