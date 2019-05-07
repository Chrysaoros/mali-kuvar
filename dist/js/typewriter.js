class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement; //span elemenat
    this.words = words; //data-words u html
    this.txt = ""; //trenutni tekst u spanu
    this.wordIndex = 0; //index reci u nizu
    this.wait = parseInt(wait, 10); //period cekanja
    this.type(); // metoda kucanja
    this.isDeleting = false; //da li brse ili ne
  }

  //Type Metoda
  type() {
    //Trenutni index reci
    const current = this.wordIndex % this.words.length;
    // Uzeti celu rec
    const fullTxt = this.words[current];

    // Proveriti da li brise rec
    if (this.isDeleting) {
      // Ukloniti slovo
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Dodati slovo
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Ubaciti txt u span elemenat
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Pocetna brzina kucanja
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // Ako je rec cela
    if (!this.isDeleting && this.txt === fullTxt) {
      // Pauzira na kompletiranoj reci
      typeSpeed = this.wait;
      // Postaviti delete na true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Pisanje sledece reci
      this.wordIndex++;
      // Mala pauza pre novog kucanja
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Inicijalizacija na DOM ucitavanju
document.addEventListener("DOMContentLoaded", init);

//Inicijalizacija Aplikacije
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  //Init TypeWriter objekta
  new TypeWriter(txtElement, words, wait);
}
