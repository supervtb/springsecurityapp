package by.repository;

import by.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by albertchubakov on 24.01.2018.
 */
public interface StoreRepository extends JpaRepository<Store, Integer> {
}
