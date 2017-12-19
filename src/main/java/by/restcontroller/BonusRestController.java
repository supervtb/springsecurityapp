package by.restcontroller;

import by.model.Bonus;
import by.service.BonusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by albertchubakov on 19.12.2017.
 */
@RestController
@RequestMapping("/rest/v1")
public class BonusRestController {
    @Autowired
    private BonusService bonusService;

    @RequestMapping(value = "/bonuses")
    public List<Bonus> getAllBonus(){
        List<Bonus> bonuses;
        bonuses = bonusService.loadAllBonuses();
        return  bonuses;
    }
}
