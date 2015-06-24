package com.supermy;

import com.supermy.db.DataBaseConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
@EnableJpaRepositories
@Import({RepositoryRestMvcConfiguration.class,DataBaseConfig.class})
@PropertySource("classpath:application.properties")
@EnableAutoConfiguration
//@EnableWebMvc
//@ComponentScan({"**.service","hello","**.web"})  //有问题
@ComponentScan
public class Application  {
	public static void main(String[] args) {

		//SpringApplication.run(Application.class, args);

		ConfigurableApplicationContext ctx = SpringApplication.run(Application.class, args);

		RepositoryRestConfiguration restConfiguration = ctx.getBean(RepositoryRestConfiguration.class);

		restConfiguration.setReturnBodyOnCreate(true);
		restConfiguration.setReturnBodyOnUpdate(true);

	}

}
