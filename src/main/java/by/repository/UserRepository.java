package by.repository;

import by.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Created by albertchubakov on 14.08.17.
 */

public interface UserRepository extends JpaRepository<User, Integer> {

   Optional<User>  findByName(String name);

   @Modifying
   @Transactional
   @Query(value = "delete from User u where u.name = ?1 ")
   void deleteByName(String name);

   @Modifying
   @Transactional
   @Query(value = "update User u set u.password = ?1 where u.name = ?2 ")
   void updatePassword(String newpassword, String name);

   @Modifying
   @Transactional
   @Query(value = "update User u set u.email = ?2, u.firstname = ?3, u.secondname = ?4, u.middlename= ?5, u.phone = ?6, u.bonuscardnumber = ?7 where u.name = ?1 ")
   void update(String name,
               String email,
               String firstname,
               String secondname,
               String middlename,
               String phone,
               String bonuscardnumber);
}
