import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Briefcase, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TechCard } from "@/components/tech-card"
import { ProjectCard } from "@/components/project-card"
import { ContactForm } from "@/components/contact-form"

import { getProjects, getTechnologies } from "@/lib/data"

export default async function Home() {
  const projects = await getProjects()
  const technologies = await getTechnologies()
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section id="about" className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Olá, eu sou {" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Desenvolvedor Full Stack
                  </span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Apaixonado por criar soluções digitais inovadoras. Especializado em desenvolvimento web moderno,
                  mobile e cloud computing. Transformo ideias em produtos digitais de alta qualidade.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="#projects">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Ver Projetos
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#contact">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Entre em Contato
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <Image
                  src="/user.jpg"
                  width={400}
                  height={400}
                  alt="Developer Avatar"
                  className="relative rounded-full border-4 border-background shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tecnologias & Ferramentas</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Domino um amplo conjunto de tecnologias modernas para desenvolvimento full stack
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {technologies.map((tech, index) => (
              <TechCard key={index} technology={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Projetos em Destaque</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Alguns dos projetos que desenvolvi, demonstrando diferentes tecnologias e soluções
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl items-start gap-6 py-12 lg:grid-cols-3 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Vamos Trabalhar Juntos</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Tem um projeto em mente? Entre em contato e vamos conversar sobre como posso ajudar.
              </p>
            </div>
            <ContactForm />
            <div className="flex justify-center space-x-6">
              <Link
                href="mailto:jordan@jasmim.dev"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                jordan@jasmim.dev
              </Link>
              <Link
                href="https://github.jasmim.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
              <Link
                href="https://linkedin.jasmim.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
