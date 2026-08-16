


// Tela Cheia
document.getElementById('togle_').addEventListener('click', function(){ 
  document.getElementById('togle').click();
})

document.getElementById('togle').addEventListener('click', function(){ 
if ((document.fullScreenElement && document.fullScreenElement !== null) ||
(!document.mozFullScreen && !document.webkitIsFullScreen)) {
if (document.documentElement.requestFullScreen) {
document.documentElement.requestFullScreen();
} else if (document.documentElement.mozRequestFullScreen) {
document.documentElement.mozRequestFullScreen();
} else if (document.documentElement.webkitRequestFullScreen) {
document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
}
} else {
if (document.cancelFullScreen) {
document.cancelFullScreen();
} else if (document.mozCancelFullScreen) {
document.mozCancelFullScreen();
} else if (document.webkitCancelFullScreen) {
document.webkitCancelFullScreen();
}
}
})
function verificarTelaTG() {
  document.getElementById('togle').click();
}
//Data e Hora
setInterval(function() {
const newDate = new Date()
var dia = String(newDate.getDate()).padStart(2, '0');
var mes = String(newDate.getMonth() + 1).padStart(2, '0');
var ano = String(newDate.getFullYear()).padStart(2, '0')
var data = `${dia}/${mes}/${ano}`
const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const seconds = now.getSeconds().toString().padStart(2, '0');
const timeString = `${hours}:${minutes}:${seconds}`;
//const lbl_data = document.getElementById('lbl-data');
//lbl_data.innerHTML = `${data}`
//localStorage.setItem('data', data)
sessionStorage.setItem('hora', timeString)
sessionStorage.setItem('data', data)
document.getElementById('P_hora').innerHTML = `${timeString}`
}, 1000)

// Iniciar Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDVnQ5y7XhWcZotN5q4_o2BtMuI5132yY8",
  authDomain: "orla-sul.firebaseapp.com",
  projectId: "orla-sul",
  storageBucket: "orla-sul.firebasestorage.app",
  messagingSenderId: "790619102791",
  appId: "1:790619102791:web:3e966ff7ac7747afd0db62",
  measurementId: "G-Y0TVX7E65W"
};
firebase.initializeApp(firebaseConfig);
//////////////////////////////////////////////////////////




//login google
function loginComGoogle() {
  var lblG=document.getElementById('labellogarLater');
var lognome= localStorage.getItem('GoogleNome')
var logEmail= localStorage.getItem('GoogleEmail')
var hora=sessionStorage.getItem('hora')
var data=sessionStorage.getItem('data')
if(!lognome||lognome==''||!logEmail||logEmail==''){

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
auth.signInWithPopup(provider)
.then((result) => {
const user = result.user;
//console.log("Nome:", user.displayName);
//console.log("Email:", user.email);
//console.log("Foto:", );
 localStorage.setItem('GoogleFoto',user.photoURL)
 localStorage.setItem('GoogleEmail',user.email);
 localStorage.setItem('GoogleNome',user.displayName);
var nome_= user.displayName
var resp=nome_.split(' ');
var nome1=resp[0]
var nome2= resp[1]
var Usuário=`${nome1}`;

document.getElementById('lblUser').innerHTML=`Olá, ${nome1}`;
document.getElementById('lblnomeUser').innerHTML=`Olá, ${nome1}`;
localStorage.setItem('GoogleNome_Abreviado', `${Usuário}`)
document.getElementById('imgMenuUser').src=`${user.photoURL}`;
document.getElementById('imgUser').src=`${user.photoURL}`;

var ddg= firebase.firestore()
ddg.collection('UsuáriosGoogle').doc(`${user.email}`).set({
Nome:user.displayName,
Email:user.email,
Foto:user.photoURL,
NomeAbrev:Usuário,
Logado:'Logao',
Data:data,
Hora:hora,
})
})
.catch((error) => {
console.error("Erro ao autenticar:", error);
})
}
}

//loginComGoogle() 
function iniciarUserFirebase(){
var foto= localStorage.getItem('GoogleFoto')
var emailUser= localStorage.getItem('GoogleEmail');
var nomeUser= localStorage.getItem('GoogleNome');
if(emailUser){
var dbif= firebase.firestore()
dbif.collection('UsuáriosGoogle').doc(emailUser).get().then((doc=>{
if(doc){
var doc =doc.data()

document.getElementById('lblUser').innerHTML=`Olá, ${doc.NomeAbrev}`;
document.getElementById('lblnomeUser').innerHTML=`Olá, ${doc.NomeAbrev}`;;
document.getElementById('imgMenuUser').src= doc.Foto;
document.getElementById('imgUser').src= doc.Foto;
sessionStorage.setItem('idUser', doc.Email);
}else{
//alert(`Nome: ${doc.Usuário}`)
}
}))
}
}
iniciarUserFirebase()

