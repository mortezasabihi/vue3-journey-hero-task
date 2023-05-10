import { format } from 'date-fns'

const formatDate = (date: string) => {
  return format(new Date(date), 'EEEE, MMMM do, yyyy hh:mm a')
}

export default formatDate
