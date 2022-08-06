const booksList = document.getElementById('categoryList');
const searchBar = document.getElementById('searchBar');
const updateSelect = document.getElementById('selectUpdate');
let sendData; 
searchBar.addEventListener('keyup',(event)=>{
    
    const searchString = event.target.value.toLowerCase()
    const filteredLists = sendData.filter(lists1=>{
       
        return (lists1.display_name.toLowerCase().includes(searchString)||lists1.updated.toLowerCase().includes(searchString));
    });
    
    displayLists(filteredLists)
})

updateSelect.addEventListener('click',(event)=>{
    event.preventDefault();
    const optionValue = event.target.value;
    console.log(optionValue)
    if(optionValue == "ALL"){
        displayLists(sendData)
    }
    else{
        const filteredLists = sendData.filter(lists1=>{
            return (lists1.updated.includes(optionValue))
        })
        displayLists(filteredLists);
    }
   
    
   
})

const loadCharacters = async()=>{
    try{
        const res = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=RfMnGRAEn2a8ieRUrcEKuqoMckyRLqQf')
       
        const data = await res.json();
        
        sendData = data.results;
        
        displayLists(sendData)
        
    }
    catch(error){
    console.error(error);
    }
};

const displayLists = (list)=>{
  
    const htmlString = list.map((lists1)=>{
       
        return `
        <li class = "book">
            <h2>${lists1.display_name}</h2>
            <p>${lists1.oldest_published_date}</p><br>
            <p>${lists1.newest_published_date}</p><br>
            <p>${lists1.updated}</p>
        </li>
        `;
    })
    .join('')
    booksList.innerHTML = htmlString;
}
loadCharacters();
