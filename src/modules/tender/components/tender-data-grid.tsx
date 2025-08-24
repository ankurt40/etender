'use client'

import { useState, useMemo } from 'react'
import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid'
import { Box, Chip, IconButton, Tooltip, Button } from '@mui/material'
import { Visibility, Download, BookmarkBorder, LocationOn } from '@mui/icons-material'
import { formatCurrency, formatDate, calculateDaysRemaining } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Tender {
  id: string
  tenderNumber: string
  title: string
  department: string
  category: string
  serviceType: string
  estimatedValue: number
  earnestMoney?: number
  tenderFee?: number
  location: string
  state: string
  district?: string
  publishedDate: Date
  lastDateSubmission: Date
  openingDate: Date
  validityPeriod: number
  workCompletionTime: number
  contactPerson: string
  contactEmail: string
  contactPhone: string
  status: string
  applications: Array<Record<string, unknown>>
  _count: { applications: number }
}

interface TenderDataGridProps {
  readonly tenders: Tender[]
}

export function TenderDataGrid({ tenders }: TenderDataGridProps) {
  const router = useRouter()
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'lastDateSubmission', sort: 'asc' }
  ])

  const handleViewDetails = (tenderId: string) => {
    router.push(`/tenders/${tenderId}`)
  }

  const handleDownloadDocument = (tenderId: string) => {
    // Implement document download logic
    console.log('Download document for tender:', tenderId)
  }

  const handleSaveToWatchlist = (tenderId: string) => {
    // Implement save to watchlist logic
    console.log('Save to watchlist:', tenderId)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'CONSTRUCTION':
        return 'warning'
      case 'IT_SOFTWARE':
        return 'primary'
      case 'SUPPLY':
        return 'success'
      case 'CONSULTING':
        return 'secondary'
      case 'SERVICES':
        return 'info'
      default:
        return 'default'
    }
  }

  const getUrgencyColor = (daysRemaining: number) => {
    if (daysRemaining <= 3) return 'error'
    if (daysRemaining <= 7) return 'warning'
    return 'success'
  }

  const columns: GridColDef[] = [
    {
      field: 'tenderNumber',
      headerName: 'Tender',
      width: 140,
      filterable: true,
      sortable: true,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <div className="text-sm font-medium text-gray-900 flex items-center h-full">
          {params.value}
        </div>
      ),
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 350,
      filterable: true,
      sortable: true,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <div className="py-2 w-full">
            <div
              className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer text-left text-sm mb-1"
              onClick={() => handleViewDetails(params.row.id)}
              style={{
                wordWrap: 'break-word',
                lineHeight: '1.4',
                maxHeight: '2.8em',
                overflow: 'hidden'
              }}
              title={params.row.title}
            >
              {params.row.title}
            </div>
            <button
              className="text-xs text-blue-500 hover:text-blue-700 underline text-left bg-transparent border-none p-0 cursor-pointer"
              onClick={() => handleViewDetails(params.row.id)}
              type="button"
            >
              View Details →
            </button>
          </div>
        )
      },
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 250,
      filterable: true,
      sortable: true,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <div className="text-sm text-gray-700 line-clamp-2 flex items-center h-full">
          {params.value}
        </div>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
      filterable: true,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
      type: 'singleSelect',
      valueOptions: ['CONSTRUCTION', 'IT_SOFTWARE', 'SUPPLY', 'CONSULTING', 'SERVICES'],
      renderCell: (params) => (
        <div className="flex items-center justify-center h-full">
          <Chip
            label={params.value.replace('_', ' ')}
            color={getCategoryColor(params.value) as 'warning' | 'primary' | 'success' | 'secondary' | 'info' | 'default'}
            size="small"
            variant="outlined"
          />
        </div>
      ),
    },
    {
      field: 'estimatedValue',
      headerName: 'Value in Crores',
      width: 150,
      filterable: true,
      sortable: true,
      headerAlign: 'right',
      align: 'right',
      type: 'number',
      renderCell: (params) => (
        <div className="font-semibold text-green-600 flex items-center justify-end h-full">
          {formatCurrency(params.value)}
        </div>
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 180,
      filterable: true,
      sortable: true,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <div className="flex items-center text-sm h-full">
          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <div>
            <div>{params.value}</div>
            <div className="text-xs text-gray-500">{params.row.state}</div>
          </div>
        </div>
      ),
    },
    {
      field: 'lastDateSubmission',
      headerName: 'Deadline',
      width: 140,
      filterable: true,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
      type: 'date',
      valueGetter: (value) => new Date(value),
      renderCell: (params) => {
        const daysRemaining = calculateDaysRemaining(params.value)
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-sm font-medium">
              {formatDate(params.value)}
            </div>
            <Chip
              label={daysRemaining > 0 ? `${daysRemaining} days left` : 'Expired'}
              color={getUrgencyColor(daysRemaining) as 'error' | 'warning' | 'success'}
              size="small"
              variant="filled"
              sx={{ fontSize: '0.7rem', height: 20, mt: 0.5 }}
            />
          </div>
        )
      },
    },
    {
      field: 'publishedDate',
      headerName: 'Published',
      width: 120,
      filterable: true,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
      type: 'date',
      valueGetter: (value) => new Date(value),
      renderCell: (params) => (
        <div className="text-sm text-gray-600 flex items-center justify-center h-full">
          {formatDate(params.value)}
        </div>
      ),
    },
    {
      field: 'workCompletionTime',
      headerName: 'Duration',
      width: 100,
      filterable: true,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
      renderCell: (params) => (
        <div className="text-sm flex items-center justify-center h-full">
          {params.value} days
        </div>
      ),
    },
    {
      field: 'applicationsCount',
      headerName: 'Applicants',
      width: 100,
      filterable: true,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
      valueGetter: (value, row) => row._count.applications,
      renderCell: (params) => (
        <div className="text-center flex flex-col items-center justify-center h-full">
          <div className="text-sm font-semibold">{params.value}</div>
          <div className="text-xs text-gray-500">applicants</div>
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      filterable: false,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => handleViewDetails(params.row.id)}
              sx={{ color: 'primary.main' }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Document">
            <IconButton
              size="small"
              onClick={() => handleDownloadDocument(params.row.id)}
              sx={{ color: 'success.main' }}
            >
              <Download fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save to Watchlist">
            <IconButton
              size="small"
              onClick={() => handleSaveToWatchlist(params.row.id)}
              sx={{ color: 'warning.main' }}
            >
              <BookmarkBorder fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  // Process data for DataGrid
  const rows = useMemo(() => {
    return tenders.map((tender) => ({
      ...tender,
      id: tender.id,
    }))
  }, [tenders])

  return (
    <Box sx={{
      width: '100%',
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
          sorting: {
            sortModel: sortModel,
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          border: 'none',
          backgroundColor: 'white',
          '& .MuiDataGrid-main': {
            backgroundColor: 'white',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f8fafc',
            borderBottom: '2px solid #2563eb',
            color: '#1f2937',
            fontWeight: 600,
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f1f5f9',
            backgroundColor: 'white',
            py: 1,
          },
          '& .MuiDataGrid-row': {
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: '#f8fafc',
            },
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '2px solid #e2e8f0',
            backgroundColor: '#f8fafc',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: 'white',
          },
          '& .MuiDataGrid-overlay': {
            backgroundColor: 'white',
          },
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />

      {/* Quick Actions Bar */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc'
      }}>
        <div className="text-sm text-gray-600">
          Showing {rows.length} tenders
        </div>
        <div className="flex space-x-2">
          <Button variant="outlined" size="small">
            Export to Excel
          </Button>
          <Button variant="outlined" size="small">
            Save Filters
          </Button>
          <Button variant="contained" size="small">
            Apply to Selected
          </Button>
        </div>
      </Box>
    </Box>
  )
}
