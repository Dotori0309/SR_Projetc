document.querySelectorAll("img").forEach(function (img) {
  // 새로운 div 요소를 생성합니다.
  var div = document.createElement("div");

  // div에 스타일을 적용합니다.
  div.style.backgroundColor = "gray";
  //   div.style.width = "100%";
  //   div.style.height = "100%";

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
