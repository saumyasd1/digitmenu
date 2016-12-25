package com.avery.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.avery.storage.dao.impl.SiteDao;
import com.avery.storage.entities.Site;

@Component
public class SiteService extends GenericEntityService<Site, Long>{
	
	private SiteDao siteDao;

	public SiteDao getSiteDao() {
		return siteDao;
	}

	@Autowired
	public void setSiteDao(SiteDao siteDao) {
		this.siteDao = siteDao;
	}


}
