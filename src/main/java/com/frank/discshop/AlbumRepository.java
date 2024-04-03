package com.frank.discshop;

import org.springframework.data.jpa.repository.JpaRepository;

// 这个接口允许你执行CRUD操作，JpaRepository<Album, Long>表示这个仓库是管理Album实体的，其主键是Long类型
public interface AlbumRepository extends JpaRepository<Album, Long> {
    // 这里你可以根据需要添加自定义的数据库操作方法，但是JpaRepository已经提供了很多标准的方法
}

