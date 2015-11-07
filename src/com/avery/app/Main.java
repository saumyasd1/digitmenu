package com.avery.app;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.avery.app.config.PathConfig;
import com.avery.app.config.PropertiesConfig;
import com.avery.app.config.SpringConfig;
import com.avery.db.embedded.EmbeddedDatabaseFactory;
import com.avery.logging.AppLogger;
import com.avery.storage.entities.Person;
import com.avery.storage.service.PersonService;
import com.avery.utils.PropertiesConstants;

/**
 * 29-June-2015
 * 
 * @author aman
 */

public class Main {

	private void loadEmbeddedDatabase() throws Exception {
		boolean isEmbeddedDbEnabled = PropertiesConfig
				.getBoolean(PropertiesConstants.PROPERTY_EMBEDDED_DB_ENABLED);
		if (isEmbeddedDbEnabled) {
			AppLogger.getSystemLogger().debug("Starting embedded database...");
			EmbeddedDatabaseFactory.getEmbeddedDatabase().start();
			AppLogger.getSystemLogger().info(
					"Embedded database started successfully!");
		}
	}

	public Main(String workingDirPath) throws IOException {
		PathConfig.setWorkingDirectory(new File(workingDirPath)
				.getAbsolutePath());
		System.setProperty(PropertiesConstants.PROPERTIES_APP_WORKING_DIR_PATH,
				PathConfig.getWorkingDirectory());
		// setting external path to application for logback configuration XML
		// file
		System.setProperty(PropertiesConstants.PROPERTY_LOGBACK_CONFIG,
				PathConfig.getLogbackConfigPath());
		// System.setOut(new PrintStream(new LoggingOutputStream(AppLogger
		// .getSystemLogger(), "out"), true));
		// System.setErr(new PrintStream(new LoggingOutputStream(AppLogger
		// .getSystemLogger(), "error"), true));
		AppLogger.getSystemLogger().info("Application Initiated Successfully!");
	}

	public void boot() throws Exception {
		// load embedded database - if enabled :)
		loadEmbeddedDatabase();
	}

	public void shutdown() throws Exception {
		SpringConfig.getInstance().close();
	}

	@Override
	protected Object clone() throws CloneNotSupportedException {
		throw new CloneNotSupportedException();
	}

	public static void main(String[] args) throws Exception {
		new Main("/Users/amanjain/Desktop/AJ/workspace/AveryDennisonWeb")
				.boot();
		System.out.println("*** Booted Successfully ***");
		System.out.println(PathConfig.getLogbackConfigPath());
		// PersonService personService = (PersonService) SpringConfig
		// .getInstance().getBean("personService");
		//
		// Person person = new Person();
		// person.setName("Test1");
		// person.setEmail("t1@test1.com");
		// try {
		// personService.create(person);
		// System.out.println("Person : " + person + " added successfully");
		// } catch (Exception e) {
		// e.printStackTrace();
		// }
		// List<Person> persons = personService.readAll();
		// System.out.println("The list of all persons = " + persons);
	}

}
