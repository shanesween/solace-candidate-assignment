"use client";

import { useParams, useRouter } from "next/navigation";
import { useAdvocate } from "@/hooks/useAdvocate";
import { Chip } from "@/components/ui/Chip";
import { formatPhoneNumber, formatExperience } from "@/utils/formatters";

export default function AdvocateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const advocateId = parseInt(params.id as string);

  const { data: advocate, isLoading, error } = useAdvocate({ id: advocateId });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading advocate details...</p>
        </div>
      </div>
    );
  }

  if (error || !advocate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-full bg-red-100 p-6 w-16 h-16 mx-auto flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-semibold text-gray-900">Advocate Not Found</h1>
          <p className="mt-2 text-gray-600">The advocate you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Advocate Details</h1>
        </div>

        {/* Advocate Card */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Header Section */}
          <div className="bg-[#265b4e] px-6 py-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-white">
                {advocate.firstName} {advocate.lastName}
              </h2>
              <p className="text-blue-100">{advocate.degree}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-900">{formatPhoneNumber(advocate.phoneNumber)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-900">{advocate.city}</span>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Education</span>
                    <p className="text-gray-900">{advocate.degree}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Experience</span>
                    <p className="text-gray-900">{formatExperience(advocate.yearsOfExperience)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {advocate.specialties.map((specialty, index) => (
                  <Chip key={index} variant="primary" size="md">
                    {specialty}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Member Since */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Member since {new Date(advocate.createdAt).toLocaleDateString()}</span>
                <span>ID: #{advocate.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}