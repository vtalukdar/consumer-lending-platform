
package org.generic.consumerlending.service;

import org.generic.consumerlending.model.*;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LoanService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final Map<String, List<Proposition>> cache = new HashMap<>();

    public LoanService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public LoanResponse calculate(LoanRequest request) {
        int[] months = {12,24,36,48};
        List<Proposition> props = new ArrayList<>();

        for (int month : months) {
            Proposition p = new Proposition();
            p.months = month;
            p.totalAmount = request.loanAmount;
            p.monthlyInstallment = Math.round((request.loanAmount / month) * 100.0) / 100.0;
            props.add(p);
        }

        cache.put(request.journeyId, props);

        LoanResponse response = new LoanResponse();
        response.journeyId = request.journeyId;
        response.propositions = props;

        kafkaTemplate.send("loan-events", "Journey=" + request.journeyId + " propositions=" + props.size());

        return response;
    }

    public AcceptResponse accept(AcceptRequest request) {
        List<Proposition> propositions = cache.get(request.journeyId);

        boolean valid = propositions.stream()
            .anyMatch(p -> p.months.equals(request.chosenMonths));

        if (!valid) {
            throw new RuntimeException("Invalid proposition selected");
        }

        AcceptResponse response = new AcceptResponse();
        response.contractId = "LND" + String.format("%05d", new Random().nextInt(99999));

        kafkaTemplate.send("loan-events", "Contract accepted for " + request.journeyId + " contractId=" + response.contractId);

        return response;
    }
}
