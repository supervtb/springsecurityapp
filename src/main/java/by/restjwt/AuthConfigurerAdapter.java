package by.restjwt;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by albertchubakov on 22.09.17.
 */
@Configuration
@Order(1)
public class AuthConfigurerAdapter extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) throws Exception {
        http
                .antMatcher("/rest/**")
                .authorizeRequests()
                .and()
                .formLogin().permitAll();
    }
}
