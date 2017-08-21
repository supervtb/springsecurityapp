package by.controller;

import by.model.User;
import by.repository.UserRepository;
import by.service.CustomUserDetailService;
import jdk.nashorn.internal.ir.RuntimeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class IndexController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailService customUserDetailService;






    @RequestMapping("/")
    public String greeting() {
        return "index";
    }
   @RequestMapping("/login")
    public String login() {
        return "login";
    }
    @RequestMapping("/chat")
    public String chat() {
        return "chat";
    }
    @RequestMapping(value = "/account", method = RequestMethod.GET)
    public String account(Principal principal,  Model model) {
        User user = (User) customUserDetailService.loadUserByUsername(principal.getName());
        model.addAttribute("user",user);
        return "account";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String registration(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model){
        customUserDetailService.save(userForm);
        return"redirect:/chat";

    }

    @RequestMapping(value = "/delete", method = GET)
    public String delete(Principal principal){
        String user = principal.getName();
        customUserDetailService.delete(user);
        return "redirect:/login";
    }

    @RequestMapping(value = "/changepassword")
    public String changePassword(@ModelAttribute("updatepassword") String updatepassword, Principal principal){
        String user = principal.getName();
        customUserDetailService.updatePassword(updatepassword , user );
        return "redirect:/chat";
    }











}
