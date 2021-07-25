"use strict";

{
  // imgを配列で保持する
  const images = [
    "img/TokyoStation2.png",
    "img/Ginza.png",
    "img/Rainbow.png",
    "img/sensoji6.png",
    "img/skytree6.png",
    "img/tochou2.png",
    "img/Roppongi.png",
    "img/ikebukuro2.png",
  ];
  //今、何番目の画像を表示しているか
  let currentIndex = 0;

  // 表示する領域をmainImageとし、mainというidがついた要素を取得
  const mainImage = document.getElementById("main");
  //src属性にimagesのcurrentIndex番目の要素を代入
  mainImage.src = images[currentIndex];

  //画像要素(images配列)をループ
  images.forEach((image, index) => {
    // img要素を生成しimgのsrc属性になるようにする
    const img = document.createElement("img");
    img.src = image;

    //同様にli要素を生成
    const li = document.createElement("li");
    if (index === currentIndex) {
      //imageのindexとcurrentIndexが同じの場合、liにcurrentクラスを付ける
      li.classList.add("current");
    }
    // サムネイル画像(li)クリックイベント
    li.addEventListener("click", () => {
      // 今のimageをメイン画像のsrc属性に設定する
      mainImage.src = image;
      // サムネイルのli要素を全て取得し、定数thumbnailsで持つ
      const thumbnails = document.querySelectorAll(".thumbnails > li");
      // thumbnails[currentIndex]番目の要素のcurrentクラスを取り除く
      thumbnails[currentIndex].classList.remove("current");
      // クリックされたimageが何番目かを更新
      currentIndex = index;
      // 更新されたthumbnails[currentIndex]番目の要素にcurrentクラスを付ける
      thumbnails[currentIndex].classList.add("current");
    });

    //liの子要素にimgを追加する
    li.appendChild(img);

    // thumbnailsクラスがついた要素を指定しつつthumbnailsの子要素にli要素を追加する
    // ※querySelector任意のHTML要素を検出・取得することができるメソッド。
    document.querySelector(".thumbnails").appendChild(li);
  });

  // nextというidがついた要素を取得
  const next = document.getElementById("next");
  //次へボタンクリックイベント
  next.addEventListener("click", () => {
    // currentIndex + 1することで次のサムネイル画像にいく
    let target = currentIndex + 1;
    if (target === images.length) {
      // targetがimagesの要素数と同じの場合、1枚目のサムネイル画像に戻る
      target = 0;
    }
    // サムネイルのli要素を全て取得する
    document.querySelectorAll(".thumbnails > li")[target].click();
  });

  // prevというidがついた要素を取得
  const prev = document.getElementById("prev");
  //前へボタンクリックイベント
  prev.addEventListener("click", () => {
    // currentIndex - 1することで前のサムネイル画像に戻る
    let target = currentIndex - 1;
    if (target < 0) {
      // targetがimagesの先頭要素より前の場合、最後のサムネイル画像にいく
      target = images.length - 1;
    }
    // サムネイルのli要素を全て取得する
    document.querySelectorAll(".thumbnails > li")[target].click();
  });

  let timeoutId;

  // playSlideshowメソッド
  function playSlideshow() {
    // 3秒後にこの関数での処理を繰り返す
    // timeoutIdでsetTimeoutの返り値を受けとる
    timeoutId = setTimeout(() => {
      // 次の画像へいく(nextをクリックしたときと同じ処理をするようにする)
      next.click();
      // 繰り返す
      playSlideshow();
    }, 2000);
  }

  let isPlaying = false;

  // playというidがついた要素を取得
  const play = document.getElementById("play");
  //playボタンクリックイベント
  play.addEventListener("click", () => {
    if (isPlaying === false) {
      playSlideshow();
      // スライドが再生状態のときはplayボタンのtextはPauseにする
      play.textContent = "Pause ❚❚";
    } else {
      // 一時停止時、setTimeout()でセットしたタイマーを解除し↓
      clearTimeout(timeoutId);
      // スライドが一時停止状態のときはplayボタンのtextはPlayにする
      play.textContent = "Play ▶"
    }
    // playボタンが押されるたびにisPlayingの結果を反転
    isPlaying = !isPlaying;
  });
}
