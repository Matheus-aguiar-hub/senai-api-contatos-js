'use strict'

import { getContatos, postContato, putContato, deleteContato } from "./contatos.js"

let editandoId = null

async function renderContatos() {
    const lista = document.getElementById('lista-contatos')
    lista.innerHTML = ''

    const contatos = await getContatos()

    contatos.forEach(contato => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${contato.id}</td>
            <td>${contato.nome}</td>
            <td><img src="${contato.foto}" alt="${contato.nome}" width="50" height="50"></td>
            <td>
                <button data-id="${contato.id}" width="50" class="btn-deletar">Deletar</button>
                <button data-id="${contato.id}"
                    data-nome="${contato.nome}"
                    data-celular="${contato.celular}"
                    data-foto="${contato.foto}"
                    data-email="${contato.email}"
                    data-endereco="${contato.endereco}"
                    data-cidade="${contato.cidade}"
                    class="btn-editar">Editar</button>
            </td>
        `
        lista.appendChild(row)
    })

    document.querySelectorAll('.btn-deletar').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id
            await deleteContato(id)
            renderContatos()
        })
    })

    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const d = e.target.dataset
            editandoId = d.id
            document.getElementById('nome').value     = d.nome
            document.getElementById('celular').value  = d.celular
            document.getElementById('foto').value     = d.foto
            document.getElementById('email').value    = d.email
            document.getElementById('endereco').value = d.endereco
            document.getElementById('cidade').value   = d.cidade
            document.getElementById('preencherContato').textContent = 'Salvar'
        })
    })
}

async function submeterContato() {
    const contato = {
        nome:     document.getElementById('nome').value,
        celular:  document.getElementById('celular').value,
        foto:     document.getElementById('foto').value,
        email:    document.getElementById('email').value,
        endereco: document.getElementById('endereco').value,
        cidade:   document.getElementById('cidade').value
    }

    const camposVazios = Object.values(contato).some(v => !v.trim())
    if (camposVazios) {
        alert('Preencha todos os campos.')
        return
    }

    if (editandoId) {
        await putContato(editandoId, contato)
        editandoId = null
        document.getElementById('preencherContato').textContent = 'Adicionar'
    } else {
        await postContato(contato)
    }

    ['nome','celular','foto','email','endereco','cidade'].forEach(id => {
        document.getElementById(id).value = ''
    })

    renderContatos()
}

document.getElementById('preencherContato').addEventListener('click', submeterContato)

renderContatos()