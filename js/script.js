'use strict';
var HomeBannerEl = document.getElementById("HomeBanner");
var HomeBannerGalleryEl = document.getElementById("HomeBannerGallery");
var container1El = document.getElementById("container1");
var registerEl = document.getElementById("loginForm");
const container = document.querySelector('.containerList');
const datepicker = document.getElementById("datepicker");
const timepicker = document.getElementById("time");

const input = document.getElementById('input');
const list = document.getElementById('list');


//Buttons
const homeEl = document.getElementById("home");
const toDoEl = document.getElementById("toDo");
const continueEl = document.querySelector("#continue");
const register = document.querySelector("#register");
var addBtn = document.getElementById("add");
var clearBtn = document.getElementById("clear");


//Arrays
var homeBannerArr = [
    "https://images.pexels.com/photos/3774055/pexels-photo-3774055.jpeg?cs=srgb&dl=potted-plant-beside-bottles-and-picture-frame-3774055.jpg&fm=jpg",
    "https://wallpaperaccess.com/full/279547.jpg",
    "https://images.pexels.com/photos/843227/pexels-photo-843227.jpeg?cs=srgb&dl=make-it-happen-book-with-black-stylus-843227.jpg&fm=jpg",
    "https://images.pexels.com/photos/2008144/pexels-photo-2008144.jpeg?cs=srgb&dl=black-sunglasses-on-pink-card-2008144.jpg&fm=jpg",
    "https://ksr-ugc.imgix.net/assets/000/161/538/92bd697105d1820b8da9144e15cfc545_original.jpg?ixlib=rb-2.1.0&w=680&fit=max&v=1347724667&auto=format&gif-q=50&q=92&s=43ee560ff64bf1e217746b685f35dea0",
    "https://media.istockphoto.com/photos/blur-coffee-cup-on-wooden-background-with-note-book-vintage-tone-picture-id837220886?k=6&m=837220886&s=170667a&w=0&h=GWDIoqQnz1x9hrxYR5LXYmHDicGlm9hq9OpWfayEss0="
];


//Global variables
var userdt = new Date();
let index = 0;
if (HomeBannerGalleryEl !== null) {
    HomeBannerGalleryEl.setAttribute('src', homeBannerArr[index]);
}


/* function to make the transition of background images in the Home Page */
function swapImage() {
    if (index == homeBannerArr.length - 1) {
        index = 0;
    } else {
        index++;
    }
    if (HomeBannerGalleryEl !== null) {
        HomeBannerGalleryEl.setAttribute('src', homeBannerArr[index]);
    }
}
setInterval(swapImage, 3000);

/*  On Clicking the Register Button, Register section is displayed */
if (register !== null) {
    register.onclick = function(){
    registerEl.style.display = "block";
    registerEl.scrollIntoView();
}
}


/*  On Clicking the About Us Button, About Us section is displayed */
if (continueEl !== null) {
    continueEl.onclick = function() {
    container1El.style.display = "block";
    container1El.scrollIntoView();
}
}


//fetching today
function displayDay() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday 🖖";
    weekday[1] = "Monday 💪😀";
    weekday[2] = "Tuesday 😜";
    weekday[3] = "Wednesday 😌☕️";
    weekday[4] = "Thursday 🤗";
    weekday[5] = "Friday 🍻";
    weekday[6] = "Saturday 😴";
    var n = weekday[d.getDay()];
    var randomWordArray = Array(
        "Oh my, it's ",
        "Whoop, it's ",
        "Happy ",
        "Seems it's ",
        "Awesome, it's ",
        "Have a nice ",
        "Happy fabulous ",
        "Enjoy your "
    );
    var randomWord =
        randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
    document.getElementById("hello").innerHTML = randomWord + n;
}


/*  On Clicking the Add Task Button, new task is created  */
if (addBtn !== null) {
    addBtn.onclick = createTask;
}

