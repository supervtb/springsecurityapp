package by.restcontroller;


import by.model.User;
import by.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @GetMapping(value = "/getuser")
    public User getUser(Principal principal){
        User user = (User) customUserDetailService.loadUserByUsername(principal.getName());
        return user;
    }
    @RequestMapping("/{username}")
    public User username(@PathVariable("username") String username){
        User user = (User) customUserDetailService.loadUserByUsername(username);
        return user;
    }

    @RequestMapping("/hello")
    public  String hello(){
        return "Hello";
    }
}
