import "../styles/style.css";
import { list } from "./list";
import { DOMSelectors } from "./dom";

const apiEntry = "https://api.quotable.io/random";

console.log(list);

DOMSelectors.red.addEventListener("click", createDisplay.bind(null, "red"));
DOMSelectors.blue.addEventListener("click", createDisplay.bind(null, "blue"));
DOMSelectors.green.addEventListener("click", createDisplay.bind(null, "green"));
DOMSelectors.orange.addEventListener("click", createDisplay.bind(null, "orange"));

DOMSelectors.theme.addEventListener("click", function () {
  if (document.body.classList.contains("cool")) {
    document.body.classList.add("warm");
    document.body.classList.remove("cool");
  } else {
    document.body.classList.add("cool");
    document.body.classList.remove("warm");
  }
});

function createDisplay(schoolColor) {
  DOMSelectors.Display.innerHTML = "";

  function populateHtml(school) {
    DOMSelectors.Display.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
          <h2>${school.name}</h2>
          <img class="image" src="${school.image}" alt="${school.desc}">
          </div>`
    );
    const apiResponseDOM = DOMSelectors.Display.lastElementChild;
    const putQuoteInHTML = async () => {
      // defining an async arrow function
      const quote = await fetchData(apiEntry);

      apiResponseDOM.insertAdjacentHTML(
        "beforeend",
        `<h4>${quote.content}</h4>`
      );
    };
    putQuoteInHTML();
  }

  list
    .filter((school) => school.color.includes(schoolColor))
    .forEach(populateHtml);
}

async function fetchData(apiEntry) {
  try {
    const response = await fetch(apiEntry);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
