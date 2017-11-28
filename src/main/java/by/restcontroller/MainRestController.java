package by.restcontroller;


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

/**
 * Created by albertchubakov on 21.08.17.
 */

@RestController
@RequestMapping("/rest/v1")
public class MainRestController {
    @Autowired
    private CustomUserDetailService customUserDetailService;
    @GetMapping(value = "/user")
    public User getUser(Principal principal){
        User user = (User) customUserDetailService.loadUserByUsername(principal.getName());
        return user;
    }
    @RequestMapping("/user/{username}")
    public User username(@PathVariable("username") String username){
        User user = (User) customUserDetailService.loadUserByUsername(username);
        return user;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/user")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveUser(@RequestBody User user){
        customUserDetailService.save(user);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/user")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAccount(Principal principal){
        customUserDetailService.delete(principal.getName());
    }
}
