window.onload = () => {
    const connectWalletButton = document.getElementById('connectWallet');
    const walletOptions = document.getElementById('walletOptions');
    const blenderVideo = document.getElementById('blenderVideo');
    const mintButton = document.getElementById('mintButton');
    let connectedWalletAddress = null;

    // Toggle wallet options dropdown
    connectWalletButton.addEventListener('click', () => {
        walletOptions.style.display = walletOptions.style.display === 'block' ? 'none' : 'block';
    });

    // Connect the wallet and get the address
    const connectWallet = async (walletType) => {
        if (window.solana && window.solana.isPhantom) {
            try {
                // Request access to the user's Phantom wallet
                const response = await window.solana.connect();
                connectedWalletAddress = response.publicKey.toString();

                // Display abbreviated address in the button
                connectWalletButton.textContent = `${connectedWalletAddress.slice(0, 3)}...${connectedWalletAddress.slice(-4)}`;

                walletOptions.style.display = 'none'; // Close the wallet options dropdown
            } catch (error) {
                console.error('Failed to connect to Phantom wallet:', error);
                alert('Failed to connect to Phantom wallet');
            }
        } else {
            alert('Phantom wallet not detected. Please install Phantom wallet extension.');
        }
    };

    // Handle minting action
    mintButton.addEventListener('click', () => {
        if (!connectedWalletAddress) {
            alert('Please connect your wallet first.');
            return;
        }

        blenderVideo.style.display = "block"; // Show the video
        blenderVideo.play(); // Start the video
        // Add the minting process here (interact with the Solana smart contract)

        setTimeout(() => {
            blenderVideo.style.display = "none"; // Hide the video after minting process
            alert('Minting completed!');
        }, 3000); // Simulate delay for video playing
    });
};
