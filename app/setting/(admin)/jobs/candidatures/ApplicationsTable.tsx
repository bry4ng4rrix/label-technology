"use client";

import { useMemo, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Search,
  X,
} from "lucide-react";
import type { JobApplication } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import StatusSelect from "./StatusSelect";
import DeleteApplicationButton from "./DeleteApplicationButton";
import { APPLICATION_STATUSES, STATUS_LABELS, STATUS_STYLES } from "./constants";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const ALL = "__all__";
const NEW = "__new__";
const OLD = "__old__";

type Period = "all" | "today" | "7d" | "30d" | "90d" | "custom";

const PERIOD_LABELS: Record<Period, string> = {
  all: "Toute période",
  today: "Aujourd'hui",
  "7d": "7 derniers jours",
  "30d": "30 derniers jours",
  "90d": "3 derniers mois",
  custom: "Période personnalisée",
};

function formatDate(iso: string, withTime = false) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={`Copier ${label}`}
          className="text-muted-foreground opacity-0 transition-opacity group-hover/contact:opacity-100 focus-visible:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(value).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
        >
          {copied ? <Check className="text-emerald-500" /> : <Copy />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copié !" : `Copier ${label}`}</TooltipContent>
    </Tooltip>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        style?.badge ?? "bg-muted text-muted-foreground",
      )}
    >
      <span className={cn("size-1.5 rounded-full", style?.dot ?? "bg-muted-foreground")} />
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Dialog : détail d'une candidature                                   */
/* ------------------------------------------------------------------ */