document.getElementById('sobre').addEventListener('click', function() { 
document.getElementById('a_sobre').click()
document.getElementById('divQuemSomos').style.display='block';
})

//pasword
//Dados Admin Password
var dbp= firebase.firestore();
dbp.collection('Password').doc('passwords').get().then((doc)=>{
if(doc){
var dados=doc.data()
sessionStorage.setItem('Pasword', dados.Senha);
sessionStorage.setItem('Pasword2', dados.Master1);
sessionStorage.setItem('Pasword3', dados.Master2);
sessionStorage.setItem('TelefoneAdmin', dados.Telefone);
sessionStorage.setItem('EmailAdmin', dados.Email)

}
})
//Administração
//document.getElementById('admin').addEventListener('click', function() { 
//pasword()
//})
document.getElementById('Admin').addEventListener('click', function() { 
pasword()
})

function pasword(){
Swal.fire({ 
title: ``,
text: ``, 
html:`
<div id="administrar">
<h2>Administradores</h2>
<label id="lblAd">digíte sua senha de administrador <br>
<input id="inputAD" type="password" placeholder="Password">  <i id='iPasWord' class="fa-solid fa-eye"></i>
</label> <br>
<button id="entrebtn" o">Click enter</button>
</div> 
`,
imageUrl: ``,
background: '#ffffff00',
color: '#a7a7a7', // cor do texto });
showCloseButton: true,   // habilita o "X"
allowOutsideClick: false,
showConfirmButton: false,
customClass: {
popup: 'my-admin' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';   
}
})
document.getElementById('iPasWord').addEventListener('click',function(){
var ii= document.getElementById('iPasWord');
var iPW= document.getElementById('inputAD');
if(iPW.type=='password'){
iPW.type='text'
ii.className='fa-solid fa-eye-low-vision';
} else{
iPW.type='password';
ii.className='fa-solid fa-eye';
}
});
document.getElementById("entrebtn").addEventListener('click',function(){
var resp1= sessionStorage.getItem('Pasword')
var resp2= sessionStorage.getItem('Pasword2')
var resp3= sessionStorage.getItem('Pasword3')

var pass = document.getElementById('inputAD').value;
if(pass== resp1|| pass== resp2 || pass== resp2){
swal('Sucesso','Você seráredirecionado(a)!\n (Tela de cadastros!)','success');
setTimeout(function(){
window.open('HTML/cadastro.html','_self')
Swal.close()
},2000)
}else{
swal('Senha incorreta!','','error');
}
})
};

function deslogar(){
localStorage.setItem('GoogleFoto','')
localStorage.setItem('GoogleEmail','');
localStorage.setItem('GoogleNome','');
}

// foto user + editar
document.getElementById('divUser').addEventListener('click', function(){
document.getElementById('imgMenuUser').click()
});
document.getElementById('imgMenuUser').addEventListener('click', function(){
var conf= localStorage.getItem('GoogleFoto')
var logEmail = localStorage.getItem('GoogleEmail');
if(!conf|| conf==''||!logEmail|| logEmail==''||conf==null||logEmail==null){
// Swal.fire('','Você Precisa se conectar com sua conta do Google!','')
loginComGoogle()
}else{

Swal.fire({
title: `Perfil`,
html: `
<img id='imimg' src="" alt="" width="280"> <br>
<label id='nomeUserCuston' >User</label><br>
<label id='EmailUserCuston' >Email</label><br>
<br><label id='deslogar' style="cursor:pointer">Desconectar conta</label>
`,
background: 'hsl(0, 0%, 100%)',
color: '#383838',
showCloseButton: true,
showConfirmButton: false,
customClass: { popup: 'my-custom_img' },
didOpen: () => { document.body.style.paddingRight = '0px'; }
});

document.getElementById('imimg').src=conf;
document.getElementById('EmailUserCuston').innerHTML=logEmail

var nome= localStorage.getItem('GoogleNome_Abreviado')
document.getElementById('nomeUserCuston').innerHTML= `Olá, ${nome}`;

// Quando clicar em "Trocar de foto"
document.getElementById('deslogar').addEventListener('click', function(){
  sessionStorage.setItem('idUser', '');
deslogar()
window.location.reload()
});
}
});


