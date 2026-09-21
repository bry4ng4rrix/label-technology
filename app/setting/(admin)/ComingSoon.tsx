import { Construction } from "lucide-react";
import AdminPageHeader from "./AdminPageHeader";

export default function ComingSoon({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div>
      <AdminPageHeader
        title={title}
        description={`${count} élément(s) déjà en base — l'édition arrive dans une prochaine mise à jour, sur le même modèle que la section Services.`}
      />
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Construction className="size-6" strokeWidth={1.6} />
        </div>
        <div>
          <p className="font-display text-lg font-semibold">Bientôt disponible.</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Cette section est en préparation. Les données existantes sont conservées.
          </p>
        </div>
      </div>
    </div>
  );
}