function ApplicationDialog({
  application,
  onClose,
}: {
  application: JobApplication | null;
  onClose: () => void;
}) {
  const a = application;
  return (
    <Dialog open={!!a} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        {a && (
          <>
            <DialogHeader>
              <div className="flex items-start gap-3 pr-8">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {initials(a.full_name)}
                </div>
                <div className="min-w-0">
                  <DialogTitle className="truncate">{a.full_name}</DialogTitle>
                  <DialogDescription className="mt-0.5">
                    Candidature pour <span className="font-medium text-foreground">{a.job_title}</span>
                  </DialogDescription>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <StatusBadge status={a.status} />
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      Reçue le {formatDate(a.created_at, true)}
                    </span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Coordonnées */}
            <div className="grid gap-2 rounded-lg border bg-muted/30 p-3 sm:grid-cols-2">
              <a
                href={`mailto:${a.email}`}
                className="group/contact flex items-center gap-2.5 rounded-md p-1.5 transition-colors hover:bg-muted"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-border">
                  <Mail className="size-4 text-muted-foreground" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                    Email
                  </span>
                  <span className="block truncate text-sm font-medium">{a.email}</span>
                </span>
                <CopyButton value={a.email} label="l'email" />
              </a>
              {a.phone ? (
                <a
                  href={`tel:${a.phone.replace(/\s+/g, "")}`}
                  className="group/contact flex items-center gap-2.5 rounded-md p-1.5 transition-colors hover:bg-muted"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-border">
                    <Phone className="size-4 text-muted-foreground" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                      Téléphone
                    </span>
                    <span className="block truncate font-mono text-sm font-medium tabular-nums">
                      {a.phone}
                    </span>
                  </span>
                  <CopyButton value={a.phone} label="le numéro" />
                </a>
              ) : (
                <div className="flex items-center gap-2.5 p-1.5 text-sm text-muted-foreground">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-border">
                    <Phone className="size-4" />
                  </span>
                  <span className="italic">Aucun numéro</span>
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <MessageSquare className="size-3.5" />
                Message du candidat
              </div>
              {a.message ? (
                <p className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-lg border bg-background p-3 text-sm leading-relaxed">
                  {a.message}
                </p>
              ) : (
                <p className="rounded-lg border border-dashed p-3 text-sm italic text-muted-foreground">
                  Aucun message n&apos;a été joint à cette candidature.
                </p>
              )}
            </div>

            <div className="-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Statut :</span>
                <StatusSelect id={a.id} status={a.status} />
              </div>
              <div className="flex items-center gap-2">
                {a.cv_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={a.cv_url} target="_blank" rel="noopener noreferrer">
                      <FileText />
                      Ouvrir le CV
                    </a>
                  </Button>
                )}
                <Button size="sm" asChild>
                  <a href={`mailto:${a.email}?subject=${encodeURIComponent(`Votre candidature – ${a.job_title}`)}`}>
                    <Mail />
                    Répondre
                  </a>
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Table                                                               */
/* ------------------------------------------------------------------ */

export default function ApplicationsTable({ data }: { data: JobApplication[] }) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "created_at", desc: true }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(ALL);
  const [jobFilter, setJobFilter] = useState<string>(ALL);
  const [period, setPeriod] = useState<Period>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selected, setSelected] = useState<JobApplication | null>(null);

  const jobTitles = useMemo(
    () => Array.from(new Set(data.map((a) => a.job_title))).sort((x, y) => x.localeCompare(y, "fr")),
    [data],
  );

  // Filtrage statut / offre / date fait en amont, avant la recherche texte de la table.
  const filtered = useMemo(() => {
    const now = new Date();
    let from: Date | null = null;
    let to: Date | null = null;
    if (period === "today") {
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (period === "7d" || period === "30d" || period === "90d") {
      const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
      from = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    } else if (period === "custom") {
      if (dateFrom) from = new Date(`${dateFrom}T00:00:00`);
      if (dateTo) to = new Date(`${dateTo}T23:59:59.999`);
    }

    return data.filter((a) => {
      if (statusFilter === NEW && a.status !== "nouveau") return false;
      if (statusFilter === OLD && a.status === "nouveau") return false;
      if (statusFilter !== ALL && statusFilter !== NEW && statusFilter !== OLD && a.status !== statusFilter)
        return false;
      if (jobFilter !== ALL && a.job_title !== jobFilter) return false;
      const d = new Date(a.created_at);
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  }, [data, statusFilter, jobFilter, period, dateFrom, dateTo]);

  const columns = useMemo<ColumnDef<JobApplication>[]>(
    () => [
      {
        accessorKey: "full_name",
        header: ({ column }) => <SortHeader column={column}>Candidat</SortHeader>,
        cell: ({ row }) => {
          const a = row.original;
          return (
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  a.status === "nouveau"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {initials(a.full_name)}
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium">{a.full_name}</div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                  {a.cv_url ? (
                    <a
                      href={a.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
                    >
                      <FileText className="size-3" />
                      CV joint
                    </a>
                  ) : (
                    <span className="italic">Sans CV</span>
                  )}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        id: "contact",
        accessorFn: (a) => `${a.email} ${a.phone ?? ""}`,
        header: "Contact",
        enableSorting: false,
        cell: ({ row }) => {
          const a = row.original;
          return (
            <div className="flex flex-col gap-1">
              <div className="group/contact flex items-center gap-1.5">
                <Mail className="size-3.5 shrink-0 text-muted-foreground" />
                <a
                  href={`mailto:${a.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="truncate text-sm hover:underline"
                  title={a.email}
                >
                  {a.email}
                </a>
                <CopyButton value={a.email} label="l'email" />
              </div>
              {a.phone ? (
                <div className="group/contact flex items-center gap-1.5">
                  <Phone className="size-3.5 shrink-0 text-muted-foreground" />
                  <a
                    href={`tel:${a.phone.replace(/\s+/g, "")}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-sm tabular-nums hover:underline"
                  >
                    {a.phone}
                  </a>
                  <CopyButton value={a.phone} label="le numéro" />
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs italic text-muted-foreground">
                  <Phone className="size-3.5 shrink-0" />
                  Non renseigné
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "job_title",
        header: ({ column }) => <SortHeader column={column}>Poste</SortHeader>,
        cell: ({ row }) => {
          const a = row.original;
          return (
            <button
              type="button"
              onClick={() => setSelected(a)}
              className="group/job flex max-w-[240px] flex-col items-start gap-0.5 text-left"
            >
              <span className="line-clamp-2 text-sm font-medium text-foreground underline-offset-4 group-hover/job:underline">
                {a.job_title}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="size-3" />
                {a.message ? "Voir le message" : "Aucun message"}
              </span>
            </button>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => <SortHeader column={column}>Reçu le</SortHeader>,
        sortingFn: "datetime",
        cell: ({ getValue }) => (
          <span className="whitespace-nowrap text-sm tabular-nums text-muted-foreground">
            {formatDate(getValue<string>())}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => <SortHeader column={column}>Statut</SortHeader>,
        cell: ({ row }) => <StatusSelect id={row.original.id} status={row.original.status} />,
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
            <DeleteApplicationButton id={row.original.id} fullName={row.original.full_name} />
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, value: string) => {
      const q = value.trim().toLowerCase();
      if (!q) return true;
      const a = row.original;
      return [a.full_name, a.email, a.phone ?? "", a.job_title, a.message ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
    autoResetPageIndex: true,
  });

  const hasActiveFilter =
    globalFilter !== "" || statusFilter !== ALL || jobFilter !== ALL || period !== "all";

  const resetFilters = () => {
    setGlobalFilter("");
    setStatusFilter(ALL);
    setJobFilter(ALL);
    setPeriod("all");
    setDateFrom("");
    setDateTo("");
  };

  const rows = table.getRowModel().rows;
  const total = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize } = table.getState().pagination;
  const rangeStart = total === 0 ? 0 : pageIndex * pageSize + 1;
  const rangeEnd = Math.min(total, (pageIndex + 1) * pageSize);

  return (
    <div className="space-y-4">
      {/* Barre de filtres */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Rechercher un nom, email, téléphone, poste…"
              className="pl-8"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[170px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Tous les statuts</SelectItem>
              <SelectItem value={NEW}>
                <span className="size-2 rounded-full bg-blue-500" />
                Nouvelles
              </SelectItem>
              <SelectItem value={OLD}>
                <span className="size-2 rounded-full bg-muted-foreground" />
                Anciennes / traitées
              </SelectItem>
              <SelectSeparator />
              {APPLICATION_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  <span className={cn("size-2 rounded-full", STATUS_STYLES[s]?.dot)} />
                  {STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Offre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Toutes les offres</SelectItem>
              {jobTitles.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <SelectTrigger className="w-[190px]">
              <Calendar className="text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
                <SelectItem key={p} value={p}>
                  {PERIOD_LABELS[p]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilter && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X />
              Réinitialiser
            </Button>
          )}
        </div>

        {period === "custom" && (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              Du
              <Input
                type="date"
                value={dateFrom}
                max={dateTo || undefined}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-[160px]"
              />
            </label>
            <label className="flex items-center gap-2 text-muted-foreground">
              au
              <Input
                type="date"
                value={dateTo}
                min={dateFrom || undefined}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-[160px]"
              />
            </label>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((h) => (
                  <TableHead key={h.id} className="h-10 text-xs uppercase tracking-wide">
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => setSelected(row.original)}
                  className={cn(
                    "cursor-pointer",
                    row.original.status === "nouveau" && "bg-primary/[0.03]",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                  {hasActiveFilter ? (
                    <div className="flex flex-col items-center gap-2">
                      <span>Aucune candidature ne correspond à ces filtres.</span>
                      <Button variant="outline" size="sm" onClick={resetFilters}>
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  ) : (
                    "Aucune candidature reçue pour le moment."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <div>
          {total === 0
            ? "0 candidature"
            : `${rangeStart}–${rangeEnd} sur ${total} candidature${total > 1 ? "s" : ""}`}
          {total !== data.length && ` (${data.length} au total)`}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Par page</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger size="sm" className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="tabular-nums">
            Page {table.getPageCount() === 0 ? 0 : pageIndex + 1} / {table.getPageCount()}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="Première page"
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Page précédente"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Page suivante"
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Dernière page"
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>

      <ApplicationDialog application={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* En-tête triable                                                     */
/* ------------------------------------------------------------------ */

import type { Column } from "@tanstack/react-table";

function SortHeader({
  column,
  children,
}: {
  column: Column<JobApplication, unknown>;
  children: React.ReactNode;
}) {
  const sorted = column.getIsSorted();
  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className="-ml-2 inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs font-medium uppercase tracking-wide transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
      {sorted === "asc" ? (
        <ArrowUp className="size-3.5" />
      ) : sorted === "desc" ? (
        <ArrowDown className="size-3.5" />
      ) : (
        <ArrowUpDown className="size-3.5 opacity-40" />
      )}
    </button>
  );
}
