let submit = document.getElementById('submit');
let url = 'https://itunes.apple.com/search?';

submit.addEventListener('click', function() {
 let search = document.getElementById('search').value;
 let $request = url + 'term=' + search;

 console.log($request);

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
         let results =
         `
         <img src="${image}">
         <h4>${track}</h4>
         <h6>${artist}</h6>
         `
         let content = document.createElement('div');
          content.innerHTML = results;
          content.setAttribute('class', 'content');
          searchResults.appendChild(content);
      }
   })
  }
 )
});
