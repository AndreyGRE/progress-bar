class Progress {
    constructor(circle) {
        this.circle = circle;
        this.value = 30;
        this.animated = false;
        this.hidden = false;
        this.render();
    }
    render() {
      if (this.hidden) {
        this.circle.style.display = 'none';
      }else{
        this.circle.style.display = 'block';
        const radius = this.circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        this.circle.style.strokeDasharray = `${circumference} ${circumference}`;
        this.circle.style.strokeDashoffset = `${circumference}`;
        const offset = circumference - this.value / 100 * circumference;
        this.circle.style.strokeDashoffset = offset;
            if(this.animated){
                this.circle.style.transition = '0.35s stroke-dashoffset'
            }else{
                this.circle.style.transition = 'none'
            }
        }
    }   
    setValue(newValue) {
        if (newValue >= 0 && newValue <= 100) {
            this.value = newValue;
            this.render();
        } else {
            console.error('Value must be between 0 and 100');
        }
    }
    setAnimated(isAnimated) {
        this.animated = isAnimated;
        this.render();
    }
    setHidden(isHidden) {
        this.hidden = isHidden;
        this.render();
    }
}

const circle = document.querySelector('circle');
const progress = new Progress(circle);

const hideToggle = document.getElementById('hideToggle');
hideToggle.addEventListener('change', function() {
    progress.setHidden(this.checked);
});

const value = document.querySelector(".newIn")
value.addEventListener('change', function() {
    progress.setValue(this.value);
});

const animated = document.getElementById('animateToggle');
animateToggle.addEventListener('change', function() {
    progress.setAnimated(this.checked);
});


