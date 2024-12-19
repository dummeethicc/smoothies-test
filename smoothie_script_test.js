window.onload = () => {
    // Select HTML elements for the buttons, pop-ups, and close buttons
    const wtfButton = document.getElementById('wtfButton');
    const trackerButton = document.getElementById('trackerButton');
    const explanationPopup = document.getElementById('explanationPopup');
    const trackerPopup = document.getElementById('trackerPopup');
    const closeExplanationPopup = document.getElementById('closeExplanationPopup');
    const closeTrackerPopup = document.getElementById('closeTrackerPopup');
    const outcomeModal = document.getElementById("outcomeModal");
    const closeOutcomeModal = document.getElementById("closeOutcomeModal");

    const mintButton = document.getElementById("mintButton");
    const blenderVideo = document.getElementById("blenderVideo");
    const connectWalletButton = document.getElementById("connectWallet");
    const walletOptions = document.getElementById("walletOptions");
    const cooperationModal = document.getElementById("cooperationModal");
    const cooperateButton = document.getElementById("cooperateButton");
    const stealButton = document.getElementById("stealButton");
    const title = document.getElementById("title");
    const outcomeMessage = document.getElementById("outcomeMessage");

    const smoothiesAvailable = document.getElementById('smoothiesAvailable');
    const smoothiesMinted = document.getElementById('smoothiesMinted');
    const smeewthMinted = document.getElementById('smeewthMinted');

    let userWallet = null; // Track the connected wallet

    // Initialize counts
    let smoothiesAvailableCount = 10000;
    let smoothiesMintedCount = 0;
    let smeewthMintedCount = 0;

    // Function to update the tracker UI
    function updateTracker() {
        smoothiesAvailable.textContent = smoothiesAvailableCount;
        smoothiesMinted.textContent = smoothiesMintedCount;
        smeewthMinted.textContent = smeewthMintedCount;
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

    // Refresh the page when the title is clicked
    if (title) {
        title.addEventListener("click", () => {
            window.location.reload();
        });
    }

    // Function to connect the wallet
    const connectWallet = async (walletType) => {
        try {
            if (walletType === 'Phantom') {
                // Check if Phantom is available
                if (window.solana && window.solana.isPhantom) {
                    // Connect to Phantom wallet
                    const resp = await window.solana.connect();  // Request connection to Phantom
                    userWallet = resp;
                    console.log("Connected to Phantom:", userWallet.publicKey.toString());

                    // Optionally: You can send the user's public key to your server or use it for further operations
                    // Update the UI based on the connection
                    walletOptions.style.display = "none";  // Hide the wallet options dropdown
                    alert("Wallet connected: " + userWallet.publicKey.toString());
                } else {
                    alert("Phantom Wallet not detected. Please install Phantom.");
                }
            } else {
                alert(`${walletType} wallet connection coming soon!`);
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            alert("Error connecting to wallet: " + error.message);
        }
    };

    // Event listener for wallet options
    const walletOptionsElements = document.querySelectorAll('.wallet-option');
    walletOptionsElements.forEach((element) => {
        element.addEventListener('click', (event) => {
            const walletType = event.target.innerText;
            connectWallet(walletType); // Pass the wallet type (Phantom)
        });
    });

    // Show the cooperation modal when the mint button is clicked
    if (mintButton) {
        mintButton.addEventListener("click", () => {
            if (cooperationModal) {
                cooperationModal.style.display = 'block';
            } else {
                console.error("Cooperation modal not found");
            }
        });
    }

    // Handle cooperation decision
    function handleCooperation(decision) {
        cooperationModal.style.display = 'none';  // Close modal
        mintSmoothie(decision);
    }

    // Handle the minting process based on cooperation decisions
    async function mintSmoothie(cooperate) {
        blenderVideo.style.display = "block";
        blenderVideo.play();

        // Hide the mint button while the video plays
        if (mintButton) {
            mintButton.style.display = "none";
        }

        // Randomly decide contract's action (cooperate or steal)
        const contractDecision = Math.random() > 0.5 ? 'cooperate' : 'steal';

        // Outcome determination based on cooperation/steal
        let outcome = '';

        if (cooperate === 'steal' && contractDecision === 'steal') {
            // If both steal: "try again"
            outcome = 'try again';
        } else if (cooperate === 'cooperate' && contractDecision === 'cooperate') {
            outcome = '1 smoothie minted';
            smoothiesMintedCount += 1;
            smoothiesAvailableCount -= 1;
        } else if (cooperate === 'steal' && contractDecision === 'cooperate') {
            // If the user steals and contract cooperates: Always 2 smoothies minted
            outcome = '2 smoothies minted';
            smoothiesMintedCount += 2;
            smoothiesAvailableCount -= 2;
        } else if (cooperate === 'cooperate' && contractDecision === 'steal') {
            outcome = '1 SMEWTH token minted';
            smeewthMintedCount += 1;
        }

        setTimeout(() => {
            blenderVideo.style.display = "none";
            if (mintButton) {
                mintButton.style.display = "block";
            }
            outcomeMessage.innerText = outcome;
            if (outcomeModal) {
                outcomeModal.style.display = "block";
            }

            updateTracker();  // Update tracker
        }, 3000); // Simulate delay for video playing
    }

    // Close the outcome modal when the user clicks the Close button
    if (closeOutcomeModal) {
        closeOutcomeModal.addEventListener("click", () => {
            if (outcomeModal) {
                outcomeModal.style.display = "none";
            }
        });
    }

    // Event listeners for the cooperation buttons
    if (cooperateButton) {
        cooperateButton.addEventListener('click', () => {
            handleCooperation('cooperate');
        });
    }

    if (stealButton) {
        stealButton.addEventListener('click', () => {
            handleCooperation('steal');
        });
    }

    // Toggle explanation pop-up
    wtfButton.addEventListener('click', () => {
        explanationPopup.style.display = explanationPopup.style.display === 'block' ? 'none' : 'block';
    });

    // Toggle tracker pop-up
    trackerButton.addEventListener('click', () => {
        trackerPopup.style.display = trackerPopup.style.display === 'block' ? 'none' : 'block';
    });

    // Close the explanation pop-up
    closeExplanationPopup.addEventListener('click', () => {
        explanationPopup.style.display = 'none';
    });

    // Close the tracker pop-up
    closeTrackerPopup.addEventListener('click', () => {
        trackerPopup.style.display = 'none';
    });

    // Close the pop-ups when clicking outside
    document.addEventListener('click', (event) => {
        if (!explanationPopup.contains(event.target) && !wtfButton.contains(event.target)) {
            explanationPopup.style.display = 'none';
        }
        if (!trackerPopup.contains(event.target) && !trackerButton.contains(event.target)) {
            trackerPopup.style.display = 'none';
        }

        // Close the outcome modal if clicked outside
        if (outcomeModal && !outcomeModal.contains(event.target) && outcomeModal.style.display === 'block') {
            outcomeModal.style.display = "none";
        }
    });
};
