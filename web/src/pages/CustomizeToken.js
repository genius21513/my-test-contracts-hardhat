import React, { useState } from "react";
import TokenArtifact from "../contracts/MyToken.json";
// import contractAddress from "./contracts/contract-address.json";
import { ethers } from "ethers";

function CustomizeToken() {
    const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
    const [accountAddress, setAccountAddress] = React.useState('');
    const [balance, setBalance] = React.useState(null);
    const [tokenData, setTokenData] = React.useState(null);
    const [token, setToken] = useState(null);
    const [provider, setProvider] = useState(null);
    const [myEths, setMyEths] = useState(null);

    const _init = async (userAddress) => {
        setAccountAddress(userAddress);

        const p = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(p);

        const t = new ethers.Contract(
            contractAddress,
            TokenArtifact.abi,
            p.getSigner(0)
        );
        setToken(t);

        const name = await t.name();
        const symbol = await t.symbol();
        setTokenData({ name, symbol });

        const balance = await t.balanceOf(userAddress);
        setBalance(balance);

        const eths = await p.getBalance(userAddress);
        // setMyEths(eths);
        setMyEths(ethers.utils.formatEther(eths));
    }

    const _connectWallet = async () => {
        const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        _init(selectedAddress);

        window.ethereum.on('accountsChanged', ([newAddress]) => {
            _init(newAddress);
        })
    }

    const _updateBalance = async () => {
        const balance = await token.balanceOf(accountAddress);
        setBalance(balance);

        const eths = await provider.getBalance(accountAddress);
        setMyEths(() => ethers.utils.formatEther(eths));
    }

    const _transfer = async (to) => {
        // const to = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
        const amount = 1000;
        const tx = await token.transfer(to, amount);
        const receipt = await tx.wait();

        if (receipt.status === 0) {
            console.log('Transaction error');
        }

        const signer = provider.getSigner();
        const ttx = await signer.sendTransaction({
            to,
            value: ethers.utils.parseEther("100")
        });

        console.log(ttx);

        console.log(`TTX hash: ${ttx.hash}`);
        await provider.waitForTransaction(ttx.hash, 1, 150000).then(() => { });

        console.log('finished and updated');
        _updateBalance();
    }

    return (
        <div className="App">
            <div>
                <h2>CustomizeToken</h2>

                <button className="btn btn-primary" onClick={_connectWallet}>Connect to MetaMask</button>

                <div className="card mt-2">
                    <ul className="list-group">
                        <li className="list-group-item">Contract address :</li>
                        <li className="list-group-item">Your Token name : {tokenData?.name}, symbol: {tokenData?.symbol}</li>
                        <li className="list-group-item">Your account address : {accountAddress} </li>
                        <li className="list-group-item">Your token amount : {balance?.toString()} {tokenData?.symbol}</li>
                        <li className="list-group-item">Your eths amount : {myEths?.toString()} ETH</li>
                    </ul>
                </div>

                <div className="card mt-2">
                    <div className="m-2 alert alert-success" role="alert">
                        <b>Send 1000 MT + 1000 ETH!</b>
                    </div>
                    
                    <div className="d-flex p-2 align-items-center">
                        <button className="mr-3 btn btn-primary btn-sm" onClick={() => _transfer('0xCe88caf3978B3e679Db5753a724112a15da07019')}>Transfer #1</button>
                        <span className="badge badge-success">0xCe88caf3978B3e679Db5753a724112a15da07019</span>
                    </div>

                    <div className="d-flex p-2 align-items-center">
                        <button className="mr-3 btn btn-primary btn-sm" onClick={() => _transfer('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')}>Transfer #2</button>
                        <span className="badge badge-success">0x70997970C51812dc3A010C7d01b50e0d17dc79C8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomizeToken;
