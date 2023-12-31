let currentCategory;
const loadCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    const categoriesData = data.data;
    const categoryContainer = document.getElementById("categories");
    categoriesData.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.innerHTML = `
            <button onclick="singleCategoryData( '${category.category_id}')" class="px-4 py-2 rounded-lg bg-gray-400 text-white">${category.category}</button>
            `;
      categoryContainer.appendChild(categoryDiv);
    });
  } catch (error) {
    console.log(error);
  }
};

// individual category data load
const singleCategoryData = async (categoryId) => {
  currentCategory = categoryId;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await res.json();
    const singleCategoryData = data.data;
    if (singleCategoryData.length === 0) {
      const noData = document.getElementById("no-data");
      noData.classList.remove("hidden");
    } else {
      const noData = document.getElementById("no-data");
      noData.classList.add("hidden");
    }
    showSingleCard(singleCategoryData);
  } catch (error) {
    console.log(error);
  }
};

// show single card
const showSingleCard = (singleCategoryData) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const imageElement = document.createElement("img");
  imageElement.className = "h-7 w-7";
  imageElement.src = "./images/badge-check.png";
  singleCategoryData.forEach((category) => {
    let veriFiedImage =
      '<img class="h-7 w-7" src="./images/badge-check.png" alt="">';
    // time format
    const dateInSeconds = category.others.posted_date;
    const seconds = parseInt(dateInSeconds, 10);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    // Format the result as "Xhrs Ymin"
    const formattedTime = `${hours}hrs ${minutes}min ago`;

    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class="card  bg-base-100 shadow-xl">
        <figure>
          <img
            class="h-52"
            src="${category.thumbnail}"
            alt="Shoes"
          />
        </figure>
        <div class="absolute bottom-48 right-4">
          <span class="${
            category.others.posted_date
              ? "bg-slate-950 text-white px-2 py-2 rounded-lg"
              : ""
          }">${category.others.posted_date ? formattedTime : ""}</span>
        </div>
        <div class="card-body">
         <div class = "flex space-x-4 ">
         <img class="w-8 h-8 rounded-full" src="${category.authors[0].profile_picture}" alt="">
         <h2 class="card-title font-bold">
            ${category.title}
          </h2>
         </div>
          
          <div class="flex space-x-4 items-center">
            <p class="grow-0 ">${category.authors[0].profile_name}</p>
            <div>
            ${category.authors[0].verified === true ? veriFiedImage : ""}
            </div>
          </div>
          <p>${category?.others?.views} Views</p>
        </div>
      </div>
   
      `;
    cardContainer.appendChild(cardDiv);
  });
};

// sort card decending order
const sortCard = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${currentCategory}`
    );
    const data = await res.json();
    const singleCategoryData = data.data;
    const viewsData = [];
    singleCategoryData.forEach((item) => {
      const value = item.others.views.replace("k", "");
      item.others.views = parseInt(value) * 1000;
      viewsData.push(item);
    });
    const sortedList = viewsData.sort(
      (a, b) => b.others.views - a.others.views
    );
    showSingleCard(sortedList);
  } catch (error) {
    console.log(error);
  }
};

const sortbyView = document.getElementById("sortByView");
sortbyView.addEventListener("click", sortCard);

// go to blog page
const blogPage = document.getElementById("blog");
blogPage.addEventListener("click", () => {
  window.location.href = "./blog.html";
});
loadCategories();
singleCategoryData("1000");
