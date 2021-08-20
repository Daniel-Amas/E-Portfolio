//LOADING SCREEN

const loadText = document.querySelector('.loading-text');
const loadingPage = document.querySelector('.loading-page');

let load = 0;

let int = setInterval(blurring, 30);

function blurring() {
    load++;
    if (load > 99){
        clearInterval(int)
    }

    loadText.innerText = `Loading: ${load}%`
    loadText.style.opacity = scale(load, 0, 100, 1, 0)
    loadingPage.style.filter = `blur(${scale(load, 0, 100, 70, 0)}px)`
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
//PROJECTS EXPANDING CARDS

const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}

document.getElementById('nav-link-anchor-primary').addEventListener('click', function(){
    document.querySelector('.contact-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.contact-modal').style.display = 'none';
});

//PROJECTS IMAGE SLIDER

const carouselSlides = document.querySelectorAll('.carousel-slide');
const next = document.querySelector('#next-btn');
const prev = document.querySelector('#prev-btn');
const auto = true;
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
    //get current class
    const current = document.querySelector('.current');
    //remove current class
    current.classList.remove('current');
    //check for next slide
    if (current.nextElementSibling){
        //add current to next sibling
        current.nextElementSibling.classList.add('current');
    }else{
        //add current to start
        carouselSlides[0].classList.add('current');
    }
    setTimeout(()=> current.classList.remove('current'));
}
const prevSlide = () => {
    //get current class
    const current = document.querySelector('.current');
    //remove current class
    current.classList.remove('current');
    //check for previous slide
    if (current.previousElementSibling){
        //add current to previous sibling
        current.previousElementSibling.classList.add('current');
    }else{
        //add current to start
        carouselSlides[carouselSlides.length-1].classList.add('current');
    }
    setTimeout(()=> current.classList.remove('current'));
};

//button events
next.addEventListener('click', ()=>{
    nextSlide();
    if (auto){
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime)
    }
});
prev.addEventListener('click', ()=>{
    prevSlide();
    if (auto){
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime)
    }
});

// auto slide
if (auto){
    //run next slide at interval time
    slideInterval = setInterval(nextSlide, intervalTime)
}

//FORM SUBMISSION

var form = document.getElementById("contact-form");
    
    async function handleSubmit(event) {
        event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(success => {
        status.classList.add('success')
        status.innerHTML = "Successfully Sent";
        form.reset()
      }).catch(error => {
        status.classList.add('error')
        status.innerHTML = "Error"
      });
    }
    form.addEventListener("submit", handleSubmit)