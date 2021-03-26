import jQuery from 'jquery'

const $ = jQuery

export default function () {
  if (!$('.datetimepicker').datetimepicker || !$('.datepicker').datetimepicker) return
  $('.datetimepicker').datetimepicker({
    sideBySide: true,
    format: 'YYYY-MM-DD HH:mm'
  })
  $('.datepicker').datetimepicker({
    format: 'YYYY-MM-DD'
  })
  $('.timepicker').datetimepicker({
    format: 'HH:mm'
  })
  $('[data-toggle="tooltip"]').tooltip()
  $('body, [data-dismiss="modal"]').click(() => {
    return $('.modal').modal('hide')
  })
  $('.modal-content').click(event => event.stopPropagation())

  if (document.getElementById('side-toggle-btn').binded) return
  document.getElementById('side-toggle-btn').binded = true

  document.getElementById('side-toggle-btn').addEventListener('click', (event) => {
    toggleAsideExpanded() // eslint-disable-line no-undef
  })
}
