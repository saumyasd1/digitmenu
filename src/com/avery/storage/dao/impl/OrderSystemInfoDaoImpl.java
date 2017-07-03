package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrderSystemInfo;

/**
 * @author Vishal
 *
 */
@Repository
public class OrderSystemInfoDaoImpl extends GenericDaoImpl<OrderSystemInfo, Long> implements OrderSystemInfoDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map getByProductlineId(long productlineId) {
		Map entitiesMap = new HashMap();
		Session session = null;
		Criteria criteria = null;
		try{
			session = getSessionFactory().getCurrentSession();
			criteria = session.createCriteria(OrderSystemInfo.class)
					.createAlias("varProductLine", "varProductLine")
					.add(Restrictions.eq("varProductLine.id", productlineId));
			List list = criteria.list();
			entitiesMap.put("listOrderSystemInfo", list);
		}
		catch(Exception e){
			AppLogger.getSystemLogger().error("Error while fething ordersysteminfo from the database "+e);
			throw e;
		}

		return entitiesMap;
	}

}
