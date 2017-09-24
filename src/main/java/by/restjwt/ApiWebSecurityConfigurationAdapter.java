package by.restjwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;


/**
 * Created by albertchubakov on 23.09.17.
 */
@Configuration
@Order(1)
@EnableResourceServer
public class ApiWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {


    protected void configure(HttpSecurity http) throws Exception {
        http
                .antMatcher("/rest**")
        .authorizeRequests()
        .anyRequest()
        .authenticated()
                ;

    }

    }