import { SupportedWallet, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { SnackbarProvider } from 'notistack'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import EHR from './Ehr'
import EmergencyResponse from './EmergencyResponse'
import Home from './Home'
import MedicalAssets from './MedicalAssets'
import RemoteMonitoring from './RemoteMonitoring '
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'

let supportedWallets: SupportedWallet[]
if (import.meta.env.VITE_ALGOD_NETWORK === 'localnet') {
  const kmdConfig = getKmdConfigFromViteEnvironment()
  supportedWallets = [
    {
      id: WalletId.KMD,
      options: {
        baseServer: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ]
} else {
  supportedWallets = [
    { id: WalletId.DEFLY },
    { id: WalletId.PERA },
    { id: WalletId.EXODUS },
    // If you are interested in WalletConnect v2 provider
    // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
  ]
}

// const EHR = () => <div className="p-6">EHR Page</div>
// const RemoteMonitoring = () => <div className="p-6">Remote Monitoring Page</div>
// const MedicalAssets = () => <div className="p-6">Medical Assets (ASA) Page</div>
// const EmergencyResponse = () => <div className="p-6">Emergency Response Page</div>

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()

  const walletManager = new WalletManager({
    wallets: supportedWallets,
    defaultNetwork: algodConfig.network,
    networks: {
      [algodConfig.network]: {
        algod: {
          baseServer: algodConfig.server,
          port: algodConfig.port,
          token: String(algodConfig.token),
        },
      },
    },
    options: {
      resetNetwork: true,
    },
  })

  return (
    <>
      <Navbar />
      <SnackbarProvider maxSnack={3}>
        <WalletProvider manager={walletManager}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ehr" element={<EHR />} />
            <Route path="/remote-monitoring" element={<RemoteMonitoring />} />
            <Route path="/medical-assets" element={<MedicalAssets />} />
            <Route path="/emergency-response" element={<EmergencyResponse />} />
          </Routes>
        </WalletProvider>
      </SnackbarProvider>
    </>
  )
}
