package by.service;

import by.model.Bonus;
import by.repository.BonusRepository;
import by.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by albertchubakov on 28.11.2017.
 */
@Service
public class BonusService {
    @Autowired
    private BonusRepository bonusRepository;

    @Autowired
    private UserRepository userRepository;

    public void save(Bonus bonus){
        bonus.setNameBonus(bonus.getNameBonus());
        bonus.setDescriptionBonus(bonus.getDescriptionBonus());
        bonus.setPriceBonus(bonus.getPriceBonus());
        bonusRepository.save(bonus);

    }


}
