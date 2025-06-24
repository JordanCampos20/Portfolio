"use client"

import React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Send } from "lucide-react"
import { submitContactForm } from "@/app/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const initialState = {
  success: false,
  message: "",
  errors: {},
}

export function ContactForm() {
  const [state, formAction] = React.useActionState(submitContactForm, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
    } finally {
      setTimeout(() => setIsSubmitting(false), 500)
    }
  }

  return (
     <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Entre em Contato
        </CardTitle>
        <CardDescription>Preencha o formulário abaixo e retornarei o mais breve possível.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {state.message && (
          <Alert variant={state.success ? "default" : "destructive"}>
            {state.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{state.success ? "Sucesso!" : "Erro"}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        <form action={formAction} onSubmit={() => handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <Input id="name" name="name" placeholder="Seu nome" required />
              {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
              {state.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Assunto
            </label>
            <Input id="subject" name="subject" placeholder="Assunto da mensagem" required />
            {state.errors?.subject && <p className="text-sm text-red-500">{state.errors.subject[0]}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Mensagem
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Descreva seu projeto ou dúvida..."
              className="min-h-[120px]"
              required
            />
            {state.errors?.message && <p className="text-sm text-red-500">{state.errors.message[0]}</p>}
          </div>
          <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
