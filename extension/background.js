// CloakedLink Pro Service Worker
// Automatically monitors rules and clipboard triggers

chrome.runtime.onInstalled.addListener(() => {
  console.log("CloakedLink Pro installed successfully.");
  chrome.storage.local.set({ countRemoved: 0, isPro: false });
});

// Listener to update counter when rules match and parameters are removed
chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener((info) => {
  if (info.rule.ruleId === 1) {
    chrome.storage.local.get("countRemoved", (data) => {
      let current = data.countRemoved || 0;
      chrome.storage.local.set({ countRemoved: current + 1 });
    });
  }
});

// Message handler to support communication with popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getStats") {
    chrome.storage.local.get(["countRemoved", "isPro"], (data) => {
      sendResponse(data);
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === "activatePro") {
    chrome.storage.local.set({ isPro: true }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});
