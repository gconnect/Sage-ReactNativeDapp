import { Text, View } from "./Themed";
import { useWeb3Modal } from "@web3modal/react-native";
import { useEffect, useState } from "react";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const AccountBalance = () => {
    const { address } = useWeb3Modal();
    const [balances, setBalances] = useState<any>(null);

    return (
        <View>
            {balances
                ? Object.keys(balances).map((key) => (
                      <Text>{`${key}: ${balances[key]}`}</Text>
                  ))
                : null}
        </View>
    );
};

export default AccountBalance;
