
package org.generic.consumerlending.controller;

import org.generic.consumerlending.model.*;
import org.generic.consumerlending.service.LoanService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin("*")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping("/calculate")
    public LoanResponse calculate(@RequestBody LoanRequest request) {
        return loanService.calculate(request);
    }

    @PostMapping("/accept")
    public AcceptResponse accept(@RequestBody AcceptRequest request) {
        return loanService.accept(request);
    }
}
