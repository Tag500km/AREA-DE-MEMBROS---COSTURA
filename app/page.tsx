import Link from "next/link"
import { MaterialCard } from "@/components/material-card"
import { Button } from "@/components/ui/button"
import { Scissors, Sparkles, Heart, BarChart3 } from "lucide-react"

export default function MembersArea() {
  const materials = [
    {
      title: "Pacote Completo",
      subtitle: "+40 Moldes de Vestidos",
      description: "Coleção completa com mais de 40 moldes de vestidos para todos os estilos e ocasiões",
      image: "/complete-package-dresses.jpg",
      sizes: ["P", "M", "G", "GG"],
      downloadLink: "https://drive.google.com/drive/folders/171TfMdJiTPChEAxo-jOeO_FL28yPFHXa",
      featured: true,
    },
    {
      title: "Vestido Camponesa",
      subtitle: "Estilo romântico e delicado",
      description: "Molde completo do vestido camponesa, perfeito para looks românticos e femininos",
      image: "/blue-peasant-dress-on-model.jpg",
      sizes: ["P", "M", "G", "GG"],
      downloadLink: "https://drive.google.com/drive/folders/1CYG9QJ17aNx3ReNoAzz702sJ-N7-0xen",
    },
    {
      title: "Vestido Tubinho Chic",
      subtitle: "Elegância e sofisticação",
      description: "Molde do clássico vestido tubinho, ideal para eventos formais e trabalho",
      image: "/red-elegant-sheath-dress-on-model.jpg",
      sizes: ["P", "M", "G", "GG"],
      downloadLink: "https://drive.google.com/drive/folders/1tutrJNevH4Nsp03ST-pvafrqSZQWLhFV",
    },
    {
      title: "Vestido Social Simples",
      subtitle: "Versatilidade no dia a dia",
      description: "Molde versátil para vestido social, perfeito para diversas ocasiões",
      image: "/black-simple-cocktail-dress-on-model.jpg",
      sizes: ["P", "M", "G", "GG"],
      downloadLink: "https://drive.google.com/drive/folders/1lO6iwfwW34axc9zhVw_zCXXXkfmSZUEu",
    },
    {
      title: "Vestido Rodado Godê",
      subtitle: "Charme e movimento",
      description: "Molde do vestido rodado com saia godê, trazendo movimento e elegância",
      image: "/blue-twirl-dress-on-model.jpg",
      sizes: ["P", "M", "G", "GG"],
      downloadLink: "https://drive.google.com/drive/folders/1j0xmMkpsA3rGfR_87Gwe2sDSwZElZwac",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-muted/50 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/sewing-thread-spools-fabric-texture-pattern.jpg')] opacity-5 bg-cover bg-center" />

        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mb-8 flex justify-end">
            <Link href="/dashboard">
              <Button className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard Financeiro
              </Button>
            </Link>
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="font-mono">Bem-vinda, Membro VIP</span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Área de Membros
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Transforme sua paixão por costura em uma fonte de renda. Acesse moldes exclusivos e materiais
              cuidadosamente selecionados para você.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-accent" />
                <span className="font-mono">Moldes Profissionais</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-accent" />
                <span className="font-mono">Feito com Amor</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="font-mono">Qualidade Premium</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Materials Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Seus Materiais Exclusivos
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Explore nossa coleção de moldes profissionais. Cada peça foi desenvolvida pensando em facilitar seu
              trabalho e garantir resultados perfeitos.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((material, index) => (
              <MaterialCard key={index} {...material} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <p className="mb-2 text-sm text-muted-foreground">Dúvidas ou precisa de ajuda? Entre em contato conosco.</p>
            <p className="text-xs text-muted-foreground font-mono">
              © 2025 Área de Membros. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
