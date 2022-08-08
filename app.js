const booksList = document.getElementById('categoryList');
let actualBook;
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

async function loadBooks (bookList){
   const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${bookList}.json?api-key=RfMnGRAEn2a8ieRUrcEKuqoMckyRLqQf`)
    const data = await res.json();
    
    displayBooks(data);
}
// console.log("ok")
const displayLists = (list)=>{
  booksList.innerHTML = "";
    const htmlString = list.map((lists1)=>{
       return  `
        <li class = "book">
            <a onclick="loadBooks('${lists1.list_name}')">${lists1.list_name}</a>
            <p>${lists1.oldest_published_date}</p><br>
            <p>${lists1.newest_published_date}</p><br>
            <p>${lists1.updated}</p>
        </li>
        `;
        
    })
    .join('')
    booksList.innerHTML = htmlString;
}

const displayBooks = (books1)=>{
    booksList.innerHTML = "";
    const htmlString = books1.results.books.map((book1)=>{
        return `
        <li class = "book">
        <h2>${book1.rank}#${book1.title}</h2>
        <img src="${book1.book_image}">
        <p>Semanas en lista: ${book1.weeks_on_list}</p>
        <a href="${book1.buy_links[0].url}">Comprar</a>
    </li>`
    })
    .join('')
    booksList.innerHTML = `<a href
    ="/" id="goBack">Volver</a><h1>${books1.results.list_name}</h1>${htmlString}`;
}


console.log(actualBook)
loadCharacters();
// document.getElementById("listaName").addEventListener('click', event =>{
//     let listaEvent = event.innerHTML;

// })
