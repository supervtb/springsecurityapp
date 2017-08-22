package by.restcontroller;


import by.model.User;
import by.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Created by albertchubakov on 21.08.17.
 */
@RestController
@RequestMapping("/rest")
public class MainController {
    @Autowired
    private CustomUserDetailService customUserDetailService;
    @GetMapping("/getuser")
    public User getUser(Principal principal, Model model){
        User user = (User) customUserDetailService.loadUserByUsername(principal.getName());
        return user;
    }
}
