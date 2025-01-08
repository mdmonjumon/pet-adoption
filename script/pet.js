
const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategoriesButton(data.categories);
}

// fetch all pets
const loadAllPets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();

    // spin while fetching all data
    document.getElementById('spinner').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('spinner').classList.add('hidden');
        displayPets(data.pets);

    }, 2000);
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
    // spin while fetching all data
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('all-pets-and-selected-pets-container').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('all-pets-and-selected-pets-container').classList.remove('hidden');
        displayPets(data.data);
    }, 2000);
}


// fetch pet details
const petDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await res.json();
    displayPetDetails(data.petData);
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
    const selectedPetsContainer = document.getElementById('selected-pets-container');
    const selectedPet = document.createElement('div');
    selectedPet.innerHTML = `
    <img class="rounded-md w-full" src="${image}">
    `;
    selectedPetsContainer.append(selectedPet);
}



// display pet details
const displayPetDetails = (details) => {
    const modalSection = document.getElementById('modal');
    modalSection.innerHTML = `
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box space-y-3">
                <img class="w-full rounded-md" src="${details.image}">

                <h3 class="text-2xl font-bold">${details.pet_name}</h3>
                <div class="flex gap-4 border-b-2 pb-3">
                    <div>
                        <div class="flex gap-1">
                            <img src="./assets/breed.png">
                            <span> Breed: ${details.breed ? details.breed : 'N/A'} </span>
                        </div>

                        <div class="flex gap-1">
                            <img src="./assets/gander.png">
                            <span> Gander: ${details.gender ? details.gender : 'N/A'} </span>
                        </div>

                        <div class="flex gap-1">
                            <img src="./assets/gander.png">
                            <span> Vaccinated status: ${details.vaccinated_status ? details.vaccinated_status : 'N/A'} </span>
                        </div>
                    </div>



                    <div>
                        <div class="flex gap-1">
                            <img src="./assets/birth.png">
                            <span> Birth: ${details.date_of_birth ? details.date_of_birth : 'N/A'} </span>
                        </div>
                        <div class="flex gap-1">
                            <img src="./assets/dollar.png">
                            <span> Price: ${details.price ? details.price : 'N/A'} </span>
                        </div>


                    </div>
                </div>
                <h3 class="font-semibold text-base">Details Information</h3>
                <p>${details.pet_details}</p>
                
                <div class="modal-action">
                    <form method="dialog" class="w-full">
                        <button class="font-bold text-[#0E7A81] py-3 bg-[#0E7A811A] border-2 rounded-md w-full">Cancel</button>
                    </form>
                </div>
            </div>
         </dialog>
    `;

    my_modal_1.showModal()

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

            <div class="flex gap-1 pb-2">
            <img src="./assets/dollar.png">
           <span>Price: ${pet.price ? pet.price : 'N/A'}</span>
            </div>
            
            <div class="flex justify-between gap-1 border-t-2 pt-3">
                <button onclick="displaySelectedPets('${pet.image}')" class="btn "><img src="./assets/like.png"></button>
                <button onclick="adoptModal(event)" class="btn font-bold text-lg text-[#0E7A81]">Adopt</button>
                <button onclick="petDetails('${pet.petId}')" class="btn font-bold text-lg text-[#0E7A81]">Details</button>
            </div>
        </div>
        </div>
        `;

        bestDealDiv.append(card)


    })

}






const adoptModal = (event) => {
    const targetedButton = event.target;
    targetedButton.innerText ="Adopted";
    targetedButton.setAttribute("disabled", "true");

    const adoptModalContainer = document.getElementById('adopt-modal');
    let count = 3
    adoptModalContainer.innerHTML = ` 

    <dialog id="myModal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box flex flex-col items-center py-10">
            <img class="w-20" src="./assets/handshake.png">
            <h3 class="text-2xl font-black">Congrats!</h3>
            <p class="font-normal text-xl">Adoption process is star for your Pet</p>
            <span id="countdown" class="font-black text-4xl">${count}</span>
        </div>
    </dialog>
    `;

    document.getElementById('myModal').setAttribute("open", "true")
    const clockId = setInterval(() => {
        count--
        document.getElementById('countdown').innerText = count;
        if (count === 0) {
            clearInterval(clockId);
            document.getElementById('myModal').removeAttribute("open")
        }
    }, 1000);
}









loadAllPets();
loadCategories();


