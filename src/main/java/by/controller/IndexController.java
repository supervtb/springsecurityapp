package by.controller;

import by.service.EmailSenderService;
import by.model.User;
import by.repository.UserRepository;
import by.service.CustomUserDetailService;
import org.hibernate.JDBCException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

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
        EmailSenderService senderService  = new EmailSenderService("qwdxasc@gmail.com","12345678q");
        senderService.send("Регистрация в чате", "Вы успешно зарегистрированы, ваш логин: "+userForm.getName(), "qwdxasc@gmail.com", userForm.getEmail());
        return"redirect:/chat";
    }

    @ExceptionHandler(JDBCException.class)
    public ModelAndView handleJDBCException(Exception ex, Model model){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        modelAndView.addObject("errorreg", "Имя должно быть уникальным");
        return modelAndView;

    }

    @RequestMapping(value = "/delete", method = GET)
    public String delete(Principal principal){
        String user = principal.getName();
        User loaduser = (User) customUserDetailService.loadUserByUsername(user);
        EmailSenderService senderService = new EmailSenderService("qwdxasc@gmail.com","12345678q");
        senderService.send("Регистрация в чате", "Удаление аккаунта", "qwdxasc@gmail.com", loaduser.getEmail());
        customUserDetailService.delete(user);
        return "redirect:/login";
    }

    @RequestMapping(value = "/changepassword")
    public String changePassword(@ModelAttribute("updatepassword") String updatepassword, Principal principal){
        String user = principal.getName();
        customUserDetailService.updatePassword(updatepassword , user );
        return "redirect:/";
    }
















}
