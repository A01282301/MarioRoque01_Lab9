const API_TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653";



function deleteBookmark (id){
    let url = `/bookmark/${id}`;

    let settings = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    }

    let result = document.querySelector( '.show' );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })

        .then( responseJSON => {
            console.log(responseJSON);
            location.reload();
        })
        
        .catch( err=> {
            console.log( err );
            result.innerHTML += `<div class="error"> ${err.message}</div>`;
        });
}


function addBookmarkInfo(){
    let BookmarksList = document.querySelector( '.postBookmark' );
    BookmarksList.addEventListener( 'submit', (event)=>{ //Select the button
        event.preventDefault();
        let title = document.getElementById( 'addTitle' ).value;
        let description = document.getElementById( 'addDescription' ).value;
        let url = document.getElementById( 'addUrl' ).value;
        let rating = document.getElementById( 'addRating' ).value;
        AddBookmark(title, description, url, rating);
        });
}

function AddBookmark( title, description, urlbookmark, rating ){
    let url = '/bookmarks';
    let data = {
        title: title,
        description: description,
        url: urlbookmark,
        rating: rating
    };

    let settings = { //Post the information to the server
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    }
    
    let error = document.querySelector( '.error' );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON);
            location.reload();
        })
        .catch( err=> {
            console.log( err );
            error.innerHTML  =  ``;
            error.innerHTML += `<div class="error"> ${err.message}</div>`;
        });
}


function getAll(){
    error = document.querySelector( '.error' );
    error.innerHTML  =  ``;
    let url = '/bookmarks';
    //Sending parameters as if we were on postman.
   
    let settings = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    }
    let result = document.querySelector( '.show' ); //Selecting the area where the information is going to be displayed

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then(responseJSON => {
            console.log(responseJSON);
            result.innerHTML= "";
            for (let i=0; i<responseJSON.length; i++){ //For each on content
                result.innerHTML +=  //We add the info of the bookmark
                `
                <div class = "bookmark" id=${responseJSON[i].id}>
                    <div class = "header" >
                        <h3 class = "title" >${responseJSON[i].title}</h3>
                    </div>

                    <div class="info">
                    <label>Description: </label> <label class= "description">${responseJSON[i].description}</label>
                        <div class="rating">
                            <label>Rating: </label><label class="ratings">${responseJSON[i].rating}</label>
                        </div>
                        
                        <label>URL: </label>  <a class="url" href=" ${responseJSON[i].url} ">${responseJSON[i].url}</a>
                    </div>
                    <div class = "btn"> 
                        <button id="edit"> Edit </button>
                        <button id="delete"> Delete </button>
                    </div>
                </div>`;
            }
        })
        .catch( err=> {
            console.log( err );
            result.innerHTML = `<div class="error"> ${err.message}</div>`;
        });
}


function CheckDelete(){
    let BookmarksList = document.querySelector( '.show' );
    BookmarksList.addEventListener( 'click', (event)=>{
        if( event.target.matches( '#delete' ) ){
            let id = event.target.parentNode.parentNode.id;
         //   console.log(id);
            deleteBookmark(id);
        }
    });

    BookmarksList = document.querySelector( '.search' );
    BookmarksList.addEventListener( 'click', (event)=>{
        if( event.target.matches( '#delete' ) ){
            let id = event.target.parentNode.parentNode.id;
         //   console.log(id);
            deleteBookmark(id);
        }
    });
}

function bookmarkInfo(){
    let BookmarksList = document.querySelector( '.get' );

    BookmarksList.addEventListener( 'submit', (event)=>{
        event.preventDefault();
        let title = document.getElementById( 'getTitle' ).value;
        console.log(title);
        SearchBookmark(title);
    });
}

function SearchBookmark( title ){
    error = document.querySelector( '.error' );
    error.innerHTML  =  ``;
    //Fetch only one bookmark
    let url = `/bookmark?title=${title}`;
    let settings = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    }
    
    let result = document.querySelector( '.search' );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON);
            result.innerHTML = " <h2> Search results: </h2>";
            for (let i=0; i<responseJSON.length; i++){
                result.innerHTML += 
                `
                <div class = "bookmark" id=${responseJSON[i].id}>
                    <div class = "header" >
                        <h3 class = "title" >${responseJSON[i].title}</h3>
                    </div>

                    <div class="info">
                    <label>Description: </label> <label class= "description"> ${responseJSON[i].description}</label>
                        <div class="rating">
                            <label>Rating: </label><label class="rating">${responseJSON[i].rating}</label>
                        </div>
                        
                        <label>URL: </label>  <a class="url" href=" ${responseJSON[i].url} ">${responseJSON[i].url}</a>
                    </div>
                    <div class = "btn"> 
                        <button id="edit"> Edit </button>
                        <button id="delete"> Delete </button>
                    </div>
                </div>`;
            }
        })
        .catch( err=> {
            console.log( err );
            error = document.querySelector( '.error' );
            error.innerHTML = " <h2> Search results: </h2>";
            error.innerHTML = `<div class="error"> ${err.message}</div>`;
        });
}

