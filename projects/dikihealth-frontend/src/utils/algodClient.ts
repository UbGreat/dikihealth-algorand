import algosdk from 'algosdk'

const algodClient = new algosdk.Algodv2(
  import.meta.env.VITE_ALGOD_TOKEN || '',
  import.meta.env.VITE_ALGOD_SERVER || 'https://testnet-api.algonode.cloud',
  import.meta.env.VITE_ALGOD_PORT || '',
)

export default algodClient
