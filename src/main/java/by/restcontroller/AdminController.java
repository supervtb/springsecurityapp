package by.restcontroller;

import by.model.User;
import by.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by albertchubakov on 17.01.2018.
 */

@RestController
@RequestMapping("/rest/v1/admin")
public class AdminController{
    @Autowired
    private CustomUserDetailService customUserDetailService;
    @GetMapping(value = "/users")
    public List<User> getAllUsers(){
        List<User> users;
        users = customUserDetailService.loadAllUser();
        return users;
    }

    @RequestMapping("/user/{username}")
    public User username(@PathVariable("username") String username){
        User user = (User) customUserDetailService.loadUserByUsername(username);
       return user;
    }


}
