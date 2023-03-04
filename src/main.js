console.log(`js is connected`);

const dataLoader = async () => {
  try {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    const loadedData = await res.json();

    displayDataToCard(loadedData.data.tools);
    allCardDisplay(loadedData.data.tools);
  } catch (error) {
    console.log(error);
  }
};

// window.onload
dataLoader();

// function for re use
const elById = (id) => document.getElementById(id);
const elsByClass = (className) => document.getElementsByClassName(className);

let cards_container = elById("cards_container");

const displayDataToCard = (dataArray) => {
  let newArray = dataArray.slice(0, 6);

  newArray.map((singleData) => {
    let { id, name, description, image, published_in, features, links } =
      singleData;
    const div = document.createElement("div");
    div.innerHTML = `<div class="flex justify-center">
        <div class="block max-w-sm rounded-lg bg-white shadow-xl">
          <!-- card image -->
          <a href="#!" data-te-ripple-init data-te-ripple-color="light">
           <img class="rounded-t-lg" src="${image}" alt="" />
          </a>
          <!-- card text -->
          <div class="p-5 bg-white rounded-b-md">
           <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 ">Features</h5>
           <ol id="feature_list" class="list-decimal text-neutral-700  px-6 mb-4">
             <li>${features[0]}</li>
             <li>${features[1]}</li>
             <li>${features[2]}</li>
             
           </ol>
           <hr>
           <div class="mt-2 grid grid-flow-col justify-between">
              <!-- title and date -->
              <div>
                <h2 class="text-2xl text-slate-700">${name}</h2>
                <img class="inline" src="img/calander_icon.png" alt="">
                <span class="text-slate-600" >${published_in}</span>
              </div>
              <!-- button -->
              <div id="btn_arrow">
              
                <div class="space-y-2">
                
              <button
            onclick="singleCardDataLoader(${id})"
            type="button"
            class="inline-block"
            data-te-toggle="modal"
            data-te-target="#exampleModalLg"
            data-te-ripple-init
            data-te-ripple-color="light">
            <img src="img/arrowBtn.png" alt="">
              </button>
            
                </div>
                <!-- after click on button  -->
              </div>
            </div>
          </div>
        </div>
      </div>`;
    cards_container.appendChild(div);

    // let feature_list = elById('feature_list');
    // for(let feature of features){
    //   let li = document.createElement('le');
    //   li.innerText = feature;
    //   feature_list.appendChild(li)
    // }

    // for spinner[ remove]
    let spinner = elById("spinner");
    if (cards_container.innerHTML.length > 0) {
      spinner.classList.add("hidden");
    }
  });
};
// data load for modal popup
const singleCardDataLoader = async (id) => {
  try {
    id < 10 ? (id = `0${id}`) : id;
    console.log(`Card no : ${id}`);
    // fix the error of url
    const singleDataUrl = `https://openapi.programming-hero.com/api/ai/tool/${id}`;

    const res = await fetch(singleDataUrl);
    const loadedDetails = await res.json();
    modalLouncher(loadedDetails.data);
    // displayDataToCard(loadedData.data.tools)
  } catch (error) {
    console.log(error);
  }
};

