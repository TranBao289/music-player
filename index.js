const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const heading = $("header h1");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const cd = $(".cd");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const song = $(".song");

const app = {
  isRandom: false,
  isPlaying: false,
  isRepeat: false,
  currentIndex: 0,
  songs: [
    {
      id: 1,
      name: "3107 id072019",
      singer: "W/n",
      path: "assets/music/Id072019-WN-10597501.mp3",
      image: "img/1627913896146.jpg",
    },
    {
      id: 2,
      name: "Chờ Đợi Có Đáng Sợ",
      singer: "ANDIEZ",
      path: "assets/music/chờ đợi có đáng sợ.mp3",
      image: "img/chodoi.jpg",
    },
    {
      id: 3,
      name: "Chịu cách mình nói thua",
      singer: " ft. BAN x COOLKID",
      path: "assets/music/ChiuCachMinhNoiThua-RHYDER-13731160.mp3",
      image: "img/chiucachnoithua.jpg",
    },
    {
      id: 4,
      name: "3107-7",
      singer: "W/n",
      path: "assets/music/31077-WnDuonggTitie-7119728.mp3",
      image: "./img/1627913896146.jpg",
    },
    {
      id: 5,
      name: "Ánh sao và bầu trời",
      singer: "T.R.I x Cá ",
      path: "assets/music/AnhSaoVaBauTroi-TRI-7085073.mp3",
      image: "img/anhsao.jpg",
    },
    {
      id: 6,
      name: "Như anh đã thấy em",
      singer: "PhucXp ft. Freak D",
      path: "assets/music/NhuAnhDaThayEm-PhucXPFreakD-7370334.mp3",
      image: "img/như anh đã thấy e.jpg",
    },
    {
      id: 7,
      name: "Sài gòn hôm nay mưa",
      singer: "JSOL x HOÀNG DUYÊN",
      path: "assets/music/SaiGonHomNayMua-JSOLHoangDuyen-7026537 (1).mp3",
      image: "img/saigonmua.jpg",
    },
    {
      id: 8,
      name: "3107-3",
      singer: "W/n",
      path: "assets/music/31073-WnDuongGNauTitie-7058449.mp3",
      image: "./img/1627913896146.jpg",
    },
    {
      id: 9,
      name: "Hãy gặp lại nhau khi mùa hoa nở",
      singer: "NGUYÊN HÀ",
      path: "assets/music/SauNayHayGapLaiNhauKhiHoaNo-NguyenHa-6256923.mp3",
      image: "img/z5388742912811_235af1e0bb19993655c9fe0769e471e9.jpg",
    },
    {
      id: 10,
      name: "Tháng tư là lời nói dối của em",
      singer: "Hà Anh Tuấn ",
      path: "assets/music/ThangTuLaLoiNoiDoiCuaEm-PhamToanThang-4426036.mp3",
      image: "img/thangtu.jpg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
      <div class="id1 ${
        index === this.currentIndex ? "active" : ""
      }" data-index = "${index}">
        <div class="thumb">
          <img src="${song.image}" alt="">
       </div>
        <div class="body">
          <h2 class="title">${song.name}</h2>
          <p class="author">${song.singer} </p>
        </div>
        <div class="option">
          <i class="fa fa-ellipsis-h"></i>
        </div>
      </div>
     <div class="border"></div>
     `;
    });

    song.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // xử lý đĩa quay CD
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      iterations: Infinity,
      duration: 10000,
    });
    cdThumbAnimate.pause();

    // xử lý zoom CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWith = cdWidth - scrollTop;

      cd.style.width = newCdWith > 0 ? newCdWith + "px" : 0;
      // cd.style.opacity = newCdWith / cdWidth
    };
    // xử lý khi click Play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    //  khi play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    //  khi pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    // tiến độ của bài hát
    audio.ontimeupdate = function () {
      // console.log (audio.currentTime / audio.duration*100)
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    // xử lý khi tua
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    // khi next
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollTopActiveSong();
    };
    // khi prev
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollTopActiveSong();
    };
    // khi random
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // lặp lại bài
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // xử lý next khi hết bài
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // click vào bài hát
    song.onclick = function (e) {
      if (
        e.target.closest(".id1:not(.active)") &&
        !e.target.closest(".option")
      ) {
        if (e.target.closest(".id1:not(.active)")) {
          _this.currentIndex = Number(
            e.target.closest(".id1:not(.active)").dataset.index
          );
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollTopActiveSong: function () {
    setTimeout(() => {
      $(".id1.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // định nghĩa các thuộc tính cho obj
    this.defineProperties();
    // lắng nghe xử lý sự kiện
    this.handleEvents();
    // tải thông tin bài hát đầu tiên vào UI khi chạy
    this.loadCurrentSong();
    // render ra playlist
    this.render();
  },
};
app.start();
