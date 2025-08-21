"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdvocateSearch } from "@/hooks/useAdvocateSearch";
import { SearchInput } from "@/components/shared/SearchInput";
import type { AdvocateSearchResult } from "@/types";

interface AdvocateSearchProps {
  className?: string;
  placeholder?: string;
}

export function AdvocateSearch({
  className = "",
  placeholder = "Search advocates..."
}: AdvocateSearchProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { data: results = [], isLoading } = useAdvocateSearch({
    query,
    limit: 8,
    enabled: query.length >= 2
  });

  const navigateToAdvocate = (advocate: AdvocateSearchResult) => {
    setQuery("");
    router.push(`/advocates/${advocate.id}`);
  };

  const renderAdvocateResult = (advocate: AdvocateSearchResult, index: number, isSelected: boolean) => (
    <div className={`px-4 py-3 transition-colors ${isSelected
      ? "bg-blue-50 text-blue-900"
      : "text-gray-900 hover:bg-gray-50"
      }`}>
      <div className="flex flex-col">
        <span className="font-medium">{advocate.fullName}</span>
        <span className="text-sm text-gray-500">
          {advocate.degree} • {advocate.city} • {advocate.yearsOfExperience} years exp.
        </span>
      </div>
    </div>
  );

  const renderEmpty = () => (
    <div className="px-4 py-3 text-gray-500 text-center">
      No advocates found
    </div>
  );

  return (
    <SearchInput<AdvocateSearchResult>
      className={className}
      placeholder={placeholder}
      value={query}
      onChange={setQuery}
      onSelect={navigateToAdvocate}
      results={results}
      isLoading={isLoading}
      renderResult={renderAdvocateResult}
      renderEmpty={renderEmpty}
      minQueryLength={2}
    />
  );
}