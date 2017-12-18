package by.customexception;

/**
 * Created by albertchubakov on 18.12.2017.
 */
public class NotEnoughPointsException extends Exception {
    public NotEnoughPointsException(){}
    public NotEnoughPointsException(String message){
        super(message);
    }
}