// sessionStorage.setItem('SeçãoAberta','');
function initPage(){
var resp=sessionStorage.getItem('SeçãoAberta')
if(!resp||resp==''){
Swal.fire({ 
title: ``,
text: ``, 
html:`
<div id='btnTime_'>
<img src="SRC/Logo_OrlaSul.png" alt="" class="logo-swal" width="55%"></div>
<div id="divInit"> 
<button id='btnTime'></button> 
<div id="myProgresos" title="Progresos">
<div id="myBarr">10%</div>
</div>
</div>
`,
imageUrl: ``,
background: '#00325300',
color: '#fff', // cor do texto });
allowOutsideClick: false,
showConfirmButton: false,
customClass: {
popup: 'my-customTime' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';   
}
})
document.getElementById('myProgresos').style.display = 'block'
var i = 0;
if (i == 0){
i = 1;
var elem = document.getElementById("myBarr");
var width = 1;
var id = setInterval(frame, 37);
function frame() {
if (width >= 100) {
i = 0;
document.getElementById('myProgresos').style.display = 'none'
sessionStorage.setItem('SeçãoAberta','Iniciado')
document.getElementById('topo').click();
 //document.getElementById('togle').click();
      document.getElementById('div_lista_').style.display='block';
 iduser()
swalclose()
clearInterval(id)
//document.getElementById('imgcad').value = `${url_imagem}`
} else {
width++;
elem.style.width = width + "%";
elem.innerHTML = width + "%"; // Atualiza o texto do rótulo
}
}
}
}else{
}
 }

function swalclose(){
Swal.close()
}
initPage()

setTimeout(function(){
document.getElementById('topo').click();
}, 2000);

//Menu Lateral
sessionStorage.setItem('MENULateral', '')
var BTN = document.getElementById('menu');
//BTN.className = 'fa-solid fa-bars'
document.getElementById('menu').addEventListener('click', function(){
 
var BTN = document.getElementById('menu');
var MENU_ = sessionStorage.getItem('MENULateral')
if (!MENU_ || MENU_ == '') {
BTN.className = 'fa-solid fa-delete-left'
sessionStorage.setItem('MENULateral', 'Aberto')
document.getElementById("menu_lateral").classList.add("menu-ativo");
} else {
BTN.className = 'fa-solid fa-bars'
sessionStorage.setItem('MENULateral', '')
document.getElementById("menu_lateral").classList.remove("menu-ativo");
}
})

//fechar Menu
// Seleciona todos os <a> dentro do menu
var links = document.querySelectorAll('#menu_lateral a');
links.forEach(link => {
link.addEventListener('click', function(event) {
event.preventDefault(); // evita navegação imediata
//alert(`Você clicou em:', ${this.textContent}`);
//alert('Href:', this.getAttribute('href'));
document.getElementById('menu').click()
});
});

//deslogar()

//home
document.getElementById('I_Casa').addEventListener('click', function() {
document.getElementById('topo').click()
document.getElementById('divQuemSomos').style.display='none';
})

var timer;
    function iniciar() {
      timer = setTimeout(() => {
    
       Swal.fire({
        title: ``,
        html:`<h4 id='h2Desculpe'> </h4>`,
        text: ``,
        imageUrl: 'SRC/desculpa_.png',
        background: '#ffffff04',
        color: '#ff2600', // cor do texto });
        showCloseButton: true,   // habilita o "X"
        backdrop: true, // habilita o fundo escuro
        allowOutsideClick: true,
        showConfirmButton: false,
        customClass: {
        popup: 'my-customProduto' // Aplica a classe CSS personalizada
        },
        didOpen: () => {
        document.body.style.paddingRight = '0px';   
        }
        })
        var coll= sessionStorage.getItem('Coll')
        if(coll=='Geraldb'){
          var coll='nossas <b> Listas</b>'
        }
        document.getElementById('h2Desculpe').innerHTML=`Não encontramos o que você procura em ${coll}`
        cancelar() 
      
      }, 2100);
    }

    function cancelar() {
      clearTimeout(timer);
      //alert('Temporizador cancelado!');
    }

// lista inicial
 sessionStorage.setItem('Itens+', '');
