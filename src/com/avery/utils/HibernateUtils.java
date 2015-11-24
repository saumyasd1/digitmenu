package com.avery.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		Date startDate = formatter.parse(sDate);
		Date endDate = formatter.parse(eDate);
		Calendar c = Calendar.getInstance(); 
		c.setTime(endDate); 
		c.add(Calendar.DATE, 1);
		endDate = c.getTime();
		criteria.add(Restrictions.ge(dateType, startDate)); 
		criteria.add(Restrictions.lt(dateType, endDate));
		return criteria;
	}
}
