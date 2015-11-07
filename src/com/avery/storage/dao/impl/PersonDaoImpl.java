package com.avery.storage.dao.impl;

import org.springframework.stereotype.Repository;

import com.avery.storage.dao.GenericDaoImpl;
import com.avery.storage.entities.Person;

@Repository
public class PersonDaoImpl extends GenericDaoImpl<Person, Long> implements
		PersonDao {

}
