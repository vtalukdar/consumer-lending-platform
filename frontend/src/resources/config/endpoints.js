import endpoints from "./endpoints.json";

const rawApiHost = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// Ensure valid absolute host (axios/browser URL parser requires protocol)
const API_HOST = /^https?:\/\//i.test(rawApiHost)
    ? rawApiHost.replace(/\/+$/, "")
    : `http://${rawApiHost}`.replace(/\/+$/, "");

const joinUrl = (host, ...parts) => {
    const path = parts
        .filter(Boolean)
        .map((p) => String(p).replace(/^\/+|\/+$/g, ""))
        .join("/");

    return `${host}/${path}`;
};

const loan = endpoints?.loan || {};

export const LOAN_ENDPOINTS = {
    getLoanPropositions: joinUrl(API_HOST, loan.basePath, loan.getLoanPropositions),
    submitLoanPropositions: joinUrl(API_HOST, loan.basePath, loan.submitLoanPropositions),
};