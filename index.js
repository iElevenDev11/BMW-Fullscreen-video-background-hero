(function () {
  "use strict";

  // Feature detection and polyfill setup
  const hasIntersectionObserver = "IntersectionObserver" in window;
  const hasGrid = CSS.supports("display", "grid");
  const hasClamp = CSS.supports("font-size", "clamp(1rem, 2vw, 3rem)");

  if (!hasGrid) document.documentElement.classList.add("no-grid");
  if (!hasClamp) document.documentElement.classList.add("no-clamp");

  // Elements
  const video = document.getElementById("bgVideo");
  const skeleton = document.getElementById("skeleton");
  const loading = document.getElementById("loading");
  const qualityIndicator = document.getElementById("qualityIndicator");
  const muteBtn = document.getElementById("muteBtn");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const stopMotionBtn = document.getElementById("stopMotionBtn");
  const qualityBtn = document.getElementById("qualityBtn");

  // BMW Video sources with working URLs
  const videoSources = {
    high: {
      webm: "hero-video.mp4",
      mp4: "https://v16-vod.capcutvod.com/b5f3c8447c7e926a6c158b5f2ec46da0/68d54749/video/tos/alisg/tos-alisg-v-be9c48c700-sg/o48eiZbHCeCQI5gOKeM2SOQLYgjiaWr6lWsTRy/?a=3006&bti=cHJ3bzFmc3dmZEBvY15taF4rcm1gYA%3D%3D&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=1170&bt=585&cs=0&ds=3&ft=GNvlXInz7ThivkKKXq8Zmo&mime_type=video_mp4&qs=0&rc=M2ZkaGc0NzY3aDk3OGg8N0Bpand4d2s5cm1sdjMzN2doM0A2Ml4zLjAtNS8xNWEwM141YSNpcGY1MmRjbGxgLS1kNjZzcw%3D%3D&vvpl=1&l=20250922214427E473BC00C6F24F348423&btag=e000b0000",
    },
    medium: {
      webm: "https://v16-vod.capcutvod.com/b5f3c8447c7e926a6c158b5f2ec46da0/68d54749/video/tos/alisg/tos-alisg-v-be9c48c700-sg/o48eiZbHCeCQI5gOKeM2SOQLYgjiaWr6lWsTRy/?a=3006&bti=cHJ3bzFmc3dmZEBvY15taF4rcm1gYA%3D%3D&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=1170&bt=585&cs=0&ds=3&ft=GNvlXInz7ThivkKKXq8Zmo&mime_type=video_mp4&qs=0&rc=M2ZkaGc0NzY3aDk3OGg8N0Bpand4d2s5cm1sdjMzN2doM0A2Ml4zLjAtNS8xNWEwM141YSNpcGY1MmRjbGxgLS1kNjZzcw%3D%3D&vvpl=1&l=20250922214427E473BC00C6F24F348423&btag=e000b0000",
      mp4: "https://v16-vod.capcutvod.com/b5f3c8447c7e926a6c158b5f2ec46da0/68d54749/video/tos/alisg/tos-alisg-v-be9c48c700-sg/o48eiZbHCeCQI5gOKeM2SOQLYgjiaWr6lWsTRy/?a=3006&bti=cHJ3bzFmc3dmZEBvY15taF4rcm1gYA%3D%3D&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=1170&bt=585&cs=0&ds=3&ft=GNvlXInz7ThivkKKXq8Zmo&mime_type=video_mp4&qs=0&rc=M2ZkaGc0NzY3aDk3OGg8N0Bpand4d2s5cm1sdjMzN2doM0A2Ml4zLjAtNS8xNWEwM141YSNpcGY1MmRjbGxgLS1kNjZzcw%3D%3D&vvpl=1&l=20250922214427E473BC00C6F24F348423&btag=e000b0000",
    },
    low: {
      webm: "https://v16-vod.capcutvod.com/b5f3c8447c7e926a6c158b5f2ec46da0/68d54749/video/tos/alisg/tos-alisg-v-be9c48c700-sg/o48eiZbHCeCQI5gOKeM2SOQLYgjiaWr6lWsTRy/?a=3006&bti=cHJ3bzFmc3dmZEBvY15taF4rcm1gYA%3D%3D&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=1170&bt=585&cs=0&ds=3&ft=GNvlXInz7ThivkKKXq8Zmo&mime_type=video_mp4&qs=0&rc=M2ZkaGc0NzY3aDk3OGg8N0Bpand4d2s5cm1sdjMzN2doM0A2Ml4zLjAtNS8xNWEwM141YSNpcGY1MmRjbGxgLS1kNjZzcw%3D%3D&vvpl=1&l=20250922214427E473BC00C6F24F348423&btag=e000b0000",
      mp4: "https://v16-vod.capcutvod.com/b5f3c8447c7e926a6c158b5f2ec46da0/68d54749/video/tos/alisg/tos-alisg-v-be9c48c700-sg/o48eiZbHCeCQI5gOKeM2SOQLYgjiaWr6lWsTRy/?a=3006&bti=cHJ3bzFmc3dmZEBvY15taF4rcm1gYA%3D%3D&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=1170&bt=585&cs=0&ds=3&ft=GNvlXInz7ThivkKKXq8Zmo&mime_type=video_mp4&qs=0&rc=M2ZkaGc0NzY3aDk3OGg8N0Bpand4d2s5cm1sdjMzN2doM0A2Ml4zLjAtNS8xNWEwM141YSNpcGY1MmRjbGxgLS1kNjZzcw%3D%3D&vvpl=1&l=20250922214427E473BC00C6F24F348423&btag=e000b0000",
    },
  };

  let currentQuality = "auto";
  let connectionSpeed = "unknown";

  // Detect connection speed
  function detectConnectionSpeed() {
    if ("connection" in navigator) {
      const conn = navigator.connection;
      const effectiveType = conn.effectiveType;

      switch (effectiveType) {
        case "slow-2g":
        case "2g":
          return "low";
        case "3g":
          return "medium";
        case "4g":
        default:
          return "high";
      }
    }

    // Fallback: simple bandwidth test
    return new Promise((resolve) => {
      const startTime = performance.now();
      const testImage = new Image();
      testImage.onload = () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        const speed =
          duration < 500 ? "high" : duration < 1500 ? "medium" : "low";
        resolve(speed);
      };
      testImage.onerror = () => resolve("low");
      testImage.src =
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
    });
  }

  // Browser format support detection
  function getSupportedFormat() {
    const video = document.createElement("video");
    if (video.canPlayType('video/webm; codecs="vp9"')) {
      return "webm";
    } else if (video.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
      return "mp4";
    }
    return "mp4"; // fallback
  }

  // Load appropriate video source
  async function loadVideoSource() {
    try {
      // Detect connection speed
      if (typeof detectConnectionSpeed().then === "function") {
        connectionSpeed = await detectConnectionSpeed();
      } else {
        connectionSpeed = detectConnectionSpeed();
      }

      const quality =
        currentQuality === "auto" ? connectionSpeed : currentQuality;
      const format = getSupportedFormat();
      const source = videoSources[quality][format];

      // Only replace sources if we have a different quality
      if (video.querySelector("source")?.src !== source) {
        // Clear existing sources
        video.innerHTML = "";

        // Add appropriate source
        const sourceElement = document.createElement("source");
        sourceElement.src = source;
        sourceElement.type = format === "webm" ? "video/webm" : "video/mp4";
        video.appendChild(sourceElement);

        // Add fallback text
        video.appendChild(
          document.createTextNode("Your browser does not support HTML5 video.")
        );

        // Load the video
        video.load();
      }

      // Update quality indicator
      qualityIndicator.textContent = `${quality.toUpperCase()} (${format.toUpperCase()})`;
    } catch (error) {
      console.warn("Error loading video:", error);
      hideLoadingState();
      // Try to play default video if custom loading fails
      if (video.readyState >= 2) {
        video.play().catch(() => {});
      }
    }
  }

  // Hide loading state
  function hideLoadingState() {
    skeleton.classList.add("hidden");
    loading.classList.add("hidden");
    video.classList.add("loaded");
  }

  // UI update functions
  function setMuteUI(isMuted) {
    muteBtn.setAttribute("aria-pressed", String(isMuted));
    muteBtn.textContent = isMuted ? "🔇 Muted" : "🔊 Sound";
    muteBtn.title = isMuted ? "Unmute video" : "Mute video";
  }

  function setPlayUI(isPlaying) {
    playPauseBtn.setAttribute("aria-pressed", String(isPlaying));
    playPauseBtn.textContent = isPlaying ? "⏸ Pause" : "▶ Play";
    playPauseBtn.title = isPlaying
      ? "Pause background video"
      : "Play background video";
  }

  function setQualityUI(quality) {
    qualityBtn.textContent = `📺 ${
      quality.charAt(0).toUpperCase() + quality.slice(1)
    }`;
    qualityBtn.title = `Current quality: ${quality}`;
  }

  // Event listeners
  video.addEventListener("loadeddata", () => {
    hideLoadingState();
    setMuteUI(video.muted);
    setPlayUI(!video.paused && !video.ended);
  });

  video.addEventListener("error", (e) => {
    console.error("Video error:", e);
    hideLoadingState();
    qualityIndicator.textContent = "Video unavailable";
  });

  // Control event listeners
  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    setMuteUI(video.muted);
  });

  playPauseBtn.addEventListener("click", async () => {
    if (video.paused) {
      try {
        await video.play();
        setPlayUI(true);
      } catch (err) {
        console.warn("Playback failed:", err);
        setPlayUI(false);
      }
    } else {
      video.pause();
      setPlayUI(false);
    }
  });

  stopMotionBtn.addEventListener("click", () => {
    if (!video.paused) {
      video.pause();
      stopMotionBtn.setAttribute("aria-pressed", "true");
      setPlayUI(false);
    } else {
      video
        .play()
        .then(() => {
          stopMotionBtn.setAttribute("aria-pressed", "false");
          setPlayUI(true);
        })
        .catch(() => {
          // ignore
        });
    }
  });

  // Quality toggle
  qualityBtn.addEventListener("click", () => {
    const qualities = ["auto", "high", "medium", "low"];
    const currentIndex = qualities.indexOf(currentQuality);
    currentQuality = qualities[(currentIndex + 1) % qualities.length];
    setQualityUI(currentQuality);
    loadVideoSource();
  });

  // Video playback event listeners
  video.addEventListener("play", () => setPlayUI(true));
  video.addEventListener("pause", () => setPlayUI(false));
  video.addEventListener("canplay", () => {
    hideLoadingState();
  });

  // Initialize with immediate video loading
  function initializeVideo() {
    // Force show video and hide loading immediately if video is ready
    if (video.readyState >= 2) {
      hideLoadingState();
      video.play().catch((e) => console.log("Autoplay prevented:", e));
    } else {
      // Try to load and play
      video.addEventListener(
        "loadeddata",
        () => {
          hideLoadingState();
          video.play().catch((e) => console.log("Autoplay prevented:", e));
        },
        { once: true }
      );

      video.addEventListener(
        "canplaythrough",
        () => {
          hideLoadingState();
        },
        { once: true }
      );
    }
  }

  // Accessibility: respect reduced motion preference
  try {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      video.pause();
      setPlayUI(false);
    }
    mq.addEventListener?.("change", (ev) => {
      if (ev.matches) {
        video.pause();
        setPlayUI(false);
      } else {
        video.play().catch(() => {});
      }
    });
  } catch (e) {
    // ignore matchMedia errors for older browsers
  }

  // Intersection Observer for lazy loading
  if (hasIntersectionObserver) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadVideoSource().then(() => {
              video.play().catch(() => {});
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(document.querySelector(".hero"));
  } else {
    // Fallback for browsers without IntersectionObserver
    setTimeout(() => {
      loadVideoSource().then(() => {
        video.play().catch(() => {});
      });
    }, 100);
  }

  // Initialize everything
  initializeVideo();
  setQualityUI(currentQuality);
  setMuteUI(true);
  setPlayUI(false);

  // Fallback: always hide loading after 3 seconds
  setTimeout(() => {
    hideLoadingState();
    qualityIndicator.textContent = "BMW EDITION";
  }, 3000);

  // Monitor connection changes
  if ("connection" in navigator) {
    navigator.connection.addEventListener("change", () => {
      if (currentQuality === "auto") {
        loadVideoSource();
      }
    });
  }
})();
