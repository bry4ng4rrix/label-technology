import { Card, CardContent } from "@/components/ui/card";

export default function ComingSoon({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {count} élément(s) déjà en base — l&apos;édition arrive dans une prochaine mise à jour, sur le même modèle que la section Services.
      </p>
      <Card className="mt-6">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Bientôt disponible.
        </CardContent>
      </Card>
    </div>
  );
}
