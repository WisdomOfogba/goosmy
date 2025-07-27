"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Search, FileText, Download, AlertCircle } from "lucide-react"
import axios from "axios"

interface SearchPageProps {
  onBack: () => void
}

interface SearchResult {
  id: string
  studentName: string
  matricNumber: string
  createdAt: string
  downloadUrl: string
}

export default function SearchPage({ onBack }: SearchPageProps) {
  const [searchId, setSearchId] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      if (!searchId.trim()) {
        setError("Please enter your assignment ID")
      return
    }

    setIsSearching(true)
    setError("")
    setSearchResult(null)

    const response = await axios.get(`/api/search?assignmentId=${searchId}`)

    if (response.data) {
      setSearchResult({
        id: response.data.assigmentId,
        studentName: response.data.fullName,
        matricNumber: response.data.matricNumber,
        downloadUrl: response.data.downloadUrl,
        createdAt: new Date(response.data.createdAt).toISOString(),
      })
    }
  } catch (err) {
    console.error("Search error:", err)
    setError("An error occurred while searching. Please try again later.")
  } finally {
    setIsSearching(false)
  }
}

  const handleDownload = async () => {
    if (!searchResult) return

    setIsDownloading(true)
    const response = await fetch(searchResult.downloadUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `COS102_Assignment_${searchResult.matricNumber}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setIsDownloading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Find Your COS102 Assignment</h1>
            <p className="text-gray-600">Enter your assignment ID to download your work</p>
          </div>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="mb-4">
              <label htmlFor="searchId" className="block text-sm font-medium mb-2">
                Assignment ID
              </label>
              <input
                type="text"
                id="searchId"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., COS102_123456_ABC1"
              />
              {error && (
                <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Find My Assignment</span>
                </div>
              )}
            </button>
          </form>

          {searchResult && (
            <div className="border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-5 h-5 text-green-600" />
                <h3 className="font-medium">Assignment Found!</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-600">Student:</span>
                  <p className="font-medium">{searchResult.studentName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Matric:</span>
                  <p className="font-medium">{searchResult.matricNumber}</p>
                </div>
                <div>
                  <span className="text-gray-600">Course:</span>
                  <p className="font-medium">COS102</p>
                </div>
                <div>
                  <span className="text-gray-600">Created:</span>
                  <p className="font-medium">{new Date(searchResult.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Assignment</span>
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Can&apos;t find your ID?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check your email (including spam folder)</li>
              <li>• Assignment IDs start with &quot;COS102_&quot;</li>
              <li>• Contact us if you still can&apos;t find it</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
