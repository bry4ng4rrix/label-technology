"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateApplicationStatus } from "./actions";
import { APPLICATION_STATUSES } from "./constants";

const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  "contacté": "Contacté",
  entretien: "Entretien",
  "accepté": "Accepté",
  "refusé": "Refusé",
};

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      defaultValue={status}
      disabled={isPending}
      onValueChange={(value) => {
        startTransition(() => {
          updateApplicationStatus(id, value);
        });
      }}
    >
      <SelectTrigger className="h-8 w-[130px] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {APPLICATION_STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            {STATUS_LABELS[s] ?? s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
