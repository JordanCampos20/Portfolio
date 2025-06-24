"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Maximize2, Eye } from "lucide-react"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)

  // Usar as imagens do array ou fallback para image_url
  const images =
    project.images && project.images.length > 0
      ? project.images.sort((a, b) => a.display_order - b.display_order)
      : [
          {
            id: 0,
            project_id: project.id,
            image_url: project.image_url || "/placeholder.svg?height=400&width=800",
            alt_text: project.title,
            is_primary: true,
            display_order: 0,
            created_at: "",
          },
        ]

  // Navegação do carousel principal
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Navegação do modal
  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToModalImage = (index: number) => {
    setModalImageIndex(index)
  }

  // Abrir modal com a imagem atual
  const openModal = () => {
    setModalImageIndex(currentImageIndex)
    setIsModalOpen(true)
  }

  // Navegação por teclado no modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          prevModalImage()
          break
        case "ArrowRight":
          event.preventDefault()
          nextModalImage()
          break
        case "Escape":
          event.preventDefault()
          setIsModalOpen(false)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen])

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <div className="relative">
          {/* Container da imagem */}
          <div className="relative h-48 w-full overflow-hidden cursor-pointer" onClick={openModal}>
            <Image
              src={images[currentImageIndex].image_url || "/placeholder.svg"}
              fill
              alt={images[currentImageIndex].alt_text || project.title}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay de visualização */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Eye className="h-6 w-6 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Navegação do carousel - apenas se houver múltiplas imagens */}
          {images.length > 1 && (
            <>
              {/* Botões de navegação */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 p-0 z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 p-0 z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Indicadores */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      goToImage(index)
                    }}
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
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">Destaque</Badge>
            </div>
          )}

          {/* Ícone de expandir */}
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 className="h-3 w-3" />
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {project.description}
          </CardDescription>
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

      {/* Modal de visualização responsivo */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl w-full h-screen sm:h-[95vh] sm:max-h-[95vh] p-0 overflow-hidden sm:rounded-lg">
          <div className="relative h-full flex flex-col">
            {/* Header do modal - compacto no mobile */}
            <DialogHeader className="p-3 sm:p-6 pb-2 sm:pb-4 border-b bg-background/95 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-base sm:text-xl font-semibold text-left line-clamp-1 sm:line-clamp-none">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm text-muted-foreground text-left line-clamp-2 sm:line-clamp-none mt-1">
                    {project.description}
                  </DialogDescription>
                </div>

                {/* Contador de imagens no header mobile */}
                {images.length > 1 && (
                  <div className="sm:hidden bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full flex-shrink-0">
                    {modalImageIndex + 1}/{images.length}
                  </div>
                )}
              </div>
            </DialogHeader>

            {/* Container da imagem no modal */}
            <div className="flex-1 relative bg-black/5 min-h-0">
              <div className="relative h-full w-full">
                <Image
                  src={images[modalImageIndex].image_url || "/placeholder.svg"}
                  fill
                  alt={images[modalImageIndex].alt_text || project.title}
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority
                />
              </div>

              {/* Navegação do modal - otimizada para mobile */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white h-10 w-10 sm:h-12 sm:w-12 p-0 rounded-full z-10 touch-manipulation"
                    onClick={prevModalImage}
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white h-10 w-10 sm:h-12 sm:w-12 p-0 rounded-full z-10 touch-manipulation"
                    onClick={nextModalImage}
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>

                  {/* Contador no modal - apenas desktop */}
                  <div className="hidden sm:block absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full z-10">
                    {modalImageIndex + 1} / {images.length}
                  </div>
                </>
              )}

              {/* Indicadores de posição no mobile */}
              {images.length > 1 && (
                <div className="sm:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 touch-manipulation ${
                        index === modalImageIndex ? "bg-white scale-125" : "bg-white/60"
                      }`}
                      onClick={() => goToModalImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer com ações e thumbnails - otimizado para mobile */}
            <div className="p-3 sm:p-6 pt-2 sm:pt-4 border-t bg-background/95 backdrop-blur-sm flex-shrink-0 max-h-[40vh] sm:max-h-none overflow-y-auto">
              {/* Thumbnails - layout otimizado para mobile */}
              {images.length > 1 && (
                <div className="hidden sm:flex gap-2 mb-4 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      className={`relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all touch-manipulation ${
                        index === modalImageIndex
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => goToModalImage(index)}
                    >
                      <Image
                        src={image.image_url || "/placeholder.svg"}
                        fill
                        alt={image.alt_text || `Imagem ${index + 1}`}
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Thumbnails mobile - layout horizontal scrollável */}
              {images.length > 1 && (
                <div className="sm:hidden flex gap-2 mb-3 overflow-x-auto pb-2 -mx-1 px-1">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      className={`relative flex-shrink-0 w-12 h-9 rounded-md overflow-hidden border-2 transition-all touch-manipulation ${
                        index === modalImageIndex ? "border-primary ring-1 ring-primary/30" : "border-border/50"
                      }`}
                      onClick={() => goToModalImage(index)}
                    >
                      <Image
                        src={image.image_url || "/placeholder.svg"}
                        fill
                        alt={image.alt_text || `Imagem ${index + 1}`}
                        className="object-cover"
                        sizes="48px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Botões de ação - layout responsivo */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3">
                {project.github_url && (
                  <Button asChild className="flex-1 h-10 sm:h-9 touch-manipulation">
                    <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Ver Código
                    </Link>
                  </Button>
                )}
                {project.demo_url && (
                  <Button asChild variant="outline" className="flex-1 h-10 sm:h-9 touch-manipulation">
                    <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Demo
                    </Link>
                  </Button>
                )}
              </div>

              {/* Tecnologias no modal - layout responsivo */}
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {project.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="secondary" className="text-xs px-2 py-1 touch-manipulation">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Dica de navegação - apenas desktop */}
              <div className="hidden sm:block mt-3 pt-3 border-t border-border/30">
                <p className="text-xs text-muted-foreground text-center">
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">←→</kbd> navegar •
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs ml-1">ESC</kbd> fechar
                </p>
              </div>

              {/* Dica mobile */}
              <div className="sm:hidden mt-2 pt-2 border-t border-border/30">
                <p className="text-xs text-muted-foreground text-center">Deslize ou use as setas para navegar</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
