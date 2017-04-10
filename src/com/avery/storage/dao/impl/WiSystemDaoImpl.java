package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.WiSystem;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Vishal
 *
 */
@Repository
public class WiSystemDaoImpl extends GenericDaoImpl<WiSystem, Long> implements WiSystemDao {

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Map getEntitiesByWiId(Long entityId){
		Map entitiesMap = new HashMap();
		Session session = null;
		ObjectMapper mapper = new ObjectMapper();
		ProjectionList proj = Projections.projectionList()
				.add(Projections.property("varWiSystemInfo.systemName"),"systemName")
				.add(Projections.property("varWiSystemInfo.id"),"parentId")
				.add(Projections.property("id"),"id")
				.add(Projections.property("splitByShipSet"),"splitByShipSet")
				.add(Projections.property("manufacturing"),"manufacturing")
				.add(Projections.property("packingInstruction"),"packingInstruction")
				.add(Projections.property("csrName"),"csrName")
				.add(Projections.property("artWorkHold"),"artWorkHold")
				.add(Projections.property("shipMark"),"shipMark")
				.add(Projections.property("invoiceLineInstruction"),"invoiceLineInstruction")
				.add(Projections.property("variableDataBreakdown"),"variableDataBreakdown")
				.add(Projections.property("defaultOrg"),"defaultOrg");
		try{
			session = getSessionFactory().getCurrentSession();
			Criteria criteria = session.createCriteria(WiSystem.class)
					.createAlias("varWiSystemInfo", "varWiSystemInfo")
					.createAlias("varWi", "varWi")
					.add(Restrictions.eq("varWi.id", entityId));
			criteria.setProjection(proj).setResultTransformer(Transformers.aliasToBean(WiSystem.class));
			entitiesMap.put("system", new LinkedHashSet(criteria.list()));
		}
		catch(Exception e){
			e.printStackTrace();
			throw e;
		}
		return entitiesMap;
	}

}
