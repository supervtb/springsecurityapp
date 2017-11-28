package by.repository;

import by.model.Bonus;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by albertchubakov on 28.11.2017.
 */
public interface BonusRepository extends JpaRepository<Bonus, Integer> {
}
