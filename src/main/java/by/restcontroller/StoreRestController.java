package by.restcontroller;

import by.model.Bonus;
import by.model.Store;
import by.model.User;
import by.service.CustomUserDetailService;
import by.service.StoreService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by albertchubakov on 17.01.2018.
 */

@RestController
@RequestMapping("/rest/v1/")
public class StoreRestController {
    @Autowired
    private StoreService storeService;

    @RequestMapping(value = "/store")
    public List<Store> stores(){
        return storeService.getAllStore();
    }

    @RequestMapping(value = "/store/{storeId}")
    public Store getStore(@PathVariable Integer storeId){
        Store store = storeService.getStoreById(storeId);
        return store;
    }




}
