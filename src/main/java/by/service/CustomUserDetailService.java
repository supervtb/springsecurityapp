package by.service;

import by.model.CustomUserDetails;
import by.model.Role;
import by.model.User;
import by.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * Created by albertchubakov on 14.08.17.
 */
@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;


    private BCryptPasswordEncoder bCryptPasswordEncoder;

   @Override
    public  UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByName(name);
       optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
       return optionalUser.map(CustomUserDetails::new).get();
   }


    public void save(User user){
       user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
       userRepository.save(user);


    }



}
