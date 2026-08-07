

// Tela Cheia
/*
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
*/


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

sessionStorage.setItem('Nome_Imagem','')
document.getElementById('Empresa').value='';
document.getElementById('Funcao').value='';

document.getElementById('Cad_img').addEventListener('click',function(){
var lista=document.getElementById('Empresa').value;
var código=document.getElementById('Código').value;

if(!lista|| lista==''|| !código ||código==''){
Swal.fire('','Selecione uma empresa!','warning')
}else{
document.getElementById('fileInput').click()
}
});

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = "https://jsraqnqnoqyphmmmrwkd.supabase.co"
const SUPABASE_KEY = "sb_publishable_X2aCEvWLk0tvHTR6qdNq9w_9RxiUIPK"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const inputFile = document.getElementById('fileInput')
const imgPreview = document.getElementById('Cad_img')

inputFile.addEventListener('change', async (event) => {
var código=document.getElementById('Código').value;
var titulo=document.getElementById('titulo').value;
var subt=document.getElementById('subT').value;
var obs=document.getElementById('obs').value;
var valor=document.getElementById('Valor').value;
var link=document.getElementById('links').value;
var link2=document.getElementById('outroLink').value;
var lista=document.getElementById('Empresa').value;
var Nicho=document.getElementById('nichos').value;
var refence='png';

const file = event.target.files[0]
if (!file) return
// Upload para o bucket 'imagensapp'
const { data, error } = await supabase
.storage
.from('Orladb') // nome do bucket
.upload(`${lista}/${código}${refence}`, file, { upsert: true })
if (error) {
console.error('Erro no upload:', error)
return
}
// Recupera URL pública
const { data: publicData } = supabase
.storage
.from('Orladb')
.getPublicUrl(`${lista}/${código}${refence}`)

// Mostra a imagem no <img>
imgPreview.src = publicData.publicUrl
//alert(publicData.publicUrl)
sessionStorage.setItem('Nome_Imagem', `${lista}/${código}${refence}` )

//var resp = document.getElementById('fileInput');
//resp.disabled = true;
//setTimeout(function(){
//var imagem= document.getElementById('Cad_img').src;
//alert(imagem)
//},2000)
})

document.getElementById('salvar').addEventListener('click',function(){
 
var data=sessionStorage.getItem('data')
var hora=sessionStorage.getItem('hora')

var código=document.getElementById('Código').value;
var titulo=document.getElementById('titulo').value;
var subt=document.getElementById('subT').value;
var obs=document.getElementById('obs').value;
var valor=document.getElementById('Valor').value;
var link=document.getElementById('links').value;
var link2=document.getElementById('outroLink').value;
var lista=document.getElementById('Empresa').value;
var imagem=document.getElementById('Cad_img').src;
var nomeIMG=sessionStorage.getItem('Nome_Imagem')
var Nicho=document.getElementById('nichos').value;

if(!código||!lista||!titulo||!valor||!Nicho){
     Swal.fire('Preencha os campos!','','')
 }else{

var db= firebase.firestore();
db.collection(lista).doc(código).set({

Titulo:titulo,
SubTitulo:subt,
ID:código,
OBS:obs,
Valor:valor,
Link:link,
Link2:link2,
Empresa:lista,
Lista:lista,
URLIMG:imagem,
NomeIMG: nomeIMG,
Nichos:Nicho,
Data:data,
Hora:hora,

})

var Gdb=firebase.firestore();
db.collection('Geraldb').doc(código).set({

Titulo:titulo,
SubTitulo:subt,
ID:código,
OBS:obs,
Valor:valor,
Link:link,
Link2:link2,
Empresa:lista,
Lista:'Geraldb',
URLIMG:imagem,
NomeIMG: nomeIMG,
Nichos:Nicho,
Data:data,
Hora:hora,

})
Swal.fire('Salvo com sucesso!','','success')
document.getElementById('sairCad').click()
 }
});


//fechar cadastro
document.getElementById('sairCad').addEventListener('click',function(){
 document.getElementById('divCadastro').style.display='none';
 document.getElementById('Funcao').value='';
 limparCad()
});

//fechar Produtos Cadastrodos
document.getElementById('sairProdCad').addEventListener('click',function(){
 document.getElementById('divProdCadastrados').style.display='none';
 document.getElementById('Funcao').value='';
 limparCad()
})

//select seleção + gerar código
document.getElementById('Funcao').addEventListener('change',function(){
    var funçao=document.getElementById('Funcao').value;

    if(!funçao|| funçao==''|| funçao=='sair'){
        document.getElementById('Funcao').value='';
         sessionStorage.setItem('STORnichos', '')
           sessionStorage.setItem('STORempresa', '')
        limparCad()
      //alert('Exit')
    
  document.getElementById('divCadastro').style.display='none';
  document.getElementById('divProdCadastrados').style.display='none';

    }else if(funçao=='Cadastrar'){
  // alert('Cadastrar')
   sessionStorage.setItem('STORnichos', '')
  document.getElementById('divCadastro').style.display='block';
  document.getElementById('divProdCadastrados').style.display='none';
 geradorCodigo()
    }else if(funçao=='Cadastrados'){
 //  alert('Cadastrados')
  sessionStorage.setItem('STORempresa', '')
  limparCad()
  document.getElementById('divCadastro').style.display='none';
  document.getElementById('divProdCadastrados').style.display='block';
  ListaItens()
    }
  
});

