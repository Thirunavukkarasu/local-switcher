chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({
        urls: [
            'http://localhost:3000',
            'http://localhost:8080',
            'http://localhost:5000'
        ]
    });
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.command === 'switch-environment') {
        switchEnvironment();
    }
});

// Function to switch environments
function switchEnvironment() {
    // Fetch the current environment configuration
    chrome.storage.sync.get(['currentEnvironment'], (result) => {
        const newEnvironment = toggleEnvironment(result.currentEnvironment);
        // Update the active environment in storage
        chrome.storage.sync.set({ currentEnvironment: newEnvironment });
        // Notify the user
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Environment Switched',
            message: `You are now in ${newEnvironment} mode!`
        });
    });
}

// Function to toggle between environments
function toggleEnvironment(current: string): string {
    return current === 'development' ? 'production' : 'development';
}


export { };