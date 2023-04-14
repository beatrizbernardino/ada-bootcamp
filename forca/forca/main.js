import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import swal from 'sweetalert';


const parent = document.querySelector(".word");
let palavras = {"animal": [ "cavalo", "porco", "cachorro", "gato", "baleia", "golfinho"], "fruta": ["morango", "abacaxi", "banana", "manga", "laranja", "uva"], "profissão": [" medico", "engenheiro", "administrador", "musico", "artista"]}

let [cat, palavra]= shuffle(palavras)
let vidas=0
let ja_foi =[]
let palavra_jogador = Array.from(Array(palavra.length))
const forca = [head, body, leftArm, rightArm, leftLeg, rightLeg ]
let tentativas = document.querySelector(".tentativas")
let controle_letras =[]
const dica = document.querySelector(".dica");
dica.innerHTML+= cat

let i=0
for( i of palavra){

  parent.innerHTML+="<div class = 'letra-traco'> <div class='traco'> _ </div>  </div>"
  console.log(i)
}


let keyboard = new Keyboard({
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} Q W E R T Y U I O P  [ ] \\",
      "{lock} A S D F G H J K L  ' {enter}",
      "{shift} Z X C V B N M ",
      ".com @ {space}"
    ],
    
  },
  excludeFromLayout: {
    default: ["@", ".com", "`", "{bksp}", "{enter}", "{tab}", "{lock}", "{shift}", "{space}", "1", "2", "3", "4" ,"5", "6", "7", "8", "9", "0", "-", "=", ";", "'", "[", "]", "\\", ""],
  },
  
});



function findLetter(letter){
  let indices=[]
  var j=0;
  for (j in palavra){
      if(letter.toLowerCase()=== palavra[j]){
        indices.push(j)
      }

  }

  return indices

}

function onKeyPress(button){
 
  if(!controle_letras.includes(button)){
    tentativas.innerHTML+=`<div> ${button}  </div> `

  }

  let indexes= findLetter(button)

  if(indexes.length>0){
    let j=0
    for (j of indexes ){
      if (ja_foi.includes(j)!= true){
        ja_foi.push(j)
        let traco= parent.querySelectorAll(".letra-traco")[j]
        traco.innerHTML+=`<div> ${button} </div> `
        palavra_jogador[j] = button.toLowerCase()
        console.log("aaa", palavra_jogador.join(""))
      }
    }
   
  }else{
    if(!controle_letras.includes(button)){
      let func= forca[vidas]
      func()
      vidas+=1
    }
   
  }
  
  controle_letras.push(button)

  if(vidas>=6){

    swal({
      title: "Você perdeu :(",
      text: "Gostaria de jogar novamente?",
      icon: "error",
      dangerMode: true,
    })
    .then(()=>{
       window.location.reload()
    });
   
  }

  
  if(palavra_jogador.join("") === palavra){
  
    swal({
      title: "Parabéns! Você ganhou :)",
      text: "Gostaria de jogar novamente?",
      icon: "success",
      dangerMode: true,
    })
    .then(()=>{
       window.location.reload()
    });
  }
  
}

function shuffle(toShuffle) {
  let categoria =   Object.keys(toShuffle)
    .map((value) => {
      return {value, sort: Math.random() };
    })
    .sort((a, b) => a.sort - b.sort);

  let cat_escolhida = categoria[0].value

  let palavra = toShuffle[cat_escolhida].map((value) => {
    return {value, sort: Math.random() };
  })
  .sort((a, b) => a.sort - b.sort);
  return [cat_escolhida, palavra[0].value]
}



const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");


function head() {
  context.lineWidth = 5;
  context.beginPath();
  context.arc(150, 135, 30, 0, Math.PI * 2, true);
  context.closePath();
  context.stroke();
}

function body() {
  context.beginPath();
  context.moveTo(150, 170);
  context.lineTo(150, 305);
  context.stroke();
}

function rightArm() {
  context.beginPath();
  context.moveTo(150, 200);
  context.lineTo(200, 230);
  context.stroke();
}
function leftArm() {
  context.beginPath();
  context.moveTo(150, 200);
  context.lineTo(100, 230);
  context.stroke();
}

function rightLeg() {
  context.beginPath();
  context.moveTo(150, 303);
  context.lineTo(200, 350);
  context.stroke();
}
function leftLeg() {
  context.beginPath();
  context.moveTo(150, 303);
  context.lineTo(100, 350);
  context.stroke();
}

function suporte() {
  context.strokeStyle = '#444';
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(250, 435);
  context.lineTo(5, 435);
  context.moveTo(10, 435);
  context.lineTo(10, 80);
  context.lineTo(150, 80);
  context.lineTo(150, 100);
  context.stroke();
}

suporte();




