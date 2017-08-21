package by;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Description;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;

@SpringBootApplication
public class TymeleafApplication {

	public static void main(String[] args) {
		SpringApplication.run(TymeleafApplication.class, args);
	}
}

