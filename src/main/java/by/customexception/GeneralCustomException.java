package by.customexception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by albertchubakov on 24.01.2018.
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class GeneralCustomException extends Exception {
    public GeneralCustomException(String message) {
        super(message);
    }
}
