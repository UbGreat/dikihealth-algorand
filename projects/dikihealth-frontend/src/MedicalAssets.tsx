// src/pages/MedicalAssets.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface Asset {
  id: number
  name: string
  symbol: string
  supply: number
}

const MedicalAssets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: 123456, name: 'DikiHealthToken', symbol: 'DHT', supply: 1_000_000 },
    { id: 789012, name: 'VaccineAsset', symbol: 'VAC', supply: 10_000 },
  ])

  const handleCreateAsset = () => {
    alert('Create Asset function will trigger ASA creation using Algorand SDK!')
  }

  const handleOptIn = (assetId: number) => {
    alert(`Opt-in to asset with ID ${assetId}`)
  }

  const handleTransfer = (assetId: number) => {
    alert(`Transfer asset with ID ${assetId}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Medical Assets (ASA)</h1>
        <p className="text-gray-600 mb-6">
          Manage Algorand Standard Assets (ASA) representing medicines, medical equipment, and healthcare credits on the blockchain.
        </p>

        {/* Asset Table */}
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>ASA ID</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Supply</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.id}</td>
                  <td>{asset.name}</td>
                  <td>{asset.symbol}</td>
                  <td>{asset.supply.toLocaleString()}</td>
                  <td className="space-x-2">
                    <button className="btn btn-sm btn-outline" onClick={() => handleOptIn(asset.id)}>
                      Opt-in
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={() => handleTransfer(asset.id)}>
                      Transfer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="btn btn-primary" onClick={handleCreateAsset}>
            ➕ Create New ASA
          </button>

          <Link to="/" className="btn btn-outline">
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MedicalAssets
