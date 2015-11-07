package com.avery.app.config;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

/**
 * June 29, 2015
 * 
 * @author aman
 */

public class SpringConfig {

	private static volatile SpringConfig springContextInstance = null;

	private ConfigurableApplicationContext context = null;

	public ConfigurableApplicationContext getContext() {
		return context;
	}

	public Object getBean(String bean) {
		return context.getBean(bean);
	}

	public Object getBean(String beanName, Object... args) throws Exception {
		return context.getBean(beanName, args);
	}

	public static SpringConfig getInstance() throws Exception {
		if (springContextInstance == null) {
			synchronized (SpringConfig.class) {
				// double check - to ensure thread safety while generating
				// single instance of this class
				if (springContextInstance == null) {
					springContextInstance = new SpringConfig();
				}
			}
		}
		return springContextInstance;
	}

	private SpringConfig() {
		// context = new ClassPathXmlApplicationContext(
		// PathConfig.getSpringConfigFilePath());
		context = new FileSystemXmlApplicationContext(
				PathConfig.getSpringConfigFilePath());
		context.registerShutdownHook();
	}

	public void close() throws Exception {
		if (context != null) {
			context.close();
		}
	}

	/**
	 * Method to get bean from context as specified by beanName and of specified
	 * required type.
	 * 
	 * @param <T>
	 * @param beanName
	 * @param requiredType
	 * @return
	 * @throws Exception
	 */
	public <T> T getBean(String beanName, Class<T> requiredType)
			throws Exception {
		return context.getBean(beanName, requiredType);
	}

}
