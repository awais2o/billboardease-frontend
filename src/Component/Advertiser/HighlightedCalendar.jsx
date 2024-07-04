import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' // Import the styles

const HighlightedCalendar = ({ highlightedDates }) => {
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const pkTimeOffset = 5 * 60 // PKT is UTC+5 hours
      const localDate = new Date(date.getTime() + pkTimeOffset * 60000)
      const dateString = localDate.toISOString().split('T')[0]

      if (highlightedDates.includes(dateString)) {
        return 'highlight'
      }
    }
    return null
  }

  return (
    <div>
      <Calendar tileClassName={tileClassName} />
      <style>{`
        .highlight {
          background: #12ff4d !important;
          color: black !important;
        }
      `}</style>
    </div>
  )
}

export default HighlightedCalendar
