// Function to get user-configured or managed settings
async function getUserConfig() {
  return new Promise((resolve) => {
    chrome.storage.managed.get(['tenantID', 'policyGUID'], (managedData) => {
      if (chrome.runtime.lastError) {
        // Handle error, e.g., managed storage not available
        resolve({});
        return;
      }

      chrome.storage.sync.get(['tenantID', 'policyGUID'], (syncData) => {
        if (chrome.runtime.lastError) {
          // Handle error, e.g., sync storage not available
          resolve({});
          return;
        }

        // Priority: Use managed settings if available, else use user-configured settings
        const userConfig = managedData.tenantID && managedData.policyGUID ? managedData : syncData;
        resolve(userConfig);
      });
    });
  });
}

// Function to create rules for the specified domains
async function createRules() {
  const domains = ["login.microsoftonline.com", "login.microsoft.com", "login.windows.net", "login.live.com"];
  const ids = [5001, 5002, 5003, 5004];

  // Retrieve the user's configuration from storage.sync
  const userConfig = await getUserConfig();
  const accessHeaderValue = `${userConfig.tenantID}:${userConfig.policyGUID}`;

  // Create or update rules for each domain with user-configured or managed settings
  const newRules = domains.map((domain, index) => {
    const id = ids[index];
  //  const accessHeaderValue = `${userConfig.tenantID}:${userConfig.policyGUID}`;
    return {
      id: id,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "sec-Restrict-Tenant-Access-Policy", operation: "set", value: accessHeaderValue },
        ],
      },
      condition: { urlFilter: domain, resourceTypes: ["main_frame"] },
    };
  });

  // Retrieve existing rules
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();

  // Remove existing rules with the same IDs
  const ruleIdsToRemove = existingRules.map((rule) => rule.id);
  await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: ruleIdsToRemove });

  if (accessHeaderValue !== ':') {
    // Add the new rules
    await chrome.declarativeNetRequest.updateDynamicRules({ addRules: newRules });
  }
}

// Call the function to create or update rules on startup
chrome.runtime.onStartup.addListener(createRules);

// Call the function to create or update rules on tab creation
chrome.tabs.onCreated.addListener(createRules);
