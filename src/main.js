let button = document.querySelector("#request-jokes");
let input = document.querySelector("#no-of-jokes");
let results = document.querySelector(".results");
let jokeDiv = document.querySelector(".joke-item");

button.addEventListener("click", (e) => {
  e.preventDefault();
  let numberOfJokes = input.value;

  if (numberOfJokes !== "") {
    input.style.borderColor = "green";
    getJokes(`http://api.icndb.com/jokes/random/${numberOfJokes}`).then(
      (data) => {
        clearJokes();

        let jokes = data.value;
        jokes.forEach((joke, index) => {
          let node = jokeDiv.cloneNode(true);
          node.innerHTML = `${index + 1}: ${joke.joke}`;
          node.style.display = "block";
          jokeDiv.parentNode.insertBefore(node, jokeDiv.lastChild);
        });
      }
    );
  } else {
    input.style.borderColor = "red";
  }
});

function clearJokes() {
  let jokes = Array.from(results.children);
  jokes.forEach((joke) => {
    // Remove the joke if its not the empty node
    if (joke.textContent !== "") {
      joke.remove();
    }
  });
}

async function getJokes(url) {
  return await (await fetch(url)).json();
}
