package by.service;

import by.customexception.BonusNotFoundException;
import by.customexception.NotEnoughPointsException;
import by.model.*;
import by.repository.BonusRepository;
import by.repository.RoleRepository;

import by.repository.UserRepository;
import org.hibernate.Session;
import org.omg.PortableServer.LIFESPAN_POLICY_ID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.jws.soap.SOAPBinding;
import javax.transaction.Transactional;
import java.security.Principal;
import java.util.*;

/**
 * Created by albertchubakov on 14.08.17.
 */
@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BonusRepository bonusRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();


    @Override
    public  UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByName(name);
       optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
       return optionalUser.map(CustomUserDetails::new).get();
   }

   public List<User> loadAllUser(){
        List<User> users = userRepository.findAll();
        return users;
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
                updatedUser.getEmail(),
                updatedUser.getFirstname(),
                updatedUser.getSecondname(),
                updatedUser.getMiddlename(),
                updatedUser.getPhone(),
                updatedUser.getBonuscardnumber()
                );
    }

    public void addBonusToUser(int userId, int bonusId) throws NotEnoughPointsException {
        User user1 = userRepository.getOne(userId);
        Bonus bonus1 = bonusRepository.getOne(bonusId);
        if((user1.getPoints()) >= (bonus1.getPriceBonus())){
            List<Bonus> bonuses = user1.getBonus();
            bonuses.add(bonusRepository.getOne(bonusId));
            user1.setPoints((user1.getPoints())-(bonus1.getPriceBonus()));
            user1.setBonus(bonuses);
            userRepository.save(user1);
        }
        else {
            throw new NotEnoughPointsException("Недостаточно баллов");
        }
    }

    public void removeBonusesToUser(int userId, ArrayList<Integer> arrayList){
        User currentUser = userRepository.getOne(userId);
       List<Bonus> bonuses = currentUser.getBonus();
       List<Bonus> removableBonuses = new ArrayList<>();
       for(Integer i : arrayList){
           removableBonuses.add(bonusRepository.getOne(i));
       }
       bonuses.removeAll(removableBonuses);
       currentUser.setBonus(bonuses);
       userRepository.save(currentUser);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }


}
