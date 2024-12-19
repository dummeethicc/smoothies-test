window.onload = () => {
    const wtfButton = document.getElementById('wtfButton');
    const trackerButton = document.getElementById('trackerButton');
    const explanationPopup = document.getElementById('explanationPopup');
    const trackerPopup = document.getElementById('trackerPopup');
    const closeExplanationPopup = document.getElementById('closeExplanationPopup');
    const closeTrackerPopup = document.getElementById('closeTrackerPopup');
    const outcomeModal = document.getElementById("outcomeModal");
    const closeOutcomeModal = document.getElementById("closeOutcomeModal");

    const mintButton = document.getElementById("mintButton");
    const connectWalletButton = document.getElementById("connectWallet");
    const walletOptions = document.getElementById("walletOptions");
    const cooperationModal = document.getElementById("cooperationModal");
    const cooperateButton = document.getElementById("cooperateButton");
    const stealButton = document.getElementById("stealButton");
    const title = document.getElementById("title");
    const outcomeMessage = document.getElementById("outcomeMessage");

    let walletAddress = ''; // To store the connected wallet address

    // Function to update the tracker UI
    function updateTracker() {
        // Update tracker logic here
    }

    // Wallet selection toggle
    if (connectWalletButton) {
        connectWalletButton.addEventListener("click", (event) => {
            event.stopPropagation();
            walletOptions.style.display = walletOptions.style.display === "block" ? "none" : "block";
        });
    }

    // Close wallet options if clicked outside
    document.addEventListener("click", (event) => {
        if (walletOptions && !walletOptions.contains(event.target) && !connectWalletButton.contains(event.target)) {
            walletOptions.style.display = "none";
        }
    });

    // Connect wallet function
    async function connectWallet(walletType) {
        try {
            let provider;
            if (walletType === "Phantom") {
                if (window.solana && window.solana.isPhantom) {
                    provider = window.solana;
                } else {
                    alert("Phantom wallet not detected.");
                    return;
                }
            } else {
                alert("Wallet not supported.");
                return;
            }

            const connected = await provider.connect();
            walletAddress = connected.publicKey.toString();
            console.log("Connected to wallet:", walletAddress);

            // Update the button to show the wallet address abbreviation
            const abbreviatedAddress = `${walletAddress.slice(0, 3)}...${walletAddress.slice(-4)}`;
            connectWalletButton.textContent = abbreviatedAddress;

            // Hide wallet options dropdown
            walletOptions.style.display = "none";
        } catch (err) {
            console.error("Error connecting wallet:", err);
        }
    }

    // Event listener for wallet buttons
    const walletOptionsList = document.querySelectorAll('.wallet-option');
    walletOptionsList.forEach((option) => {
        option.addEventListener('click', (event) => {
            const walletType = event.target.innerText;
            connectWallet(walletType);
        });
    });

    // Other code for handling popups, minting, etc.

};
