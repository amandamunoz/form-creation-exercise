import { useState } from "react";

function BandForm({ band }) {
  const [totalTicketCosts, setTotalTicketCosts] = useState({})
  const [formData, setFormData] =  useState({firstName: "", lastName: "", address: "",
    ccNumber: 0, ccMonth: "", ccCvv: 0, totalTicketAmounts: [], totalTicketCost: 0} )

  function addToTotal(event, ticket) {
    const numberOfTickets = event.target.value
    const cost = numberOfTickets * ticket.cost/100;
    const newTotalTicketCosts = {...totalTicketCosts, [ticket.type]: cost}
    const newTotalValues = Object.values(newTotalTicketCosts)
    const newTotalCost  = newTotalValues.reduce((accumulator, currentValue) => {
      return accumulator + currentValue}, 0 )

    const totalTicketAmounts = {...formData.totalTicketAmounts, [ticket.type]: numberOfTickets}
    const newFormData = {...formData, totalTicketAmounts, totalTicketCost: newTotalCost }
    setTotalTicketCosts(newTotalTicketCosts)
    setFormData(newFormData)
  }

  function handleInput(e) {
    const newFormData = {...formData, [e.target.name]: e.target.value}
    setFormData(newFormData)
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevent page refresh
    console.log(formData)
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
          <form>
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
              <p>{formData.totalTicketCost}</p>
            </div>
            <div>
              <input name="firstName" type="text" placeholder="First Name" onChange={handleInput}></input>
              <input name="lastName" type="text" placeholder="Last Name"></input>
              <input name="address" type="text" placeholder="Address"></input>
            </div>
            <div>
              <h3>Payment Details</h3>
                <input name="ccNumber" type="number" placeholder="0000 0000 0000 0000"></input>
                <input name="ccMonth" type="text" placeholder="MM/YY"></input>
                <input name="ccCvv" type="number" placeholder="CVV"></input>
            </div>
            <button onClick={handleSubmit}>Get Tickets</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BandForm;
