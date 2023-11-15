window.onload = function () {
  var searchBtn = document.querySelector("button");
  var heroText = document.getElementById("heroTxt");
  var resultD = document.getElementById("resultTitle");

  function defaultResponse() {
      var url = "http://localhost/info2180-lab4/index.html";
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('This network is unresponsive');
              }
              return response.text();
          })
          .then(data => {
              resultD.innerHTML = data;
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  function findHero(heroTextValue) {
      var the_url = "http://localhost/info2180-lab4/superheroes.php?heroName=" + encodeURIComponent(heroTextValue);
      fetch(the_url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('This network is unresponsive');
              }
              return response.text();
          })
          .then(data => {
              resultD.innerHTML = data;
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  function searchEvent(e) {
      e.preventDefault();
      resultD.innerHTML = "";
      var sanitizedValue = sanitize(heroText.value.trim());
      if (sanitizedValue === "") {
        defaultResponse();
      } else {
          findHero(sanitizedValue);
      }
  }

  function sanitize(word) {
      return word.replace(/</g, "").replace(/>/g, "").replace(/&/g, "").replace(/"/g, "");
  }

  searchBtn.addEventListener("click", searchEvent);
};