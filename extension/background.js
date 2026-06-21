// CloakedLink Service Worker
// URL tracking parameters are stripped entirely by the static
// declarativeNetRequest ruleset (rules.json) at the network layer.
// This worker only initializes local state and answers popup messages.
// No network requests, analytics, or remote calls are made — all
// processing stays on-device.

chrome.runtime.onInstalled.addListener(() => {
  console.log("CloakedLink installed successfully.");
  chrome.storage.local.set({ countRemoved: 0, isPro: false });
});

// NOTE: chrome.declarativeNetRequest.onRuleMatchedDebug only fires for
// unpacked/dev extensions, so it cannot be used to count strips in a
// published build. We attach it solely as a best-effort dev-mode counter;
// it is a no-op in production and never sends data anywhere.
if (chrome.declarativeNetRequest && chrome.declarativeNetRequest.onRuleMatchedDebug) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
    if (info.rule.ruleId === 1) {
      chrome.storage.local.get("countRemoved", (data) => {
        const current = data.countRemoved || 0;
        chrome.storage.local.set({ countRemoved: current + 1 });
      });
    }
  });
}

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
