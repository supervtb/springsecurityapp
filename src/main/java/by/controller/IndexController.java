package by.controller;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IndexController {
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


    @RequestMapping("/test")
    public String test() {
        return "test";
    }








}
