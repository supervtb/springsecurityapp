package by.restcontroller;

import by.customexception.GeneralCustomException;
import by.customexception.NotEnoughPointsException;
import by.model.Bonus;
import by.model.Role;
import by.model.Store;
import by.model.User;
import by.service.BonusService;
import by.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by albertchubakov on 19.12.2017.
 */

@RestController
@RequestMapping("/rest/v1")
public class BonusRestController {
    @Autowired
    private BonusService bonusService;

    @Autowired
    CustomUserDetailService customUserDetailService;

    @RequestMapping(value = "/bonuses")
    public List<Bonus> getAllBonus(){
        List<Bonus> bonuses;
        bonuses = bonusService.loadAllBonuses();
        return  bonuses;
    }

    @RequestMapping( method = RequestMethod.GET, value = "/bonuses/{bonusId}")
    public Bonus getBonus(@PathVariable Integer bonusId){
        Bonus bonus = bonusService.getBonusById(bonusId);
        return bonus;
    }

    @Secured({"ROLE_admin", "ROLE_manager"})
    @RequestMapping( method = RequestMethod.POST, value = "/bonuses")
    @ResponseStatus(HttpStatus.CREATED)
    public void createBonus(@RequestBody Bonus newBonus , Principal principal) throws GeneralCustomException {
        User currentUser = (User) customUserDetailService.loadUserByUsername(principal.getName());
        Store store = currentUser.getStore();
        if (store == null){
            throw new GeneralCustomException("вы не являетесь администратором");
        }
        Store store1 = newBonus.getStore();
        if(store.getStoreId() == store1.getStoreId()) {
            bonusService.save(newBonus);
        } else {
            throw new GeneralCustomException("вы не являетесь администратором данного магазина");
        }


    }
    @Secured({"ROLE_admin", "ROLE_manager"})
    @RequestMapping( method = RequestMethod.PUT, value = "/bonuses")
    @ResponseStatus(HttpStatus.OK)
    public void updateBonus(@RequestBody Bonus bonus){
        bonusService.save(bonus);
    }
    @Secured({"ROLE_admin", "ROLE_manager"})
    @RequestMapping( method = RequestMethod.DELETE, value = "/bonuses/{bonusId}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Integer bonusId){
        bonusService.delete(bonusId);

    }
}
