package by.service;

import by.model.CustomUserDetails;
import by.model.User;
import by.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Created by albertchubakov on 14.08.17.
 */
@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();


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

    public void delete(String user){
       userRepository.deleteByName(user);
    }

    public void updatePassword(String password, String name){
       userRepository.updatePassword(bCryptPasswordEncoder.encode(password), name);
    }




}
