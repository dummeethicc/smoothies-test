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

    // Simulate wallet connection (use Phantom, Solflare, Sollet logic here)
    const connectWallet = (walletType) => {
        // In actual implementation, you'd use a Solana wallet provider to connect the wallet
        // Here, we're simulating it with a mock address for simplicity
        const walletAddress = "1h4...edXy"; // Simulated wallet address

        connectedWalletAddress = walletAddress;

        // Update the button to show the abbreviated wallet address
        connectWalletButton.textContent = `${walletAddress.slice(0, 3)}...${walletAddress.slice(-4)}`;
        walletOptions.style.display = 'none'; // Close the wallet options dropdown
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
