const WEEK_DAY = ["Lunes", "Martes", "Miercoles", "jueves", "Viernes", "Sabado", "Domingo"];

export const toEuropeanFormat = (day) => day === 0 ? 6 : day - 1;

const isToday = (date) => new Date().toJSON().substring(0, 10) === date.toJSON().substring(0, 10);

// const isToday = (date) => {
//   const now = new Date().toJSON().substring(0, 10);
//   const value = now === date.toJSON().substring(0, 10);
//   console.log(now, date.toJSON().substring(0, 10), value);
//   return value;
// };

class CalendarDay extends HTMLElement {
  constructor() {
    super();
    // console.log("CalendarDay creado");
    this.attachShadow({ mode: "open" });
  };

  connectedCallback() {
    const now = new Date();
    const dateNumber = Number(this.getAttribute("day")) || now.getDate();
    const monthNumber = Number(this.getAttribute("month")) || now.getMonth() + 1;
    const yearNumber = Number(this.getAttribute("year")) || now.getFullYear();

    const date = new Date(yearNumber, monthNumber - 1, dateNumber);
    // this.date = `${yearNumber}-${monthNumber - 1}-${dateNumber}`;
    this.date = `<small>${date.toJSON()}</small>`

    this.isToday = isToday(date);
    this.dateNumber = date.getDate();
    this.monthNumber = date.getMonth() + 1;
    this.yearNumber = date.getFullYear();
    this.dayNumber = toEuropeanFormat(date.getDay());
    this.render();
  }

  // como esto es una clase puedo crear mis propios metodos(funciones);
  // con : host le estoy dando estilos al componente
  static get styles() {
    return `
    :host {
      display: inline-block;
      min-width: 90px;
      height: 70px;    
      border: 1px solid #777;
      border-top: 8px solid #777;
      padding: 5px;
      margin: 2px;
      text-align: center;
    }
    :host(.today) {
      background: #73adeb;
      border-color: #233787;
    }
    .day-name{
      font-family: Montserrat, sans-serif;
      font-weight: 300;
    }
    .day-number {   
      font-family: Montserrat, sans-serif;
      font-weight: 800;
      color: black;  
      font-size:30px;
    }
    @media screen and (max-width: 775px){
      :host {min-width: 30px}
      .rest { display: none}
    }
  `;
  }

  getWeekDay() {
    const day = WEEK_DAY[this.dayNumber];
    const html = `${day.substring(0, 1)}<span class="rest">${day.substring(1)}</span>`;
    return html;
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${CalendarDay.styles}</style>
      <div class="day-name">${this.getWeekDay()}</div>
      <div class="day-number">${this.dateNumber}</div>
     
    `;
    if (this.isToday) {
      this.classList.add("today");
    };
  }
}

customElements.define("calendar-day", CalendarDay);
