package com.frank.discshop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    @Query("SELECT a FROM Album a WHERE LOWER(REPLACE(a.title, ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:searchTerm, ' ', ''), '%'))")
    List<Album> searchByTitleIgnoringCaseAndSpace(@Param("searchTerm") String searchTerm);
}

