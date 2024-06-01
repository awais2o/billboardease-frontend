import moment from 'moment-timezone'

// Example function to convert to PST
export const convertToPST = dateTime => {
  return moment(dateTime).tz('Asia/Karachi').format()
}
