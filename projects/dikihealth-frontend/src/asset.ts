import PeraWalletConnect from '@perawallet/connect'
import algosdk from 'algosdk'
import { getAlgodClient } from './clients' // Your Algod client setup

const peraWallet = new PeraWalletConnect()

/**
 * Create ASA (unsigned transaction -> signed by Pera Wallet)
 */
export async function createAssetWithPera(creatorAddress: string, name: string, unitName: string, total: number, decimals = 0) {
  const algod = getAlgodClient()
  const params = await algod.getTransactionParams().do()

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: creatorAddress,
    total,
    decimals,
    assetName: name,
    unitName,
    defaultFrozen: false,
    manager: creatorAddress,
    reserve: creatorAddress,
    freeze: creatorAddress,
    clawback: creatorAddress,
    suggestedParams: params,
  })

  return signAndSend([txn], [creatorAddress])
}

/**
 * Opt-in to ASA using Pera Wallet
 */
export async function optInAssetWithPera(userAddress: string, assetId: number) {
  const algod = getAlgodClient()
  const params = await algod.getTransactionParams().do()

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: userAddress,
    to: userAddress,
    amount: 0,
    assetIndex: assetId,
    suggestedParams: params,
  })

  return signAndSend([txn], [userAddress])
}

/**
 * Transfer ASA using Pera Wallet
 */
export async function transferAssetWithPera(senderAddress: string, receiverAddress: string, assetId: number, amount: number) {
  const algod = getAlgodClient()
  const params = await algod.getTransactionParams().do()

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: senderAddress,
    to: receiverAddress,
    amount,
    assetIndex: assetId,
    suggestedParams: params,
  })

  return signAndSend([txn], [senderAddress])
}

/**
 * Generic function: Ask Pera Wallet to sign & submit transactions
 */
async function signAndSend(txns: algosdk.Transaction[], signers: string[]) {
  const txnsToSign = txns.map((txn) => ({
    txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
    signers,
  }))

  // Request signature from Pera Wallet
  const signedTxns = await peraWallet.signTransaction([txnsToSign])
  const decodedSignedTxns = signedTxns.map((stx: string) => new Uint8Array(Buffer.from(stx, 'base64')))

  const algod = getAlgodClient()
  const { txId } = await algod.sendRawTransaction(decodedSignedTxns).do()

  console.log(`Transaction sent: ${txId}`)
  await waitForConfirmation(algod, txId)

  return txId
}

/**
 * Helper function: Wait for confirmation
 */
async function waitForConfirmation(algod: algosdk.Algodv2, txId: string) {
  let lastRound = (await algod.status().do())['last-round']
  while (true) {
    const pending = await algod.pendingTransactionInformation(txId).do()
    if (pending['confirmed-round'] && pending['confirmed-round'] > 0) {
      console.log(`Transaction confirmed in round ${pending['confirmed-round']}`)
      break
    }
    lastRound++
    await algod.statusAfterBlock(lastRound).do()
  }
}
