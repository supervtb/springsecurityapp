package by.service;

import by.model.Bonus;
import by.model.Store;
import by.repository.BonusRepository;
import by.repository.StoreRepository;
import by.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by albertchubakov on 28.11.2017.
 */
@Service
public class BonusService  {
    @Autowired
    private BonusRepository bonusRepository;

    @Autowired
    private StoreRepository storeRepository;

    public List<Bonus> loadAllBonuses(){
        List<Bonus> bonuses = bonusRepository.findAll();
        return bonuses;
    }

    public Bonus getBonusById(Integer bonusId){
        Bonus bonus = bonusRepository.findOne(bonusId);
        return bonus;
    }

    public void save(Bonus bonus){
        bonusRepository.save(bonus);
    }
    

    public void delete(Integer bonusId){
        bonusRepository.delete(bonusId);
    }

}
