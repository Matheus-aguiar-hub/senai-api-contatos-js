'use strict'


import { getContatos, postContato, putContato, deleteContato} from "./contatos.js"

async function formularioContato(){
    const informacoes = document.getElementById('informacoes').value
    const dadosInformacoes = await getContatos(informacoes)
    document.getElementById('nome').value = dadosInformacoes.nome
    document.getElementById('celular').value = dadosInformacoes.celular
    document.getElementById('foto').value = dadosInformacoes.foto
    document.getElementById('email').value = dadosInformacoes.email
    document.getElementById('endereco').value = dadosInformacoes.endereco
    document.getElementById('cidade').value = dadosInformacoes.cidade
}

//Adiciona o cara que escuta os elementos
//Metodo porque está atrelado a uma tag html (argumento)
document.getElementById('preencherContato').addEventListener('focusout', formularioContato)