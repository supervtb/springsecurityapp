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
public class AdminRestController {
    @Autowired
    private CustomUserDetailService customUserDetailService;

    @GetMapping(value = "/users")
    public List<User> getAllUsers(){
        List<User> users;
        users = customUserDetailService.loadAllUser();
        return users;
    }

    @RequestMapping("/users/{username}")
    public User username(@PathVariable("username") String username){
        User user = (User) customUserDetailService.loadUserByUsername(username);
       return user;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable("username") String username ,@RequestBody User user, Principal principal){
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
        customUserDetailService.update(currentUser);
    }


}
