 "use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { GalleryEntry, IterationId } from "@/lib/gallery-types";
import { buildModelHref, buildVariantHref } from "@/lib/gallery-paths";

export function GalleryCard({ entry }: { entry: GalleryEntry }) {
  const defaultPreviewIteration =
    entry.iterations.find((iteration) => iteration.id === entry.defaultIteration) ?? entry.iterations[0];
  const [hoveredIterationId, setHoveredIterationId] = useState<IterationId | null>(null);

  const previewIteration = useMemo(() => {
    if (!hoveredIterationId) {
      return defaultPreviewIteration;
    }
    return (
      entry.iterations.find((iteration) => iteration.id === hoveredIterationId) ?? defaultPreviewIteration
    );
  }, [defaultPreviewIteration, entry.iterations, hoveredIterationId]);

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <Link
        href={buildVariantHref(entry.group, entry.model, previewIteration.id)}
        className="block bg-neutral-100"
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={previewIteration.thumbnailPath}
            alt={`${entry.modelLabel} iteration ${previewIteration.id} preview`}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-95"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-1">
          <p className="text-xs text-neutral-500">{entry.groupLabel}</p>
          <h3 className="text-lg font-medium tracking-tight text-neutral-900">
            {entry.modelLabel}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {entry.iterations.map((iteration) => (
            <Link
              key={iteration.id}
              href={buildVariantHref(entry.group, entry.model, iteration.id)}
              onMouseEnter={() => setHoveredIterationId(iteration.id)}
              onMouseLeave={() => setHoveredIterationId(null)}
              onFocus={() => setHoveredIterationId(iteration.id)}
              onBlur={() => setHoveredIterationId(null)}
              className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-white hover:text-neutral-900"
            >
              {iteration.id}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-1">
          <Link
            href={buildModelHref(entry.group, entry.model)}
            className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
          >
            Model overview
          </Link>
        </div>
      </div>
    </article>
  );
}
