import endpoints from "../../../../resources/api/endpoints.json";

const API_HOST = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const LOAN_ENDPOINTS = {
    getLoanPropositions: `${API_HOST}${endpoints.loan.basePath}${endpoints.loan.getLoanPropositions}`,
    submitLoanPropositions: `${API_HOST}${endpoints.loan.basePath}${endpoints.loan.submitLoanPropositions}`,
};