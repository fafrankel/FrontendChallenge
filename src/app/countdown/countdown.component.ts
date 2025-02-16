import { Component } from '@angular/core'

@Component({
  selector: 'countdown',
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent {
  eventName = ''
  eventDate: Date | null = null

  onEventNameChange(e: Event) {
    this.eventName = (e.target as HTMLInputElement).value
  }

  onDateChange(e: Event) {
    this.eventDate = new Date((e.target as HTMLInputElement).value)
  }

  formattedDateString() {
    if (!this.eventDate) return ''
    const startDate = new Date()
    let diffInSeconds = Math.floor((this.eventDate.getTime() - startDate.getTime()) / 1000)

    const days = Math.floor(diffInSeconds / (24 * 3600))
    diffInSeconds %= 24 * 3600
    const hours = Math.floor(diffInSeconds / 3600)
    diffInSeconds %= 3600
    const minutes = Math.floor(diffInSeconds / 60)
    const seconds = diffInSeconds % 60

    return `${days} days, ${hours} hours, ${minutes} min, ${seconds} sec`
  }
}
