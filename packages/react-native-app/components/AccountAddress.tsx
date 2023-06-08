import { useWeb3Modal } from "@web3modal/react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { Text } from "./Themed";

const AccountAddress = () => {
    const { address } = useWeb3Modal();
    const { styles } = useContext(ThemeContext);

    return <Text style={styles.externalLink}>{address}</Text>;
};

export default AccountAddress;
