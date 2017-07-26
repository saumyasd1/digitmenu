package com.avery.storage.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.avery.logging.AppLogger;
import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.OrgInfo;
import com.avery.storage.entities.OrgInfoName;

@Repository
public class OrgInfoDaoImpl extends GenericDaoImpl<OrgInfo, Long> implements
OrgInfoDao {
	
	@Override 
	public List<OrgInfo> readOrgInfoByProductLneId(Long productLineId,Long OrgId ) throws Exception{
		Session session=getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(OrgInfo.class)
				.setProjection(Projections.projectionList()
					.add(Projections.property("billToCode"),"billToCode")
					.add(Projections.property("shippingInstruction"),"shippingInstruction")
					.add(Projections.property("shipToCode"),"shipToCode")
					.add(Projections.property("freightTerm"),"freightTerm")
					.add(Projections.property("shippingMethod"),"shippingMethod")
					.add(Projections.property("shippingInstruction"),"shippingInstruction")
					.add(Projections.property("varOrderSystemInfo.artworkHold"),"artworkHold")
					.add(Projections.property("varOrderSystemInfo.varSystem.id"),"systemId")
					.add(Projections.property("varOrderSystemInfo.csrName"),"csrName")
					.add(Projections.property("varOrderSystemInfo.invoiceNote"),"invoiceNote")
					.add(Projections.property("varOrderSystemInfo.manufacturingNotes"),"manufacturingNotes")
					.add(Projections.property("varOrderSystemInfo.packingInstruction"),"packingInstruction")
					.add(Projections.property("varOrderSystemInfo.shippingMark"),"shippingMark")
					.add(Projections.property("varOrderSystemInfo.splitShipSetBy"),"splitShipSetBy")
					.add(Projections.property("varOrderSystemInfo.variableDataBreakdown"),"variableDataBreakdown"))
					.setResultTransformer(Transformers.aliasToBean(OrgInfo.class));
		Conjunction disCriteria = Restrictions.conjunction();
		criteria.createAlias("varOrderSystemInfo", "varOrderSystemInfo");
		criteria.createAlias("varOrderSystemInfo.varProductLine", "varProductLine");
		disCriteria.add(Restrictions.eq("varProductLine.id",productLineId));
		disCriteria.add(Restrictions.eq("orgCodeId", OrgId.intValue()));
		criteria.add(disCriteria);
		return criteria.list();
	}

	@Override
	public Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Map<String, Object> readAllOrgInfoAndOrgName(){
		Map<String, Object> entitiesMap = new HashMap<String, Object>();
		Session session = null;
		try{
			session = getSessionFactory().getCurrentSession();
			SQLQuery query = session.createSQLQuery(
					"select distinct orginfo.id as id, orginfo.orgCodeId as orgCodeId, orginfo.orderSystemInfoId as orderSystemInfoId, org.name as name from orginfo orginfo "
							+ "inner join org org on orginfo.orgCodeId = org.id");
			query.setResultTransformer(Transformers.aliasToBean(OrgInfoName.class));
			entitiesMap.put("data", query.list());
		}
		catch(Exception e){
			e.printStackTrace();
			AppLogger.getSystemLogger().error("Error while fetching data from the orginfo table -> "+e);
			throw e;
		}
		return entitiesMap;
	}

}
