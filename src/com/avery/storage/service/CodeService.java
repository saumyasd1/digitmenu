package com.avery.storage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.avery.storage.dao.impl.CodeDao;
import com.avery.storage.entities.Code;

@Component
public class CodeService extends GenericEntityService<Code, Long>{
	
	private CodeDao codeDao;

	public CodeDao getCodeDao() {
		return codeDao;
	}

	@Autowired
	public void setCodeDao(CodeDao codeDao) {
		this.codeDao = codeDao;
	}

	@Transactional
	public List<Code> readByType(String type) throws Exception {
		return codeDao.readByType(type);
	}

}
