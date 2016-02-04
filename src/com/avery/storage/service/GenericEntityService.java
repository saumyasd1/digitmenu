package com.avery.storage.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.Entity;
import com.avery.storage.dao.GenericDao;

public class GenericEntityService<T extends Entity, PK extends Serializable> {

	private GenericDao<T, PK> genericDao;

	public GenericDao<T, PK> getGenericDao() {
		return genericDao;
	}

	@Autowired
	public void setGenericDao(GenericDao<T, PK> genericDao) {
		this.genericDao = genericDao;
	}

	@Transactional
	public PK create(T entity) {
		return genericDao.create(entity);
	}

	@Transactional
	public T read(PK id) {
		return genericDao.read(id);
	}

	@Transactional
	public List<T> readAll() {
		return genericDao.readAll();
	}

	@Transactional
	public void update(T transientObject) {
		genericDao.update(transientObject);
	}

	@Transactional
	public void delete(T persistentObject) {
		genericDao.delete(persistentObject);
	}
	
	@Transactional
	public Map readWithCriteria(MultivaluedMap queryMap) throws Exception {
		return genericDao.readWithCriteria(queryMap);
	}
	
	@Transactional
	public void updateEntities(List entitiesList){
		genericDao.updateEntities(entitiesList);
	}
}