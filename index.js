const connectBtn = document.getElementById('connectWalletButton')
const warnContainer = document.getElementById('warn-container')

connectBtn.addEventListener('click', () => {
    connectWallet();
})

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log(`Account connected: ${account}`);
            connectBtn.innerHTML = "Connected";
        } catch (error) {
            console.error("User rejected request:", error);
        }
    } else {
        console.log('MetaMask not detected');
    }
    if (window.ethereum) {
        const networkId = await window.ethereum.request({
            method: "net_version",
        })
        if (networkId == 421613) {
            console.log('Connected to Arbitrum Goerli');
        } else {
            console.log('not connected');
        }
    }
}