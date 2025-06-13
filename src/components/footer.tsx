import Link from "next/link"
import { Code2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Code2 className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Portfolio. Desenvolvido com Next.js e Tailwind CSS.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sobre
          </Link>
          <Link href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Projetos
          </Link>
          <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </Link>
        </div>
      </div>
    </footer>
  )
}
