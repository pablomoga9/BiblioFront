const booksList = document.getElementById('categoryList');
const booksList2 = document.getElementById('booksList')
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
const modal4 = document.querySelector('#modal4');

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
        modal4.showModal();
        const res = await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=RfMnGRAEn2a8ieRUrcEKuqoMckyRLqQf')
        modal4.close();
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
    modal4.showModal();
    const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${bookList}.json?api-key=RfMnGRAEn2a8ieRUrcEKuqoMckyRLqQf`)
    modal4.close();
    initialBookData = await res.json();
    bookBool = true;
    searchBar.placeholder = "Busca un libro"
    updateSelect.style.display = "none";
    updateText.style.display = "none";
    bookData = initialBookData.results.books;
    let createBack = document.createElement("a");
    createBack.setAttribute('href', '/');
    createBack.setAttribute('id', 'goBack');
    createBack.innerHTML = "Volver";
    document.body.appendChild(createBack);
    booksList.style.display = "block";
    searchBar.style.top = "-120px";
    searchBar.style.display = "fixed";
    document.getElementById("goBack").style.top = "200px"
    displayBooks(bookData);
}
// console.log("ok")
const displayLists = (list)=>{
  booksList.innerHTML = "";
    const htmlString = list.map((lists1)=>{
       return  `
        <li id = "listItem">
            <a id="listTitle" onclick="loadBooks('${lists1.list_name}')">${lists1.list_name}</a>
            <p class="listP">Fecha del libro más antiguo: ${lists1.oldest_published_date}</p><br>
            <p class="listP">Fecha del último libro incorporado: ${lists1.newest_published_date}</p><br>
            <p class="listP">Frecuencia de actualización: ${lists1.updated}</p>
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
        <h2 id="bookTitle"><p id="rankNumber">${book1.rank}</p>${book1.title}</h2>
        <div class="imageOverlay">
        <p class="imageDescription">${book1.description}</p>
        <p class="imageLong">Semanas en lista: ${book1.weeks_on_list}</p>
        </div>
        <div id="buyFav">
        <a href="${book1.buy_links[0].url}" class="buyBtn">Comprar</a>
        <div id="favContainer"> <div onclick="tryFav({title:'${book1.title}',image:'${book1.book_image}'})" id="favBtn"> ❤</div>
        </div></div>
       
        </li>`
       })
    .join('')
    booksList.innerHTML = `<h1 id="bookListTitle">${initialBookData.results.list_name}</h1><div id="booksDiv">${htmlString}</div>`;
    //    booksList.style.display = "flex";
    //    booksList.style.flexWrap = "wrap";
    //    booksList.style.justifyContent = "center"
}



loadLists();

