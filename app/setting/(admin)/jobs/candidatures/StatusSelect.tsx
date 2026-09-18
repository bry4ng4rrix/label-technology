"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { updateApplicationStatus } from "./actions";
import { APPLICATION_STATUSES, STATUS_LABELS, STATUS_STYLES } from "./constants";

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
      <SelectTrigger className="h-8 w-[140px] text-xs" onClick={(e) => e.stopPropagation()}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {APPLICATION_STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            <span className={cn("size-2 rounded-full", STATUS_STYLES[s]?.dot)} />
            {STATUS_LABELS[s] ?? s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
