package by.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
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
    @RequestMapping("/banking")
    public String hello() {
        return "banking";
    }



}