sessionStorage.setItem('Coll', 'Geraldb');
function listaInicial(){
iniciar() ;
var nichos=sessionStorage.getItem('STORnicho');
var buscar= sessionStorage.getItem('STORbusca');
var itens = 0;
var respItens= sessionStorage.getItem('Itens+');
if(!respItens||respItens==''){
 var respItens=6;
  sessionStorage.setItem('Itens+', 6);
}else{
 var respItens=sessionStorage.getItem('Itens+');
}

var list= document.getElementById('list');
list.innerHTML=''
var coll= sessionStorage.getItem('Coll')
var db=firebase.firestore();
var produtosRef = db.collection(`${coll}`);
produtosRef.get().then((querySnapshot) => {
querySnapshot.forEach(doc => {
var doc = doc.data();
var itemss= querySnapshot.size;
sessionStorage.setItem('ItensTotal', itemss);

  if(nichos==''|| nichos==doc.Nichos){
  if(buscar==''|| buscar==doc.SubLista){
itens++
 if(itens<=respItens){
cancelar() 
var div = document.createElement('div');
var div2 = document.createElement('div');
var div3 = document.createElement('div');
var div4 = document.createElement('div');
div.className = 'divList';
div2.className = 'divList2';
div3.className = 'divList3';
div4.className = 'divList4';

var img = document.createElement('img');
img.src = doc.URLIMG;
img.alt = doc.Titulo;
img.className = 'imgList';

var p= document.createElement('p');
p.textContent = doc.Empresa;
p.className = 'pEmpresa';

var h2 = document.createElement('h3');
h2.textContent = doc.Titulo;
h2.className = 'h2Titulo';

var p2 = document.createElement('p');
p2.textContent = doc.SubTitulo;
p2.className = 'pSubtitulo';

var vl=doc.Valor.split(',');
var v1=vl[0]
var v2=vl[1]

var h3 = document.createElement('p');

h3.innerHTML = `R$ <b id='bv'>${v1}</b><b id='bvc'>${v2}</b>`;
h3.className = 'h3Valor';

var botao = document.createElement('button');
botao.textContent = 'Ir para loja';
botao.className = 'btnList';



div2.appendChild(img);
div3.appendChild(p);
div3.appendChild(h2);
div3.appendChild(p2);
div4.appendChild(h3);
div4.appendChild(botao);

div.appendChild(div2);
div.appendChild(div3);
div.appendChild(div4);

list.appendChild(div);

function verificarTela() {
  if (window.innerWidth < 1100) {
    //document.getElementById('a_pesquisaMobile').click();
     document.getElementById('divLista').scrollIntoView({behavior: 'smooth'});

  } else {
    //document.getElementById('a_pesquisa').click();
     document.getElementById('main_Um').scrollIntoView({behavior: 'smooth'});
  }
}

// Executa ao carregar
verificarTela();




botao.addEventListener('click', function() {
   var IDU= sessionStorage.getItem('idUser');
   var hora= sessionStorage.getItem('hora')
   var data= sessionStorage.getItem('data')
  var dbfid=firebase.firestore();
   dbfid.collection('Clicks_BTNLojas').doc(`${IDU}_${hora}`).set({
    ID:IDU,
    Produto:doc.Titulo,
     Codigo:doc.ID,
    DATA:`${data}-${hora}`,
  })
window.open(`${doc.Link}`, '_blank');
})
img.addEventListener('click', function() {
Swal.fire({
title: `${doc.Empresa}`,

text: ``,
html: ` <button id='btnLoja' class='btnList'>Ir para loja </button> <button id='btnCompart'  title='Compartilhe esse Produto'> <i id='Icompart' class="fa-solid fa-square-share-nodes"></i></button>`,
imageUrl: doc.URLIMG,
imageAlt: `${doc.Titulo}`,
background: '#ffffff',
color: '#252525', // cor do texto });
showCloseButton: true,   // habilita o "X"
backdrop: true, // habilita o fundo escuro
allowOutsideClick: true,
showConfirmButton: false,
customClass: {
popup: 'my-customProduto' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';   
}
})

document.getElementById('btnCompart').addEventListener('click', function(){
var pag = `${doc.Link}`
var url = "https://orlasul.netlify.app/";
var Titulo = `${doc.Titulo}: ${pag}`;
var whatsappMessage =`✅  ${Titulo} \n\nPágina na web: ${url}`;
var whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
window.open(whatsappLink, "_blank");
})

 document.getElementById('btnLoja').addEventListener('click', function() {

   var IDU= sessionStorage.getItem('idUser');
   var hora= sessionStorage.getItem('hora')
   var data= sessionStorage.getItem('data')

   var dbfid=firebase.firestore();
   dbfid.collection('Clicks_BTNLojas').doc(`${IDU}_${hora}`).set({
    ID:IDU,
    Produto:doc.Titulo,
     Codigo:doc.ID,
    DATA:`${data}-${hora}`,
  })

  window.open(`${doc.Link}`, '_blank');
 })
})
//swal(`${doc.Empresa}`,`${doc.Titulo} \n\n Promoção ${doc.Valor}`, doc.URLIMG)
//alert(itens)
}
 }
}
})
})
}

