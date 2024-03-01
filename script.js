function showImage(src, clickedThumbnail) {
  const mainImg = document.getElementById("main-img");
  const thumbnails = document.querySelectorAll("#thumbnails img");

  thumbnails.forEach((thumbnail) =>
    thumbnail.classList.remove("selected-thumbnail")
  );
  clickedThumbnail.classList.add("selected-thumbnail");

  mainImg.style.opacity = "0";

  const loadingImage = new Image();
  loadingImage.onload = () => {
    mainImg.src = loadingImage.src;
    mainImg.style.transition = "opacity 0.5s";
    mainImg.style.opacity = "1";
  };
  loadingImage.src = buildImagePath(src);

  const downloadLink = document.getElementById("download-link");
  downloadLink.href = buildImagePath(src);
  downloadLink.download = src;
}
async function addThumbnail(dateStr) {
    return new Promise((resolve, reject) => {
      const thumbnailsContainer = document.getElementById("thumbnails");
      const container = document.createElement("div");
      container.className = "thumbnail-container";
  
      const img = document.createElement("img");
      img.alt = "Image " + dateStr;
  
      img.onload = resolve; // 当图片加载完成时，解决Promise
      img.onerror = reject; // 当图片加载失败时，拒绝Promise
  
      img.src = buildImagePath(dateStr + ".jpg");
      img.onclick = () => showImage(dateStr + ".jpg", img);
  
      const dateLabel = document.createElement("div");
      dateLabel.className = "thumbnail-date";
      dateLabel.textContent = dateStr;
  
      container.append(img, dateLabel);
      thumbnailsContainer.appendChild(container);
    });
  }

function buildImagePath(filename) {
  return "images/" + filename;
}

async function generateDateThumbnails() {
    const endDate = new Date();
    const startDate = new Date(2024, 1, 1); // 注意月份是从0开始的，11代表12月
    let currentDate = new Date(endDate.getTime());
  
    currentDate.setDate(currentDate.getDate() - 1);
    document.getElementById("thumbnails").innerHTML = "";
  
    while (currentDate >= startDate) {
      const dateStr = formatDate(currentDate);
      try {
        await addThumbnail(dateStr); // 等待当前缩略图加载完成
      } catch (error) {
        console.error('Image could not be loaded:', dateStr);
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }
  
  function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}${month}${day}`;
}

window.onload = () => {
    generateDateThumbnails().then(() => {
      const firstThumbnail = document.querySelector("#thumbnails img");
      if (firstThumbnail) {
        showImage(firstThumbnail.src.split('/').pop(), firstThumbnail);
      }
    });
  };