
package org.generic.consumerlending.model;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("loan_events")
public class LoanEvent {
    @PrimaryKey
    public String journeyId;
    public String payload;
}
