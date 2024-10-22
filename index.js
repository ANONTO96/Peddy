// global function
const categoryBtns = document.getElementById('category');
const categoryContent = document.getElementById('categoryContent');

// load all pets
const loadAll = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayAll(data.pets);
}
// display all pets
const displayAll = async(pets) => {
    pets.forEach(pet => {
        const card = document.createElement('div');
        card.classList.add('shadow-xl','p-3','rounded-xl')
        card.innerHTML = `
        <img class = "w-80 h-52 rounded-lg mb-3" src="${pet.image}">
        <h4 class = "font-semibold text-xl text-gray-600 mb-2">${pet.pet_name}</h4>
        <p class = "flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=100&id=44642&format=png&color=000000">Breed: ${pet.breed == null?"Not Available":pet.breed}</p>
        <p class = "flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=100&id=4p2G9EBQbqA4&format=png&color=000000">Birth: ${pet.date_of_birth == null?"Not Available":pet.date_of_birth}</p>
        <p class = "flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=100&id=VvuxHvMh3DjV&format=png&color=000000">Gender: ${pet.gender == null?"Not Available":pet.gender}</p>
        <p class = "flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=100&id=mwsp7FE9gx13&format=png&color=000000">Price: ${pet.price}$</p>
        <div class = "flex justify-between mt-3">
        <button class="btn"><img class = "w-6" src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"></button>
        <button onclick="showAdopted('${pet.petId}')" id = "adoptBtn${pet.petId}" class="btn adoptBtn  text-teal-600">Adopt</button>
        <button id="showModal" class="btn text-teal-600" onclick="loadDetails('${pet.petId}')">Details</button>
        </div>
        `
        categoryContent.appendChild(card)
     });
         
}

// load category
const loadCategoryId = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategories(data.categories);
}
// display category
const displayCategories = (categories) => {
    categories.forEach(category => {
    const categoryButtons = document.createElement('div');
    categoryButtons.innerHTML = `
      <button id = "btn-${category.category}" onclick = "loadCategoryContent('${category.category}')" class= "btn buttons px-10 bg-sky-100 hover:bg-sky-200 hover:border-sky-500 rounded-3xl">
      <img class = "w-5" src="${category.category_icon}">
      ${category.category}
        </button>
     `
     categoryBtns.append(categoryButtons); 
    });
}

// load category content
const loadCategoryContent = async (category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json();
    // removing class in btn
    removeClass();
    // making actv btn by adding class
    const addClass = document.getElementById(`btn-${category}`);
    addClass.classList.add('bg-sky-100', 'hover:bg-sky-200', 'hover:border-sky-500');
    clearContainer();
    displayCategoryContent(data.data);
}
// removing class
const removeClass = () => {
    const buttons = document.getElementsByClassName('buttons');
    for(button of buttons){
        button.classList.remove('bg-sky-100', 'hover:bg-sky-200', 'hover:border-sky-500')
    }
}
// clearing container before display
const clearContainer = () => {
    categoryContent.innerText = ""
}
// display category content
const displayCategoryContent = (data) => {
    if(data.length == ""){
        categoryContent.classList.remove('grid')
        const div = document.createElement('div');
        div.classList.add('flex','flex-col','item-center','text-center','my-20')
        div.innerHTML = `
        <img class = "w-40 mx-auto" src = "./images/error.webp">
        <h3 class = "text-3xl font-bold">No Information Available</h3>
        <p class = " text-xl text-gray-600
        ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        `
        categoryContent.appendChild(div)
    }
    else{
        data.forEach(item => {
            categoryContent.classList.add('grid')
            const card = document.createElement('div');
            card.classList.add('shadow-xl','p-3','rounded-xl')
            card.innerHTML = `
            <img class = "w-80 h-52 rounded-lg mb-3" src="${item.image}">
            <h4 class = "font-semibold text-xl text-gray-600 mb-2">${item.pet_name}</h4>
            <p class = "flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=100&id=44642&format=png&color=000000">Breed: ${item.breed == null?"Not Available":item.breed}</p>
            <p class = "flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=100&id=4p2G9EBQbqA4&format=png&color=000000">Birth: ${item.date_of_birth == null?"Not Available":item.date_of_birth}</p>
            <p class = "flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=100&id=VvuxHvMh3DjV&format=png&color=000000">Gender: ${item.gender == null?"Not Available":item.gender}</p>
            <p class = "flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=100&id=mwsp7FE9gx13&format=png&color=000000">Price: ${item.price}$</p>
            <div class = "flex justify-between mt-3">
            <button class="btn"><img class = "w-6" src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"></button>
            <button onclick="showAdopted(${item.petId})" id = "adoptBtn${item.petId}" class="btn  text-teal-600">Adopt</button>
            <button id="showModal" class="btn text-teal-600" onclick="loadDetails('${item.petId}')">Details</button>
            </div>
            `
            categoryContent.appendChild(card)
             });
    }
}
// show adopted modal 
const showAdopted = (petId) => {
    const detailContainer = document.getElementById('modalContent');
    const adoptBtn = document.getElementById(`adoptBtn${petId}`);
    adoptBtn.innerText = "Adopted";
    adoptBtn.classList.remove('text-teal-600');
    adoptBtn.classList.add('text-gray-400');

    detailContainer.innerHTML = `
    <div class = "flex flex-col items-center">
    <img class = "w-40" src = "https://img.icons8.com/?size=100&id=110578&format=png&color=000000">
    <h4 class = "font-bold text-3xl">* Congrats *</h4>
    <p class = "flex items-center text-lg text-gray-600">Your initial adoption process done <img class = "w-8" src="https://img.icons8.com/?size=100&id=YLcBDJsEZ49a&format=png&color=000000"></p>
    </div>
    `
    document.getElementById('customModal').showModal();
}

// load details modal of content
const loadDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
     const data = await res.json();
    displayDetails(data.petData); 
  };
   // for showing details modal of content
const displayDetails = (petData) => {
     const detailContainer = document.getElementById('modalContent');
     detailContainer.innerHTML = `
     <img class = "w-full mb-3 rounded-md" src =${petData.image} />
     <h4 class = "font-semibold text-2xl">${petData.pet_name}</h4>
    <p class = "flex gap-2 mb-1"><img class = "w-5" src="https://img.icons8.com/?size=100&id=44642&format=png&color=000000">Breed: ${petData.breed == null?"Not Available":petData.breed}</p>
    <p class = "flex gap-2 mb-1"><img class = "w-5" src="https://img.icons8.com/?size=100&id=4p2G9EBQbqA4&format=png&color=000000">Birth: ${petData.date_of_birth == null?"Not Available":petData.date_of_birth}</p>
    <p class = "flex gap-2 mb-1"><img class = "w-5" src="https://img.icons8.com/?size=100&id=VvuxHvMh3DjV&format=png&color=000000">Gender: ${petData.gender == null?"Not Available":petData.gender}</p>
    <p class = "flex gap-2 mb-1"><img class = "w-5" src="https://img.icons8.com/?size=100&id=mwsp7FE9gx13&format=png&color=000000">Price: ${petData.price}$</p>
    <p class = "flex gap-2 mb-3">Vaccinated Status: ${petData.vaccinated_status}</p>
    <p class = "text-lg font-semibold">Details Information : </p>
    <p>${petData.pet_details}</p>
     `
    document.getElementById('customModal').showModal();
  } 

loadCategoryId();
loadAll();