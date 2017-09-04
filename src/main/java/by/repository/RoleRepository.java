package by.repository;

import by.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by albertchubakov on 04.09.17.
 */
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
