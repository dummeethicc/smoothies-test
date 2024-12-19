window.onload = () => {
    const connectWalletButton = document.getElementById('connectWallet');
    const walletOptions = document.getElementById('walletOptions');
    const trackerButton = document.getElementById('trackerButton');
    const trackerPopup = document.getElementById('trackerPopup');
    const smoothiesMinted = document.getElementById('smoothiesMinted');
    const smeewthMinted = document.getElementById('smeewthMinted');
    const walletDropdown = document.getElementById('walletOptions');
    let walletAddress = null; // Store wallet address

    // Initialize the button as "Connect Wallet"
    connectWalletButton.textContent = "Connect Wallet";

    // Toggle wallet options
    connectWalletButton.addEventListener('click', () => {
        walletOptions.style.display = walletOptions.style.display === "block" ? "none" : "block";
    });

    // Function to handle wallet connection
    function connectWallet(walletType) {
        if (walletType === 'Phantom') {
            window.solana.connect().then((result) => {
                walletAddress = result.publicKey.toString();
                const abbreviatedAddress = walletAddress.substring(0, 4) + '...' + walletAddress.slice(-4);
                connectWalletButton.textContent = abbreviatedAddress;
                walletOptions.style.display = "none"; // Close wallet options after connection
                console.log('Connected to Phantom:', walletAddress);
                // Set up tracker popup data here
                updateTracker();
            });
        }
        // You can add other wallet options like Solflare, Sollet here...
    }

    // Update tracker data
    function updateTracker() {
        // Update smoothies and SMEWTH data
        smoothiesMinted.textContent = 1500; // Placeholder, change with real data from blockchain
        smeewthMinted.textContent = 300;  // Placeholder, change with real data from blockchain
    }

    // Show tracker popup
    trackerButton.addEventListener('click', () => {
        trackerPopup.style.display = trackerPopup.style.display === "block" ? "none" : "block";
    });

    // Close tracker popup
    document.getElementById('closeTrackerPopup').addEventListener('click', () => {
        trackerPopup.style.display = "none";
    });

    // Mint button functionality
    document.getElementById('mintButton').addEventListener('click', () => {
        if (walletAddress) {
            // Start minting process after wallet is connected
            console.log('Starting mint process...');
            // Add your minting logic here, call Solana functions, etc.
        } else {
            alert("Please connect your wallet first.");
        }
    });
};
