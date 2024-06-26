const link = document.createElement("a");
link.innerText = "Page Summary";
link.className = "page-summary";
document.querySelector("#vector-page-tools").append(link);

const logAndStoreURL = () => {
  const currentPageURL = window.location.href;
  console.log(currentPageURL);
  return currentPageURL;
};

logAndStoreURL();

function takeSummary() {
  console.log("Le résumé a été pris !");
}
// const button = document.querySelector(".mw-htmlform-submit"); resolve

async function takeSummary() {
  console.log("Le résumé a été pris !");

  const thediv = document.createElement("div");
  thediv.style.backgroundColor = "white";
  thediv.style.border = "1px solid black";
  thediv.style.borderRadius = "10px";
  thediv.style.position = "fixed";

  thediv.style.marginTop = "5%";
  thediv.style.marginLeft = "40%";
  thediv.style.height = "300px";
  thediv.style.width = "500px";
  thediv.style.display = "flex";
  thediv.style.padding = "20px";
  thediv.style.justifyContent = "space-between";
  thediv.style.alignItems = "space-between";
  thediv.style["z-index"] = "100";

  const closeButton = document.createElement("button");
  closeButton.innerText = "X";
  closeButton.style.height = "30px";
  closeButton.style.width = "50px";
  closeButton.style.color = "red";
  closeButton.addEventListener("click", () => {
    document.querySelector(".mw-page-container-inner").removeChild(thediv);
  });
  const divInput = document.createElement("div");
  divInput.innerText =
    "we here Consult the User's Guide for information on using the wiki software. Consult the User's Guide for information on using the wiki software. Consult the User's Guide for information on using the wiki software. Consult the User's Guide for information on using the wiki software.";
  thediv.appendChild(divInput);
  thediv.appendChild(closeButton);

  document.querySelector(".mw-page-container-inner").appendChild(thediv);

  // Envoie de la requête à l'API

  const API_KEY = "";
  const apiUrl = "";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Fais moi le résumé de cette url: ${logAndStoreURL()}, maximum 450 mots.`,
          },
        ],
        max_tokens: 100,
      }),
    });
    const data = await response.json();
    const message = data.choices
      ? data.choices[0].message.content
      : data.error.message;

    return message;
    //  if(data.choices)console.log("La response de l'API est :", data.choices[0].message.content);
    // if(data.error)console.log("La response de l'API est :", data.error.message); // Récupération du text de la préponse de l'IA
    //Ici nous pouvons afficher la réponse dans le chat
  } catch (error) {
    console.error("Erreur lors de la requête de l'API :", error);
  }
}

const button = document.querySelector(".page-summary");
button.addEventListener("click", takeSummary);

const div = document.createElement("div");
