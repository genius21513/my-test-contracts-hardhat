import React, { useState } from "react";
import TokenArtifact from "./contracts/MyToken.json";
// import contractAddress from "./contracts/contract-address.json";
import { ethers } from "ethers";

function App() {
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

        if(receipt.status === 0) {
            console.log('Transaction error');
        }

        const signer = provider.getSigner();
        const ttx = await signer.sendTransaction({
            to,
            value: ethers.utils.parseEther("100")
        });

        console.log(ttx);
        
        console.log(`TTX hash: ${ttx.hash}`);
        await provider.waitForTransaction(ttx.hash, 1, 150000).then(() => {});        

        console.log('finished and updated');
        _updateBalance();
    }

    return (
        <div className="App">
            <div>
                <button onClick={_connectWallet}>Connect</button>

                <h2>contract address : </h2>
                <h2>Your Token name : {tokenData?.name}, symbol: {tokenData?.symbol}</h2>
                <h2>Your account address : {accountAddress} </h2>
                <h2>Your token amount : {balance?.toString()} {tokenData?.symbol}</h2>

                <h2>Your eths amount : {myEths?.toString()} ETH</h2>

                <br />
                <h2>Amount per 1000 MT</h2>
                {/* <input></input> */}
                <br />
                <h2>To : 0xCe88caf3978B3e679Db5753a724112a15da07019</h2>
                <button onClick={() => _transfer('0xCe88caf3978B3e679Db5753a724112a15da07019')}>Transfer #1</button>

                <h2>To : 0x70997970C51812dc3A010C7d01b50e0d17dc79C8</h2>
                {/* <input></input> */}
                <button onClick={() => _transfer('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')}>Transfer #2</button>
            </div>
        </div>
    );
}

export default App;
