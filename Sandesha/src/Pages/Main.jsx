import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { createContext } from "react";
import Web3 from 'web3'
import { useState, useEffect } from 'react';
import app from '../contracts/App.json'

export const MainContext = createContext()


function Main() {

    const [provider, setProvider] = useState(window.ethereum);
    const [web3, setWeb3] = useState(null);
    const [userAccount, setUserAccount] = useState(null);
    const [contract, setContract] = useState(null);


    if (provider) {
        useEffect(() => {
            function loadWeb3() {
                setWeb3(new Web3(provider));
                ethereum.request({ method: 'eth_requestAccounts' });
            }

            provider && loadWeb3();
        }, [provider]);
    }

    useEffect(() => {
        async function loadUserAccount() {
            const accounts = await web3.eth.getAccounts();
            setUserAccount(accounts[0]);
        }

        web3 && loadUserAccount();
    }, [provider, web3, userAccount])

    useEffect(() => {
        async function loadAppContract() {
            const cont = new web3.eth.Contract(app.abi, '0x9468C001ceBCCa8560B554aCd9B211e01F522B7F');
            setContract(cont);
        }
        web3 && loadAppContract();
    }, [web3])


    window.ethereum && ethereum.on("accountsChanged", () => {
        setUserAccount();
        window.location.reload()
    });

    window.ethereum && ethereum.on('chainChanged', (_chainId) => window.location.reload());


    return (
        <>
            <MainContext.Provider value={{ provider, setProvider, web3, setWeb3, contract, userAccount }}>
                <Navbar />
                <Outlet />
                <Footer />
            </MainContext.Provider>
        </>
    )
}

export default Main;