var e=function(e){var t=this;e=Object.assign({container:null,default:"light",toggle:null,class:"darken",variables:{}},e),this.dark=!1,e.toggle&&document.querySelector(e.toggle).addEventListener("click",function(e){e.preventDefault(),t.toggle()}),document.addEventListener("darken-dark",function(){e.container?document.querySelector(e.container).classList.add(e.class):document.body.classList.add(e.class);for(var t=e.container?document.querySelector(e.container):document.documentElement,n=0,r=Object.entries(e.variables);n<r.length;n+=1){var a=r[n];t.style.setProperty(a[0],a[1][1])}},!1),document.addEventListener("darken-light",function(){e.container?document.querySelector(e.container).classList.remove(e.class):document.body.classList.remove(e.class);for(var t=e.container?document.querySelector(e.container):document.documentElement,n=0,r=Object.entries(e.variables);n<r.length;n+=1){var a=r[n];t.style.setProperty(a[0],a[1][0])}},!1),"light"===e.default?this.off():"dark"===e.default&&this.on()};e.prototype.toggle=function(){this.dark=!this.dark,this.dark?document.dispatchEvent(new Event("darken-dark")):document.dispatchEvent(new Event("darken-light"))},e.prototype.on=function(){this.dark=!0,document.dispatchEvent(new Event("darken-dark"))},e.prototype.off=function(){this.dark=!1,document.dispatchEvent(new Event("darken-light"))};export default e;