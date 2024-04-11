const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080; //  chose port from here like 8080, 3001

server.use(middlewares);
server.use(router);

server.listen(port);


// Fetch the recipes
var player;
var totalLikes, totalDislikes;
var likeParapgraph;
var unlikeParapgraph;

document.addEventListener("DOMContentLoaded", function() {
  // Fetch the recipes
  function fetchAllRecipes() {
      fetch("http://localhost:3000/recipes")
          .then(response => response.json())
          .then(data => {
              const recipeContainer = document.getElementById('recipeContainer');
              data.forEach(recipe => {
                  let recipeID = recipe.id;
                  const recipeDiv = document.createElement('div');
                  recipeDiv.classList.add('recipe');
                  const titleElement = document.createElement('h2');
                  titleElement.textContent = recipe.title;
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
                  const button = document.createElement('button');
                  button.classList.add('button-82-pushable');
                  button.setAttribute('role', 'button');
                  const shadowSpan = document.createElement('span');
                  shadowSpan.classList.add('button-82-shadow');
                  const edgeSpan = document.createElement('span');
                  edgeSpan.classList.add('button-82-edge');
                  const frontSpan = document.createElement('span');
                  frontSpan.classList.add('button-82-front', 'text');
                  frontSpan.textContent = 'Start Cooking This Food';
                  button.appendChild(shadowSpan);
                  button.appendChild(edgeSpan);
                  button.appendChild(frontSpan);
                  const descriptionElement = document.createElement('p');
                  descriptionElement.textContent = recipe.description;
                  recipeDiv.appendChild(titleElement);
                  recipeDiv.appendChild(groupDiv);
                  groupDiv.appendChild(imageDiv);
                  groupDiv.appendChild(likesDiv);
                  likesDiv.appendChild(descriptionElement);
                  likesDiv.appendChild(likesElement);
                  likesDiv.appendChild(button);
                  imageDiv.appendChild(imageElement);
                  recipeContainer.appendChild(recipeDiv);
                  button.addEventListener('click', function () {
                      fetchRecipeByID(recipeID);
                  });
              });
          })
          .catch(error => console.error("Error fetching recipes:", error));
  }

  function fetchRecipeByID(recipeID) {
      fetch(`http://localhost:3000/recipes/${recipeID}`)
          .then(response => response.json())
          .then(data => {
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
              data.instructions.forEach(instruction => {
                  const listItem = document.createElement("li");
                  listItem.textContent = instruction;
                  instructionList.appendChild(listItem);
              });
              totalLikes = data.likes;
              totalDislikes = data.dislikes;
              likeParapgraph = document.getElementById('likes-text');
              unlikeParapgraph = document.getElementById('unlikes-text');
              likeParapgraph.textContent = `${data.likes} likes`;
              unlikeParapgraph.textContent = `${data.dislikes} dislikes`;
              playVideo(data.video);
          })
          .catch(error => console.error("Error fetching recipes:", error));
      scrollToRecipe();
      giveFeedback();
  }

  function giveFeedback(){
      const LikeButton = document.getElementById('like-recipe');
      const unlikeButton = document.getElementById('unlike-recipe');
      LikeButton.addEventListener('click', function () {
          // Add your logic for handling like feedback here
          newLikes = totalLikes + 1;
          console.log(newLikes);
          likeParapgraph.textContent = `${newLikes} likes`;
          
      });
      unlikeButton.addEventListener('click', function () {
          // Add your logic for handling unlike feedback here
          newDislikes = totalDislikes + 1;
          console.log(newDislikes);
          unlikeParapgraph.textContent = `${newDislikes} dislikes`;
      });
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

  var navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function (navLink) {
      navLink.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default anchor behavior
          var targetId = this.getAttribute('href'); // Get target section ID
          var targetSection = document.querySelector(targetId); // Get target section element
          if (targetSection) {
              // Scroll to the target section with smooth behavior
              targetSection.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });

  fetchAllRecipes();
  fetchRecipeByID(4);
});

function scrollToRecipe() {
  var sectionToScrollTo = document.getElementById('about-section');
  sectionToScrollTo.scrollIntoView({ behavior: 'smooth' });
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
            'rel': 1, // Disable related videos
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