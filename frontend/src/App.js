import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { LOAN_ENDPOINTS } from './resources/config/endpoints';

// Import Lion components
import '@lion/ui/define/lion-input.js';
import '@lion/ui/define/lion-input-amount.js';
import '@lion/ui/define/lion-input-email.js';
import '@lion/ui/define/lion-button.js';

function App() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [contract, setContract] = useState("");

  const inputRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    address: useRef(null),
    email: useRef(null),
    loanAmount: useRef(null),
    income: useRef(null),
    requestedMonths: useRef(null),
  };

  useEffect(() => {
    const cleanupFns = [];

    Object.entries(inputRefs).forEach(([fieldName, ref]) => {
      if (ref.current) {
        const handleChange = (e) => {
          setForm((prev) => ({
            ...prev,
            [fieldName]: e.target.modelValue
          }));
        };

        ref.current.addEventListener('model-value-changed', handleChange);
        cleanupFns.push(() => {
          ref.current?.removeEventListener('model-value-changed', handleChange);
        });
      }
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  const submit = async () => {
    try {
      const payload = { ...form, journeyId: crypto.randomUUID() };
      const response = await axios.post(LOAN_ENDPOINTS.getLoanPropositions, payload);
      setResult(response.data);
    } catch (error) {
      console.error('Submit failed:', {
        url: LOAN_ENDPOINTS.getLoanPropositions,
        message: error?.message,
        code: error?.code,
        status: error?.response?.status,
        data: error?.response?.data
      });
      throw error;
    }
  };

  const accept = async (months) => {
    try {
      const response = await axios.post(LOAN_ENDPOINTS.submitLoanPropositions, {
        journeyId: result.journeyId,
        chosenMonths: months
      });
      setContract(response.data.contractId);
    } catch (error) {
      console.error('Accept failed:', {
        url: LOAN_ENDPOINTS.submitLoanPropositions,
        message: error?.message,
        code: error?.code,
        status: error?.response?.status,
        data: error?.response?.data
      });
      throw error;
    }
  };

  return (
      <div className="container">
        <h1>Consumer Lending</h1>

        {!result && (
            <div className="card">
              <lion-input ref={inputRefs.firstName} label="First Name" name="firstName"></lion-input>
              <lion-input ref={inputRefs.lastName} label="Last Name" name="lastName"></lion-input>
              <lion-input ref={inputRefs.address} label="Address" name="address"></lion-input>
              <lion-input-email ref={inputRefs.email} label="Email" name="email"></lion-input-email>

              <lion-input-amount
                  ref={inputRefs.loanAmount}
                  label="Loan Amount"
                  name="loanAmount"
                  currency="EUR"
              ></lion-input-amount>

              <lion-input-amount
                  ref={inputRefs.income}
                  label="Annual Income"
                  name="income"
                  currency="EUR"
              ></lion-input-amount>

              <lion-input
                  ref={inputRefs.requestedMonths}
                  label="Requested Months"
                  name="requestedMonths"
                  type="number"
              ></lion-input>

              <lion-button onClick={submit}>Submit Application</lion-button>
            </div>
        )}

        {result && (
            <div className="card">
              <h2>Loan Propositions</h2>
              {result.propositions.map((p, i) => (
                  <div key={i} className="proposal">
                    <p>{p.months} months - Monthly Payment €{p.monthlyInstallment}</p>
                    <lion-button onClick={() => accept(p.months)}>Accept</lion-button>
                  </div>
              ))}
              {contract && <h3>Contract ID: {contract}</h3>}
            </div>
        )}
      </div>
  );
}

export default App;