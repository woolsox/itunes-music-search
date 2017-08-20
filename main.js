// setting up the search bar/search input/search button

let submit = document.getElementById('submitButton');
let url = 'https://itunes.apple.com/search?';

// event listener for changing search url to user input

submit.addEventListener('click', function() {
 let search = document.getElementById('search').value;
 let $request = url + 'term=' + search;


// fetch for user search, followed by page population
fetch($request)
 .then(
   function(response) {
    if (response.status !== 200) {
     console.log('Fetch Failed. Error Message:' + response.status);
     return;
    }

    response.json().then(function(data) {
      let searchResults = document.getElementById('search_results');
        searchResults.innerHTML = "";
      for (let i = 0; i < 24; i++) {
         let track = data.results[i].trackName;
         let artist = data.results[i].artistName;
         let image = data.results[i].artworkUrl100;
         let preview = data.results[i].previewUrl;
         let results =
         `

         <img src="${image}">
         <h4 class="${track}">${track}</h4>
         <h6 class="${artist}">${artist}</h6>

         `

          let content = document.createElement('span');
           content.innerHTML = results;
           content.setAttribute('id', `${artist}` + " - " + `"${track}"`);
           content.setAttribute('class', `${preview}`)
           searchResults.appendChild(content);


             let audioClick = document.querySelectorAll('span');
             for (let i = 0; i < audioClick.length; i++) {
               audioClick[i].addEventListener('click', function(){
                 let audioFile = document.getElementById('audioFile')
                 audioFile.src = this.className;

                 let audioPlayer = document.getElementById('audioPlayer');
                   audioPlayer.load();

                 let nowPlaying = document.getElementById('nowPlaying');
                 nowPlaying.innerHTML = "Now playing: " + this.id;


          });
        }
      }
   });
  }
 )
});
