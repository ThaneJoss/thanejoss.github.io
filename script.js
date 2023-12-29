function showImage(src, clickedThumbnail) {
    const mainImg = document.getElementById("main-img");
    const thumbnails = document.querySelectorAll("#thumbnails img");
  
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('selected-thumbnail'));
    clickedThumbnail.classList.add('selected-thumbnail');
  
    mainImg.style.opacity = '0';
  
    const loadingImage = new Image();
    loadingImage.onload = () => {
      mainImg.src = loadingImage.src;
      mainImg.style.transition = 'opacity 0.5s';
      mainImg.style.opacity = '1';
    };
    loadingImage.src = buildImagePath(src);
  
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = buildImagePath(src);
    downloadLink.download = src;
  }
  
  function addThumbnail(dateStr) {
    const thumbnailsContainer = document.getElementById("thumbnails");
    const container = document.createElement("div");
    container.className = "thumbnail-container";
  
    const img = document.createElement("img");
    img.src = buildImagePath(dateStr + ".jpg");
    img.alt = "Image " + dateStr;
    img.onclick = () => showImage(dateStr + ".jpg", img);
  
    const dateLabel = document.createElement("div");
    dateLabel.className = "thumbnail-date";
    dateLabel.textContent = dateStr;
  
    container.append(img, dateLabel);
    thumbnailsContainer.appendChild(container);
  }
  
  function buildImagePath(filename) {
    return "images/" + filename;
  }
  
  function generateDateThumbnails() {
    const endDate = new Date();
    const startDate = new Date(2023, 11, 1);
    let currentDate = new Date(endDate.getTime());
  
    currentDate.setDate(currentDate.getDate() - 1);
    document.getElementById("thumbnails").innerHTML = "";
  
    while (currentDate >= startDate) {
      const dateStr = formatDate(currentDate);
      addThumbnail(dateStr);
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
    generateDateThumbnails();
    const firstThumbnail = document.querySelector("#thumbnails img");
    if (firstThumbnail) {
      showImage(firstThumbnail.src.split('/').pop(), firstThumbnail);
    }
  };