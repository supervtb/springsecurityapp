package by.repository;

import by.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created by albertchubakov on 14.08.17.
 */
public interface UserRepository extends JpaRepository<User, Long> {

   Optional<User>  findByName(String name);
}
