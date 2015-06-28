/*******************************************************************************
 * Copyright (c) 2005, 2014 springside.github.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *******************************************************************************/
package com.supermy.service;

import com.supermy.domain.Channel;
import com.supermy.repository.ChannelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


import java.util.Map;

// Spring Bean的标识.
@Component
// 类中所有public函数都纳入事务管理的标识.
@Transactional
public class ChannelService {

	@Autowired
	private ChannelRepository channelRepository;

//	public Page<Channel> getUserChannel(Long userId, Map<String, Object> searchParams, int pageNumber, int pageSize,
//			String sortType) {
//		PageRequest pageRequest = buildPageRequest(pageNumber, pageSize, sortType);
//		Specification<Channel> spec = buildSpecification(userId, searchParams);
//
//		return channelRepository.findAll(spec, pageRequest);
//	}


}
