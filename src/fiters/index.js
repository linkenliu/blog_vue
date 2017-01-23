import Vue from 'vue'
import moment from 'moment'

const DISPLAY_DATE_FORMAT = 'MM-DD HH:mm'

Vue.filter('converDate', function (date) {
  return moment(date).format(DISPLAY_DATE_FORMAT)
})
