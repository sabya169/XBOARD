// creating id for accordian(36 means base equal to 36)
let ID = () => Math.random().toString(36).substr(2,9);






function createOuterAccordion(jsonData, id, i) {
  const accordionElement = document.querySelector("#main-container");
 
  
  if (i === 0) {
    
    accordionElement.innerHTML += `
        <div class="accordion-item">
             <h2 class="accordion-header" id="panelsStayOpen-heading${id}">
                <button
                     class="accordion-button"
                     type="button"
                     data-bs-toggle="collapse"
                     data-bs-target="#panelsStayOpen-collapse${id}"
                     aria-expanded="true"
                     aria-controls="panelsStayOpen-collapse${id}">
      
                     ${jsonData.feed.title}
                </button>
             </h2>

             <div class="accordion-collapse collapse show"
                 id="panelsStayOpen-collapse${id}"
                 aria-labelledby="panelsStayOpen-heading${id}">
                 
             </div>
        </div>     
        `;
  }

  else{
    
    accordionElement.innerHTML += `
        <div class="accordion-item">
               <h2 class="accordion-header" id="panelsStayOpen-heading${id}">
                   <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapse${id}"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapse${id}">
      
                        ${jsonData.feed.title}
                   </button>
               </h2>

               <div class="accordion-collapse collapse"
                 id="panelsStayOpen-collapse${id}"
                 aria-labelledby="panelsStayOpen-heading${id}">
                
             </div>
        </div>
        `;
  }
}



function createCarousel(jsonData,id,i){
 const accordionBodyElement = document.querySelector(`#panelsStayOpen-collapse${id}`)
//  console.log(accordionBodyElement)

accordionBodyElement.innerHTML = `
<div id="carouselExampleControls${id}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id=${id}>
  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`



}




function createCard(jsonData,id,i){
  const carouselBody = document.getElementById(id)
  console.log(jsonData.items)
 

  for(let j = 0 ; j < jsonData.items.length ; j ++){

    if(j===0){
      carouselBody.innerHTML += `
      <div class="carousel-item active">
          <div class="d-block">
              <img src=${jsonData.items[j].enclosure.link} class="img-fluid w-100" id="set-height">
          </div>
          <div class="card">
              <div class="card-body">
                    <h5 class="card-title">${jsonData.items[j].title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${jsonData.items[j].author}</h6>
                    <p class="card-subtitle text-secondary">${jsonData.items[j].pubDate}</p>
                    <p class="card-text">${jsonData.items[j].description}</p>
                    <a href=${jsonData.items[j].link} class="stretched-link" target="_blank"></a>
               </div>
          </div>
      </div>
      `
          
    }

    else{
      carouselBody.innerHTML += `
      <div class="carousel-item">
           <div class="d-block">
               <img src=${jsonData.items[j].enclosure.link} class="img-fluid w-100" id="set-height">
           </div>
           <div class="card">
              <div class="card-body">
                    <h5 class="card-title">${jsonData.items[j].title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${jsonData.items[j].author}</h6>
                    <p class="card-subtitle text-secondary">${jsonData.items[j].pubDate}</p>
                    <p class="card-text">${jsonData.items[j].description}</p>
                    <a href=${jsonData.items[j].link} class="stretched-link" target="_blank"></a>
               </div>
          </div>

      </div>
      `
    }

  }
 
 

}




async function getData() {
  // console.log(magazines)
  for (let i = 0; i < magazines.length; i++) {
    const URL = "https://api.rss2json.com/v1/api.json?rss_url=" + magazines[i];

    // console.log(URL)

    const response = await fetch(URL);
    const jsonData = await response.json();
    // console.log(jsonData);

    // getting different id
    const id = ID();
    // console.log(id,i)
    

    createOuterAccordion(jsonData, id, i);


    createCarousel(jsonData,id,i);



    createCard(jsonData,id,i);

 


  }
}
getData();
