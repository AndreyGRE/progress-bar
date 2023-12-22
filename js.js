class Progress {
    constructor(
        documentElements = {},
        dafaultValue = { value: 30, animated: false, hidden: false }
    ) {
        if (!documentElements) {
        throw Error("NO_ELEMENTS");
        }

        this.svgRingProgress = documentElements.svgRingProgress;
        this.circleProgress = this.svgRingProgress.querySelector(".progress-ring__circle");
        this.valueProgress = dafaultValue.value;
        this.animated = dafaultValue.animated;
        this.hidden = dafaultValue.hidden;

        documentElements.hideToggle.addEventListener("change", function () {
        progress.hidden = this.checked;
        });

        documentElements.value.addEventListener("change", function () {
        progress.valueProgress = this.value;
        });

        documentElements.animateToggle.addEventListener("change", function () {
        progress.animated = this.checked;
        });
    }

    set valueProgress(newValue) {
        if (newValue < 0 || newValue > 100) {
        console.error("Value must be between 0 and 100");
        return;
        }

        const radius = this.circleProgress.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (newValue / 100) * circumference;

        this.circleProgress.style.strokeDasharray = `${circumference}`;
        this.circleProgress.style.strokeDashoffset = offset;
    }

    set animated(isAnimated) {
        if (isAnimated) {
        this.circleProgress.style.animation = "3s linear infinite rotate";
        } else {
        this.circleProgress.style.animation = "none";
        }
    }

    set hidden(isHidden) {
        if (isHidden) {
        this.svgRingProgress.style.display = "none";
        } else {
        this.svgRingProgress.style.display = "block";
        }
    }
}

const hideToggle = document.getElementById("hideToggle");
const value = document.querySelector(".newIn");
const animateToggle = document.getElementById("animateToggle");
const svg = document.querySelector(".progress-ring");

const progress = new Progress(
  {
    svgRingProgress: svg,
    hideToggle: hideToggle,
    animateToggle: animateToggle,
    value: value,
  },
  { value: 30, animated: false, hidden: false }
);
