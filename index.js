const loadCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    const categoriesData = data.data;
    categoriesData.forEach((category) => {
      const categoryContainer = document.getElementById("categories");
      const categoryDiv = document.createElement("div");
      categoryDiv.innerHTML = `
            <button class="px-4 py-2 rounded-lg bg-gray-400 text-white">${category.category}</button>
            `;

      categoryContainer.appendChild(categoryDiv);
    });
  } catch (error) {
    console.log(error);
  }
};

loadCategories();
