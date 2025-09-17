// src/components/MedicalAssets.tsx
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { useWallet } from '@txnlab/use-wallet-react'
import React, { useEffect, useState } from 'react'
import Account from './components/Account'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

interface MedicalAsset {
  id: number
  name: string
  symbol: string
  supply: number
}

const MedicalAssets: React.FC = () => {
  const { activeAddress, transactionSigner } = useWallet()
  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algorand = AlgorandClient.fromConfig({ algodConfig })

  const [assets, setAssets] = useState<MedicalAsset[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [assetName, setAssetName] = useState('')
  const [assetSymbol, setAssetSymbol] = useState('')
  const [assetSupply, setAssetSupply] = useState<number>(0)
  const [assetDecimals, setAssetDecimals] = useState<number>(0)
  const [manager, setManager] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch user's created assets (optional, could connect to Indexer)
  useEffect(() => {
    console.log('🔗 Connected account:', activeAddress)
  }, [activeAddress])

  const createASA = async () => {
    try {
      setLoading(true)

      if (!activeAddress || !transactionSigner) {
        alert('⚠️ Please connect your wallet first.')
        return
      }

      console.log('📡 Creating ASA with params:', {
        assetName,
        assetSymbol,
        assetSupply,
        assetDecimals,
        manager,
        activeAddress,
      })

      const result = await algorand.send.assetCreate({
        sender: activeAddress,
        signer: transactionSigner,
        total: assetSupply,
        decimals: assetDecimals,
        unitName: assetSymbol.trim(),
        assetName: assetName.trim(),
        defaultFrozen: false,
        manager: manager || activeAddress,
        reserve: manager || activeAddress,
        freeze: manager || activeAddress,
        clawback: activeAddress,
      })

      console.log('✅ ASA creation result:', result)
      alert(`✅ ASA Created! Asset ID: ${result.assetId} (Tx: ${result.txIds[0]})`)

      // Add to local state
      setAssets((prev) => [
        ...prev,
        {
          id: result.assetId ?? Math.floor(Math.random() * 1_000_000),
          name: assetName,
          symbol: assetSymbol,
          supply: assetSupply,
        },
      ])

      // Reset form + close modal
      setAssetName('')
      setAssetSymbol('')
      setAssetSupply(0)
      setAssetDecimals(0)
      setManager('')
      setShowCreateModal(false)
    } catch (err) {
      console.error('❌ Error creating ASA:', err)
      alert('Failed to create ASA. See console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Medical Assets</h1>

        {/* Display connected account info */}
        <div className="mb-4 p-4 bg-gray-50 rounded-xl border">
          {activeAddress ? (
            <Account />
          ) : (
            <p className="text-red-500 font-semibold">⚠️ No wallet connected. Please connect with Pera Wallet.</p>
          )}
        </div>

        {/* Asset List */}
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Total Supply</th>
              </tr>
            </thead>
            <tbody>
              {assets.length > 0 ? (
                assets.map((asset) => (
                  <tr key={asset.id}>
                    <td>{asset.id}</td>
                    <td>{asset.name}</td>
                    <td>{asset.symbol}</td>
                    <td>{asset.supply}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500">
                    No assets created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end">
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)} disabled={!activeAddress}>
            ➕ Create Medical Asset
          </button>
        </div>
      </div>

      {/* Create ASA Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-teal-600">Create New Medical Asset</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Asset Name"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Asset Symbol"
                value={assetSymbol}
                onChange={(e) => setAssetSymbol(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                placeholder="Total Supply"
                value={assetSupply}
                onChange={(e) => setAssetSupply(Number(e.target.value))}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                placeholder="Decimals"
                value={assetDecimals}
                onChange={(e) => setAssetDecimals(Number(e.target.value))}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Manager Address (optional)"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button className="btn btn-ghost" onClick={() => setShowCreateModal(false)} disabled={loading}>
                Cancel
              </button>
              <button className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`} onClick={createASA}>
                {loading ? <span className="loading loading-spinner" /> : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicalAssets
