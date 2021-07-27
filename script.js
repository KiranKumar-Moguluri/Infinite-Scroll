const imagecontainer=document.getElementById('image-container');
const loader= document.getElementById('loader');


let ready= false;
let imagesloaded=0;
let totalimages=0;
let photosArray=[];


// apiURL from UNSPLASH..

const count = 30;
const apikey='R0D2R40WWU-cdLiCkskqBNCNJXEWi2knRhcTZJDiL6Q';
const apiurl= `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;


// create a function image loaded, if all images were loaded
function imageloaded(){
  
    imagesloaded++;
    console.log(imagesloaded);
    if(imagesloaded === totalimages)
    {
        ready= true;
        loader.hidden=true;
        // console.log('ready = ', ready);
    }
}


function setAttributes(element, attributes){

    for(const key in attributes)
    {
        element.setAttribute(key, attributes[key]);
    }
}

// Display links and photos from unsplash

function displayphotos(){   
    imagesloaded=0;
    totalimages= photosArray.length;
    // console.log('total images are : ', totalimages);

    photosArray.forEach((photo) =>{
        // create an  anchor tag to the link element

        const item= document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // create image for title
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event listener, check when each is finished
        
        img.addEventListener('load', imageloaded);

        // put image inside anchor tag and then put inside the image container

        item.appendChild(img);
        imagecontainer.appendChild(item);

        
    });
}

// getphotos from the function...
async function getphotos(){

    try{

        const response= await fetch(apiurl);
        photosArray= await response.json();
        displayphotos();
    }
    catch(error){

    }

}

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready= false;
        getphotos();

    }
    
});

getphotos();