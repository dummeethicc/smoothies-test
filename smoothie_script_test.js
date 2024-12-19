async function startMinting(cooperate) {
    blenderVideo.style.display = "block";
    
    try {
        await blenderVideo.play(); // Try playing the video
        console.log('Video is playing');
    } catch (error) {
        console.error('Error playing video:', error);
    }

    // Hide the mint button while the video plays
    if (mintButton) {
        mintButton.style.display = "none";
    }

    // Randomly decide the contract's action (cooperate or steal)
    const contractDecision = Math.random() > 0.5 ? 'cooperate' : 'steal';

    // Outcome determination based on cooperation/steal
    let outcome = '';

    if (cooperate === 'steal' && contractDecision === 'steal') {
        outcome = 'Try again';
    } else if (cooperate === 'cooperate' && contractDecision === 'cooperate') {
        outcome = '1 smoothie minted';
    } else if (cooperate === 'steal' && contractDecision === 'cooperate') {
        outcome = '2 smoothies minted';
    } else if (cooperate === 'cooperate' && contractDecision === 'steal') {
        outcome = '1 SMEWTH token minted';
    }

    // After a 3-second delay (simulating minting), hide video and show result
    setTimeout(() => {
        blenderVideo.style.display = "none"; // Hide the video
        if (mintButton) {
            mintButton.style.display = "block"; // Show mint button again
        }
        outcomeMessage.innerText = outcome; // Display the outcome
        if (outcomeModal) {
            outcomeModal.style.display = "block"; // Show outcome modal
        }

        updateTracker();  // Update tracker UI with new stats
    }, 3000); // Adjust this duration based on your video length
}