//atalho por Nichos
 sessionStorage.setItem('STORnicho', '')
 document.getElementById('nichos').value='';

document.getElementById('nichos').addEventListener('change', function(){
 var nich= document.getElementById('nichos').value;
 if(nich==''|| nich=='sair_s'){
 sessionStorage.setItem('STORnicho', '')
 document.getElementById('nichos').value='';
 } else{
 sessionStorage.setItem('STORnicho', nich)
 }
  sessionStorage.setItem('Itens+', '')
  sessionStorage.setItem('Coll', 'Geraldb')
   sessionStorage.setItem('STORbusca', '')
  document.getElementById('BascaR').value='';
 //alert(nich)
 document.getElementById('divBtnMais').style.display='block';
 setTimeout(function(){
listaInicial()
},200)
})

//atalho busca
 sessionStorage.setItem('STORbusca', '')
   document.getElementById('BascaR').value='';
document.getElementById('BascaR').addEventListener('change', function(){
 var busca= document.getElementById('BascaR').value;
 if(busca==''|| busca=='sair_s'){
 sessionStorage.setItem('STORbusca', '')
 document.getElementById('BascaR').value='';
 } else{
 sessionStorage.setItem('STORbusca', busca)
 }
  sessionStorage.setItem('Itens+', '')
  sessionStorage.setItem('Coll', 'Geraldb')
   sessionStorage.setItem('STORnicho', '')
  document.getElementById('nichos').value='';
 //alert(nich)
 document.getElementById('divBtnMais').style.display='block';
 setTimeout(function(){
listaInicial()
},200)
})

//busca paragrafos
document.getElementById('divSbpastas').addEventListener('click', function(e) {
  if (e.target.tagName === 'P') {

 document.getElementById('divBtnMais').style.display='block';
   sessionStorage.setItem('Coll', 'Geraldb')
  sessionStorage.setItem('Itens+','')
  sessionStorage.setItem('ItensTotal','')
sessionStorage.setItem('STORbusca',e.target.title)
    //alert(e.target.title);
      
 sessionStorage.setItem('STORnicho', '')
document.getElementById('BascaR').value='';
 document.getElementById('nichos').value='';

    listaInicial()
  
  }
});

// Captura o campo de texto
var tecla = document.getElementById('inputPesquisar');

// Escuta a tecla pressionada
tecla.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
     document.getElementById('magalu').scrollIntoView({behavior: 'smooth'});
    document.getElementById('btnPesquisar').click();
  }
});

