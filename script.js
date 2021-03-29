//GET ALL VARIABLES NAD CREATE THINGS
let container = document.getElementById("container");
let menu = document.getElementById("menu");
let main = document.getElementById("main");
let footer = document.getElementById("footer");

let inputAndButtonSection = document.createElement("SECTION");
inputAndButtonSection.id = "inputAndButtonSection";
menu.appendChild(inputAndButtonSection);

let mainText = document.createElement("H2");
mainText.className = "mainText";
main.insertAdjacentElement("beforeend", mainText);

let btnArea = document.createElement("SECTION");
btnArea.id = "btnArea";
main.insertAdjacentElement("beforeend", btnArea);


let users = [
    {username: "admin", password: "password"},
    {username: "visitor", password: "test"}
];

let logoutBtn = document.createElement("BUTTON");
logoutBtn.className = "logoutBtn";
let logoutBtnText = document.createTextNode("Logga ut");
logoutBtn.appendChild(logoutBtnText);

let resetThemeBtn = document.createElement("BUTTON");
resetThemeBtn.id = "resetThemeBtn";
let resetThemeBtnText = document.createTextNode("Nollställ tema");
resetThemeBtn.appendChild(resetThemeBtnText);

let changeToVisitorBtn = document.createElement("BUTTON");
changeToVisitorBtn.id = "changeToVisitorBtn";
let changeToVisitorBtnText = document.createTextNode("Växla till besökare");
changeToVisitorBtn.appendChild(changeToVisitorBtnText);




//RUN THEME
if("menuBackgroundColor", "mainBackgroundColor", "footerBackgroundColor" in localStorage) {
    let menuBackgroundColorInLS = localStorage.getItem("menuBackgroundColor");
    let mainBackgroundColorInLS = localStorage.getItem("mainBackgroundColor"); 
    let footerBackgroundColorInLS = localStorage.getItem("footerBackgroundColor");

    menu.style.backgroundColor = menuBackgroundColorInLS;
    main.style.backgroundColor = mainBackgroundColorInLS;
    footer.style.backgroundColor = footerBackgroundColorInLS;
}

//RUN PROGRAM
if("username" in localStorage) {
    let usernameInLS = localStorage.getItem("username");

    if(usernameInLS == "admin") {
        adminLoggedIn();
    }
    else {
        visitorLoggedIn();
    }
}
else {
    printStartPage();
}






//FUNCTIONS
//Prints startpage
function printStartPage() {

    // Empties things before adding new
    inputAndButtonSection.innerHTML = "";
    mainText.innerHTML = "";
    btnArea.innerHTML = "";

    //Input for username
    let inputUserField = document.createElement("INPUT");
    inputUserField.setAttribute("type", "text");
    inputUserField.id = "inputUserField";
    inputUserField.placeholder = "Användarnamn";
    inputAndButtonSection.appendChild(inputUserField);

    //Input for password
    let passwordField = document.createElement("INPUT");
    passwordField.setAttribute("type", "password");
    passwordField.id = "passwordField";
    passwordField.placeholder = "Lösenord";
    inputAndButtonSection.appendChild(passwordField);

    //Creates login-button
    let loginBtn = document.createElement("BUTTON");
    let loginBtnText = document.createTextNode("Logga in");
    loginBtn.id = "loginBtn";
    loginBtn.appendChild(loginBtnText);
    inputAndButtonSection.appendChild(loginBtn);

    //Append startpage-message
    mainText.insertAdjacentHTML("beforeend", "Välkommen, var vänlig logga in som admin för att välja temat på din hemsida!");

    //If login-button is clicked
    loginBtn.addEventListener("click", function() {
        testToLogIn()
    });
}


//Prints testToLogIn-page
function testToLogIn() {
    let input = inputUserField.value;
    let password = passwordField.value;
    
    //Checks if input is in users-array
    let result = users.find(function (a) {return a.username == input});

    //Checks if find() is not null
    if (result != null) {
        
        //Checks if it's the right password to the username
        if(password == result.password) {
            localStorage.setItem("username", input);

            //If logged in as admin
            if(result.username == "admin") {
                adminLoggedIn();
            }
            //If logged in as NOT admin
            else {
                visitorLoggedIn();
            }
        }
        else {
            errorPage();
        }
    }
    else {
        errorPage();
    }
}


