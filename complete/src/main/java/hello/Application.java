package hello;

import hello.exception.helper.ErrorInfo;
import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

@Configuration
@EnableJpaRepositories
@Import({RepositoryRestMvcConfiguration.class,DataBaseConfig.class})
@PropertySource("classpath:application.properties")
@EnableAutoConfiguration
public class Application {

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(TypeMismatchException.class)
    @ResponseStatus(value= HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorInfo handleTypeMismatchException(HttpServletRequest req, TypeMismatchException ex) {
        Locale locale = LocaleContextHolder.getLocale();
        String errorMessage = messageSource.getMessage("error.bad.smartphone.id", null, locale);

        errorMessage += ex.getValue();
        String errorURL = req.getRequestURL().toString();

        return new ErrorInfo(errorURL, errorMessage);
    }

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
