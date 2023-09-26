// Function to check if managed settings are configured
function checkManagedSettings() {
  chrome.storage.managed.get(['tenantID', 'policyGUID'], (managedData) => {
    if (chrome.runtime.lastError) {
      // Handle error, e.g., managed storage not available
      return;
    }

    if (managedData.tenantID && managedData.policyGUID) {
      // Managed settings are configured, disable user inputs
      document.getElementById('tenantID').disabled = true;
      document.getElementById('policyGUID').disabled = true;
	  document.getElementById('save').disabled = true;
      document.getElementById('tenantID').value = managedData.tenantID;
      document.getElementById('policyGUID').value = managedData.policyGUID;


      // Show a notification
      document.getElementById('managedSettingsNotification').textContent =
        'Settings are managed by your organization.';
    }
  });
}

// Call the function to check managed settings
checkManagedSettings();


// Function to save options
function saveOptions() {
    const tenantID = document.getElementById('tenantID').value;
    const policyGUID = document.getElementById('policyGUID').value;

    // Save user options to chrome.storage.sync
    chrome.storage.sync.set({
        tenantID: tenantID,
        policyGUID: policyGUID
    }, function () {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Function to restore options
function restoreOptions() {
    chrome.storage.sync.get(['tenantID', 'policyGUID'], (data) => {
        const tenantIDInput = document.getElementById('tenantID');
        const policyGUIDInput = document.getElementById('policyGUID');
        tenantIDInput.value = data.tenantID || '';
        policyGUIDInput.value = data.policyGUID || '';

        // Check for managed settings and update UI
        checkManagedSettings();
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);