// Pesquisar
document.getElementById('btnPesquisar').addEventListener('click', function(){

 sessionStorage.setItem('STORbusca', '')
 sessionStorage.setItem('STORnicho', '')
 document.getElementById('BascaR').value='';
 document.getElementById('nichos').value='';

   document.getElementById('divBtnMais').style.display='block';
  var pesquisa = document.getElementById('inputPesquisar').value.trim();
  if(!pesquisa||pesquisa==''){
    cancelar()
  }else{
  iniciar() 
  }
  var itens = 0
var respItens= sessionStorage.getItem('Itens+')
if(!respItens||respItens==''){
 var respItens=12
  sessionStorage.setItem('Itens+', 12)
}else{
 var respItens=sessionStorage.getItem('Itens+')
}

var list= document.getElementById('list');
list.innerHTML=''
var coll= sessionStorage.getItem('Coll')
var db=firebase.firestore();
var produtosRef = db.collection(`Geraldb`);
produtosRef.get().then((querySnapshot) => {
querySnapshot.forEach(doc => {
var doc = doc.data();
var itemss_= querySnapshot.size;
sessionStorage.setItem('ItensTotal', itemss_)
let campos = [doc.Titulo, doc.SubTitulo, doc.OBS];
campos = campos.map(c => c ? c.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g,"").toLowerCase().trim() : '');
pesquisa = pesquisa.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g,"").toLowerCase().trim();

if (campos.some(c => c && c.toLowerCase().includes(pesquisa))) {

itens++
 if(itens<=respItens){
  cancelar()
var div = document.createElement('div');
var div2 = document.createElement('div');
var div3 = document.createElement('div');
var div4 = document.createElement('div');
div.className = 'divList';
div2.className = 'divList2';
div3.className = 'divList3';
div4.className = 'divList4';

var img = document.createElement('img');
img.src = doc.URLIMG;
img.alt = doc.Titulo;
img.className = 'imgList';

var p= document.createElement('p');
p.textContent = doc.Empresa;
p.className = 'pEmpresa';

var h2 = document.createElement('h3');
h2.textContent = doc.Titulo;
h2.className = 'h2Titulo';

var p2 = document.createElement('p');
p2.textContent = doc.SubTitulo;
p2.className = 'pSubtitulo';

var vl=doc.Valor.split(',');
var v1=vl[0]
var v2=vl[1]

var h3 = document.createElement('p');

h3.innerHTML = `R$ <b id='bv'>${v1}</b><b id='bvc'>${v2}</b>`;
h3.className = 'h3Valor';

var botao = document.createElement('button');
botao.textContent = 'Ir para loja';
botao.className = 'btnList';

div2.appendChild(img);
div3.appendChild(p);
div3.appendChild(h2);
div3.appendChild(p2);
div4.appendChild(h3);
div4.appendChild(botao);

div.appendChild(div2);
div.appendChild(div3);
div.appendChild(div4);

list.appendChild(div);

function verificarTela() {
  if (window.innerWidth < 1100) {
    //document.getElementById('a_pesquisaMobile').click();
    document.getElementById('divLista').scrollIntoView({behavior: 'smooth'});

  } else {
   // document.getElementById('a_pesquisa').click();
     document.getElementById('main_Um').scrollIntoView({behavior: 'smooth'});
  }
}
document.getElementById('inputPesquisar').blur();

// Executa ao carregar
verificarTela();

botao.addEventListener('click', function() {
  var IDU= sessionStorage.getItem('idUser');
  var hora= sessionStorage.getItem('hora')
  var data= sessionStorage.getItem('data')
  var dbfid=firebase.firestore();
  dbfid.collection('Clicks_BTNLojas').doc(`${IDU}_${hora}`).set({
    ID:IDU,
    Produto:doc.Titulo,
     Codigo:doc.ID,
    DATA:`${data}-${hora}`,
  })
window.open(`${doc.Link}`, '_blank');
})
img.addEventListener('click', function() {
Swal.fire({
title: `${doc.Empresa}`,

  text: ``,
  html: ` <button id='btnLoja' class='btnList'>Ir para loja </button> <button id='btnCompart'  title='Compartilhe esse Produto'> <i id='Icompart' class="fa-solid fa-square-share-nodes"></i></button>`,
  imageUrl: doc.URLIMG,
  imageAlt: `${doc.Titulo}`,
  background: '#ffffff',
  color: '#252525', // cor do texto });
  showCloseButton: true,   // habilita o "X"
  backdrop: true, // habilita o fundo escuro
  allowOutsideClick: true,
  showConfirmButton: false,
  customClass: {
  popup: 'my-customProduto' // Aplica a classe CSS personalizada
  },
  didOpen: () => {
  document.body.style.paddingRight = '0px';   
  }
  })

  document.getElementById('btnCompart').addEventListener('click', function(){
  var pag = `${doc.Link}`
  var url = "https://orlasul.netlify.app/";
  var Titulo = `${doc.Titulo}: ${pag}`;
  var whatsappMessage =`✅  ${Titulo} \n\nPágina na web: ${url}`;
  var whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappLink, "_blank");
  })

 document.getElementById('btnLoja').addEventListener('click', function() {
   var IDU= sessionStorage.getItem('idUser');
   var hora= sessionStorage.getItem('hora')
   var data= sessionStorage.getItem('data')
  var dbfid=firebase.firestore();
  dbfid.collection('Clicks_BTNLojas').doc(`${IDU}_${hora}`).set({
    ID:IDU,
    Produto:doc.Titulo,
    Codigo:doc.ID,
    DATA:`${data}-${hora}`,
  })

  window.open(`${doc.Link}`, '_blank');
 })
})
//swal(`${doc.Empresa}`,`${doc.Titulo} \n\n Promoção ${doc.Valor}`, doc.URLIMG)
//alert(itens)
}
}
})
})
})

document.getElementById('btnMais').addEventListener('click', function(){
   var resp=sessionStorage.getItem('ItensTotal')
var respItens= sessionStorage.getItem('Itens+')
var Itens= parseInt(respItens) + 12
//alert(respItens)
sessionStorage.setItem('Itens+', Itens)
if(respItens>resp){
document.getElementById('divBtnMais').style.display='none';
}
listaInicial()
})
listaInicial()

