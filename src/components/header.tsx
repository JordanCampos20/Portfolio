"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Github, Linkedin, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && !target.closest("header")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Code2 className="h-6 w-6" />
              <span className="font-bold">Portfolio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
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

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              <a
                href="#about"
                className="block px-3 py-2 text-sm font-medium hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <a
                href="#technologies"
                className="block px-3 py-2 text-sm font-medium hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tecnologias
              </a>
              <a
                href="#projects"
                className="block px-3 py-2 text-sm font-medium hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projetos
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-sm font-medium hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <div className="flex flex-col space-y-2 px-3 pt-2">
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
          </div>
        )}
      </div>
    </header>
  )
}
