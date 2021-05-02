let sidebar = document.getElementsByClassName('sidebar')[0]

function toggleMenu() {
    if (sidebar.classList.contains('close-menu')) {
        sidebar.classList.remove('close-menu')
    } else {
        sidebar.classList.add('close-menu')
    }
}

let editform = document.getElementsByClassName('edit-form')[0]

function toggleFormEdit() {
    if (editform.classList.contains('close-edit-form')) {
        editform.classList.remove('close-edit-form')
    } else {
        editform.classList.add('close-edit-form')
    }
}

function navegateTo(link) {
    location.href = link
}

function createTask() {
    
}

function deleteTaskItem(el) {
    el.parentNode.parentNode.remove()
}