package by.customexception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by albertchubakov on 18.12.2017.
 */
public class NotEnoughPointsException extends Exception {
    public NotEnoughPointsException(){}
    public NotEnoughPointsException(String message){
        super(message);
    }
}
