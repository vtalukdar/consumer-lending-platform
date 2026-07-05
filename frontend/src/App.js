
import React, { useState } from 'react';
import { LOAN_ENDPOINTS } from "./resources/config/endpoints";

// get-loan-propositions
await axios.post(LOAN_ENDPOINTS.getLoanPropositions, payload);

// submit-loan-propositions
await axios.post(LOAN_ENDPOINTS.submitLoanPropositions, payload);
import './App.css';

function App() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [contract, setContract] = useState("");

  const submit = async () => {
    const payload = { ...form, journeyId: crypto.randomUUID() };
    const response = await axios.post('http://localhost:8080/api/loans/calculate', payload);
    setResult(response.data);
  };

  const accept = async (months) => {
    const response = await axios.post('http://localhost:8080/api/loans/accept', {
      journeyId: result.journeyId,
      chosenMonths: months
    });
    setContract(response.data.contractId);
  };

  return (
    <div className="container">
      <h1>Consumer Lending</h1>

      {!result && (
        <div className="card">
          {['firstName','lastName','address','email','loanAmount','income','requestedMonths'].map(field => (
            <input key={field} placeholder={field}
              onChange={(e) => setForm({...form, [field]: e.target.value})}/>
          ))}
          <button onClick={submit}>Submit</button>
        </div>
      )}

      {result && (
        <div className="card">
          <h2>Loan Propositions</h2>
          {result.propositions.map((p, i) => (
            <div key={i} className="proposal">
              <p>{p.months} months - Monthly Payment €{p.monthlyInstallment}</p>
              <button onClick={() => accept(p.months)}>Accept</button>
            </div>
          ))}
          {contract && <h3>Contract ID: {contract}</h3>}
        </div>
      )}
    </div>
  );
}

export default App;
