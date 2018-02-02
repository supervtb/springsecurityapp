package by.service;

import by.model.Store;
import by.repository.StoreRepository;
import by.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by albertchubakov on 31.01.2018.
 */
@Service
public class StoreService {
    @Autowired
    StoreRepository storeRepository;
    @Autowired
    UserRepository userRepository;

    public List<Store> getAllStore(){
        return storeRepository.findAll();
    }

    public Store getStoreById(Integer storeId){
        Store store = storeRepository.findOne(storeId);
        return store;
    }

    public void save(Store store){
        storeRepository.save(store);
    }

    public void update(Store store){
        Store currentStore = storeRepository.findOne(store.getStoreId());
        if (store.getStoreName()!=null){
            currentStore.setStoreName(store.getStoreName());
        }
        if (store.getPercent()!=currentStore.getPercent()){
            currentStore.setPercent(store.getPercent());
        }
        if (store.getBonuses()!=null){
            currentStore.setBonuses(store.getBonuses());
        }
        storeRepository.save(currentStore);
    }

    public void deleteStore(Integer storeId){
        storeRepository.delete(storeId);
    }


}