// Gerar código
function geradorCodigo(){
document.getElementById('Código').value= ''
var cod=document.getElementById('Código').value;
if(!cod|| cod==''){
var hora= sessionStorage.getItem('hora')
var data= sessionStorage.getItem('data')
var time= hora.split(':')
var resp0=time[0]
var resp1=time[1]
var resp2=time[2]
var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let codigo = '';
for (let i = 0; i < 4; i++) {
codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
var codigo_= `${codigo}-`+resp1+resp2
document.getElementById('Código').value= `${codigo_}`
}
} else{
}
}

function limparCad(){
document.getElementById('Código').value='';
document.getElementById('titulo').value='';
document.getElementById('subT').value='';
document.getElementById('obs').value='';
document.getElementById('Valor').value='';
document.getElementById('links').value='';
document.getElementById('outroLink').value='';
document.getElementById('Empresa').value='';
document.getElementById('Cad_img').src='../SRC/Profile-PNG-Images.png';
sessionStorage.setItem('Nome_Imagem','')
document.getElementById('Funcao').value='';
document.getElementById('nichos').value='';
}



//lista de produtos
sessionStorage.setItem('Collection','Geraldb');
function ListaItens(){

var Emp= sessionStorage.getItem('STORempresa')
var nicho=sessionStorage.getItem('STORnichos')
  
var coll=sessionStorage.getItem('Collection');
//var seleção=sessionStorage.getItem('ListaItens')
var itens=0;
var list = document.getElementById('list');
list.innerHTML=''
var dbl = firebase.firestore();
var produtosRef = dbl.collection(coll);
produtosRef.get().then((querySnapshot) => {
querySnapshot.forEach(docSnap => {
var doc = docSnap.data();
if(Emp== doc.Empresa || !Emp || Emp=='' ){
  if(!nicho ||nicho==''||nicho== doc.Nichos ){
itens++

var containner=document.createElement('div');
var div1=document.createElement('div');
var div2=document.createElement('div');
var div3=document.createElement('div');

var label1=document.createElement('label');
//var label2=document.createElement('label');
var label3=document.createElement('label');
var label4=document.createElement('label');

var botão=document.createElement('botton');
var botão2=document.createElement('botton');
var botão3=document.createElement('botton');

var imagem=document.createElement('img');

containner.className='ContG';
div1.className='div1';
div2.className='div2';
div3.className='div3';

label1.className='label1';
//label2.className='label2';
label3.className='label3';
label4.className='label4';


label1.textContent=doc.Titulo;
//label2.textContent=doc.SubTitulo;
label3.textContent=`Empresa: ${doc.Empresa}`;
label4.textContent=doc.ID;


botão.id='botão';
botão2.id='botão2';
botão3.id='botão3';

botão.textContent='📝Editar'
botão2.className='fa-solid fa-eye';
botão3.textContent='Excluir'


imagem.className='imagem1'
imagem.src=doc.URLIMG


div1.appendChild(imagem);
div2.appendChild(label1)
//div2.appendChild(label2)
div2.appendChild(document.createElement('br'))
div2.appendChild(label3)
div2.appendChild(document.createElement('br'))
div2.appendChild(label4)
div3.appendChild(botão2);
div3.appendChild(document.createElement('br'))

div3.appendChild(botão);
div3.appendChild(botão3);

containner.appendChild(div1);
containner.appendChild(div2);
containner.appendChild(div3);
list.appendChild(containner);

botão.addEventListener('click',function(){
document.getElementById('Valor').value=doc.Valor;
document.getElementById('titulo').value=doc.Titulo;
document.getElementById('subT').value=doc.SubTitulo;
document.getElementById('obs').value=doc.OBS;
document.getElementById('links').value=doc.Link;
document.getElementById('outroLink').value=doc.Link2;
document.getElementById('Empresa').value=doc.Empresa;
document.getElementById('Cad_img').src=doc.URLIMG;
document.getElementById('Código').value=doc.ID;
document.getElementById('divCadastro').style.display='block';
document.getElementById('divProdCadastrados').style.display='none';

var NCH= doc.Nichos
if(!NCH){
document.getElementById('nichos').value='';
}else{
document.getElementById('nichos').value=doc.Nichos;
}
//var resp = document.getElementById('inputNome');
//resp.disabled = true;
//var resp2=document.getElementById('selectDoc');
//resp2.disabled = true;
//document.getElementById('a_cadastro').click()

})
  
botão3.addEventListener('dblclick', function() {
  var url = doc.URLIMG;
  
  var dbx = firebase.firestore();
  dbx.collection(doc.Empresa).doc(doc.ID).delete();

  var dbxz = firebase.firestore();
  dbxz.collection('Geraldb').doc(doc.ID).delete();

  setTimeout(function() {
    Swal.fire('Excluído', '', 'success');
  }, 1500);
});

 }
 }

})
})
};


//atalho por Empreas
 sessionStorage.setItem('STORempresa', '')
document.getElementById('Empresa_').addEventListener('change', function(){
 var emp= document.getElementById('Empresa_').value;
 sessionStorage.setItem('STORempresa', emp)
setTimeout(function(){
ListaItens()
},200)

})

//atalho por Nichos
 sessionStorage.setItem('STORnichos', '')
document.getElementById('nichos_').addEventListener('change', function(){
 var nich= document.getElementById('nichos_').value;
 sessionStorage.setItem('STORnichos', nich)
 setTimeout(function(){
ListaItens()
},200)
})

document.getElementById('bHome').addEventListener('click',function(){
  window.open('../index.html','_self')
})
document.getElementById('I_Casa').addEventListener('click',function(){
  window.open('../index.html','_self')
})


