import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Sparkles } from "lucide-react"
import Image from "next/image"

interface MaterialCardProps {
  title: string
  subtitle: string
  description: string
  image: string
  sizes: string[]
  downloadLink: string
  featured?: boolean
}

export function MaterialCard({
  title,
  subtitle,
  description,
  image,
  sizes,
  downloadLink,
  featured = false,
}: MaterialCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {featured && (
        <div className="bg-accent px-4 py-2 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            <span className="font-mono">Destaque</span>
          </div>
        </div>
      )}

      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={image || "/dress-patterns-collection-display.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-balance text-2xl">{title}</CardTitle>
        <CardDescription className="font-mono text-sm">{subtitle}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-pretty text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-muted-foreground font-mono">Tamanhos:</span>
          {sizes.map((size) => (
            <Badge key={size} variant="secondary" className="font-mono">
              {size}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="default"
          asChild
          className="w-full text-[rgba(255,255,255,1)] bg-[rgba(25,146,11,1)] font-black text-base shadow-xl"
          size="lg"
        >
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            <span className="font-mono">Baixar Molde</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
