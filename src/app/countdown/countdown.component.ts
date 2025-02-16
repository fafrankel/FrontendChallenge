import { Component, Input } from '@angular/core'

@Component({
  selector: 'countdown',
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent {
  eventTitle = ''
  eventDate: string = ''
  eventTitleId = 'event-title'
  dateTitleId = 'date-title'
  textContainerId = 'title-container'

  ngOnInit() {
    this.eventTitle = localStorage.getItem('eventTitle') || ''
    this.eventDate = localStorage.getItem('eventDate') || ''

    console.log('Init', this.eventTitle, this.eventDate)
  }

  ngAfterViewInit() {
    this.adjustFontSizes()
    window.addEventListener('resize', () => this.adjustFontSizes())
  }

  adjustFontSizes() {
    this.adjustFontSize(this.eventTitleId, this.textContainerId)
    this.adjustFontSize(this.dateTitleId, this.textContainerId)
  }

  adjustFontSize(id: string, containerId: string) {
    const element = document.getElementById(id)
    const containerElement = document.getElementById(containerId)
    if (!element || !containerElement) return

    let fontSize = 200
    element.style.fontSize = `${fontSize}px`
    while (element.clientWidth > containerElement.clientWidth && fontSize > 10) {
      fontSize -= 1
      element.style.fontSize = `${fontSize}px`
    }
  }

  onEventNameChange(e: Event) {
    const value = (e.target as HTMLInputElement).value
    localStorage.setItem('eventTitle', value)
    this.eventTitle = value
    setTimeout(() => this.adjustFontSize(this.eventTitleId, this.textContainerId), 30)
  }

  onDateChange(e: Event) {
    const value = (e.target as HTMLInputElement).value
    localStorage.setItem('eventDate', value)
    this.eventDate = value
    setTimeout(() => this.adjustFontSize(this.dateTitleId, this.textContainerId), 30)
  }

  formattedEventTitleString() {
    if (!this.eventTitle) return ''
    return `Time to ${this.eventTitle}`
  }

  formattedDateString() {
    if (!this.eventDate) return ''
    const startDate = new Date()
    const eventDate = new Date(this.eventDate)
    let diffInSeconds = Math.floor((eventDate.getTime() - startDate.getTime()) / 1000)

    const days = Math.floor(diffInSeconds / (24 * 3600))
    diffInSeconds %= 24 * 3600
    const hours = Math.floor(diffInSeconds / 3600)
    diffInSeconds %= 3600
    const minutes = Math.floor(diffInSeconds / 60)
    const seconds = diffInSeconds % 60

    return `${days} days, ${hours} hours, ${minutes} min, ${seconds} sec`
  }
}
