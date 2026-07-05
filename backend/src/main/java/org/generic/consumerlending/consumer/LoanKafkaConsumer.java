
package org.generic.consumerlending.consumer;

import org.generic.consumerlending.model.LoanEvent;
import org.generic.consumerlending.repository.LoanEventRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class LoanKafkaConsumer {

    private final LoanEventRepository repository;

    public LoanKafkaConsumer(LoanEventRepository repository) {
        this.repository = repository;
    }

    @KafkaListener(topics = "loan-events", groupId = "loan-group")
    public void consume(String message) {
        LoanEvent event = new LoanEvent();
        event.journeyId = String.valueOf(System.currentTimeMillis());
        event.payload = message;
        repository.save(event);
    }
}
