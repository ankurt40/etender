'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/common/dashboard-header'
import { Calendar, MapPin, FileText, Download, Eye, ArrowLeft, Building, CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TenderDetailsProps {
  tenderId: string
}

interface TenderDetailData {
  id: string
  title: string
  department: string
  category: string
  estimatedValue: number
  lastDateSubmission: Date
  location: string
  state: string
  publishedDate: Date
  description: string
  tenderRefNumber: string
  tenderId: string
  withdrawalAllowed: boolean
  tenderType: string
  formOfContract: string
  tenderCategory: string
  noOfCovers: number
  paymentMode: string
  tenderFee: number
  processingFee: number
  emdAmount: number
  emdExemptionAllowed: boolean
  bidValidity: number
  periodOfWork: number
  pincode: string
  bidOpeningPlace: string
  documentDownloadStartDate: Date
  documentDownloadEndDate: Date
  bidSubmissionStartDate: Date
  bidSubmissionEndDate: Date
  bidOpeningDate: Date
  invitingAuthority: {
    name: string
    address: string
  }
  covers: Array<{
    coverNo: number
    coverType: string
    description: string
    documentType: string
  }>
  documents: Array<{
    id: string
    name: string
    description: string
    size: number
    type: string
  }>
  onlineBankers: string[]
}

export function TenderDetails({ tenderId }: TenderDetailsProps) {
  const router = useRouter()
  const [tender, setTender] = useState<TenderDetailData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockTender: TenderDetailData = {
      id: tenderId,
      title: 'NEW BUS STAND NEW SHOP NO 67 AT WARD 03 NILAMI AS PER NIT AT MUNICIPAL JORA DIST MORENA AS PER NIT',
      department: 'Directorate Urban Administration and Development',
      category: 'Services',
      estimatedValue: 753612,
      lastDateSubmission: new Date('2025-09-24T17:30:00'),
      location: 'MUNICIPAL COUNCIL JORA',
      state: 'Madhya Pradesh',
      publishedDate: new Date('2025-08-24T14:00:00'),
      description: 'NEW BUS STAND NEW SHOP NO 67 AT WARD 03 NILAMI AS PER NIT AT MUNICIPAL JORA DIST MORENA AS PER NIT',
      tenderRefNumber: '2652/21.08.2025/NILAMI',
      tenderId: '2025_UAD_446713_2',
      withdrawalAllowed: true,
      tenderType: 'Open Tender',
      formOfContract: 'Lump-sum',
      tenderCategory: 'Services',
      noOfCovers: 2,
      paymentMode: 'Online',
      tenderFee: 2000,
      processingFee: 295,
      emdAmount: 37680,
      emdExemptionAllowed: false,
      bidValidity: 180,
      periodOfWork: 0,
      pincode: '476221',
      bidOpeningPlace: 'MUNICIPAL COUNCIL JORA',
      documentDownloadStartDate: new Date('2025-08-24T14:00:00'),
      documentDownloadEndDate: new Date('2025-09-24T17:30:00'),
      bidSubmissionStartDate: new Date('2025-08-28T09:00:00'),
      bidSubmissionEndDate: new Date('2025-09-24T17:30:00'),
      bidOpeningDate: new Date('2025-09-25T17:30:00'),
      invitingAuthority: {
        name: 'MUNICIPAL COUNCIL JORA',
        address: 'MUNICIPAL COUNCIL JORA'
      },
      covers: [
        {
          coverNo: 1,
          coverType: 'Fee/PreQual/Technical',
          description: 'TENDER RELATED ALL DOCUMENT AS PER NIT',
          documentType: '.pdf'
        },
        {
          coverNo: 2,
          coverType: 'Finance',
          description: 'BOQ',
          documentType: '.xls'
        }
      ],
      documents: [
        {
          id: '1',
          name: 'Tendernotice_1.pdf',
          description: 'NIT',
          size: 1092.81,
          type: 'NIT Document'
        },
        {
          id: '2',
          name: 'BOQ_525939.xls',
          description: 'BOQ',
          size: 267.00,
          type: 'Work Item Documents'
        }
      ],
      onlineBankers: ['INDUSIND BANK', 'INDUSIND NEFT/RTGS']
    }

    setTender(mockTender)
    setLoading(false)
  }, [tenderId])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader user={{ name: 'Loading...', email: '', role: 'CONTRACTOR' }} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!tender) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader user={{ name: 'User', email: '', role: 'CONTRACTOR' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Tender Not Found</h1>
            <p className="text-gray-600 mt-2">The requested tender could not be found.</p>
            <button
              onClick={() => router.back()}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={{ name: 'User', email: '', role: 'CONTRACTOR' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tenders
          </button>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{tender.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {tender.department}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {tender.location}, {tender.state}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Deadline: {formatDate(tender.lastDateSubmission)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(tender.estimatedValue)}</div>
                <div className="text-sm text-gray-500">Estimated Value</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Basic Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Chain</label>
                    <p className="text-sm text-gray-900">{tender.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tender Reference Number</label>
                    <p className="text-sm text-gray-900">{tender.tenderRefNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tender ID</label>
                    <p className="text-sm text-gray-900">{tender.tenderId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Withdrawal Allowed</label>
                    <p className="text-sm text-gray-900">{tender.withdrawalAllowed ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tender Type</label>
                    <p className="text-sm text-gray-900">{tender.tenderType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Of Contract</label>
                    <p className="text-sm text-gray-900">{tender.formOfContract}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tender Category</label>
                    <p className="text-sm text-gray-900">{tender.tenderCategory}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Covers</label>
                    <p className="text-sm text-gray-900">{tender.noOfCovers}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                    <p className="text-sm text-gray-900">{tender.paymentMode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Item Details */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Work Item Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Description</label>
                    <p className="text-sm text-gray-900">{tender.description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tender Value</label>
                    <p className="text-sm text-gray-900 font-semibold">{formatCurrency(tender.estimatedValue)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                    <p className="text-sm text-gray-900">Miscellaneous Services</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                    <p className="text-sm text-gray-900">Tender</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bid Validity (Days)</label>
                    <p className="text-sm text-gray-900">{tender.bidValidity}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Period Of Work (Days)</label>
                    <p className="text-sm text-gray-900">{tender.periodOfWork}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-sm text-gray-900">{tender.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <p className="text-sm text-gray-900">{tender.pincode}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bid Opening Place</label>
                    <p className="text-sm text-gray-900">{tender.bidOpeningPlace}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Dates */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Critical Dates</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                    <p className="text-sm text-gray-900">{formatDate(tender.publishedDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bid Opening Date</label>
                    <p className="text-sm text-gray-900">{formatDate(tender.bidOpeningDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Download Start Date</label>
                    <p className="text-sm text-gray-900">{formatDate(tender.documentDownloadStartDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Download End Date</label>
                    <p className="text-sm text-gray-900">{formatDate(tender.documentDownloadEndDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bid Submission Start Date</label>
                    <p className="text-sm text-gray-900">{formatDate(tender.bidSubmissionStartDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bid Submission End Date</label>
                    <p className="text-sm text-gray-900">{formatDate(tender.bidSubmissionEndDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Covers Information */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Covers Information (No. Of Covers - {tender.noOfCovers})</h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tender.covers.map((cover) => (
                        <tr key={cover.coverNo}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cover.coverNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cover.coverType}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{cover.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cover.documentType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tender Documents */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Tender Documents</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {tender.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.description} • {doc.size} KB</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="inline-flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </button>
                        <button className="inline-flex items-center px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fee Details */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Fee Details</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tender Fee</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(tender.tenderFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Processing Fee (18% GST Incl.)</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(tender.processingFee)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900">Total Fee</span>
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(tender.tenderFee + tender.processingFee)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* EMD Details */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">EMD Details</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">EMD Amount</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(tender.emdAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">EMD Exemption Allowed</span>
                  <span className="text-sm font-medium text-gray-900">{tender.emdExemptionAllowed ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">EMD Fee Type</span>
                  <span className="text-sm font-medium text-gray-900">Fixed</span>
                </div>
              </div>
            </div>

            {/* Payment Instruments */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Payment Instruments</h2>
              </div>
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Online Bankers</h3>
                <div className="space-y-2">
                  {tender.onlineBankers.map((bank, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-900">{bank}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tender Inviting Authority */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Tender Inviting Authority</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-sm text-gray-900">{tender.invitingAuthority.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <p className="text-sm text-gray-900">{tender.invitingAuthority.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Apply Now
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Save to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
