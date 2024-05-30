chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleDeclarativeNetRequest") {
    const isEnabled = request.isEnabled;
    updateIcon(isEnabled);
    if (isEnabled) {
      // 활성화하는 로직
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1,
            priority: 1,
            action: { type: "block" },
            condition: {
              urlFilter: "https://fileimage.sunmoon.ac.kr/SMHome_Images*",
              resourceTypes: ["image"],
            },
          },
          {
            id: 2,
            priority: 1,
            action: { type: "block" },
            condition: {
              urlFilter: "https://star.sunmoon.ac.kr/*",
              resourceTypes: ["xmlhttprequest"],
            },
          },
          {
            id: 3,
            priority: 1,
            action: { type: "block" },
            condition: {
              urlFilter: "https://lily.sunmoon.ac.kr/images/main/*",
              resourceTypes: ["media"],
            },
          },
        ],
        removeRuleIds: [], // 현재 비활성화할 규칙이 없으므로 비워둡니다.
      });
    } else {
      console.log("비활성");
      // 비활성화하는 로직
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [],
        removeRuleIds: [1, 2, 3], // 모든 규칙을 비활성화합니다.
      });
    }
  }

  function updateIcon(isEnabled) {
    const iconPath = isEnabled ? "./icons/on.png" : "./icons/off.png";
    chrome.action.setIcon({ path: iconPath });
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("declarativeNetRequestEnabled", function (data) {
    const isEnabled = data.declarativeNetRequestEnabled ?? false;
    updateIcon(isEnabled);
  });
});

function updateIcon(isEnabled) {
  const iconPath = isEnabled ? "./icons/on.png" : "./icons/off.png";
  chrome.action.setIcon({ path: iconPath });
}
