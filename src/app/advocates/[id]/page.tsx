"use client";

import { useRouter } from "next/navigation";

export default function AdvocateDetailPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => router.push("/")}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Advocate Details (Coming Soon)
        </h1>
        <p className="text-gray-500 mt-2">Advocate Details (Coming Soon)</p>
      </div>
    </div>
  );
}