document.getElementById('laterParagrafos').addEventListener('click', function(e) {
  if (e.target.tagName === 'P') {

  document.getElementById('divBtnMais').style.display='block';
  sessionStorage.setItem('Itens+','')
  sessionStorage.setItem('ItensTotal','')
  sessionStorage.setItem('Coll', e.target.title)
    //alert(e.target.title);
      
 sessionStorage.setItem('STORbusca', '')
 sessionStorage.setItem('STORnicho', '')
 document.getElementById('BascaR').value='';
 document.getElementById('nichos').value='';

    listaInicial()
  }
});
document.getElementById('laterParagrafos').addEventListener('click', function(e) {
  if (e.target.tagName === 'IMG') {

  document.getElementById('divBtnMais').style.display='block';
  sessionStorage.setItem('Itens+','')
  sessionStorage.setItem('ItensTotal','')
  sessionStorage.setItem('Coll', e.target.title)
    
  sessionStorage.setItem('STORbusca', '')
  sessionStorage.setItem('STORnicho', '')
  document.getElementById('BascaR').value='';
  document.getElementById('nichos').value='';

    listaInicial()
    //alert(e.target.title);
  }
});

//facebook
document.getElementById('P_facebook').addEventListener('click', function(){
 window.open('https://www.facebook.com/profile.php?id=100091239759634','_blank')
});
document.getElementById('a_facebook').addEventListener('click', function(){
  window.open('https://www.facebook.com/profile.php?id=100091239759634','_blank')
});

//instagran
document.getElementById('a_insta').addEventListener('click', function(){
  window.open('https://www.instagram.com/orlasul_lojaonline/','_blank')
});
document.getElementById('P_InstagreanFooter').addEventListener('click', function(){
  window.open('https://www.instagram.com/orlasul_lojaonline/','_blank')
});

//Email
document.getElementById('emailMenu').addEventListener('click', function(){
  var destinatario = sessionStorage.getItem('EmailAdmin');
  alert(destinatario);
  var assunto = "Orla Sul contato";
  var corpo = "Olá, gostaria de falar sobre Orla Sul.";
  var isMobile = /Android|iPhone/i.test(navigator.userAgent);
  if(isMobile){
    window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  } else {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`,"_blank");
  }
});
document.getElementById('P_EmailFooter').addEventListener('click', function(){
 var destinatario = sessionStorage.getItem('EmailAdmin');
  var assunto = "Orla Sul contato";
  var corpo = "Olá, gostaria de falar sobre Orla Sul.";
  var isMobile = /Android|iPhone/i.test(navigator.userAgent);
  if(isMobile){
    window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  } else {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`,"_blank");
  }
});

//Compartilhar pagina
document.getElementById('I_compartilhar').addEventListener('click',function(){
var url = "https://orlasul.netlify.app/";
var titulo = `👉 Encontre aqui ofertas incriveis  ${url}`;
var whatsappMessage = `${titulo}\n`;
var whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
// abre o WhatsApp com a mensagem
window.open(whatsappLink, "_blank");
})

setTimeout(function(){
   cancelar() 
  document.getElementById('div_lista_').style.display='block';
  document.getElementById('topo').click()
     
  sessionStorage.setItem('STORbusca', '');
  sessionStorage.setItem('STORnicho', '');
  document.getElementById('BascaR').value='';
  document.getElementById('nichos').value='';

  verificarTelaTG() 
},1000)
document.getElementById('divQuemSomos').style.display='none';

//IDUSER
function iduser(){
  var caracteres_ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijlmnopqrstuvxzywk';
  var idU= sessionStorage.getItem('idUser');

  if(!idU||idU==''){
var codigoIdUser = '';
for (let i = 0; i < 8; i++) {
codigoIdUser += caracteres_.charAt(Math.floor(Math.random() * caracteres_.length));
sessionStorage.setItem('idUser', codigoIdUser);
}
  } else{
  }
}

iduser()

