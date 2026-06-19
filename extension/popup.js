// CloakedLink Pro Popup Interface Controller

document.addEventListener("DOMContentLoaded", () => {
  const counterEl = document.getElementById("counter");
  const tierBadgeEl = document.getElementById("tierBadge");
  const actionBtnEl = document.getElementById("actionBtn");
  const clipboardCleanEl = document.getElementById("clipboardClean");
  
  // Load initial settings and statistics
  chrome.storage.local.get(["countRemoved", "isPro"], (data) => {
    counterEl.textContent = data.countRemoved || 0;
    
    if (data.isPro) {
      tierBadgeEl.textContent = "Pro";
      tierBadgeEl.className = "badge pro";
      actionBtnEl.textContent = "Pro Settings";
      actionBtnEl.className = "btn btn-pro";
      actionBtnEl.disabled = true;
    }
  });
  
  // Mock payment/upgrade action
  actionBtnEl.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "activatePro" }, (response) => {
      if (response && response.success) {
        tierBadgeEl.textContent = "Pro";
        tierBadgeEl.className = "badge pro";
        actionBtnEl.textContent = "Pro Activated!";
        actionBtnEl.className = "btn btn-pro";
        actionBtnEl.disabled = true;
        
        // Show success alert
        alert("CloakedLink Pro Activated successfully! Auto Clipboard Sanitation is now active.");
      }
    });
  });
  
  // Listen for checkbox changes
  clipboardCleanEl.addEventListener("change", (e) => {
    chrome.storage.local.get("isPro", (data) => {
      if (!data.isPro) {
        clipboardCleanEl.checked = false;
        alert("Clipboard Sanitizer is a CloakedLink Pro feature. Go Pro to unlock!");
      }
    });
  });
});
