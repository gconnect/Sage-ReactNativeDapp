import { useState, useEffect, useContext } from "react";
import { Text, View,   } from "../components/Themed";
import { TextInput, Button, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Web3 from "web3";
import { ThemeContext } from "../context/ThemeProvider";
import { useWeb3Modal } from "@web3modal/react-native";
import { ethers } from 'ethers';
import { useMemo } from 'react';
import greeterABI from "../greeter.json"
import tw from "twrnc"
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

export default function Greeter() {
	const { styles } = useContext(ThemeContext);
	const { provider, address } = useWeb3Modal()

	const web3Provider = useMemo(
	() => (provider ? new ethers.providers.Web3Provider(provider) : undefined),
	[provider]
	);
	
    const contractAddress = "0x421d8e7f1717A6B3B104865Da28bC3620fa3A829";
	
	// const { contractData } = props;
	const [greeterValue, setGreeterValue] = useState("");
	const [greetingInput, setGreetingInput] = useState("");
	const [contractLink, setContractLink] = useState("");
	const [settingGreeting, setSettingGreeting] = useState(false);
    const [loadGreeting, setLoadGreeting] = useState(false);
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | undefined>(undefined);

    const contract = new web3.eth.Contract(greeterABI.abi, contractAddress)

	useEffect(() => {
	setContractLink(
        `https://alfajores-blockscout.celo-testnet.org/address/${contractAddress}`
    );
    }, []);
    

    const sendGreeting = async () => {
        setSettingGreeting(true);
        const sign = web3Provider?.getSigner();
        setSigner(sign);
        try {
            const txResponse =  signer && await signer.sendTransaction({
            to: contractAddress, // Replace with the contract address
            data: contract.methods.setGreeting(greetingInput).encodeABI(),
            });
            console.log('Transaction sent:', txResponse);
            setGreetingInput("")
            getGreeting()
        } catch (e) {
            console.error('Failed to send transaction:', e);
        } finally {
            setSettingGreeting(false);
        }
    };

  const getGreeting = async () => {
		setLoadGreeting(true);
		try {
            const result = (await contract?.methods.greet().call()) as string;
            setGreeterValue(result);
            setLoadGreeting(false);
		} catch (e) {
			console.log(e);
		} finally {
			setLoadGreeting(false);
		}
  };
    

	function handlePress() {
		WebBrowser.openBrowserAsync(contractLink);
	}

    useEffect(() => {     
        getGreeting()
    },[greeterValue])

    
	return (
        <View style={ styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Greeter Contract</Text>
                
                <TouchableOpacity
                    style={styles.externalLink}
                    onPress={() => handlePress()}
                >
                    <Text style={styles.externalLink}>
                        {`${contractAddress.substr(
                            0,
                            5
                        )}...${contractAddress.substr(-5)}`}
                    </Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.separator}></View>
            <View style={styles.innerContainer}>
                <Text>Write Contract</Text>
                <TextInput
                    value={greetingInput}
                    onChangeText={(newValue) => setGreetingInput(newValue)}
                    style={styles.textInput}
                />
                <View style={tw `border rounded` }>
                    <Button title="Send Greeting" onPress={() =>  sendGreeting()}/>
                </View>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.innerContainer}>
                {loadGreeting ? <Text style={ tw `text-lg`}>Fetching Greeting...</Text> :
                 greeterValue ? 
                    <View>
                        <Text style={tw `text-lg font-bold`}>Read Contract</Text> 
                        <Text style={{ marginVertical: 10 }}>
                        Greeter Contract Value: {greeterValue}
                        </Text>         
                    </View>
                
                : null}
            </View>
        </View>
    );
}

