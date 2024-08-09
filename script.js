const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

let rotate = 0;

const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg)`; 
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)
  grayscale(${grayscale}%)`
}

const loadImage = () => {
  let file = fileInput.files[0]; // getting user selected file
  if(!file) return; // return if user hasn't selected file
  previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
  previewImg.addEventListener("load",() => {
    resetFilterBtn.click();
    document.querySelector(".container").classList("disable");
  });
}


filterOptions.forEach(option => {
  option.addEventListener("click", () => { // adding click event listener to all filter button
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if(option.id === "brightness"){
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if(option.id === "saturation"){
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    }else if(option.id === "inversion"){
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    }else{
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }

  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");  // getting selected filter btn

  if(selectedFilter.id === "brightness"){
    brightness = filterSlider.value;
  } else if(selectedFilter.id === "saturation"){
    saturation = filterSlider.value;
  } else if(selectedFilter.id === "inversion"){
    inversion = filterSlider.value;
    
  }else{
    grayscale = filterSlider.value;     
  }

  applyFilters();

}

rotateOptions.forEach(option => {
  option.addEventListener("click",() => {   // adding click event listener to all rotate button
    if(option.id === "left"){
      rotate -=90;  // if clicked btn is left rotate,decrement rotate value by -90
    } else if(option.id === "right"){
      rotate +=90;  // if clicked btn is left rotate,increment rotate value by -90
    }
    applyFilters();
  });
});

// crop function



const resetFilter = () => {
  // resetting all variable value to its default value
  brightness = 100; saturation = 100; inversion = 0; grayscale = 0; rotate = 0;
  filterOptions[0].click(); // clicking brightness btn so the brightness selected by default
  applyFilters();
}

const saveImage = () =>{
  const canvas = document.createElement("canvas"); // creating canvas element
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

// applying user selected filter to canvas filter
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)
  grayscale(${grayscale}%)`;
  ctx.drawImage(previewImg , 0, 0, canvas.width,canvas.height);
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input",updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click",() => fileInput.click());