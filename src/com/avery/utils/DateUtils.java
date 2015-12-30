package com.avery.utils;

import java.util.Date;

/**
 * Date Utility class to keep various basic methods for providing basic
 * functionality.
 * 
 * @author Amit 28-12-2015
 */
public class DateUtils {

	/**
	 * Private constructor to make this class as utility class so that no one
	 * can instantiate the instance of it.
	 */
	private DateUtils() {
	}

	/**
	 * Returns the previous date after subtracting the number of days from
	 * passed date.It gives the the date after removing hour, minute, second to
	 * get the initial date.
	 * 
	 * @param date
	 * @param days
	 * @return
	 */
	public static Date getPreviousDate(Date date, long days) {
		return new Date(date.getTime() - ((long) days * 24 * 60 * 60 * 1000));
	}

	public static Date addDays(Date date, int days) {
		return new Date(date.getTime() + ((long) days * 24 * 60 * 60 * 1000));
	}

	public static Date getPreviousHours(Date date, long hours) {
		return new Date(date.getTime() - ((long) hours * 60 * 60 * 1000));
	}

	public static Date getNextHours(Date date, long hours) {
		return new Date(date.getTime() + ((long) hours * 60 * 60 * 1000));
	}
}