const modalLouncher = (singleCardObj) => {
  let { id, tool_name, description, website, logo, image_link, input_output_examples, features, integrations, use_cases, pricing, accuracy } = singleCardObj;
  // let { input, output } = input_output_examples[0];

  
  
  // for handle input_output_examples Errors 
  let input, output
  input_output_examples === null ?  input = `Input not found` : { input, output } = input_output_examples[0];
  input_output_examples === null ?  output = `Output not found` : { input, output } = input_output_examples[0];
  
  // for accuracy data and it's error 
  let accuracyPercentage = accuracy.score === null ? '' : `${accuracy.score*100}% Accuracy`

  // console.log(input_output_examples[0]);
  let exampleModalLgLabel = (elById("exampleModalLgLabel").innerText =
    tool_name);
  let modal_tahmnail = (elById("modal_tahmnail").innerHTML = `
    <div class="relative">
      <div class=" bg-red-600 text-slate-100 inline absolute right-1 top-1 rounded-md" id="accuracy_percent">${accuracyPercentage}</div>
      
      <img class="rounded-t-lg shadow-md rounded-b-md" src="${image_link[0]}" alt="" />
    </div>
    <div> 
      <div class="font-bold text-xl text-slate-700 mt-2">${input} </div>
      <div class="text-slate-600">${output}</div>
    </div>
                                                              
    `);

    // codition for handling accuracy data not found or null
    elById("accuracy_percent").innerText.length > 0 ? elById("accuracy_percent").classList.add('p-2'): elById("accuracy_percent").classList.remove('p-2');

  let card_description = (elById("card_description").innerText = description);

  // for pricing of service 
  let pricing_of_service = elsByClass('pricing_of_service')

  // pricing_of_service[0].innerHTML = `<h1>${pricing[0].plan}</h1> <h1>${pricing[0].price}</h1>`;
  // pricing_of_service[1].innerHTML = `<h1>${pricing[1].plan}</h1> <h1>${pricing[1].price}</h1>`;
  // pricing_of_service[2].innerHTML = `<h1>${pricing[2].plan}</h1> <h1>${pricing[2].price}</h1>`;
  pricing_of_service[0].innerHTML = `<h1>${ pricing===null? `No plan found`: pricing[0].plan}</h1> <h1>${pricing===null? `No price found`: pricing[0].price }</h1>`;
  pricing_of_service[1].innerHTML = `<h1>${ pricing===null? `No plan found`: pricing[1].plan}</h1> <h1>${pricing===null? `No price found`: pricing[1].price }</h1>`;
  pricing_of_service[2].innerHTML = `<h1>${ pricing===null? `No plan found`: pricing[2].plan}</h1> <h1>${pricing===null? `No price found`: pricing[2].price }</h1>`;
  

  /**
   * few modal's features is not same as it's respective card
   *  for instance for card id 1,3, 7 feature is not same on modal
   * for card id 2, 16 feature is same on modal
   */
  elById("modal_feature_1").innerText = features[1].feature_name;
  elById("modal_feature_2").innerText = features[2].feature_name;
  elById("modal_feature_3").innerText = features[3].feature_name;

  // for intrigation
  integrations===null ? integrations = [ "Not found", "Not found", "Not found" ] : integrations ;
  let modal_intrigation_1 =  elById("modal_intrigation_1");
  let modal_intrigation_2 =  elById("modal_intrigation_2");
  let modal_intrigation_3 =  elById("modal_intrigation_3");
  integrations[0] === undefined ? modal_intrigation_1.innerText = `Not found` : modal_intrigation_1.innerText = integrations[0];
  integrations[1] === undefined ? modal_intrigation_2.innerText = `Not found` : modal_intrigation_2.innerText = integrations[1];
  integrations[2] === undefined ? modal_intrigation_3.innerText = `Not found` : modal_intrigation_3.innerText = integrations[2];
};

