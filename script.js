let pokemonList_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50";
let pokemon_Name;
let pokemon_URL = []
let result;
function getAPIData(url){

    result = fetch(url)
  .then((response) => response.json())
  .then((data) => {   
    return data;
  });

}    
    
 
let countPerPage = 10;
let currentPage = 1;
let totalrecords = 50

let div1 = document.createElement("div")
document.body.append(div1)

let div2 = document.createElement('div')
document.body.append(div2)

let heading = document.createElement('h5')
heading.innerText = "How do I process the data?"
div2.appendChild(heading)

let list = document.createElement('ul')
div2.appendChild(list)

let list1 = document.createElement('li')
list1.innerText = "Read the Pokemon name and their individual URL from the main URL"
list.appendChild(list1)

let link = document.createElement('a')
link.setAttribute('href', 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50')
link.innerText = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50'

list1.appendChild(link)

let list2 = document.createElement('li')
list2.innerText = "Read weight, abilities each pokemon have from the individual URL"
list.appendChild(list2)

let list3 = document.createElement('li')
list3.innerText = "Read list of moves each pokemon have from the individual URL"
list.appendChild(list3)


                
function displayRecords(AllData, rows_per_page, page){
    
    page--
    let start = rows_per_page * page
    let end = start+rows_per_page
          
    const table1 = document.createElement("table");
    table1.setAttribute("class", "Pokemon-table")
    div1.appendChild(table1);

    const tabHead = document.createElement("thead");
    table1.appendChild(tabHead);

    const tr1 = document.createElement("tr");
    tabHead.appendChild(tr1);

    const th1 = document.createElement("th");
    th1.innerText = "Pokemon Name"
    tr1.appendChild(th1);

    const th2 = document.createElement("th");
    th2.innerText = "Weight"
    tr1.appendChild(th2);

    const th3 = document.createElement("th");
    th3.innerText = "Abilities"
    tr1.appendChild(th3);

    const th4 = document.createElement("th");
    th4.innerText = "Moves"
    tr1.appendChild(th4);

    let row;
    let cell1;
    let cell2;
    let cell3;
    let cell4;
    const tabbody1 = document.createElement("tbody");
    table1.appendChild(tabbody1);

    for(let x=start; x<end; x++){

        console.log(start, end)
        row = document.createElement("tr");
        tabbody1.appendChild(row)

        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell4 = row.insertCell(3);
    

        const getPokemonDetails = async () => {
            const a = await result; 
    
            let pokemonResult = a.results
    
            //Displaying the list of Pokemons

            for(key in pokemonResult){            

                pokemon_Name = `${pokemonResult[x].name}`;                          

                let tbody = document.querySelector('tbody');
                let allrows = tbody.getElementsByTagName('tr');
                let cells;                 
                    
                //Displaying the Pokemon's weight
               
                let index=0

                if(x>9){
                    index = x - (page*10)

                }else{
                    index = x

                }                             
                
                cells = allrows[index].getElementsByTagName('td');
                cells[0].innerText = pokemon_Name          
                         
                pokemon_URL.push(`${pokemonResult[key].url}`)
            }
        
                    
                 
            let abilityName = [];
            let moveName = [];
                
            getAPIData(pokemon_URL[x]);
            let rows = [];
          
            let individualPokemonData = async () => {
                const a = await result;
                  
                let abilitiesAll = a.abilities;
    
                let tbody = document.querySelector('tbody');
                rows = tbody.getElementsByTagName('tr');
                let cells;
                                        
                //Displaying the Pokemon's weight
                let index=0

                if(x>9){
                    index = x - (page*10)

                }else{
                    index = x

                }


                cells = rows[index].getElementsByTagName('td');
                cells[1].innerText = a.weight 

                //Displaying the pokemon’s ability
                for(let key1 in abilitiesAll){
                                      
                    abilityName.push(`${abilitiesAll[key1].ability.name}`)               
                      
                }                  
                cells[2].innerText = abilityName 
                    
                //Displaying the pokemon’s moves.    
                let moveAll = a.moves;
                for(let key2 in moveAll){
                    moveName.push(`${moveAll[key2].move.name}`)
                      
                }                
                cells[3].innerText = moveName 
            }
            individualPokemonData();
               
        }
        getAPIData(pokemonList_URL)
        getPokemonDetails()              
    }

}

function setUpPagination(data, rows_per_page ){
 
    let totalPage = Math.ceil(data/rows_per_page);
    let div3 = document.createElement("div")
    div3.setAttribute("class", "pagination")
    document.body.append(div3)
  
    for(let i=1;i<totalPage+1;i++){    
  
      let btn = paginationButton(i, data);
      div3.appendChild(btn)
          
    }
  
}


function paginationButton(page, totalrecords){ 

  
    let button = document.createElement("button");
    button.innerText = page;

    console.log(currentPage, page)
  
    if(currentPage == page){
      
      button.classList.add('active')
    }
   
  
    button.addEventListener('click', function () {
      
        div1.innerHTML = ""        
        console.log(currentPage, page)
        currentPage = page;     
      
        displayRecords(totalrecords, countPerPage, currentPage); 
      
        let current_btn = document.querySelector(".pagination button.active")
        current_btn.classList.remove('active')
        button.classList.add('active')
  
    })  
  
    return button;
  
}

displayRecords(totalrecords, countPerPage, currentPage)
setUpPagination(totalrecords, countPerPage, currentPage)


                






   
    
  









