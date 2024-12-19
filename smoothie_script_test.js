window.onload = () => {
    const connectWalletButton = document.getElementById('connectWallet');
    const walletOptions = document.getElementById('walletOptions');
    const walletDropdown = document.getElementById('walletDropdown');
    const walletAddressButton = document.getElementById('walletAddress');
    const smoothieBalance = document.getElementById('smoothiesBalance'); // Element showing smoothie balance
    const smeewthBalance = document.getElementById('smeewthBalance'); // Element showing smeewth balance

    let userWalletAddress = ''; // Variable to store the wallet address

    // Handle wallet connection
    connectWalletButton.addEventListener("click", () => {
        walletOptions.style.display = walletOptions.style.display === "block" ? "none" : "block"; // Toggle the dropdown for wallets
    });

    // Close the wallet options dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!walletOptions.contains(event.target) && !connectWalletButton.contains(event.target)) {
            walletOptions.style.display = "none";
        }
    });

    // Handle wallet selection
    function connectWallet(walletType) {
        if (walletType === 'Phantom') {
            connectPhantomWallet();
        } else if (walletType === 'Solflare') {
            connectSolflareWallet();
        } else if (walletType === 'Sollet') {
            connectSolletWallet();
        }
        walletOptions.style.display = 'none'; // Hide wallet options after selection
    }

    // Phantom Wallet connection
    async function connectPhantomWallet() {
        if (window.solana && window.solana.isPhantom) {
            try {
                const response = await window.solana.connect();
                userWalletAddress = response.publicKey.toString();
                displayWalletAddress(userWalletAddress); // Update the UI with the wallet address
            } catch (err) {
                console.error("Phantom Wallet connection failed", err);
            }
        } else {
            alert('Phantom wallet is not installed.');
        }
    }

    // Solflare Wallet connection
    async function connectSolflareWallet() {
        // Code for connecting Solflare goes here (similar to Phantom)
    }

    // Sollet Wallet connection
    async function connectSolletWallet() {
        // Code for connecting Sollet goes here (similar to Phantom)
    }

    // Display the abbreviated wallet address and show dropdown on click
    function displayWalletAddress(address) {
        const abbreviatedAddress = address.slice(0, 3) + "..." + address.slice(-4);
        walletAddressButton.innerText = abbreviatedAddress;
        walletDropdown.style.display = "block"; // Show the wallet info dropdown when the wallet is connected
    }

    // Show the wallet info dropdown when the user clicks on the address
    walletAddressButton.addEventListener("click", () => {
        walletDropdown.style.display = walletDropdown.style.display === "block" ? "none" : "block";
    });

    // Example for tracking balances (smoothie & smeewth balances)
    function updateWalletInfo() {
        // Fetch balance data here (you would interact with your Solana contract to fetch real balance data)
        smoothieBalance.innerText = "10 Smoothies"; // Example balance
        smeewthBalance.innerText = "5 SMEWTH Tokens"; // Example balance
    }

    // Call updateWalletInfo after wallet is connected to show balances
    updateWalletInfo();
};
