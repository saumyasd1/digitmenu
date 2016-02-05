package com.avery.storage.dao.impl;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.User;
import com.avery.utils.ApplicationUtils;
import com.avery.utils.HibernateUtils;
/**
* 28 DEC -2015
* 
* @author Amit Trivedi
*/
@SuppressWarnings("unchecked")
@Repository
public class UserDaoImpl extends GenericDaoImpl<User, Long> implements UserDao {
	
	@SuppressWarnings({ "rawtypes" })
	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		Map entitiesMap =new HashMap();
		Criteria criteria=null;
		int totalCount=0;
		criteria =getCriteria(queryMap);
		String limit=(String)queryMap.getFirst("limit");
		String pageNo=(String) queryMap.getFirst("page");
		totalCount=HibernateUtils.getAllRecordsCountWithCriteria(criteria);
		criteria.addOrder(Order.desc("lastModifiedDate"));
		String pageNumber = pageNo == null ? "" : pageNo;
		int pageNO = (!"".equals(pageNumber)) ? Integer.parseInt(pageNumber) : 0;
		int pageSize = (limit != null && !"".equals(limit)) ? Integer.parseInt(limit) : 0;
		if(pageNO!=0){
        criteria.setFirstResult((pageNO - 1) * pageSize);
        criteria.setMaxResults(pageSize);
		}
		
        entitiesMap.put("totalCount", totalCount);
        entitiesMap.put("users", new LinkedHashSet(criteria.list()));
		return entitiesMap;
	}
	
	
	@Override
	public Boolean checkDuplicate(String email) throws Exception{
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		if(email!=null && !"".equals(email)){
			criteria.add(Restrictions.eq("email", email));
			totalCount=criteria.list().size();
		}
		return (totalCount>0);
	}
	
	@Override
	public User findUserByEmail(String email) throws Exception {
		Session session = null;
		Criteria criteria = null;
		User user = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		if (email != null && !"".equals(email)) {
			user = (User) criteria.add(Restrictions.eq("email", email))
					.uniqueResult();
		}
		return user;
	}
	@Override
	public boolean checkDuplicateUser(User userObj) throws Exception{
		Session session=null;
		Criteria criteria=null;
		int totalCount=0;
		String Email=userObj.getEmail();
		Long id=userObj.getId();
		Boolean partnerExist=false;
		List<User> user = null;
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		if(Email!=null && !"".equals(Email)){
			Conjunction disCriteria = Restrictions.conjunction();
			disCriteria.add(Restrictions.eq("email", Email));
			if(id!=0){
				disCriteria.add(Restrictions.ne("id", id));
			}
			criteria.add(disCriteria);
			user= criteria.list();
			totalCount=user.size();
			if(totalCount>0)
				partnerExist=true;
		}
		return partnerExist;
	}
	@SuppressWarnings({ "rawtypes" })
	public Criteria getCriteria(MultivaluedMap queryMap) throws IOException, Exception{
		Session session=null;
		Criteria criteria=null;
		String queryString=(String) queryMap.getFirst("query");
		session = getSessionFactory().getCurrentSession();
		criteria = session.createCriteria(User.class);
		if(queryString!=null){
			Map<String,String> searchMap=ApplicationUtils.convertJSONtoMaps(queryString);
			String dateType=searchMap.get("datecriteriavalue");
			if(dateType!=null && !dateType.equals("")){
				String sDate=searchMap.get("fromDate");
				String eDate=searchMap.get("toDate");
				criteria=HibernateUtils.getCriteriaBasedOnDate(criteria, dateType, sDate, eDate);
			}
			String email=searchMap.get("email");
			if(email!=null && !"".equals(email)){
				criteria.add(Restrictions.ilike("email",email,MatchMode.ANYWHERE));
			}
		}
		return criteria;
	}
}
