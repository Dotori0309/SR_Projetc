(async function () {
  const storage = await chrome.storage.local.get();
  const isEnabled = storage.declarativeNetRequestEnabled ?? false;
  if (isEnabled === true) {
    removeResource();
  }
})();

const removeResource = () => {
  document.querySelectorAll("img").forEach(function (img) {
    // 새로운 div 요소를 생성합니다.
    var div = document.createElement("div");

    // div에 스타일을 적용합니다.
    div.style.backgroundColor = "gray";

    // img 태그와 같은 위치에 div를 삽입합니다.
    img.parentNode.insertBefore(div, img);

    // 원래의 img 태그를 제거합니다.
    img.parentNode.removeChild(img);
  });

  // 모든 비디오 태그(<video>) 내의 소스(<source>) 태그의 src 속성을 빈 값으로 설정
  const videos = document.querySelectorAll("video");
  videos.forEach(function (video) {
    // video 태그 내의 모든 source 태그를 찾아서 처리합니다.
    const sources = video.querySelectorAll("source");
    sources.forEach(function (source) {
      source.src = "";
    });
    // video 태그 자체의 src 속성도 처리해야 할 경우 추가합니다.
    video.src = "";
    // 비디오를 다시 로드하여 변경사항을 적용합니다.
    video.load();
  });

  // video-container_PC 클래스를 가진 요소 안에 이미지를 추가합니다.
  const videoContainer = document.querySelector(".video-container_PC");
  if (videoContainer) {
    const img = document.createElement("img");
    img.src =
      "https://lms.sunmoon.ac.kr/ilosfiles/editor-file/795851C8337F5B52C933/2024/6E2AC53BY52IA.png";
    img.style.position = "absolute";
    img.style.bottom = "23%"; // bottom으로 위치 설정
    img.style.left = "300px";
    img.style.zIndex = "9999"; // 최대 z-index 값
    img.style.width = "600px"; // 필요에 따라 조정
    img.style.height = "auto"; // 필요에 따라 조정

    videoContainer.appendChild(img);

    // video 태그의 배경색을 초록색으로 변경합니다.
    const video = videoContainer.querySelector("video");
    if (video) {
      video.style.backgroundColor = "#6caa6c"; // 배경색을 초록색으로 변경
    }
  }
};
