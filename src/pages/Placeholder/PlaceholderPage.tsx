import { PageHeader } from '../../components/layout/PageHeader'
import { Card } from '../../components/ui/Card'

export function PlaceholderPage({ title, eyebrow }: { title: string; eyebrow: string }) {
  return <div className="space-y-6"><PageHeader title={title} eyebrow={eyebrow} subtitle="Fundação de layout pronta para a próxima etapa de implementação." /><Card className="grid min-h-64 place-items-center text-center"><div><p className="font-medium">Estrutura preparada</p><p className="mt-2 max-w-md text-sm text-muted">Esta página já compartilha AppShell, navegação e tokens responsivos. O conteúdo final será construído fielmente às referências na próxima etapa.</p></div></Card></div>
}
