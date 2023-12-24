$(document).ready(function () {
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'assets/particles/particles.json', function () {
        console.log('callback - particles.js config loaded');
    });


    VanillaTilt.init(document.querySelector(".tilt"), {
		max: 20,
		speed: 10000,
        perspective: 1000
	});
	//It also supports NodeList
	VanillaTilt.init(document.querySelectorAll(".tilt"));
});