const allCardDisplay = (dataArray) => {
  // console.log(dataArray);

  let seemoreBtn = document.querySelectorAll("#see_more_footer h1")[0];
  seemoreBtn.addEventListener("click", () => {
    seemoreBtn.classList.remove("inline-block");
    seemoreBtn.classList.add("hidden");

    cards_container.innerText = "";
    // console.log(dataArray);
    dataArray.map((singleData) => {
      let { id, name, description, image, published_in, features, links } =
        singleData;
      const div = document.createElement("div");
      div.innerHTML = `<div class="flex justify-center">
        <div class="block max-w-sm rounded-lg bg-white shadow-xl">
          <!-- card image -->
          <a href="#!" data-te-ripple-init data-te-ripple-color="light">
           <img class="rounded-t-lg" src="${image}" alt="" />
          </a>
          <!-- card text -->
          <div class="p-5 bg-white rounded-b-md">
           <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 ">Features</h5>
           <ol id="feature_list" class="list-decimal text-neutral-700  px-6 mb-4">
             <li>${features[0]}</li>
             <li>${features[1]}</li>
             <li>${features[2]}</li>
             
           </ol>
           <hr>
           <div class="mt-2 grid grid-flow-col justify-between">
              <!-- title and date -->
              <div>
                <h2 class="text-2xl text-slate-700">${name}</h2>
                <img class="inline" src="img/calander_icon.png" alt="">
                <span class="text-slate-600" >${published_in}</span>
              </div>
              <!-- button -->
              <div id="btn_arrow">
              
                <div class="space-y-2">
                
              <button
            onclick="singleCardDataLoader(${id})"
            type="button"
            class="inline-block"
            data-te-toggle="modal"
            data-te-target="#exampleModalLg"
            data-te-ripple-init
            data-te-ripple-color="light">
            <img src="img/arrowBtn.png" alt="">
              </button>
            
                </div>
                <!-- after click on button  -->
              </div>
            </div>
          </div>
        </div>
      </div>`;
      cards_container.appendChild(div);
    });
  });
};

const sortedAllCardDisplay = (dataArray) => {
  dataArray.map((singleData) => {
    let { id, name, description, image, published_in, features, links } =
      singleData;
    const div = document.createElement("div");
    div.innerHTML = `<div class="flex justify-center">
      <div class="block max-w-sm rounded-lg bg-white shadow-xl">
        <!-- card image -->
        <a href="#!" data-te-ripple-init data-te-ripple-color="light">
         <img class="rounded-t-lg" src="${image}" alt="" />
        </a>
        <!-- card text -->
        <div class="p-5 bg-white rounded-b-md">
         <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 ">Features</h5>
         <ol id="feature_list" class="list-decimal text-neutral-700  px-6 mb-4">
           <li>${features[0]}</li>
           <li>${features[1]}</li>
           <li>${features[2]}</li>
           
         </ol>
         <hr>
         <div class="mt-2 grid grid-flow-col justify-between">
            <!-- title and date -->
            <div>
              <h2 class="text-2xl text-slate-700">${name}</h2>
              <img class="inline" src="img/calander_icon.png" alt="">
                <span class="text-slate-600" >${published_in}</span>
            </div>
            <!-- button -->
            <div id="btn_arrow">
            
              <div class="space-y-2">
              
            <button
          onclick="singleCardDataLoader(${id})"
          type="button"
          class="inline-block"
          data-te-toggle="modal"
          data-te-target="#exampleModalLg"
          data-te-ripple-init
          data-te-ripple-color="light">
          <img src="img/arrowBtn.png" alt="">
            </button>
          
              </div>
              <!-- after click on button  -->
            </div>
          </div>
        </div>
      </div>
    </div>`;
    cards_container.appendChild(div);
  });
};

// for spinner [ add ]
let spinner = elById("spinner");
if (cards_container.innerHTML.length === 0) {
  spinner.classList.remove("hidden");
}

/**
 * For Sorting functionality
 *
 */
const loadAgainForSort = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    const loadedData = await res.json();
    //function for sorting array
    function sorter(a, b) {
      return (
        new Date(a.published_in).getTime() - new Date(b.published_in).getTime()
      );
    }

    const allDataArray = loadedData.data.tools;
    const smallArray = allDataArray.slice(0, 6);
    // sorting function called
    const sortedArraySmall = smallArray.sort(sorter);
    const sortedArrayAll = allDataArray.sort(sorter);

    if (cards_container.children.length == 6) {
      cards_container.innerHTML = "";
      displayDataToCard(sortedArraySmall);
      console.log(`visible 6 card is sorted.`);
    } else {
      cards_container.innerHTML = "";
      sortedAllCardDisplay(sortedArrayAll);
      console.log(`visible all card is sorted.`);
    }
  } catch (error) {
    console.log(error);
  }
};

const sort_btn = elById("sort_btn");
sort_btn.addEventListener("click", loadAgainForSort);
