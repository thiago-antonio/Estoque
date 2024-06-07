const dadosgrid = document.querySelector("#dadosgrid")
const btn_add = document.querySelector("#btn_add")
const novoColaborador = document.querySelector("#novoColaborador")
const btn_fecharPopup = document.querySelector("#btn_fecharPopup")
const btn_gravarPopup = document.querySelector("#btn_gravarPopup")
const btn_cancelarPopup = document.querySelector("#btn_cancelarPopup")
const telefones = document.querySelector("#telefones")
const f_fone = document.querySelector("#f_fone")
const f_nome = document.querySelector("#f_nome")
const f_tipoColab = document.querySelector("#f_tipoColab")
const f_status = document.querySelector("#f_status")

const endpoint_todoscolabodores = `http://127.0.0.1:1880/todosusuarios`
fetch(endpoint_todoscolabodores)
.then(res=>res.json())
.then(res=>{
    /*console.log(res)*/
    dadosgrid.innerHTML = ""
    res.forEach(e=>{
      const divlinha = document.createElement("div")  
      divlinha.setAttribute("class","linhaGrid")

      const divc1 = document.createElement("div")  
      divc1.setAttribute("class","colunaTituloGrid c1")
      divc1.innerHTML=e.n_usuario_usuario
      divlinha.appendChild(divc1)

      const divc2 = document.createElement("div")  
      divc2.setAttribute("class","colunaTituloGrid c2")
      divc2.innerHTML=e.s_nome_usuario
      divlinha.appendChild(divc2)

      const divc3 = document.createElement("div")  
      divc3.setAttribute("class","colunaTituloGrid c3")
      divc3.innerHTML=e.n_tipousuario_tipousuario 
      divlinha.appendChild(divc3)

      const divc4 = document.createElement("div")  
      divc4.setAttribute("class","colunaTituloGrid c4")
      divc4.innerHTML=e.c_status_usuario
      divlinha.appendChild(divc4)

      const divc5 = document.createElement("div")  
      divc5.setAttribute("class","colunaTituloGrid c5")
      divlinha.appendChild(divc5)

      dadosgrid.appendChild(divlinha)
    });
})

const endpoint_tiposColab = `http://127.0.0.1:1880/tiposcolab`
fetch(endpoint_tiposColab)
.then(res=>res.json())
.then(res=>{
  f_tipoColab.innerHTML = ""
  res.forEach(e=>{
    const opt = document.createElement("option")
    opt.setAttribute("value",e.n_tipousuario_tipousuario)
    opt.innerHTML = e.s_desc_tipousuario
    f_tipoColab.appendChild(opt)
  })
})

btn_add.addEventListener("click",(evt)=>{
  novoColaborador.classList.remove("ocultarPopup")
})

btn_fecharPopup.addEventListener("click",(evt)=>{
  novoColaborador.classList.add("ocultarPopup")
})

btn_gravarPopup.addEventListener("click",(evt)=>{
  const tels = [...document.querySelectorAll(".nunTel")]
  let nunTels = []
  tels.forEach(t=>{
    nunTels.push(t.innerHTML)
  })
  const dados = {
    s_nome_usuario: f_nome.value,
    n_tipousuario_tipousuario: f_tipoColab.value,
    c_status_usuario: f_status.value,
    nuntelefones:nunTels  
  }
  console.log(dados)
  //novoColaborador.classList.add("ocultarPopup")
})
btn_cancelarPopup.addEventListener("click",(evt)=>{
  novoColaborador.classList.add("ocultarPopup")
})

f_fone.addEventListener("keyup",(evt)=>{
  if(evt.key=="Enter"){
    const divTel = document.createElement("div")
    divTel.setAttribute("class","tel")

    const nunTel = document.createElement("div")
    nunTel.setAttribute("class","nunTel")
    nunTel.innerHTML = evt.target.value
    divTel.appendChild(nunTel)

    const delTel = document.createElement("img")
    delTel.setAttribute("src","../../imgs/delete.svg")
    delTel.setAttribute("class","delTel")
    delTel.addEventListener("click",(evt)=>{
      evt.target.parentNode.remove()
    })
    divTel.appendChild(delTel)

    telefones.appendChild(divTel)
    evt.target.value = ""
  }
  
})