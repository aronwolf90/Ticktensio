export default function () {
  import('jquery').then(jQuery => {
    const $ = jQuery.default
    window.jQuery = jQuery.default
    window.$ = $
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
  })
}
