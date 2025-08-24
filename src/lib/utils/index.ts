import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date | string, format: "short" | "long" | "relative" = "short"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  if (format === "relative") {
    const now = new Date()
    const diffInHours = (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`

    return dateObj.toLocaleDateString("en-IN")
  }

  return dateObj.toLocaleDateString("en-IN", {
    year: "numeric",
    month: format === "long" ? "long" : "short",
    day: "numeric",
  })
}

export function generateTenderNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `TND-${year}-${random}`
}

export function generateProposalNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `PROP-${year}-${random}`
}

export function generateContractNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `CONT-${year}-${random}`
}

export function calculateDaysRemaining(targetDate: Date | string): number {
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate
  const now = new Date()
  const diffInMs = target.getTime() - now.getTime()
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "submitted":
    case "completed":
      return "text-green-600 bg-green-100"
    case "pending":
    case "draft":
      return "text-yellow-600 bg-yellow-100"
    case "rejected":
    case "cancelled":
    case "expired":
      return "text-red-600 bg-red-100"
    case "under_review":
    case "in_progress":
      return "text-blue-600 bg-blue-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

export function validateGST(gstNumber: string): boolean {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  return gstRegex.test(gstNumber)
}

export function validatePAN(panNumber: string): boolean {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  return panRegex.test(panNumber)
}

export function extractFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ""
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-z0-9.-]/gi, '_').toLowerCase()
}
