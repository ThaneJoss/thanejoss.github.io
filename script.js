function showImage(src, clickedThumbnail) {
  var mainImg = document.getElementById("main-img");
  var thumbnails = document
    .getElementById("thumbnails")
    .getElementsByTagName("img");

  // Loop through the thumbnail images and remove the 'selected-thumbnail' class
  for (var i = 0; i < thumbnails.length; i++) {
    thumbnails[i].classList.remove("selected-thumbnail");
  }

  // Add the 'selected-thumbnail' class to the clicked thumbnail
  clickedThumbnail.classList.add("selected-thumbnail");

  // Fade out the main image before changing the source
  mainImg.style.opacity = "0";

  // Load the new image
  var loadingImage = new Image();
  loadingImage.onload = function () {
    // When the image is loaded, update the main image's src and fade it in
    mainImg.src = this.src;
    mainImg.style.opacity = "1";
  };

  // Set the source of the preloading image to the clicked thumbnail's source
  loadingImage.src = "images/" + src;

  // 更新下载链接
  var downloadLink = document.getElementById("download-link");
  downloadLink.href = "images/" + src; // 修改这里以匹配你的图片文件路径
  downloadLink.download = src; // 修改这里以匹配你的图片文件路径
}

function addThumbnail(dateStr) {
  var thumbnailsContainer = document.getElementById("thumbnails");
  var container = document.createElement("div");
  container.className = "thumbnail-container";

  var img = document.createElement("img");
  img.src = "images/" + dateStr + ".jpg";
  img.alt = "Image " + dateStr;
  img.onclick = function () {
    showImage(dateStr + ".jpg", img);
  };

  var dateLabel = document.createElement("div");
  dateLabel.className = "thumbnail-date";
  dateLabel.textContent = dateStr;

  container.appendChild(img);
  container.appendChild(dateLabel);
  thumbnailsContainer.appendChild(container);
}

function generateDateThumbnails() {
  var endDate = new Date();
  var startDate = new Date(2023, 11, 1);
  var currentDate = endDate;

  currentDate.setDate(currentDate.getDate() - 1);

  // 清空当前的缩略图
  document.getElementById("thumbnails").innerHTML = "";

  while (currentDate >= startDate) {
    var dateStr = formatDate(currentDate);
    addThumbnail(dateStr);
    // 设置为前一天
    currentDate.setDate(currentDate.getDate() - 1);
  }
}

function formatDate(date) {
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  return "" + year + month + day;
}

// 初始化画廊并生成缩略图
window.onload = function () {
  generateDateThumbnails();
  var firstThumbnail = document
    .getElementById("thumbnails")
    .getElementsByTagName("img")[0];
  if (firstThumbnail) {
    // Directly use the filename obtained from firstThumbnail.src
    showImage(firstThumbnail.src.split("/").pop(), firstThumbnail);
  }
};
