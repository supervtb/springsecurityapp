package by.service;

import by.model.Bonus;
import by.repository.BonusRepository;
import by.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by albertchubakov on 28.11.2017.
 */
@Service
public class BonusService  {
    @Autowired
    private BonusRepository bonusRepository;

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
