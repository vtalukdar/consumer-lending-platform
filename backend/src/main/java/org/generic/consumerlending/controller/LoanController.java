
package org.generic.consumerlending.controller;

import org.generic.consumerlending.model.*;
import org.generic.consumerlending.service.LoanService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.loan.base-path}")
@CrossOrigin("*")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping("${api.loan.get-loan-propositions-path}")
    public LoanResponse calculate(@RequestBody LoanRequest request) {
        return loanService.calculate(request);
    }

    @PostMapping("${api.loan.submit-loan-propositions-path}")
    public AcceptResponse accept(@RequestBody AcceptRequest request) {
        return loanService.accept(request);
    }
}
