"use client";

import { AdvocateTable } from "../components/advocates/AdvocateTable";

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Solace Advocates Dashboard</h1>
        <p className="text-gray-600">Manage and search through our network of legal advocates</p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <AdvocateTable />
        </div>
      </div>
    </main>
  );
}
