const booksList = document.getElementById('categoryList');

const searchBar = document.getElementById('searchBar');
const updateSelect = document.getElementById('selectUpdate');
const updateText = document.getElementById('updateText');
let bookBool;
let bookData;
let sendData; 
let initialBookData;


//Abrir ventana popup de inicio de sesión y registro
const openModalLogIn = document.querySelector('#btnLogin');
const closeModalLogIn = document.querySelector('#btnCloseLogin');
const modal = document.querySelector('#modal');

openModalLogIn.addEventListener("click",()=>{
    modal.showModal();
})
closeModalLogIn.addEventListener("click",()=>{
    modal.close();
})

const openModalSignUp = document.querySelector('#btnSignup');
const closeModalSignUp = document.querySelector('#btnCloseSignUp')
const modal2 = document.querySelector('#modal2');

openModalSignUp.addEventListener("click",()=>{
    modal2.showModal();
})
closeModalSignUp.addEventListener("click",()=>{
    modal2.close();
})

//Detectar cuando se escribe en el input de búsqueda de listas y libros
searchBar.addEventListener('keyup',(event)=>{
    
    const searchString = event.target.value.toLowerCase()
    const filteredLists = sendData.filter(lists1=>{
       return (lists1.display_name.toLowerCase().includes(searchString)||lists1.updated.toLowerCase().includes(searchString));
      });
    
    if(!bookBool){//Ejecutar filtro de listas
       
        displayLists(filteredLists)
    }
    else{//Ejecutar filtro de libros
       
        const filteredBooks = bookData.filter(books1=>{
            return(books1.title.toLowerCase().includes(searchString))
        })
        displayBooks(filteredBooks)
    }
     
   
})
updateSelect.addEventListener('click',(event)=>{
    event.preventDefault();
    const optionValue = event.target.value;
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





const loadLists = async()=>{
    try{
        const res = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=RfMnGRAEn2a8ieRUrcEKuqoMckyRLqQf')
        bookBool = false;
        searchBar.placeholder = "Busca una lista de libros";
        updateSelect.style.display = "block";
        updateText.style.display = "block";
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
    initialBookData = await res.json();
    bookBool = true;
    searchBar.placeholder = "Busca un libro"
    updateSelect.style.display = "none";
    updateText.style.display = "none";
    bookData = initialBookData.results.books;
    displayBooks(bookData);
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
    const htmlString = books1.map((book1)=>{
        return `
        <li class = "book">
        <img class="bookImage" src="${book1.book_image}">
        <h2>${book1.rank}#${book1.title}</h2>
        <div class="imageOverlay">
        <p class="imageDescription">${book1.description}</p>
        <p class="imageLong">Semanas en lista: ${book1.weeks_on_list}</p>
        </div>
        <a href="${book1.buy_links[0].url}" class="buyBtn">Comprar</a>
    </li>`
    })
    .join('')
    booksList.innerHTML = `<a href
    ="/" id="goBack">Volver</a><h1>${initialBookData.results.list_name}</h1>${htmlString}`;
}



loadLists();

    
   
    

// document.getElementById("listaName").addEventListener('click', event =>{
//     let listaEvent = event.innerHTML;

// })