//Prints if visitor is logged in
function visitorLoggedIn() {
    //Empties things before adding new 
    inputAndButtonSection.innerHTML = "";
    mainText.innerHTML = "";
    btnArea.innerHTML = "";

    //Adding logout-button and message
    inputAndButtonSection.appendChild(logoutBtn);
    mainText.insertAdjacentHTML("beforeend", "Inloggad som besökare");
    
    //If logout-button is clicked
    logoutBtn.addEventListener("click", function() {
        printStartPage();
        localStorage.clear();
    });
}



//Prints if admin is logged in
function adminLoggedIn() {
    //Empties things before adding new 
    inputAndButtonSection.innerHTML = "";
    mainText.innerHTML = "";

    //Adding logout-button, resetTheme-button and message
    inputAndButtonSection.appendChild(changeToVisitorBtn);
    inputAndButtonSection.appendChild(resetThemeBtn);
    inputAndButtonSection.appendChild(logoutBtn);
    mainText.insertAdjacentHTML("beforeend", "Inloggad som admin");

    //If change-to-visitor-btn is clicked
    changeToVisitorBtn.addEventListener("click", function() {
        visitorLoggedIn();
        localStorage.setItem("username", "visitor");
    })



    //If reset theme button is clicked
    resetThemeBtn.addEventListener("click", function() {
        localStorage.removeItem("menuBackgroundColor");
        localStorage.removeItem("mainBackgroundColor");
        localStorage.removeItem("footerBackgroundColor");

        menu.style.backgroundColor = "#595757";
        main.style.backgroundColor = "#E0DADA";
        footer.style.backgroundColor = "#A19C9C";
    });

    //Creates buttons for different theme alternatives
    let altButtons = ["Alt 1", "Alt 2", "Alt 3", "Alt 4", "Alt 5"];
    for(i = 1; i <= altButtons.length; i++) {
        btnArea.insertAdjacentHTML("beforeend", "<button id='btnAlt" + i + "' class='btnAlternatives'>Tema  " + i + "</button>");
    }

    //Runs function if theme-buttons is clicked
    btnArea.addEventListener("click", function(evt) {
        checkBtnAlt(evt);
    });

    //Custom made theme-button
    btnArea.insertAdjacentHTML("beforeend", "<button id='btnCustom'>Eget tema</button>");

    //Creates a container for the form
    let formContainer = document.createElement("SECTION");
    formContainer.id = "formContainer";
    main.insertAdjacentElement("beforeend", formContainer);

    //If logout-button is clicked
    logoutBtn.addEventListener("click", function() {
        printStartPage();
        localStorage.removeItem("username");
    });
    
}

//Prints if wrong username and/or password
function errorPage() {
    //Empties mainText and print error message
    mainText.innerHTML = "";
    mainText.insertAdjacentHTML("beforeend", "Du har angett fel användarnamn eller lösenord. Försök igen!")
}

