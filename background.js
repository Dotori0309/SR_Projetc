chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleDeclarativeNetRequest") {
    const isEnabled = request.isEnabled;
    if (isEnabled) {
      console.log("활성");
      // 활성화하는 로직
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1,
            priority: 1,
            action: { type: "block" },
            condition: {
              urlFilter: "example.com",
              resourceTypes: ["main_frame"],
            },
          },
          {
            id: 2,
            priority: 1,
            action: { type: "block" },
            condition: {
              urlFilter: "https://fileimage.sunmoon.ac.kr/SMHome_Images*",
              resourceTypes: ["image"],
            },
          },
          {
            id: 3,
            priority: 1,
            action: { type: "block" },
            condition: {
              urlFilter: "https://star.sunmoon.ac.kr/*",
              resourceTypes: ["xmlhttprequest"],
            },
          },
          // 여기에 더 많은 규칙을 추가할 수 있습니다.
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
});