/* Function to create the tasks */
function createTask() {
    let value = input.value;
    if (value === '') {
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-warning', 'animated', 'bounceIn');
        div.appendChild(document.createTextNode('Ooops! There is nothing to add.'));

        list.insertBefore(div, list.childNodes[0]);

        setTimeout(() => {
            div.remove();
        }, 2000);
        //		return;
    } else if ((datepicker.value == '') || (timepicker.value == '')) {
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-warning', 'animated', 'bounceIn');
        div.appendChild(document.createTextNode('Please select valid date and time!!'));

        list.insertBefore(div, list.childNodes[0]);

        setTimeout(() => {
            div.remove();
        }, 2000);
    } else {

        var arrdt = datepicker.value.split("/");
        var currdt = new Date();
        var h = currdt.getHours();
        var m = currdt.getMinutes();
        var s = currdt.getSeconds();

        var userH = timepicker.value.substr(0, 2);
        var userM = timepicker.value.substr(3, 2);
        var userS = timepicker.value.substr(6, 2);

        var AM = timepicker.value.includes("AM");
        if (AM) {
            var newTime = timepicker.value.substr(0, 8);
        } else {
            newTime = parseInt(userH) + 12 + ":" + userM + ":" + userS;
        }
        var arrtime = newTime.split(":");
        userdt = new Date(
            arrdt[2],
            arrdt[0] - 1,
            arrdt[1],
            arrtime[0],
            arrtime[1],
            arrtime[2]
        );
        if (userdt < currdt) {
            const div = document.createElement('div');
            div.classList.add('alert', 'alert-warning', 'animated', 'bounceIn');
            div.appendChild(document.createTextNode('Selected time is in past!! Please select valid date and time!!'));

            list.insertBefore(div, list.childNodes[0]);

            setTimeout(() => {
                div.remove();
            }, 3000);
        } else {
            input.value = ''; //clearing the input field
            const item = document.createElement('li');
            item.className = 'list__item';
            list.append(item);

            const circle = document.createElement('span');
            circle.className = 'list__circle';
            item.append(circle);

            const text = document.createElement('div');
            text.className = 'list__text';
            text.innerHTML = value;
            item.append(text);


            if ((datepicker.value != '') && (timepicker.value != '')) {
                const staticText = document.createElement("br");
                item.append(staticText);
                item.appendChild(document.createTextNode('Due on '));
                item.append(datepicker.value);
                item.appendChild(document.createTextNode(' at '));
                item.append(timepicker.value);
            }
            playCreateSound();
            getSaved();
            input.value = '';
            datepicker.value = '';
            timepicker.value = '';
            deleteTask();
        }
    }

}

/* Function to play the background sound for create task */
function playCreateSound() {
    var createAudio = document.getElementById("createAudio");
    createAudio.play();
}

/* Function to play the background sound for delete task */
function playDeleteSound() {
    var deleteAudio = document.getElementById("deleteAudio");
    deleteAudio.play();
}

/* Function to validate the user input */
function alertMessage() {
    const taskItems = document.querySelectorAll('.list__item');
    for (let element of taskItems) {
        var text1 = extractContent(element.innerHTML);
        var taskTime = text1.substr(text1.length - 11, text1.length);
        var taskDate = text1.substring(text1.length - 25, text1.length - 15);


        var arrdt = taskDate.split("/");

        var currdt1 = new Date();
        var h = currdt1.getHours();
        var m = currdt1.getMinutes();
        var s = currdt1.getSeconds();

        var userH = taskTime.substr(0, 2);
        var userM = taskTime.substr(3, 2);
        var userS = taskTime.substr(6, 2);

        var AM = taskTime.includes("AM");
        if (AM) {
            var newTime = taskTime.substr(0, 8);
        } else {
            newTime = parseInt(userH) + 12 + ":" + userM + ":" + userS;
        }
        var arrtime = newTime.split(":");
        var userdt1 = new Date(
            arrdt[2],
            arrdt[0] - 1,
            arrdt[1],
            arrtime[0],
            arrtime[1],
            arrtime[2]
        );

        if (userdt1 < currdt1) {
            var br = document.createElement("br");
            element.classList.add('alert', 'alert-warning', 'animated', 'fadeInUp');
            element.appendChild(br);
            element.appendChild(document.createTextNode('This Task is due!!'));
            list.insertBefore(element, list.childNodes[0]);
        } else {

            console.log("");

        }

    }
}

