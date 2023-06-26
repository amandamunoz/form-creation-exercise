import { useState } from "react";

function BandForm({ band }) {
  const [totalTicketCosts, setTotalTicketCosts] = useState({})
  const [totalTicketCost, setTotalTicketCost] = useState(0);

  function addToTotal(event, ticket) {
    const amount = event.target.value * ticket.cost/100;
    const newTotalCosts = {...totalTicketCosts, [ticket.type]: amount}
    const newTotalValues = Object.values(newTotalCosts)
    const totalCost  = newTotalValues.reduce((accumulator, currentValue) => {
      return accumulator + currentValue}, 0 )
    setTotalTicketCosts(newTotalCosts)
    setTotalTicketCost(totalCost);
  }

  return (
    <div>
      <h1>{band.name}</h1>
      <p>{String(new Date(band.date * 1000))}</p>
      <p>{band.location}</p>
      <div className="container">
        <div>
          <img src={band.imgUrl} alt={band.name}></img>
          <div dangerouslySetInnerHTML={{__html: band.description_blurb}} />
        </div>
        <div>
          <h2>Select Tickets</h2>
          {band.ticketTypes.map((ticket) => (
            <div key={ticket.type}>
              <p>{ticket.name}</p>
              <p>{ticket.description}</p>
              <p>{ticket.cost/100}</p>
              <input type="number" id={`select_${ticket.type}`} onChange={event => addToTotal(event, ticket)}></input>
            </div>
          ))}
          <div>
            <p>Total</p>
            <p>{totalTicketCost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BandForm;
