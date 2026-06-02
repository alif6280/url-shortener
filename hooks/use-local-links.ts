"use client";
import { useState, useEffect } from "react";

const KEY = "linksnip_guest_links";

export function useLocalLinks() {
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setLinks(JSON.parse(stored));
    } catch {}
  }, []);

  function addLink(slug: string) {
    setLinks((prev) => {
      const updated = [slug, ...prev.filter((s) => s !== slug)].slice(0, 5);
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function clearLinks() {
    localStorage.removeItem(KEY);
    setLinks([]);
  }

  return { links, addLink, clearLinks };
}
