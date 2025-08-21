"use client";

import { AdvocateSearch } from "@/components/advocates/AdvocateSearch";
import { AdvocateTable } from "../components/advocates/AdvocateTable";

export default function Home() {
  return (
    <main className="h-screen flex flex-col p-6">
      <div className="mb-6 flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Solace Advocates Dashboard</h1>
            <p className="text-gray-600">Manage and search through our network of healthcare advocates</p>
          </div>
          <div className="md:w-96">
            <AdvocateSearch placeholder="Search advocates by name, city, or degree" />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <div className="bg-white rounded-lg shadow-sm border p-6 h-full">
          <AdvocateTable />
        </div>
      </div>
    </main>
  );
}
