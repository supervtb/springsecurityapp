package by.repository;

import by.model.Bonus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by albertchubakov on 28.11.2017.
 */
public interface BonusRepository extends JpaRepository<Bonus, Integer> {
    List<Bonus> findAll();



}
