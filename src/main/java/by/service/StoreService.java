package by.service;

import by.model.Store;
import by.repository.StoreRepository;
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

    public List<Store> getAllStore(){
        return storeRepository.findAll();
    }

    public Store getStoreById(Integer storeId){
        Store store = storeRepository.findOne(storeId);
        return store;
    }


}
