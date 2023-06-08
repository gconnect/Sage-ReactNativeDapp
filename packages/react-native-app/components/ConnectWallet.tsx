import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Button from "./Button";
import { Text } from "./Themed";
import { Web3Modal, Web3Button, useWeb3Modal } from '@web3modal/react-native';
import { View, Pressable } from "react-native";


const ConnectWallet = () => {
    const connector = useWalletConnect();
    const { open, isConnected } = useWeb3Modal();

    const projectId = 'f2d65ee57b31b15e06607ec98b2d4e4c';

    const providerMetadata = {
    name: 'Celo React Native Dapp',
    description: 'YOUR_PROJECT_DESCRIPTION',
    url: 'https://your-project-website.com/',
    icons: ['https://your-project-logo.com/'],
    };
    
    return (
        // <Button onPress={() => connector.connect()}>
        //     <Text style={{ fontSize: 16, color: "white" }}>Connect Wallet</Text>      
        // </Button>
        <>
        <Pressable onPress={() => open()}>
            <Text>{isConnected ? 'View Account' : 'Connect'}</Text>
            </Pressable>
        <Web3Modal projectId={projectId} providerMetadata={providerMetadata} />
        </>
       

    );
};

export default ConnectWallet;
