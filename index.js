const connectBtn = document.getElementById('connectWalletButton')

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
}