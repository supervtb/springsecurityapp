package by.restcontroller;


import by.customexception.NotEnoughPointsException;
import by.model.Bonus;

import by.model.User;
import by.repository.BonusRepository;

import by.service.BonusService;
import by.service.CustomUserDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.config.EnableHypermediaSupport;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by albertchubakov on 21.08.17.
 */

@RestController
@RequestMapping("/rest/v1")
public class MainRestController {
    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Secured("ROLE_admin")
    @GetMapping(value = "/users")
    public List<User> getAllUsers(){
        List<User> users;
        users = customUserDetailService.loadAllUser();
        return users;
    }

    @GetMapping(value = "/user")
    public User getUser(Principal principal){
        User user = (User) customUserDetailService.loadUserByUsername(principal.getName());
        return user;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/user")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveUser(@RequestBody User user){
        customUserDetailService.save(user);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/user")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody User user, Principal principal){
        User currentUser = (User) customUserDetailService.loadUserByUsername(principal.getName());
        if(user.getEmail()!=null)
            currentUser.setEmail(user.getEmail());
        if(user.getFirstname()!=null)
            currentUser.setFirstname(user.getFirstname());
        if(user.getSecondname()!=null)
            currentUser.setSecondname(user.getSecondname());
        if(user.getMiddlename()!=null)
            currentUser.setMiddlename(user.getMiddlename());
        if(user.getPhone()!=null)
            currentUser.setPhone(user.getPhone());
        if(user.getBonuscardnumber()!=null)
            currentUser.setBonuscardnumber(user.getBonuscardnumber());
        customUserDetailService.update(currentUser);
    }


    @RequestMapping(method = RequestMethod.DELETE, value = "/user")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAccount(Principal principal){
        customUserDetailService.delete(principal.getName());
    }

    @RequestMapping(method = RequestMethod.POST, value = "/user/bonuses")
    @ResponseStatus(HttpStatus.OK)
    public void addBonusToUser(@RequestBody Bonus bonusId, Principal principal) throws NotEnoughPointsException {
        User user = (User) customUserDetailService.loadUserByUsername(principal.getName());
        customUserDetailService.addBonusToUser(user.getId(), bonusId.getBonusId());
    }

    @RequestMapping(method = RequestMethod.DELETE, value ="/user/bonuses" )
    @ResponseStatus(HttpStatus.OK)
    public void removeBonusToUser(@RequestBody List<Bonus> bonusId, Principal principal){
        User user = (User) customUserDetailService.loadUserByUsername(principal.getName());
        ArrayList<Integer> arrayList = new ArrayList<>();
        for (Bonus obj : bonusId){
            arrayList.add(obj.getBonusId());
        }
        customUserDetailService.removeBonusesToUser(user.getId(), arrayList);
    }

    @Secured("ROLE_admin")
    @RequestMapping("/user/{username}")
    public User username(@PathVariable("username") String username){
        User user = (User) customUserDetailService.loadUserByUsername(username);
        return user;
    }
    @Secured("ROLE_admin")
    @RequestMapping(method = RequestMethod.PUT, value = "/users/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable("username") String username ,@RequestBody User user){
        User currentUser = (User) customUserDetailService.loadUserByUsername(username);
        if(user.getEmail()!=null)
            currentUser.setEmail(user.getEmail());
        if(user.getFirstname()!=null)
            currentUser.setFirstname(user.getFirstname());
        if(user.getSecondname()!=null)
            currentUser.setSecondname(user.getSecondname());
        if(user.getMiddlename()!=null)
            currentUser.setMiddlename(user.getMiddlename());
        if(user.getPhone()!=null)
            currentUser.setPhone(user.getPhone());
        if(user.getBonuscardnumber()!=null)
            currentUser.setBonuscardnumber(user.getBonuscardnumber());
        if(user.getPoints() != currentUser.getPoints())
            currentUser.setPoints(user.getPoints());
        customUserDetailService.update(currentUser);
    }

    @Secured("ROLE_admin")
    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable("username") String username){
        customUserDetailService.delete(username);
    }







}
