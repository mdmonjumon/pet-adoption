
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


// Display all category buttons
const displayCategoriesButton = (data) => {
    const categoriesButtonContainer = document.getElementById('best-friend');
    const buttonContainer = document.createElement('div');
    buttonContainer.classList = "lg:flex justify-between space-y-4 lg:space-y-0 pt-8"
    data.forEach(item => {
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
        <button class="rounded-xl border-2 w-56">
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

// display pets
const displayPets = (pets) => {

    const bestDealInfoContainer = document.getElementById('best-deal-info');
    bestDealInfoContainer.innerHTML=`
    <h2 class="font-black text-2xl">Best Deal For you</h2>
    <button class="font-bold text-xl 
     text-white bg-[#0E7A81] py-4 px-8 rounded-xl">Sort by Price</button>
    `;
    const bestDealSection = document.getElementById('best-deal-cards');
    bestDealSection.classList = "md:flex gap-4 my-10"
    // all pets
    const bestDealDiv = document.createElement('div');
    bestDealDiv.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-2 p-2 rounded-lg"

    // selected pets
    const selectedPets = document.createElement('div');
    selectedPets.classList = "w-2/5 grid grid-cols-2 gap-2 border-2 p-2 rounded-lg"
    // allPets and selected pets append to best deal section
    bestDealSection.append(bestDealDiv, selectedPets);
    

    


    pets.forEach(pet => {
        console.log(pet)
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="border-2 rounded-lg p-2">
        <figure>
            <img class=" rounded-lg" src="${pet.image}" alt="pets" />
        </figure>
        <div class="mt-4 space-y-2 min-w-max">
            <h2 class="card-title">${pet.pet_name}</h2>
            
            <div class="flex gap-1">
            <img src="./assets/breed.png">
            <span>Breed: ${pet.breed? pet.breed : 'N/A'}</span>
            </div>

            <div class="flex gap-1">
            <img src="./assets/birth.png">
            <span>Birth: ${pet.date_of_birth? pet.date_of_birth : 'N/A'}</span>
            </div>

            <div class="flex gap-1">
            <img src="./assets/gander.png">
            <span>Gender: ${pet.gender? pet.gender : 'N/A'}</span>
            </div>

            <div class="flex gap-1">
            <img src="./assets/dollar.png">
           <span>Price: ${pet.price? pet.price : 'N/A'}</span>
            </div>
            
            <div class="flex justify-between gap-1">
                <button class="btn "><img src="./assets/like.png"></button>
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