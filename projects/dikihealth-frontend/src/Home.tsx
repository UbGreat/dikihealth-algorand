// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => setOpenWalletModal(!openWalletModal)
  const toggleDemoModal = () => setOpenDemoModal(!openDemoModal)

  return (
    <div className="hero min-h-screen bg-teal-400">
      <div className="hero-content text-center rounded-lg p-6 max-w-2xl bg-white mx-auto shadow-xl">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-teal-600">DikiHealth</span> 🚑
          </h1>
          <p className="text-gray-700">
            Your decentralized platform for Healthcare Records, Remote Patient Monitoring, Medical Asset Management, and Emergency Response
            powered by Algorand.
          </p>

          {/* Wallet and Transactions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button data-test-id="connect-wallet" className="btn btn-primary" onClick={toggleWalletModal}>
              Connect Wallet
            </button>

            {activeAddress && (
              <button data-test-id="transactions-demo" className="btn btn-secondary" onClick={toggleDemoModal}>
                Transactions Demo
              </button>
            )}
          </div>

          <div className="divider" />

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/ehr" className="btn btn-outline">
              Electronic Health Records (EHR)
            </Link>
            <Link to="/remote-monitoring" className="btn btn-outline">
              Remote Monitoring
            </Link>
            <Link to="/medical-assets" className="btn btn-outline">
              Medical Assets (ASA)
            </Link>
            <Link to="/emergency-response" className="btn btn-outline">
              Emergency Response
            </Link>
          </div>

          {/* Modals */}
          <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
          <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
        </div>
      </div>
    </div>
  )
}

export default Home
