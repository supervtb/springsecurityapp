package by.service;

import by.model.CustomUserDetails;
import by.model.Role;
import by.model.User;
import by.repository.RoleRepository;
import by.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    @Autowired
    private RoleRepository roleRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();


    @Override
    public  UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByName(name);
       optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
       return optionalUser.map(CustomUserDetails::new).get();
   }

   public void save(User user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.getOne(2));
        user.setRoles(roles);
        user.setPoints(1 + (int) (Math.random() * 1000));
        userRepository.save(user);


    }

    public void delete(String user){
       userRepository.deleteByName(user);
    }

    public void updatePassword(String password, String name){
       userRepository.updatePassword(bCryptPasswordEncoder.encode(password), name);
    }

    public void update(User updatedUser){
        userRepository.update(updatedUser.getName(),
                bCryptPasswordEncoder.encode(updatedUser.getPassword()),
                updatedUser.getEmail(),
                updatedUser.getFirstname(),
                updatedUser.getSecondname(),
                updatedUser.getMiddlename(),
                updatedUser.getPhone(),
                updatedUser.getBonuscardnumber()
                );
    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }


}
