/* eslint-disable no-undef */
/* eslint-disable space-before-blocks */
import "./CalendarMonth.js";

class CalendarYear extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return `
:host {}
.year-number {
  font-family: Montserrat, sans-serif;
  font-size: 42px;
  font-weight: 800;
  color: white;
  text-align: center;
  background: #39399a;
  padding: 5px;
  margin: 2px;
}
`;
  }

  connectedCallback() {
    const now = new Date();
    this.yearNumber = Number(this.getAttribute("year")) || now.getFullYear();
    this.render();
  }

  get generateMonths() {
    // return [...Array(this.lastDate).keys()].map(num => num + 1);
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    return months;
  }

  getMonths() {
    return this.generateMonths
      .map(monthNumber => `<calendar-month  month="${monthNumber}" year="${this.yearNumber}"></calendar-month>`).join("");
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${CalendarYear.styles}</style>
      <div class="year-number">${this.yearNumber}</div>
      <div class="months">
      ${this.getMonths()}
      </div>
      `;
  }
}
customElements.define("calendar-year", CalendarYear);