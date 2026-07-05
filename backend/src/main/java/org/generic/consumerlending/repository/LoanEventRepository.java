
package org.generic.consumerlending.repository;

import org.generic.consumerlending.model.LoanEvent;
import org.springframework.data.cassandra.repository.CassandraRepository;

public interface LoanEventRepository extends CassandraRepository<LoanEvent, String> {
}
