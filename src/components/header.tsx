import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Github, Linkedin } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6" />
            <span className="font-bold">Portfolio</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-foreground/80">
            Sobre
          </Link>
          <Link href="#technologies" className="transition-colors hover:text-foreground/80">
            Tecnologias
          </Link>
          <Link href="#projects" className="transition-colors hover:text-foreground/80">
            Projetos
          </Link>
          <Link href="#contact" className="transition-colors hover:text-foreground/80">
            Contato
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="https://github.jasmim.dev" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm">
              <Github className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="https://linkedin.jasmim.dev" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm">
              <Linkedin className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
