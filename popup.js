document.addEventListener("DOMContentLoaded", function () {
  var toggleButton = document.getElementById("toggleButton");
  var statusText = document.getElementById("statusText");

  // 첫 로드 시 상태를 확인하고 버튼 텍스트를 설정합니다.
  chrome.storage.local.get("declarativeNetRequestEnabled", function (data) {
    var isEnabled = data.declarativeNetRequestEnabled;
    updateToggleButton(isEnabled);
  });

  toggleButton.addEventListener("click", function () {
    chrome.storage.local.get("declarativeNetRequestEnabled", function (data) {
      var isEnabled = data.declarativeNetRequestEnabled;

      // Toggle the value
      isEnabled = !isEnabled;

      // Save the new value
      chrome.storage.local.set({ declarativeNetRequestEnabled: isEnabled });

      // Send a message to background script to enable/disable declarativeNetRequest
      chrome.runtime.sendMessage({
        action: "toggleDeclarativeNetRequest",
        isEnabled: isEnabled,
      });

      // Update button text and display status
      updateToggleButton(isEnabled);
      statusText.textContent = `declarativeNetRequest is now ${
        isEnabled ? "enabled" : "disabled"
      }`;
    });
  });

  function updateToggleButton(isEnabled) {
    toggleButton.textContent = isEnabled
      ? "Disable declarativeNetRequest"
      : "Enable declarativeNetRequest";
  }
});
