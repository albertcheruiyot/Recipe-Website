
// Fetch the recipes
var player;
function fetchAllRecipes() { // Function to fetch comments
  fetch("http://localhost:3000/recipes")
    .then(response => response.json())
    .then(data => {
      const recipeContainer = document.getElementById('recipeContainer');
      //console.log(data);
      // Iterate through the recipes and create divs for each
      data.forEach(recipe => {

        let recipeID = recipe.id;
        //console.log(recipeID);
        console.log(recipeID);
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        // Create title element
        const titleElement = document.createElement('h2');
        titleElement.textContent = recipe.title;

        // Create image element
        const imageElement = document.createElement('img');
        imageElement.src = recipe.image;
        imageElement.alt = recipe.title;

        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group-div');
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image-div');
        const likesDiv = document.createElement('div');
        likesDiv.classList.add('likes-div');


        const likesElement = document.createElement('h3');
        let likes = recipe.likes;
        if (likes == 1) {
          likesElement.textContent = `${likes} person Liked this recipe. Try it!!!`;
        } else if (likes > 1) {
          likesElement.textContent = `${likes} people Liked this recipe. Try it!!!`;
        } else {
          likesElement.textContent = `Be the first one to try this recipe.`;
        }
        /*const dislikesElement = document.createElement('h3');
        dislikesElement.textContent = `${recipe.dislikes} likes`;*/

        // Create button element
        const button = document.createElement('button');
        button.classList.add('button-82-pushable');
        button.setAttribute('role', 'button');

        // Create span elements
        const shadowSpan = document.createElement('span');
        shadowSpan.classList.add('button-82-shadow');

        const edgeSpan = document.createElement('span');
        edgeSpan.classList.add('button-82-edge');

        const frontSpan = document.createElement('span');
        frontSpan.classList.add('button-82-front', 'text');
        frontSpan.textContent = 'Start Cooking This Food';

        // Append span elements to button element
        button.appendChild(shadowSpan);
        button.appendChild(edgeSpan);
        button.appendChild(frontSpan);

        // Create description element
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = recipe.description;

        // Append title and description to recipe div
        recipeDiv.appendChild(titleElement);
        recipeDiv.appendChild(groupDiv);
        groupDiv.appendChild(imageDiv);
        groupDiv.appendChild(likesDiv);
        likesDiv.appendChild(descriptionElement);
        likesDiv.appendChild(likesElement);
        likesDiv.appendChild(button);
        imageDiv.appendChild(imageElement);

        // Append recipe div to container
        recipeContainer.appendChild(recipeDiv);

        // Add onclick listener to the button
        button.addEventListener('click', function () {
          // Add your desired functionality here
          fetchRecipeByID(recipeID);
        });


      });
    })
    .catch(error => console.error("Error fetching recipes:", error));
}

fetchAllRecipes();
fetchRecipeByID(4);
function fetchRecipeByID(recipeID){
  fetch(`http://localhost:3000/recipes/${recipeID}`)
    .then(response => response.json())
    .then(data => {
  
      //console.log(data.title)
      const recipeTitle = document.getElementById('recipe-title');
      recipeTitle.textContent = data.title;
      const recipeDescription = document.getElementById('recipe-description');
      recipeDescription.textContent = data.description;

      const ingredientList = document.querySelector("#ingredients_list");
        ingredientList.innerHTML = "";

      data.ingredients.forEach(ingredient => {
      
        const listItem = document.createElement("li");
        
  
        listItem.textContent = ingredient;
       
       
        ingredientList.appendChild(listItem);
      });
      const instructionList = document.querySelector("#instructions_list");
        instructionList.innerHTML = "";
        
      data.instructions.forEach(instruction=> {
        const listItem = document.createElement("li");
        listItem.innerHTML = "";
  
        listItem.textContent = instruction;
    
       
        instructionList.appendChild(listItem);
      });
      // Iterate through the recipes and create divs for each
      /*data.forEach(recipe => {
        const recipeTitle = document.getElementById('recipe-title');
        recipeTitle.textContent = recipe.title;

      });*/

      playVideo(data.video);
    })
    .catch(error => console.error("Error fetching recipes:", error));

    
}

// Initialize YouTube Player
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: '', // Default video ID
    playerVars: {
      'autoplay': 0, // Disable autoplay
      'controls': 1, // Enable player controls
      'rel': 0, // Disable related videos
      'showinfo': 0, // Hide video title and uploader info
      'modestbranding': 1 // Hide YouTube logo
    },
    events: {
      'onReady': onPlayerReady,
      'onError': onPlayerError
    }
  });
}

// Function to execute when the player is ready
function onPlayerReady(event) {
  // You can do something when the player is ready here
}

// Function to handle player errors
function onPlayerError(event) {
  // If an error occurs, reload the video to replay it
  player.playVideo();
}

// Function to play a specific video
function playVideo(videoId) {
  if (!window.YT) {
    loadYouTubePlayer(); // Load YouTube API if not loaded
  } else {
    player.loadVideoById(videoId);
  }
}

var box1 = document.getElementById('box1');
    var box2 = document.getElementById('box2');

    function syncScroll(event) {
        if (event.target === box1) {
            box2.scrollTop = box1.scrollTop;
        } else if (event.target === box2) {
            box1.scrollTop = box2.scrollTop;
        }
    }