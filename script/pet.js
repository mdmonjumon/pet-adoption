
const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategoriesButton(data.categories);
}

// fetch all pets
const loadAllPets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayPets(data.pets);
}

// fetch for category base pets
const categoryBasePets = async (category) => {
    const res =
        await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json();

    // remove active class from category button
    removeClass();

    // add active class on category button
    const activeButton = document.getElementById(`btn-${category}`);
    activeButton.classList.remove("rounded-xl");
    activeButton.classList.add("bg-[#0E7A811A]");
    activeButton.classList.add("rounded-full");
    activeButton.classList.add("border-[#0E7A811A]");

    // Display pets function call with fetch data
    displayPets(data.data);
}

const removeClass = () => {
    const allCategoryButton = document.getElementsByClassName('category-btn');
    for (const button of allCategoryButton) {
        button.classList.remove('bg-[#0E7A811A]');
        button.classList.remove("rounded-full");
        button.classList.remove("border-[#0E7A811A]");
        button.classList.add("rounded-xl");
    }
}



// Display all category buttons
const displayCategoriesButton = (data) => {
    const categoriesButtonContainer = document.getElementById('best-friend');
    const buttonContainer = document.createElement('div');
    buttonContainer.classList = "lg:flex justify-between space-y-4 lg:space-y-0 pt-8"
    data.forEach(item => {
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
        <button id="btn-${item.category}" onclick="categoryBasePets('${item.category}')" class="rounded-xl border-2 w-56 category-btn">
        <div class="flex items-center justify-center gap-2 py-3">
        <img src="${item.category_icon}">
        <span class="font-bold text-2xl">${item.category}</span>
        </div>
        </button>
        `;

        buttonContainer.append(buttonDiv)
    });

    categoriesButtonContainer.appendChild(buttonContainer)
}



// selected pets display
const displaySelectedPets = (image) => {

    const selectedPet = document.createElement('div');
    selectedPet.innerHTML = `
    <img src="${image}">
    `;



}


// display pets
const displayPets = (pets) => {

    // best deal header and sort by price container
    const bestDealInfoContainer = document.getElementById('best-deal-info');
    bestDealInfoContainer.innerHTML = `
    <h2 class="font-black text-2xl">Best Deal For you</h2>
    <button class="font-bold text-xl 
     text-white bg-[#0E7A81] py-4 px-8 rounded-xl">Sort by Price</button>
    `;

    // all pets container
    const bestDealDiv = document.getElementById('cards-container')
    // clear the pets card container
    bestDealDiv.innerHTML = "";
    bestDealDiv.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"


    if (pets.length === 0) {
        // clear the pets card container
        bestDealDiv.innerHTML = ""

        const div = document.createElement('div');
        div.innerHTML = `<div class="flex flex-col items-center">
        <img src="./assets/error.webp">
        <h3 class="font-bold text-3xl mt-5">No Information Available</h3>
        </div>
        `;
        bestDealDiv.append(div);
        bestDealDiv.classList = "w-full rounded-lg flex justify-center py-32 bg-[#13131308]"
    }

    // selected pets container
    const selectedPets = document.getElementById('selected-pets-container');
    // const selectedPets = document.createElement('div');
    selectedPets.classList = "lg:w-2/5 grid grid-cols-2 gap-2 border p-2 rounded-lg mt-10 lg:mt-0"
    // allPets and selected pets append to best deal container
    // bestDealCardContainer.append(bestDealDiv, selectedPets);




    pets.forEach(pet => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="border rounded-lg p-3 shadow-md">
        <figure>
            <img class="w-full rounded-lg" src="${pet.image}" alt="pets" />
        </figure>
        <div class="mt-4 space-y-2 min-w-max">
            <h2 class="card-title">${pet.pet_name}</h2>
            
            <div class="flex gap-1">
            <img src="./assets/breed.png">
            <span>Breed: ${pet.breed ? pet.breed : 'N/A'}</span>
            </div>

            <div class="flex gap-1">
            <img src="./assets/birth.png">
            <span>Birth: ${pet.date_of_birth ? pet.date_of_birth : 'N/A'}</span>
            </div>

            <div class="flex gap-1">
            <img src="./assets/gander.png">
            <span>Gender: ${pet.gender ? pet.gender : 'N/A'}</span>
            </div>

            <div class="flex gap-1">
            <img src="./assets/dollar.png">
           <span>Price: ${pet.price ? pet.price : 'N/A'}</span>
            </div>
            
            <div class="flex justify-between gap-1">
                <button onclick="displaySelectedPets()" class="btn "><img src="./assets/like.png"></button>
                <button class="btn font-bold text-lg text-[#0E7A81]">Adopt</button>
                <button class="btn font-bold text-lg text-[#0E7A81]">Details</button>
            </div>
        </div>
    </div>
        `;

        bestDealDiv.append(card)


    })


}








loadCategories();
loadAllPets();