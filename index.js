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
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await res.json();
    const singleCategoryData = data.data;
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
         
          <h2 class="card-title font-bold">
            ${category.title}
          </h2>
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
  } catch (error) {
    console.log(error);
  }
};
// go to blog page
const blogPage = document.getElementById('blog')
blogPage.addEventListener('click', () => {
  window.location.href= './blog.html';
})
loadCategories();
singleCategoryData("1000");