function UpdateBookmark( id, title, description, urlbookmark, rating ){
    let url = `/bookmark/${id}`;
    let error = document.querySelector( '.error' );
    
    let data = {
        id: id,
        title: title,
        description: description,
        url: urlbookmark,
        rating: rating
    };
    

    let settings = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data ),
    }


    let result = document.querySelector( '.show' );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON);
            location.reload();
        })
        .catch( err=> {
            console.log( err );
            result.innerHTML = `<div class="error"> ${err.message}</div>`;
        });

        fetch( url, settings )
            .then( response => {
                if( response.ok ){
                    return response.json();
                }
                throw new Error( response.statusText );
            })
            .then( responseJSON => {
                console.log(responseJSON);
                getAll();
            })
            .catch( err=> {
                console.log( err );
                error.innerHTML = `<div class="error"> ${err.message}</div>`;
            });         
}

function getUpdateInformation(){
    let bookmarksList = document.querySelector( '.show' );
    bookmarksList.addEventListener( 'click', (event)=>{
        event.preventDefault();

        if( event.target.matches( '#edit' ) ){
            let title = event.target.parentNode.parentNode.querySelector('.title').innerHTML;
            let description = event.target.parentNode.parentNode.parentNode.querySelector('.description').innerHTML;
            let url = event.target.parentNode.parentNode.querySelector('.url').innerHTML;
            let rating = event.target.parentNode.parentNode.parentNode.querySelector('.ratings').innerHTML;
            let id = event.target.parentNode.parentNode.id;
            document.getElementById('updateTitle').value = title;
            document.getElementById('updateDescription').value = description;
            document.getElementById('updateRating').value = rating;
            document.getElementById('updateUrl').value = url;

            let update = document.querySelector( '#submitUpdate' );
            update.addEventListener( 'click', (event)=>{
            event.preventDefault();
            if(event.target.matches( '#submitUpdate' ) ){
                title =  document.getElementById('updateTitle').value;
                description = document.getElementById('updateDescription').value;
                rating = document.getElementById('updateRating').value;
                url =   document.getElementById('updateUrl').value;
                console.log(title);
                UpdateBookmark(id, title, description, url, rating);
            }
            });

        }
        });
  
}

function SearchEdit(){
    let bookmarksList = document.querySelector( '.search' );
    bookmarksList.addEventListener( 'click', (event)=>{
        event.preventDefault();

        if( event.target.matches( '#edit' ) ){
            let title = event.target.parentNode.parentNode.querySelector('.title').innerHTML;
            let description = event.target.parentNode.parentNode.parentNode.querySelector('.description').innerHTML;
            let url = event.target.parentNode.parentNode.querySelector('.url').innerHTML;
            let rating = event.target.parentNode.parentNode.parentNode.querySelector('.ratings').innerHTML;
            let id = event.target.parentNode.parentNode.id;
            document.getElementById('updateTitle').value = title;
            document.getElementById('updateDescription').value = description;
            document.getElementById('updateRating').value = rating;
            document.getElementById('updateUrl').value = url;

            let update = document.querySelector( '#submitUpdate' );
            update.addEventListener( 'click', (event)=>{
            event.preventDefault();
            if(event.target.matches( '#submitUpdate' ) ){
                title =  document.getElementById('updateTitle').value;
                description = document.getElementById('updateDescription').value;
                rating = document.getElementById('updateRating').value;
                url =   document.getElementById('updateUrl').value;
                console.log(title);
                UpdateBookmark(id, title, description, url, rating);
            }
            });

        }
        });
  
}

function init(){
    getAll();
    addBookmarkInfo();
    CheckDelete();
    bookmarkInfo();
    getUpdateInformation();
    SearchEdit();
}

init();