// Lista de mais procurados
sessionStorage.setItem('Itens+_', '')
sessionStorage.setItem('Coll_', 'Geraldb')
function listaMaisProcurados(){

var itens_ = 0
var respItens= sessionStorage.getItem('Itens+_')
if(!respItens||respItens==''){
 var respItens=25
  //sessionStorage.setItem('Itens+_', 36)
}else{
 var respItens=sessionStorage.getItem('Itens+_')
}

var list_= document.getElementById('list_');
list_.innerHTML=''
var coll_= sessionStorage.getItem('Coll_')
var dbM=firebase.firestore();
var produtosRef_ = dbM.collection(`${coll_}`);
produtosRef_.get().then((querySnapshot) => {
querySnapshot.forEach(doc => {
var doc = doc.data();
var itemss_= querySnapshot.size;
sessionStorage.setItem('ItensTotal_', itemss_)

  if(doc.Link2){

itens_++
 if(itens_<=respItens){
cancelar() 
var div = document.createElement('div');
var div2 = document.createElement('div');
var div3 = document.createElement('div');
var div4 = document.createElement('div');
div.className = 'divList_';
div2.className = 'divList2';
div3.className = 'divList3';
div4.className = 'divList4';

var img = document.createElement('img');
img.src = doc.URLIMG;
img.alt = doc.Titulo;
img.className = 'imgList_';

var p= document.createElement('p');
p.textContent = doc.Empresa;
p.className = 'pEmpresa';

var h2 = document.createElement('h3');
h2.textContent = doc.Titulo;
h2.className = 'h2Titulo';

var p2 = document.createElement('p');
p2.textContent = doc.SubTitulo;
p2.className = 'pSubtitulo';

var vl=doc.Valor.split(',');
var v1=vl[0]
var v2=vl[1]

var h3 = document.createElement('p');

h3.innerHTML = `R$  <b id='bv'>${v1}</b><b id='bvc'>${v2}</b>`;
h3.className = 'h3Valor';

var botao = document.createElement('button');
botao.textContent = 'Ir para loja';
botao.className = 'btnList_';

div2.appendChild(img);
div3.appendChild(p);
div3.appendChild(h2);
div3.appendChild(p2);
div4.appendChild(h3);
div4.appendChild(botao);

div.appendChild(div2);
div.appendChild(div3);
div.appendChild(div4);

list_.appendChild(div);

botao.addEventListener('click', function() {
   var IDU= sessionStorage.getItem('idUser');
   var hora= sessionStorage.getItem('hora')
   var data= sessionStorage.getItem('data')
  var dbfid=firebase.firestore();
   dbfid.collection('Clicks_BTNLojas').doc(`${IDU}_${hora}`).set({
    ID:IDU,
    Produto:doc.Titulo,
     Codigo:doc.ID,
    DATA:`${data}-${hora}`,
  })
window.open(`${doc.Link}`, '_blank');
})
img.addEventListener('click', function() {
Swal.fire({
title: `${doc.Empresa}`,

text: ``,
html: ` <button id='btnLoja' class='btnList'>Ir para loja </button> <button id='btnCompart'  title='Compartilhe esse Produto'> <i id='Icompart' class="fa-solid fa-square-share-nodes"></i></button>`,
imageUrl: doc.URLIMG,
imageAlt: `${doc.Titulo}`,
background: '#ffffff',
color: '#252525', // cor do texto });
showCloseButton: true,   // habilita o "X"
backdrop: true, // habilita o fundo escuro
allowOutsideClick: true,
showConfirmButton: false,
customClass: {
popup: 'my-customProduto' // Aplica a classe CSS personalizada
},
didOpen: () => {
document.body.style.paddingRight = '0px';   
}
})

document.getElementById('btnCompart').addEventListener('click', function(){
var pag = `${doc.Link}`
var url = "https://orlasul.netlify.app/";
var Titulo = `${doc.Titulo}: ${pag}`;
var whatsappMessage =`✅  ${Titulo} \n\nPágina na web: ${url}`;
var whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
window.open(whatsappLink, "_blank");
})
 document.getElementById('btnLoja').addEventListener('click', function() {

   var IDU= sessionStorage.getItem('idUser');
   var hora= sessionStorage.getItem('hora')
   var data= sessionStorage.getItem('data')

   var dbfid=firebase.firestore();
   dbfid.collection('Clicks_BTNLojas').doc(`${IDU}_${hora}`).set({
    ID:IDU,
    Produto:doc.Titulo,
     Codigo:doc.ID,
    DATA:`${data}-${hora}`,
  })

  window.open(`${doc.Link2}`, '_blank');
 })
})
//swal(`${doc.Empresa}`,`${doc.Titulo} \n\n Promoção ${doc.Valor}`, doc.URLIMG)
//alert(itens)
}
 }
})
})
}
listaMaisProcurados()


document.getElementById('inputPesquisar').scrollIntoView({behavior: 'smooth'});




//privacidade
document.getElementById('PPrivate').addEventListener('click', function(){
  window.open('https://orlasul.netlify.app/HTML/privacidade.html','_blank')
})