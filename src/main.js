console.log(`js is connected`);

const dataLoader = async() => {
    

    try {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const loadedData = await res.json();

    displayDataToCard(loadedData.data.tools);
    allCardDisplay(loadedData.data.tools)

    } catch (error) {
        console.log(error)
    }

}

// window.onload
dataLoader()
let cards_container = document.getElementById('cards_container');

const displayDataToCard = (dataArray) => {
    
    let newArray = dataArray.slice(0,6)
   
    newArray.map((singleData) => {
        let {id, name, description, image, published_in, features, links} = singleData;
        const div = document.createElement('div')
        div.innerHTML = `<!-- card 01 -->
        <div class="flex justify-center">
         <div class="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
           <!-- card image -->
           <a href="#!" data-te-ripple-init data-te-ripple-color="light">
            <img class="rounded-t-lg" src="${image}" alt="" />
           </a>
           <!-- card text -->
           <div class="p-5">
            <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Features</h5>
            <ol class="list-decimal text-white  px-6 mb-4">
              <li>featuer 01</li>
              <li>featuer 02</li>
              <li>feature</li>
            </ol>
            <hr>
            <div class="mt-2 grid grid-flow-col justify-between">
               <!-- title and date -->
               <div>
                 <h2 class="text-2xl">Title</h2>
                 <span>date: 11/02/2023</span>
               </div>
               <!-- button -->
               <div id="btn_arrow" onclick="singleCardDataLoader(${id})">
                 <div class="space-y-2">

                    <button
                    type="button"
                    class="inline-block"
                    data-te-toggle="modal"
                    data-te-target="#exampleModalLg"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    <img src="img/arrowBtn.png" alt="">
                    </button>
           
                 </div>
                
               </div>
             </div>
           </div>
         </div>
            </div>`
      cards_container.appendChild(div)
    })
};

const singleCardDataLoader = async (id) =>{
    try {

        // fix the error of url 
        const singleDataUrl = `https://openapi.programming-hero.com/api/ai/tool/0${id}`

        const res = await fetch(singleDataUrl);
        const loadedDetails = await res.json();
        modalLouncher(loadedDetails.data)
        // displayDataToCard(loadedData.data.tools)
    
    } catch (error) {
            console.log(error)
    }
}

const modalLouncher = (singleCardObj) =>{
    let {id, tool_name, description, website, logo, image_link, input_output_examples, features, integrations, use_cases} = singleCardObj;
    let exampleModalLgLabel = document.getElementById('exampleModalLgLabel').innerText = tool_name;
    let modal_tahmnail = document.getElementById('modal_tahmnail').innerHTML = `<img
                                                                    class="rounded-t-lg"
                                                                    src=" ${image_link[0]} "
                                                                    alt="" />`
    console.log(image_link[0]);
}



const allCardDisplay = (dataArray) =>{
  console.log(dataArray);
  let seemoreBtn = document.querySelectorAll('#see_more_footer h1')[0];
  seemoreBtn.addEventListener('click', ()=>{
    seemoreBtn.classList.remove('inline-block');
    seemoreBtn.classList.add('hidden');
    cards_container.innerText = ''
    console.log(dataArray);
    dataArray.map((singleData) => {
      let {id, name, description, image, published_in, features, links} = singleData;
      const div = document.createElement('div')
      div.innerHTML = `<!-- card 01 -->
      <div class="flex justify-center">
       <div class="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
         <!-- card image -->
         <a href="#!" data-te-ripple-init data-te-ripple-color="light">
          <img class="rounded-t-lg" src="${image}" alt="" />
         </a>
         <!-- card text -->
         <div class="p-5">
          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Features</h5>
          <ol class="list-decimal text-white  px-6 mb-4">
            <li>featuer 01</li>
            <li>featuer 02</li>
            <li>feature</li>
          </ol>
          <hr>
          <div class="mt-2 grid grid-flow-col justify-between">
             <!-- title and date -->
             <div>
               <h2 class="text-2xl">Title</h2>
               <span>date: 11/02/2023</span>
             </div>
             <!-- button -->
             <div id="btn_arrow" onclick="singleCardDataLoader(${id})">
               <div class="space-y-2">

                  <button
                  type="button"
                  class="inline-block"
                  data-te-toggle="modal"
                  data-te-target="#exampleModalLg"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <img src="img/arrowBtn.png" alt="">
                  </button>
         
               </div>
              
             </div>
           </div>
         </div>
       </div>
          </div>`
    cards_container.appendChild(div)
  })

  })
}


  
