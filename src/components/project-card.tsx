"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Usar as imagens do array ou fallback para image_url
  const images =
    project.images && project.images.length > 0
      ? project.images.sort((a, b) => a.display_order - b.display_order)
      : [
          {
            id: 0,
            project_id: project.id,
            image_url: project.image_url || "/placeholder.svg?height=200&width=400",
            alt_text: project.title,
            is_primary: true,
            display_order: 0,
            created_at: "",
          },
        ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        {/* Container da imagem */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={images[currentImageIndex].image_url || "/placeholder.svg"}
            fill
            alt={images[currentImageIndex].alt_text || project.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Overlay com botões de ação */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          {project.github_url && (
            <Button size="sm" variant="secondary" asChild className="bg-white/90 hover:bg-white text-black">
              <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Código
              </Link>
            </Button>
          )}
          {project.demo_url && (
            <Button size="sm" variant="secondary" asChild className="bg-white/90 hover:bg-white text-black">
              <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Demo
              </Link>
            </Button>
          )}
        </div>

        {/* Navegação do carousel - apenas se houver múltiplas imagens */}
        {images.length > 1 && (
          <>
            {/* Botões de navegação */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 p-0"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 p-0"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Indicadores */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
                  }`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>

            {/* Contador de imagens */}
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}

        {/* Badge de destaque */}
        {project.featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">Destaque</Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 6).map((tech, techIndex) => (
            <Badge
              key={techIndex}
              variant="outline"
              className="text-xs px-2 py-0.5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 6 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 text-muted-foreground">
              +{project.technologies.length - 6}
            </Badge>
          )}
        </div>

        {/* Data de criação */}
        <div className="mt-3 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Criado em {new Date(project.created_at).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
