package com.avery.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;


/**
 * 17-Nov-2015
 * 
 * @author Sakshi
 */

public class HibernateUtils {
	
	/**
	 * @param criteria
	 * @param cmpId
	 * @return
	 */
	public static SimpleDateFormat sdfDate = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	public static int getAllRecordsCountWithCriteria(Criteria criteria)
			throws Exception {
		criteria.setProjection(Projections.rowCount());
		List results = criteria.list();
		criteria.setProjection(null);
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		return results == null || results.size() == 0 ? 0 : ((Long) results
				.get(0)).intValue();
	}
	
	public static Criteria getCriteriaBasedOnDate(Criteria criteria,String dateType,String sDate,String eDate) throws ParseException{
		Date startDate = sdfDate.parse(sDate + " "+ "00:00:00");
		Date endDate = sdfDate.parse(eDate + " "+ "00:00:00");
		Calendar c = Calendar.getInstance(); 
		c.setTime(endDate); 
		c.add(Calendar.DATE, 1);
		endDate = c.getTime();
		criteria.add(Restrictions.ge(dateType, startDate)); 
		criteria.add(Restrictions.lt(dateType, endDate));
		return criteria;
	}
	public static Criteria getCriteriaBasedOnDate(Criteria criteria,String dateType,Date startDate,Date endDate) throws ParseException{
		Calendar c = Calendar.getInstance(); 
		c.setTime(endDate); 
		c.add(Calendar.DATE, 1);
		endDate = c.getTime();
		criteria.add(Restrictions.ge(dateType, startDate)); 
		criteria.add(Restrictions.lt(dateType, endDate));
		return criteria;
	}
	public static Date getCurrentSystemDate(Date date, long offSet) throws ParseException {
		Date locDate = null;
		try{
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			dateFormat.setTimeZone(TimeZone.getDefault());
			Date date1 = new Date(date.getTime()+offSet);
			String currDate = dateFormat.format(date1);
			locDate = dateFormat.parse(currDate);
		}
		catch(Exception e){
			return null;
		}
		return locDate;
	}
}
