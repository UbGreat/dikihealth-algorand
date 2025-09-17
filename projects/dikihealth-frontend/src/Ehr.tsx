import { useWallet } from '@txnlab/use-wallet-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ConnectWallet from './components/ConnectWallet'

interface PatientRecord {
  id: number
  name: string
  age: number
  diagnosis: string
}

const EHR: React.FC = () => {
  const { activeAddress } = useWallet()

  const [records, setRecords] = useState<PatientRecord[]>([
    { id: 1, name: 'John Doe', age: 45, diagnosis: 'Hypertension' },
    { id: 2, name: 'Jane Smith', age: 32, diagnosis: 'Asthma' },
  ])

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newRecord, setNewRecord] = useState({ name: '', age: '', diagnosis: '' })

  // Wallet modal control
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [openEhrAfterConnect, setOpenEhrAfterConnect] = useState(false)

  const handleAddRecord = () => {
    if (!activeAddress) {
      // wallet not connected → prompt first
      setOpenEhrAfterConnect(true)
      setShowWalletModal(true)
      return
    }
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (activeAddress && openEhrAfterConnect) {
      setShowWalletModal(false)
      setIsModalOpen(true)
      setOpenEhrAfterConnect(false)
    }
  }, [activeAddress, openEhrAfterConnect])

  const saveRecord = () => {
    if (!newRecord.name || !newRecord.age || !newRecord.diagnosis) {
      alert('Please fill out all fields.')
      return
    }

    const newId = records.length ? records[records.length - 1].id + 1 : 1
    const updatedRecords = [
      ...records,
      {
        id: newId,
        name: newRecord.name,
        age: parseInt(newRecord.age),
        diagnosis: newRecord.diagnosis,
      },
    ]

    setRecords(updatedRecords)
    setNewRecord({ name: '', age: '', diagnosis: '' })
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Electronic Health Records</h1>
        <p className="text-gray-600 mb-6">
          Secure, blockchain-backed patient record management. Store and retrieve patient data with full transparency and immutability.
        </p>

        {/* Record List */}
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.id}</td>
                  <td>{rec.name}</td>
                  <td>{rec.age}</td>
                  <td>{rec.diagnosis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="btn btn-primary" onClick={handleAddRecord}>
            ➕ Add Record
          </button>

          <Link to="/" className="btn btn-outline">
            ⬅ Back to Home
          </Link>
        </div>
      </div>

      {/* Add Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-teal-600">Add New Patient Record</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newRecord.name}
                onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                placeholder="Age"
                value={newRecord.age}
                onChange={(e) => setNewRecord({ ...newRecord, age: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Diagnosis"
                value={newRecord.diagnosis}
                onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setIsModalOpen(false)
                  setNewRecord({ name: '', age: '', diagnosis: '' })
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveRecord}>
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Connect Modal */}
      <ConnectWallet openModal={showWalletModal} closeModal={() => setShowWalletModal(false)} />
    </div>
  )
}

export default EHR
