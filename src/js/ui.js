let sidebar = document.getElementsByClassName('sidebar')[0]
function toggleMenu() {
    if (sidebar.classList.contains('close-menu')) {
        sidebar.classList.remove('close-menu')
    } else {
        sidebar.classList.add('close-menu')
    }
}