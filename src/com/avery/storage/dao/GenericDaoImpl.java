package com.avery.storage.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import com.avery.storage.Entity;
import com.avery.storage.entities.Partner;
import com.avery.storage.entities.ProductLine;

public abstract class GenericDaoImpl<T extends Entity, PK extends Serializable>
		implements GenericDao<T, PK> {

	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	private Class<T> type;

	public Class<T> getType() {
		return type;
	}

	public GenericDaoImpl() {
		this.type = (Class<T>) ((ParameterizedType) getClass()
				.getGenericSuperclass()).getActualTypeArguments()[0];
	}

	@Override
	public void update(T entity) {
		Session session = getSessionFactory().getCurrentSession();
		// session.beginTransaction();
		entity.preUpdateOp();
		session.update(entity);
		entity.postUpdateOp();
		// session.getTransaction().commit();
	}

	@Override
	public void delete(T entity) {
		Session session = getSessionFactory().getCurrentSession();
		// session.beginTransaction();
		entity.preDeleteOp();
		session.delete(entity);
		entity.postDeleteOp();
		// session.getTransaction().commit();
	}

	@Override
	public List<T> readAll() {
		Session session = getSessionFactory().getCurrentSession();
		// session.beginTransaction();
		Criteria criteria = session.createCriteria(getType());
		List<T> entities = (List<T>) criteria.list();
		// session.getTransaction().commit();
		return entities;
	}

	@Override
	public PK create(Entity newInstance) {
		Session session = getSessionFactory().getCurrentSession();
		// session.beginTransaction();
		newInstance.preCreateOp();
		PK pk = (PK) session.save(newInstance);
		newInstance.postCreateOp();
		// session.getTransaction().commit();
		return pk;
	}

	@Override
	public T read(Serializable id) {
		Session session = getSessionFactory().getCurrentSession();
		// session.beginTransaction();
		T entity = (T) session.get(getType(), id);
		// session.getTransaction().commit();
		return entity;
	}
	
	@Override
	public void updateEntities(List<T> entities)  {
		Session session = getSessionFactory().getCurrentSession();
			for (T entity : entities) {
				entity.preUpdateOp();
				session.update(entity);
				entity.postUpdateOp();
			}
	}
	
	@Override
	public Map readWithCriteria(MultivaluedMap queryMap) throws Exception{
		Map entities = getAllEntitiesWithCriteria(queryMap);
		return entities;	
	}
	
	public abstract Map getAllEntitiesWithCriteria(MultivaluedMap queryMap) throws Exception;
}