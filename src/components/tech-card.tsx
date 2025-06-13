import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Technology } from "@/types"
import { Code2, Database, Globe, LucideProps, Palette, Server, Smartphone } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface TechnologyCardProps {
  technology: Technology
}

export function TechCard({ technology }: TechnologyCardProps) {
  const iconMap: Record<string, ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
    Code2,
    Palette,
    Database,
    Globe,
    Smartphone,
    Server,
  }

  const categoryColors: Record<string, string> = {
    Frontend: "bg-blue-100 text-blue-800",
    Backend: "bg-green-100 text-green-800",
    Database: "bg-purple-100 text-purple-800",
    Mobile: "bg-orange-100 text-orange-800",
    DevOps: "bg-red-100 text-red-800",
    Cloud: "bg-yellow-100 text-yellow-800",
  }

  const IconComponent = iconMap[technology.icon] || Code2

  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-lg">{technology.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary" className={categoryColors[technology.category]}>
          {technology.category}
        </Badge>
      </CardContent>
    </Card>
  )
}
