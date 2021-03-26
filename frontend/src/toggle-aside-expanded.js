export default function (status) {
  const sideMenu = document.getElementsByClassName('side-menu')
  if (!document.querySelector('#side-toggle-btn > .fa')) return
  if (status === undefined) {
    sideMenu[0].classList.toggle('expanded')
    window.leftAsideExpanded = !window.leftAsideExpanded
    document.querySelector('#side-toggle-btn > .fa').classList.toggle('fa-angle-right')
    document.querySelector('#side-toggle-btn > .fa').classList.toggle('fa-angle-left')
  } else if (status === false) {
    sideMenu[0].classList.remove('expanded')
    window.leftAsideExpanded = false
    document.querySelector('#side-toggle-btn > .fa').classList.remove('fa-angle-right')
    document.querySelector('#side-toggle-btn > .fa').classList.remove('fa-angle-left')
    document.querySelector('#side-toggle-btn > .fa').classList.add('fa-angle-right')
  }
}