//Checks which button is clicked and changes styling
function checkBtnAlt(evt) {
    let btnClick = evt.target.id;

    switch(btnClick) {
        case "btnAlt1":
            menu.style.backgroundColor = "#32ADC7";
            main.style.backgroundColor = "#6AA88B";
            footer.style.backgroundColor = "#94D7E9";

            localStorage.setItem("menuBackgroundColor", "#32ADC7");
            localStorage.setItem("mainBackgroundColor", "#6AA88B");
            localStorage.setItem("footerBackgroundColor", "#94D7E9");
            break;

        case "btnAlt2":
            menu.style.backgroundColor = "#B3947B";
            main.style.backgroundColor = "#C7C48F";
            footer.style.backgroundColor = "#EBBF89";

            localStorage.setItem("menuBackgroundColor", "#B3947B");
            localStorage.setItem("mainBackgroundColor", "#C7C48F");
            localStorage.setItem("footerBackgroundColor", "#EBBF89");
            break;

        case "btnAlt3":
            menu.style.backgroundColor = "#C76C78";
            main.style.backgroundColor = "#6BA7B8";
            footer.style.backgroundColor = "#E6BAAF";

            localStorage.setItem("menuBackgroundColor", "#C76C78");
            localStorage.setItem("mainBackgroundColor", "#6BA7B8");
            localStorage.setItem("footerBackgroundColor", "#E6BAAF");
            break;
        
        case "btnAlt4":
            menu.style.backgroundColor = "#85B871";
            main.style.backgroundColor = "#BAC765";
            footer.style.backgroundColor = "#E6D484";

            localStorage.setItem("menuBackgroundColor", "#85B871");
            localStorage.setItem("mainBackgroundColor", "#BAC765");
            localStorage.setItem("footerBackgroundColor", "#E6D484");
            break;
        
        case "btnAlt5":
            menu.style.backgroundColor = "#C7795E";
            main.style.backgroundColor = "#BD6757";
            footer.style.backgroundColor = "#E68548";

            localStorage.setItem("menuBackgroundColor", "#C7795E");
            localStorage.setItem("mainBackgroundColor", "#BD6757");
            localStorage.setItem("footerBackgroundColor", "#E68548");
            break;

        case "btnCustom":
            customMadeThemeForm();
            break;
    }
}

//Prints custom made theme form
function customMadeThemeForm() {
    //Empties the form-container
    formContainer.innerHTML = "";

    //Creates form and add to main
    let form = document.createElement("FORM");
    form.id = "form";
    formContainer.insertAdjacentElement("beforeend", form);

    //Creates form content
    let formInputMenu = document.createElement("INPUT");
    formInputMenu.setAttribute("type", "text");
    formInputMenu.id = "formInputMenu";
    formInputMenu.placeholder = "Färg på menyn";

    let formInputMain = document.createElement("INPUT");
    formInputMain.setAttribute("type", "text");
    formInputMain.id = "formInputMain";
    formInputMain.placeholder = "Färg på main-delen";

    let formInputFooter = document.createElement("INPUT");
    formInputFooter.setAttribute("type", "text");
    formInputFooter.id = "formInputFooter";
    formInputFooter.placeholder = "Färg på footer-delen";

    let formBtn = document.createElement("BUTTON");
    formBtn.id = "formBtn";
    formBtn.setAttribute("type", "button");
    formBtnText = document.createTextNode("Spara");
    formBtn.appendChild(formBtnText);

    let br = document.createElement("BR");

    //Insert form content
    form.insertAdjacentHTML("beforeend", "<h3>Välj vilka färger du vill ha var, och fyll i fälten nedan:</h3>")
    
    form.insertAdjacentHTML("beforeend", "<p>Fyll i färg på menyn:</p>");
    form.insertAdjacentElement("beforeend", formInputMenu);
    form.insertAdjacentHTML("beforeend", "<a id='linkToColors' href='https://www.w3schools.com/colors/colors_picker.asp' target='_blank'>Här kan du hitta färger!</a>");
    form.insertAdjacentElement("beforeend", br);
    form.insertAdjacentHTML("beforeend", "<p>Fyll i färg på main:</p>");
    form.insertAdjacentElement("beforeend", formInputMain);
    form.insertAdjacentElement("beforeend", br);
    form.insertAdjacentHTML("beforeend", "<p>Fyll i färg på footer:</p>");
    form.insertAdjacentElement("beforeend", formInputFooter);
    form.insertAdjacentElement("beforeend", br);
    form.insertAdjacentElement("beforeend", formBtn);  

    makeCustomTheme();
}

//Executes custom theme
function makeCustomTheme() {
    formBtn.addEventListener("click", function() {
        menu.style.backgroundColor = formInputMenu.value;
        main.style.backgroundColor = formInputMain.value;
        footer.style.backgroundColor = formInputFooter.value;
        
        localStorage.setItem("menuBackgroundColor", formInputMenu.value);
        localStorage.setItem("mainBackgroundColor", formInputMain.value);
        localStorage.setItem("footerBackgroundColor", formInputFooter.value);
    }); 
}


