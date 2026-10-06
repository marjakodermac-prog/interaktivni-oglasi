window.onload = function() {
    const star = document.getElementById("star");
    const title = document.getElementById("heroTitle");
    const author = document.getElementById("avtor");
    const startBtn = document.getElementById("startBtn");
/*ko se stran naloži se izvede koda*/
    star.style.opacity = 1; /*zvezdica je zdaj vidna-->v css je opacity 0)*/

    const titleRect = title.getBoundingClientRect();
    const startX = 0;
    const endX = titleRect.width - 32; // konec x zvezde
    const starOffsetY = -80;            // zvezda nad naslovom
    const amplitude = 60;               // višina skoka zvezde
    const bounceImpact = 20;            // višina bounce naslova
    const pauseDuration = 500;          // 0.5s mirujoča faza

    const jumps = 2;                    // dvakratni skok
    const jumpDuration = 1500;          // trajanje enega skoka v ms
    const scaleStart = 0.5;
    const scaleEnd = 1;

    let startTime = null;

    function easeOut(t) {
        return t * (2 - t); // quadratic ease-out- mehkejše končan premik
    }

    function step(timestamp) { //glavna animacija
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        let progress = 0;
        let currentX = startX;
        let jump = 0;
        let impact = 0;

        if (elapsed < pauseDuration) {
            // 0.5s mirujoča faza
            currentX = startX;
            jump = 0;
            impact = 0;
        } else if (elapsed < pauseDuration + jumps * jumpDuration) {
            // izračunamo kateri skok smo
            const jumpElapsed = elapsed - pauseDuration;
            const currentJump = Math.floor(jumpElapsed / jumpDuration); // 0 ali 1
            progress = (jumpElapsed % jumpDuration) / jumpDuration; // 0-1 v trenutnem skoku

            // horizontalni premik
            currentX = startX + ((endX - startX) / jumps) * currentJump + ((endX - startX) / jumps) * easeOut(progress);

            // sinusni skok zvezde
            jump = Math.sin(progress * Math.PI) * amplitude;

            // bounce naslova ob pristanku (dvojni bounce)
            if (progress > 0.5) {
                impact = Math.sin((progress - 0.5) * Math.PI * 2) * bounceImpact;
            }
        } else {
            // končana animacija
            currentX = endX;
            jump = 0;
            impact = 0;

            // fade-in vsebine
            author.classList.add("visible");
            startBtn.classList.add("visible");
        }

        star.style.left = `${currentX}px`;
        star.style.top = `${starOffsetY + jump}px`;
        star.style.transform = `scale(${scaleStart + (scaleEnd - scaleStart) * Math.min(elapsed / (pauseDuration + jumps * jumpDuration),1)})`;
        title.style.transform = `translateY(${impact}px)`;

        if (elapsed < pauseDuration + jumps * jumpDuration + 100) {
            requestAnimationFrame(step);
        } else {
            title.style.transform = "translateY(0)";
        }
    }

    requestAnimationFrame(step);
};







//interaktivni GIF
const playBtn = document.getElementById("playAd");
const box = document.getElementById("adBox");

// shrani prvotno vsebino
const originalContent = box.innerHTML;

// pot do GIF datoteke
const gifPath = "img/img1.gif";

// flag za stanje
let isGifVisible = false;

playBtn.addEventListener("click", function () {
    if (!isGifVisible) {
        // pokaži GIF
        box.innerHTML = `<img src="${gifPath}?v=${Date.now()}" 
                            alt="Interaktivni oglas" 
                            style="max-width:100%; border-radius:10px;" />`;

        // gumb s zvezdico – ODPIRANJE
        playBtn.innerHTML = `Zapri oglas <img src="img/BDFM_star_INVERZ.png" class="nav-starinverz">`;

        isGifVisible = true;
    } else {
        // vrni prvotno besedilo
        box.innerHTML = originalContent;

        // gumb s zvezdico – ZAPIRANJE
        playBtn.innerHTML = `Zaženi oglas <img src="img/BDFM_star_INVERZ.png" class="nav-starinverz">`;

        isGifVisible = false;
    }
});