/* Function to delete the task temporarily */
function deleteTask() {
    const listItems = document.querySelectorAll('.list__item');
    for (let element of listItems) {
        element.addEventListener('click', () => {
            element.remove();
            var br = document.createElement("br");
            element.classList.add('alert', 'alert-success', 'animated', 'fadeInUp');
            element.appendChild(br);
            element.appendChild(document.createTextNode('Task removed temporarily!'));
            list.insertBefore(element, list.childNodes[0]);

            setTimeout(() => {
                element.remove();
            }, 1000);
            playDeleteSound();
        });
    }


};



/* deleting all the tasks from local storage by button "Clear all" */
if (clearBtn !== null) {
    clearBtn.addEventListener("click", () => {
        localStorage.removeItem('list', list.innerHTML = '');

        const div = document.createElement('div');
        var br = document.createElement("br");
        div.classList.add('alert', 'alert-success', 'animated', 'fadeInUp');
        div.appendChild(br);
        div.appendChild(document.createTextNode('All Tasks removed successfully from local Storage!'));
        list.insertBefore(div, list.childNodes[0]);

        setTimeout(() => {
            div.remove();
        }, 3000);


    })
}


/* saving an item in local storage */
function getSaved() {
    localStorage.setItem('list', list.innerHTML);
    const div = document.createElement('div');
    div.classList.add('alert', 'alert-success', 'animated', 'fadeInUp');
    div.appendChild(document.createTextNode('Task added successfully!'));
    list.insertBefore(div, list.childNodes[0]);
    setTimeout(() => {
        div.remove();
    }, 1000);
}

// getting data after page reloading
function loadTodos() {
    const data = localStorage.getItem('list');
    if (list !== null) {
        list.innerHTML = data;
    }
    deleteTask();
    alertMessage();
};
$(function() {
    $("#datepicker").datepicker();
});
$(document).ready(function() {
    $('#time').timepicker({
        timeFormat: 'hh:mm:ss p'
    });

});

//Function to extract the innerHTML of tasks to validate the time
function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
}

// function to register to the website

if(document.getElementById("rgstr_btn")!== null){
    
  document.getElementById("rgstr_btn").onclick = function() {
      
    var storedName = localStorage.getItem("username");
    var storedPword = localStorage.getItem("password");
    var storedEmail = localStorage.getItem("email");
        
    
    var userName = document.getElementById("rName").value;
    var pword = document.getElementById("password").value;
      var email = document.getElementById("email").value;
      var msg = document.getElementById("message");
        
      if(userName == storedName && pword == storedPword && email == storedEmail){
          msg.style.color = "#1C7007";
          msg.innerHTML = "You are already Registered!";
      }
      else{
         if(userName =="") {
             msg.style.color = "#EE2906";
         msg.innerHTML = "Please provide a Username";
     }   
        else if(pword == ""){
            msg.style.color = "#EE2906";
            msg.innerHTML = "please provide a Password";
        }
      else if(email == ""){
          msg.style.color = "#EE2906";
            msg.innerHTML = "please provide a email";
        }

else {
    
    localStorage.setItem("username" , userName);
    localStorage.setItem("password" , pword);
    localStorage.setItem("email" , email);
    msg.style.color = "#1C7007";
    msg.innerHTML = "registered Successfully"; 
    }  
      }
    
    
    }
}
if(document.getElementById('wrapper')!== null){
document.getElementById('wrapper').addEventListener('submit', function(e) {
     e.preventDefault();
 }, false);
}
loadTodos();