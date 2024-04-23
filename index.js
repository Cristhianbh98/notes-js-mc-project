// Variables iniciales
let notes = []
if (localStorage.getItem('notes')) {
  notes = JSON.parse(localStorage.getItem('notes'))
}

// Obteniendo los datos del formulario
const form = document.querySelector('#form')
const title = document.querySelector('#title')
const body = document.querySelector('#body')

form.addEventListener('submit', function (event) {
  event.preventDefault()

  if (title.value === '' || body.value === '') {
    alert('Debes llenar todos los campos')
    return
  }

  const note = {
    title: title.value,
    body: body.value
  }

  notes.push(note)
  form.reset()

  // Actualizando notas
  updateNotes()
})

// Actualizando las notas
const notesContainer = document.querySelector('#notes')

function updateNotes() {
  notesContainer.innerHTML = ''

  notes.forEach(function (note, index) {
    const noteElement = document.createElement('div')
    noteElement.classList.add('card')
    noteElement.classList.add('m-1')
    noteElement.setAttribute('data-index', index)
    noteElement.style.width = '18rem'
    noteElement.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${note.title}</h5>
        <p class="card-text">${note.body}</p>
        <button class="btn btn-success edit">Editar</button>
        <button class="btn btn-danger delete">Eliminar</button>
      </div>
    `
    notesContainer.appendChild(noteElement)
  })

  // Guardando las notas en el localStorage
  localStorage.setItem('notes', JSON.stringify(notes))
}

// Función editar y elimnar notas
notesContainer.addEventListener('click', function (event) {
  const target = event.target
  if (target.tagName === 'BUTTON') {
    const index = target.parentElement.parentElement.getAttribute('data-index')
    console.log(index)

    // Editar nota
    if (target.classList.contains('edit')) {
      const note = notes[index]
      editNote(note, index)
    }

    // Eliminar nota
    if (target.classList.contains('delete')) {
      deleteNote(index)
    }
  }
})

// Función para editar notas
function editNote(note, index) {
  title.value = note.title
  body.value = note.body
  notes.splice(index, 1)
  updateNotes()
}

// Función para eliminar notas
function deleteNote(index) {
  notes.splice(index, 1)
  updateNotes()
}

// Inicializando las notas
updateNotes()
