import React from "react";
// // Only for Expo SDK 48+
import './expo-crypto-shim.js'
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { LogBox } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Web3Modal } from "@web3modal/react-native";
import { providerMetadata, sessionParams } from "./constants/Config.js";
// import { REACT_APP_ENV_PROJECT_ID } from "@env";
import { ThemeProvider } from "./context/ThemeProvider";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    
    // avoid warnings showing up in app. comment below code if you want to see warnings.
    useEffect(() => {
        LogBox.ignoreAllLogs();
    }, []);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <ThemeProvider>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                    <Web3Modal
                    projectId={process.env.REACT_APP_ENV_PROJECT_ID!!}
                    providerMetadata={providerMetadata}
                    sessionParams={sessionParams}
                    />
                </SafeAreaProvider>
            </ThemeProvider>
        );
    }
}
