/* eslint-disable import/no-duplicates */

import "./CalendarDay.js";
import { toEuropeanFormat } from "./CalendarDay.js";

const MONTHS_NAME = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

class CalendarMonth extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return `
:host {

}
.month-name{
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  background: navy;
  color: white;
  padding: 5px;
  margin: 2px;
 
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr)
}
.days calendar-day:first-child{
  grid-column: var(--offset, 0)
}
`;
  }

  connectedCallback() {
    const now = new Date();
    const monthNumber = Number(this.getAttribute("month")) || now.getMonth() + 1;
    const yearNumber = Number(this.getAttribute("year")) || now.getFullYear();
    const monthIndex = monthNumber - 1;
    const date = new Date(yearNumber, monthIndex, 1);
    this.yearNumber = date.getFullYear();
    this.monthNumber = date.getMonth() + 1;
    this.monthIndex = date.getMonth();
    this.lastDate = new Date(this.yearNumber, this.monthNumber, 0).getDate();
    this.firstDay = toEuropeanFormat(date.getDay()) + 1;
    // console.log(this.firstDay);
    this.style.setProperty("--offset", this.firstDay);
    this.render();
  }

  get generateDays() {
    // return [...Array(this.lastDate).keys()].map(num => num + 1);
    const days = [];
    for (let i = 1; i <= this.lastDate; i++) {
      days.push(i);
    }
    return days;
  }

  getDays() {
    return this.generateDays
      .map(dayNumber => `<calendar-day day="${dayNumber}" month="${this.monthNumber}" year="${this.yearNumber}"></calendar-day>`).join("");
  }

  render() {
    this.shadowRoot.innerHTML = `
<style>${CalendarMonth.styles}</style>
<div class="month-name">${MONTHS_NAME[this.monthIndex]}</div>
<div class="days">

  ${this.getDays()}
</div>

`;
  }
}
customElements.define("calendar-month", CalendarMonth);