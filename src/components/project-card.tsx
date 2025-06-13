import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Renomeie a importação para evitar conflitos
import { Badge as UIBadge } from "@/components/ui/badge"

// Se o erro persistir, tente importar explicitamente:
// import { Badge } from "../ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={project.image_url || "/placeholder.svg"}
          width={400}
          height={200}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
          <Button size="sm" variant="secondary" asChild>
            <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-1" />
              Código
            </Link>
          </Button>
          <Button size="sm" variant="secondary" asChild>
            <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              Demo
            </Link>
          </Button>
        </div>
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <UIBadge key={techIndex} variant="outline">
              {tech}
            </UIBadge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
