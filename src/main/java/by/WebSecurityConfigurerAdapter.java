package by;

import by.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Configuration;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Created by albertchubakov on 22.09.17.
 */

@EnableJpaRepositories()
@Configuration
@EnableWebSecurity
public class WebSecurityConfigurerAdapter  extends org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter{
 @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable();
       httpSecurity.authorizeRequests()
                .antMatchers("/", "/home", "/registration", "/css/**", "/js/**").permitAll()
                .antMatchers("/adminpanel/**").hasRole("admin")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
       ;

    }
    @Autowired
    private CustomUserDetailService userDetailsService;

   @Override
    protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService)
                .passwordEncoder(getPasswordEncoder());
    }

    private PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }



}
