function mySidebarList() {
  var sidebar = document.querySelector(".sidebar-list");
  var arrow = document.querySelector(".arrow-icon")
  if (sidebar.style.maxHeight === "667px") {
    // x.style.display = "none";
    sidebar.style.maxHeight = "0";
    arrow.style.transform = "rotate(0deg)";
  } else {
    // x.style.display = "block";
    sidebar.style.maxHeight = "667px";
    arrow.style.transform = "rotate(180deg)";
  }
}

function myFooterColProducts() {
  var products = document.getElementById("products");
  var title = document.querySelector('.ftr-title-products');
  if (products.style.maxHeight === "667px") {
    products.style.maxHeight = "0";
    title.classList.remove("ftr-rotate");
  } else {
    products.style.maxHeight = "667px";
    title.classList.add("ftr-rotate");
  }
}
function myFooterColInfo(){

  var info = document.getElementById('info');
  var title = document.querySelector('.ftr-title-info');
  if (info.style.maxHeight === "667px") {
    info.style.maxHeight = "0";
    title.classList.remove("ftr-rotate");

  } else {
    info.style.maxHeight = "667px";
    title.classList.add("ftr-rotate");
  }
}


var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

var btn = document.querySelector('.second-button');
var navlink = document.querySelector('.nav-link-mobile');
var overlay = document.querySelector('.overlay');
  /** Hamburger menu */
  btn.addEventListener('click', function () {

    document.querySelector('.animated-icon2').classList.toggle('open');
    navlink.classList.toggle('nav-open-bg');
    overlay.classList.toggle('overlay-height');

    });

  window.onscroll = function() {myScrollFunction()};

    var navbar = document.querySelector('.nav-bg');
    var sticky = navbar.offsetTop;
    
    function myScrollFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        overlay.classList.add('stickyoffset');
      } else {
        navbar.classList.remove("sticky");
        overlay.classList.remove('stickyoffset');
      }
    }