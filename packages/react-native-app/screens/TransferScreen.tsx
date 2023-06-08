import React, { useState, useMemo, useEffect } from 'react'
import { TextInput, Text, Button, View } from 'react-native'
import { useWeb3Modal } from '@web3modal/react-native';
import { ethers, BigNumber } from 'ethers';
import tw from "twrnc"

export default function TransferScreen() {    
  const { address, provider } = useWeb3Modal()
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | undefined>(undefined)
  const [receiver, setReceiver] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [balance, setBalance] = useState<string >("0")
  const [loading, setLoading] = useState<boolean>(false)

  	const web3Provider = useMemo(
    () => (provider ? new ethers.providers.Web3Provider(provider) : undefined),
    [provider]
	);

  // "0x65645067615cafcc37ab63adee2bc1231fb257f3"
  const sendTransaction = async () => {
        const sign = web3Provider?.getSigner()
        setSigner(sign)
        try {
            const txResponse = signer && await signer.sendTransaction({
                from: address,
                to: receiver,
                value: ethers.utils.parseEther(amount)
            });
            console.log('Transaction sent:', txResponse);
        } catch (error) {
            console.error('Failed to send transaction:', error);
        }
     };

  const accountBalance = async () => {
    setLoading(true)
    const response = await web3Provider?.getBalance(address as string)
    const convertHexValue = parseInt(response, 16)
    setBalance(ethers.utils.formatEther(convertHexValue))
    console.log(balance);
    setLoading(false)
  }

  useEffect(() => {
    accountBalance()
  }, [])

  return (
    <View style={tw`flex-1 align-item-center justify-center mx-8`}>
      <Text style={tw`text-center text-lg my-4`}>Transfer Fund</Text>
      {loading ? <Text>Fetching balance...</Text> : <Text>{ `Account Balance ${balance}`}</Text>  }
     
      <TextInput style={tw`border p-2 rounded`} placeholder='enter receiver addresss' value={receiver}  onChangeText={(newValue) => setReceiver(newValue)}/>
      <TextInput style={tw`border p-2 rounded my-2`} placeholder='enter amount' value={amount} onChangeText={(newValue) => setAmount(newValue)} />
      <View style={tw`border-0 rounded`}>
        <Button  title='Transfer Fund' onPress={sendTransaction}/>
      </View>
    </View>
  )
}
